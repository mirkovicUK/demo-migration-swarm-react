# demo-migration-swarm-react

Fixed demo repository (**JavaScript + JSX React app**, one real npm dependency,
a **Jest** test suite) for validating Migration Swarm's **React
Framework_Profile** and its **JS → TS + Vite** migration.

It is a small React task board written in plain JavaScript with `.jsx`
components, a custom hook, and framework-agnostic business logic. Migration
Swarm should detect React (from the `react` dependency and the `.jsx` files),
apply the React Framework_Profile (add `@vitejs/plugin-react`, `@types/react`,
`@types/react-dom`, set `"jsx": "react-jsx"` in the generated `tsconfig.json`,
and register the plugin in `vite.config.ts`), and migrate the source to
idiomatic React + TypeScript.

## What this fixture exercises

| Area | Where | Expected migration behavior |
|---|---|---|
| React detection | `react` dep + `src/**/*.jsx` | Detected_Framework = `react`; React Framework_Profile applied |
| JSX components | `src/components/*.jsx`, `src/App.jsx` | migrated to `.tsx`; props typed; type-checks under `tsc --noEmit` with `react-jsx` |
| Entry point | `src/main.jsx` | migrated to `src/main.tsx`; `createRoot` container typed |
| Custom hook | `src/hooks/useTodos.js` | reducer/action union + callbacks typed under TS |
| Pure logic | `src/lib/*.js` | migrated to `.ts` with typed models/helpers |
| Jest tests | `test/*.test.js` (`@jest/globals`) | rewritten to the **Vitest** API |
| Jest config | `jest.config.js` | on the non-migratable skip list → replaced by the scaffold's Vitest/Vite config |
| `react`/`react-dom` runtime deps | `package.json` | preserved as runtime `dependencies`; React **type** packages added only via the profile |

## Architecture

```
index.html            # Vite-style HTML entry, mounts #root
src/
  main.jsx            # ReactDOM.createRoot render
  App.jsx             # top-level component
  components/
    AddTodo.jsx       # controlled form (useState, submit/change handlers)
    FilterBar.jsx     # filter switch + remaining count
    TodoList.jsx      # presentational list → TodoItem
    TodoItem.jsx      # row with inline edit + keyboard handler
  hooks/
    useTodos.js       # useReducer + useMemo + useCallback wrapper
  lib/
    id.js             # HOT ⭐ id generation (nanoid)
    todos.js          # pure todo model + reducer
    filter.js         # pure filtering + sorting
  styles/app.css
test/
  todos.test.js       # Jest (ESM)
  filter.test.js
  id.test.js
```

The tests import only the pure `src/lib/*.js` modules (no JSX), so Jest runs in
native ESM mode (`transform: {}`, launched with `--experimental-vm-modules`).

## Run it

```bash
npm install
npm test
```

## License

MIT — see [LICENSE](LICENSE).
