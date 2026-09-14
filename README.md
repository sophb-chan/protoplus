# proto+
Proto+ (a.k.a. protoplus) is a multi-enviroment module that expands JavaScript's prototype definitions, as well as global helper functions and others.

# Table of Contents
- [How to Import (ES6 module)](https://github.com/sophb-chan/protoplus#how-to-import-es6-module)
- [How to Import (CommonJS/WebJS module)](https://github.com/sophb-chan/protoplus#how-to-import-commonjswebjs-module)
- [Quick Start](https://github.com/sophb-chan/protoplus#quick-start)

# How to Import (ES6 module)
## In browsers via HTML or JS:

### Via HTML
```html
<script
  src="https://cdn.jsdelivr.net/npm/protoplus@latest/protoplus.mjs"
  type="module"
></script>
```

### Via JS
```js
(()=>{
  // import proto+

  const script = document.createElement('script');
  script.src = "https://cdn.jsdelivr.net/npm/protoplus@latest/protoplus.mjs";
  script.type = "module";
  document.head.appendChild(script);
})();
```

## In Node.js, Bun, or front-end frameworks like React/Next.js:

Install proto+ (if you haven't already):

```shell
npm install protoplus
```

then add either one of these lines of code to the top of your script file:
```js
import { protoplus } from 'protoplus';
import protoplus from 'protoplus';
```

# How to Import (CommonJS/WebJS module)
## In browsers via HTML or JS:

### Via HTML
```html
<script
  src="https://cdn.jsdelivr.net/npm/protoplus@latest/protoplus.js"
></script>
```

### Via JS
```js
(()=>{
  // import proto+

  const script = document.createElement('script');
  script.src = "https://cdn.jsdelivr.net/npm/protoplus@latest/protoplus.js";
  document.head.appendChild(script);
})();
```

## In Node.js, Bun, or front-end frameworks like React/Next.js:

Install proto+ (if you haven't already):

```shell
npm install protoplus
```

then add either one of these lines of code to the top of your script file:
```js
const { protoplus } = require('protoplus');
const protoplus = require('protoplus').default;
```


# Quick Start
After importing the script to your project, you can use `protoplus.expand()` to expand prototypes and others, and `protoplus.contract()` to restore them to their default/previous value.
It's recommended to run `protoplus.expand()` after the import statement (if you're using proto+ in a browser and imported it via HTML, run `protoplus.expand()` at the top of your script file).

You can also use `protoplus.expand({ skipClasses: true })` to only expand prototypes and global helpers.
