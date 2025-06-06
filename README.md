# MTG-UI Monorepo

This project uses [Nx](https://nx.dev) for monorepo management, TypeScript, Vue 3 (Composition API), and a simple Node.js API.

## Project Structure
- `ui/`: Vue 3 frontend (Composition API)
- `api/`: Node.js API (native HTTP)

## Usage

### Install dependencies
```sh
npm install
```

### Build all apps
```sh
npm run build:all
```

### Build API only
```sh
npm run build:api
```

### Build UI only
```sh
npm run build:ui
```

### Serve API (dev)
```sh
npm run serve:api
```

### Serve UI (dev)
```sh
npm run serve:ui
```

### Serve all (dev)
```sh
npm run serve:all
```

### Lint all projects
```sh
npm run lint
```

### Clean Nx cache and reset
```sh
npm run clean
```

### Clean install (remove node_modules and reinstall)
```sh
npm run clean-install
```

## Notes
- The UI and API are independent. The UI does **not** call the API yet.
- All code is commented for clarity and structured for future expansion.
- Use Nx commands for advanced monorepo management.

---

For more Nx commands, see the [Nx documentation](https://nx.dev/getting-started/intro).
