# Frontend White Page Troubleshooting

If the frontend shows a blank white page, it usually means the React app did not start correctly in the browser.

## 1. Do not open `index.html` directly

Do **not** double-click `frontend/index.html`.

React + Vite must be started from the terminal:

```bash
cd SWE381-Stadium-Project
npm install
npm run dev
```

Then open the frontend URL printed by Vite, usually:

```text
http://localhost:5173
```

## 2. Make sure dependencies are installed

If `node_modules` is missing, the app cannot load packages like React, React Router, Vite, or Bootstrap.

Run this from the project root:

```bash
npm install
```

If that fails, install each side separately:

```bash
cd backend
npm install
cd ../frontend
npm install
```

## 3. Make sure you are using the frontend URL, not the backend URL

Use the frontend URL for the website:

```text
http://localhost:5173
```

The backend URL is only the API:

```text
http://localhost:5000
```

## 4. Check the browser console

Open Developer Tools:

- Windows/Linux: `F12` or `Ctrl + Shift + I`
- Mac: `Cmd + Option + I`

Then open the **Console** tab.

Common errors:

- `Failed to resolve import` means dependencies are not installed.
- `localhost:5000 failed` means the backend is not running.
- `JSON.parse` or local storage errors can be fixed by clearing browser local storage.

## 5. Clear saved login data

If old saved login data is broken, clear it in the browser console:

```js
localStorage.removeItem('stadiumUser')
location.reload()
```

The app also removes invalid saved login data automatically when it starts.

## 6. Fix `Failed to load PostCSS config` or `EJSONPARSE`

If Vite shows an error like this on Windows:

```text
Failed to load PostCSS config
Expected double-quoted property name in JSON
```

then one of your `package.json` files has broken JSON. This usually happens after manually editing `package.json` or resolving GitHub conflicts.

From the project root, run this command with Node, not npm:

```powershell
node scripts\repair-package-json.js
```

Then reinstall and start again:

```powershell
npm install
npm run dev
```

If you only want to check the frontend file, open `frontend\package.json` and make sure there is no comma after the last item in `scripts`, `dependencies`, or `devDependencies`.
