import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import { parseEnv } from 'node:util';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const queries = [
  'Barbour Barrhill tartan earmuffs UK price',
  'CeraVe Moisturising Cream 454g UK price',
  'LEGO Botanicals Tiny Plants 10329 UK price',
  'Dyson V8 genuine replacement battery UK price'
];
const uk = { country: 'united kingdom' };
const arms = {
  'depth-basic_country-none': { search_depth: 'basic' },
  'depth-basic_country-united-kingdom': { search_depth: 'basic', ...uk },
  'depth-advanced_country-united-kingdom': { search_depth: 'advanced', ...uk },
  'depth-basic_country-united-kingdom_max-age-6h': { search_depth: 'basic', ...uk, max_age_hours: 6 }
};
const fixed = {
  topic: 'general', max_results: 5, chunks_per_source: 3,
  auto_parameters: false, include_answer: false,
  include_raw_content: false, include_usage: true
};

async function main() {
  const env = await readFile(path.join(root, '.env'), 'utf8').catch(() => '');
  const key = parseEnv(env).TAVILY_API_KEY?.trim();
  if (!key) throw new Error('Missing TAVILY_API_KEY in .env. No requests made.');
  const date = process.argv[2] ?? '2026-11-24';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Use YYYY-MM-DD.');
  const dir = path.join(root, 'runs', date);
  await mkdir(path.dirname(dir), { recursive: true });
  await mkdir(dir); // Exclusive creation protects prior and concurrent runs.
  await mkdir(path.join(dir, 'raw'));
  const collection = [];
  for (const [index, query] of queries.entries()) {
    const qid = 'Q' + (index + 1);
    // Rotate the first arm to balance order across the four queries.
    const names = Object.keys(arms);
    for (const arm of [...names.slice(index), ...names.slice(0, index)]) {
      const request = { query, ...fixed, ...arms[arm] };
      const started_at = new Date().toISOString();
      const start = performance.now();
      let body, data, error = null, http_status = null, chars = null;
      try {
        const response = await fetch('https://api.tavily.com/search', {
          method: 'POST', redirect: 'error', signal: AbortSignal.timeout(90000),
          headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
          body: JSON.stringify(request)
        });
        http_status = response.status;
        body = Buffer.from(await response.arrayBuffer());
        if (body.includes(Buffer.from(key))) {
          body = undefined;
          throw new Error('credential_echo');
        }
        const raw = body.toString('utf8');
        chars = Array.from(raw).length;
        try { data = JSON.parse(raw); } catch { error = 'invalid_json'; }
        if (!response.ok) error = 'http_' + http_status;
        else if (!error && !Array.isArray(data?.results)) error = 'missing_results';
      } catch (failure) {
        error = failure.message === 'credential_echo' ? 'credential_echo' :
          failure.name === 'TimeoutError' ? 'timeout' : 'transport_error';
      }
      const latency_ms = Math.round(performance.now() - start);
      const stem = path.join(dir, 'raw', arm + '_' + qid);
      await writeFile(stem + '.json', body ?? JSON.stringify({ error, http_status }));
      if (error && body) await writeFile(stem + '.error.json', JSON.stringify({ error, http_status }));
      collection.push({ arm, qid, request, started_at, http_status, latency_ms,
        credits: data?.usage?.credits ?? null, chars,
        rough_tokens: chars === null ? null : Math.round(chars / 4), error });
      const file = path.join(dir, 'collect.json');
      await writeFile(file + '.tmp', JSON.stringify(collection, null, 2) + '\n');
      await rename(file + '.tmp', file);
      console.log(arm, qid, error ?? 'ok');
    }
  }
}
main().catch(error => {
  console.error(error.code === 'EEXIST' ? 'Run directory already exists.' : error.message);
  process.exitCode = 1;
});
