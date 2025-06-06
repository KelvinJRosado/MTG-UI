# SimpleUi Monorepo

This project uses [Nx](https://nx.dev) for monorepo management, TypeScript, Vue 3 (Composition API), and a simple Node.js API.

## Project Structure
- `apps/ui`: Vue 3 frontend (Composition API)
- `apps/api`: Node.js API (native HTTP)

## Usage

### Install dependencies
```sh
npm install
```

### Build all apps
```sh
npm run build
```

### Start the API server
```sh
npm run start:api
```

### Start the UI (Vite dev server)
```sh
npm run start:ui
```

### Lint all projects
```sh
npm run lint
```

### Format code
```sh
npm run format
```

### Clean Nx cache and reset
```sh
npm run clean
```

## Notes
- The UI and API are independent. The UI does **not** call the API yet.
- All code is commented for clarity and structured for future expansion.
- Use Nx commands for advanced monorepo management.

---

For more Nx commands, see the [Nx documentation](https://nx.dev/getting-started/intro).
