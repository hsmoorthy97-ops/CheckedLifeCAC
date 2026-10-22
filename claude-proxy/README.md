# CheckedLife AI coach: setup

The coach lets users ask Claude about their habits without ever seeing an API key.
The key lives in a small Cloudflare Worker (free tier is plenty), not in `index.html`.

## Why not paste the key into index.html?

Anything in a web page is public. Anyone can press F12, copy the key, and spend your
credits. Keys found in public pages or GitHub repos also get scanned and revoked
automatically, which would break the app during judging.

## Steps (about 10 minutes)

1. Get an API key at <https://console.anthropic.com> → **API Keys**.
   Under **Billing → Limits**, set a low monthly spend limit (for example $10).
2. Install the Cloudflare CLI and log in:
   ```bash
   npm install -g wrangler
   wrangler login
   ```
3. Create the Worker project and pick **Hello World example → Worker only → JavaScript**:
   ```bash
   npm create cloudflare@latest checkedlife-coach
   cd checkedlife-coach
   ```
   Replace the generated `src/index.js` with `worker.js` from this folder.
4. Add the key as a **secret**. It is encrypted and never shown again:
   ```bash
   wrangler secret put ANTHROPIC_API_KEY
   ```
5. Allow only your site to call it. Use your real site origin with no trailing slash.
   Add `http://localhost:8000` too if you test locally:
   ```bash
   wrangler secret put ALLOWED_ORIGINS
   # e.g. https://yourname.github.io,http://localhost:8000
   ```
6. Deploy: `wrangler deploy`. Copy the URL it prints
   (like `https://checkedlife-coach.yourname.workers.dev`).
7. In `index.html`, find `COACH_CONFIG` and paste the URL:
   ```js
   const COACH_CONFIG={
     proxyUrl:'https://checkedlife-coach.yourname.workers.dev',
     ...
   ```

The coach is now live for every visitor. The "Developer setup" key box hides itself once
`proxyUrl` is set.

## Cost and model

- The model is `claude-opus-5-5`. A typical coach answer costs well under one cent.
- For an even cheaper model, change `MODEL` in `worker.js` to `claude-haiku-5-5`.
  If you also use the local key box, change `COACH_CONFIG.model` in `index.html` to match.
  Haiku has no server-side refusal fallback, so remove the `fallbacks` field and the
  `anthropic-beta` header when you switch.
- Built-in limits: 8 questions per minute per visitor, 20 turns per chat, 2,000 characters
  per message. For stronger protection, add a Cloudflare **Rate Limiting rule** on the Worker route.

## Local testing without the Worker

Open the **Coach** tab, expand **Developer setup**, and paste a key. It is stored only in
that browser's localStorage. Use this for testing only, and never commit a key to the repo.
