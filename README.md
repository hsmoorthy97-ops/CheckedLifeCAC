# CheckedLife

A stroke-prevention lifestyle app for the Congressional App Challenge. CheckedLife helps people
build daily habits linked to lower stroke risk:

- **Daily checklist and streaks** for blood pressure checks, medications, activity, water, fruit and vegetables, and sodium
- **Food and nutrition**: barcode scanning (Open Food Facts), food-photo recognition, on-device nutrition-label OCR, and USDA food search
- **Calorie tracker** with meals, macros and nutrient flags based on FDA/AHA reference values
- **Workout log** with MET-based calorie estimates
- **Medication reminders**, which are phone notifications in the mobile app
- **BE FAST stroke-sign guide** with a one-tap 911 button
- **Pulse check** using the camera or a manual count, plus guided box breathing and a stroke quiz
- **AI lifestyle coach**: ask Claude about your habits and get personalized fixes (see `claude-proxy/`)

All logs stay on the device. CheckedLife is an educational tool, not medical advice.

## Tech

One-file web app (`index.html`: HTML, CSS and vanilla JavaScript), packaged for iOS and Android with
[Capacitor](https://capacitorjs.com). The AI coach goes through a small Cloudflare Worker
(`claude-proxy/worker.js`), so the Anthropic API key is never in the app.

## Run it

| Platform | How |
|---|---|
| Web | Open `index.html`, or host the repo with GitHub Pages |
| Android | Download the APK from **Actions → Android APK → Artifacts**, or run `npm install && npm run android` (needs Android Studio) |
| iOS | On a Mac with Xcode: `npm install && npm run ios`, then press Run. Installing on an iPhone needs a free or paid Apple developer account |

After editing `index.html`, run `npm run sync` to copy the change into both native apps.
AI coach setup: [`claude-proxy/README.md`](claude-proxy/README.md).
