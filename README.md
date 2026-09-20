# Windows 98 Time Machine

A Vite/React retro desktop with selectable eras from 1998 through 2019.

## Flash support

The Flash Player window now uses [Ruffle](https://ruffle.rs/), an open-source Flash emulator. It can play compatible SWF animations and games from:

- Local `.swf` files selected with **Open SWF**
- HTTPS URLs that permit browser cross-origin access
- The built-in retro browser demo

Ruffle is loaded from the official package CDN at runtime, so the app does not ship the discontinued proprietary Macromedia/Adobe Flash plug-in. Ruffle supports many ActionScript 1/2 movies; ActionScript 3 and complex games may have compatibility gaps. Only open SWF files that you have permission to use.

## Run locally

```bash
npm install
npm run dev
```

Build for deployment with `npm run build`.

For a fully offline deployment, self-host the Ruffle web assets instead of using the runtime CDN and update the script URL in `src/main.jsx`.
