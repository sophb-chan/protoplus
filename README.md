# proto+
Proto+ (a.k.a. protoplus) is a multi-environment module that expands JavaScript's
built-in prototypes and global helpers with extra methods — e.g. `Array.prototype.last()`,
`Object.typeOf(value)`, `Math.clamp(num, min, max)`.

# Table of Contents
- [Install](#install)
- [How to Import](#how-to-import)
  - [ES modules (Node, Bun, Deno, bundlers, browsers)](#es-modules-node-bun-deno-bundlers-browsers)
  - [CommonJS (Node, older setups)](#commonjs-node-older-setups)
  - [Browsers via classic script tag (global `protoplus`)](#browsers-via-classic-script-tag-global-protoplus)
- [Quick Start](#quick-start)
- [API](#api)
- [Migrating from v1 to v2](#migrating-from-v1-to-v2)
- [Playground](#playground)

# Install
```shell
npm install protoplus
```

# How to Import
## ES modules (Node, Bun, Deno, bundlers, browsers)
```js
import protoplus from 'protoplus';
```

## CommonJS (Node, older setups)
```js
const protoplus = require('protoplus');
```

## Browsers via classic script tag (global `protoplus`)
```html
<script src="https://cdn.jsdelivr.net/npm/protoplus@latest/protoplus.js"></script>
```
This sets `globalThis.protoplus`. You can pin a version by replacing `latest`
with e.g. `2.0.0`.

## Browser module builds
ES module build (works in any modern browser, sets no global):
```html
<script type="module">
  import protoplus from "https://cdn.jsdelivr.net/npm/protoplus@latest/protoplus.mjs";
  protoplus.expand();
</script>
```

# Quick Start
After importing, call `protoplus.expand()` to install the helpers/methods, and
`protoplus.contract()` to remove them again:

```js
import protoplus from 'protoplus';

protoplus.expand();

console.log(Object.typeOf(42));      // "number"
console.log([1, 2, 3].last());       // 3
console.log('  hi  '.trimStart(' ')); // "hi  "

protoplus.contract(); // removes them again
```

Run `expand()` once, early in your program (it is not done automatically in the
Node builds; in the browser script-tag build it also does not run automatically).

# API
## `protoplus.expand(options)`
Installs proto+'s helpers and prototype methods. Returns nothing.

| Option        | Default | Description                                                        |
| ------------- | ------- | ------------------------------------------------------------------ |
| `override`    | `true`  | Overwrite existing globals/prototype methods (originals are kept for `contract()`). |
| `skipProtos`  | `false` | Skip prototype methods (e.g. `Array.prototype.last`).              |
| `skipGlobals` | `false` | Skip global helpers (e.g. `Math.clamp`, `Object.typeOf`).          |
| `silent`      | `false` | Suppress the `[proto+] Expanded methods in Nms` log line.          |

## `protoplus.contract(options)`
Removes what `expand()` installed, restoring any originals that were overwritten.
Returns nothing.

| Option        | Default | Description                                                        |
| ------------- | ------- | ------------------------------------------------------------------ |
| `forceErase`  | `false` | Delete/restore proto+ properties even if you replaced them after `expand()`. |
| `skipProtos`  | `false` | Skip prototype methods.                                             |
| `skipGlobals` | `false` | Skip global helpers.                                                |
| `silent`      | `false` | Suppress the `[proto+] Contracted methods in Nms` log line.         |

`contract()` never deletes or overwrites a property you installed yourself after
`expand()` unless you pass `forceErase: true`.

The ES module and CommonJS builds never print anything on import. The browser
IIFE (`protoplus.js`) sets `globalThis.protoplus` and is silent on load too;
call `protoplus.expand()` yourself.

# Migrating from v1 to v2
v2.0.0 is a breaking release:

- **`Array.prototype.advSort` renamed to `advancedSort`** (the comparison-function
  must be a function or `undefined`; anything else throws a clearer `TypeError`).
  `advSort` still works as a deprecated alias.
- **`contract()` no longer throws**, and by default it leaves alone any
  globals/prototype properties you replaced after `expand()` — pass
  `forceErase: true` to override. v1 crashed or silently clobbered your code.
- **Removed `{ skipClasses }` and the `classes` machinery** (it was dead).
- **Removed `Number.testFloatPrecision()` / `Number.testIntPrecision()`** (they
  mutated the global `Number` constructor).
- **`stride()` with `end < start`** now throws `RangeError` instead of returning `[]`.
- **`Math.dotProduct(a, b)`** with mismatched lengths now throws `RangeError`
  instead of `Error`.
- **Packaging**: the package now has an `exports` map — `import ... from 'protoplus'`
  and `require('protoplus')` both work as-is; `protoplus.js` (IIFE) remains for
  classic script tags; `.npmignore` was dropped in favor of a `files` whitelist.

# Playground
You can use the [proto+ playground](https://protoplus-playground.vercel.app/) to test proto+ for yourself in a safe place.
