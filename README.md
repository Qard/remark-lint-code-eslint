# remark-lint-code-eslint

[![Greenkeeper badge](https://badges.greenkeeper.io/Qard/remark-lint-code-eslint.svg)](https://greenkeeper.io/)

This a plugin for [remark-lint-code](https://github.com/qard/remark-lint-code)
that allows linting fenced JavaScript code blocks in markdown using eslint.

## Install

```console
npm install remark-lint-code-eslint
```

## Usage

### CLI

```console
remark -u remark-lint -u lint-code="{\"js\":\"remark-lint-code-eslint\"}" foo.md
```

### Config file

```json
{
  "plugins": [
    "lint",
    ["lint-code", {"js": "remark-lint-code-eslint"}]
  ]
}
```

### Programmatic

```js
var remark = require('remark')
var lint = require('remark-lint')
var lintCode = require('remark-lint-code')
var eslint = require('remark-lint-code-eslint')
var report = require('vfile-reporter')

remark()
  .use(lint)
  .use(lintCode, {js: eslint})
  .process('```js\nvar foo = "bar"\n```', function (err, file) {
    console.error(report(err || file));
  })
```

You can also pass configuration like so:

```diff
 remark()
   .use(lint)
-  .use(lintCode, {js: eslint})
+  .use(lintCode, {
+    js: {
+      module: eslint,
+      options: {
+        rules: {'no-console': 2}
+      }
+    }
+  })
   .process('```js\nvar foo = "bar"\n```', function (err, file) {
     console.error(report(err || file));
```
---

### Copyright (c) 2016 Stephen Belanger
#### Licensed under MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
