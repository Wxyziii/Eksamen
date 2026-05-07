#!/usr/bin/env node

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const allowWrite = process.env.SMOKE_ALLOW_WRITE === '1';

const results = [];

async function check(name, fn) {
  try {
    await fn();
    results.push({ name, ok: true });
    console.log(`PASS ${name}`);
  } catch (error) {
    results.push({ name, ok: false, error: error.message });
    console.error(`FAIL ${name}: ${error.message}`);
  }
}

async function request(path, options = {}) {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: { 'content-type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  const text = await res.text();
  let body = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }

  return { res, body };
}

await check('API root or frontend responds', async () => {
  const { res } = await request('/');
  if (res.status >= 500) throw new Error(`Expected non-5xx, got ${res.status}`);
});

await check('GET /api/health responds if implemented', async () => {
  const { res } = await request('/api/health');
  if (![200, 404].includes(res.status)) {
    throw new Error(`Expected 200 or 404, got ${res.status}`);
  }
});

await check('GET /api/tickets returns JSON array or object', async () => {
  const { res, body } = await request('/api/tickets');
  if (!res.ok) throw new Error(`Expected 2xx, got ${res.status}`);
  if (typeof body !== 'object' || body === null) {
    throw new Error('Expected JSON body');
  }
});

await check('GET invalid ticket id gives controlled response', async () => {
  const { res } = await request('/api/tickets/99999999');
  if (![400, 404].includes(res.status)) {
    throw new Error(`Expected 400 or 404, got ${res.status}`);
  }
});

if (allowWrite) {
  await check('POST /api/tickets accepts valid demo ticket', async () => {
    const payload = {
      tittel: 'Smoke test ticket',
      title: 'Smoke test ticket',
      beskrivelse: 'Dette er en automatisk smoke test som sjekker at API-et kan opprette tickets.',
      description: 'Dette er en automatisk smoke test som sjekker at API-et kan opprette tickets.',
      prioritet: 'Lav',
      priority: 'Lav',
      kategori: 'Generelt',
      category: 'Generelt',
    };

    const { res } = await request('/api/tickets', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (![200, 201].includes(res.status)) {
      throw new Error(`Expected 200/201, got ${res.status}`);
    }
  });
}

const failed = results.filter((result) => !result.ok);
console.log('\nSmoke test summary');
console.table(results);

if (failed.length > 0) {
  process.exit(1);
}
