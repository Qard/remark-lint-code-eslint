var remark = require('remark')
var lint = require('remark-lint')
var lintCode = require('remark-lint-code')
var tap = require('tap')

var eslint = require('./index')

var processor = remark()
  .use(lint)
  .use(lintCode, {
    js: {
      module: eslint,
      options: {
        rules: {
          'no-console': 2
        }
      }
    }
  })

tap.test('should pass when matching', function (t) {
  processor.process('```js\nnope\n```', function (err, file, res) {
    t.equal(file.messages.length, 0, 'should have passed')
    t.end()
  })
})

tap.test('should fail when not matching', function (t) {
  processor.process('```js\nvar msg = "wat";\n console.log(msg)\n```', function (err, file, res) {
    t.equal(file.messages[0].line, 3, 'should point to line 3')
    t.equal(file.messages[0].column, 2, 'should point to column 2')
    t.equal(file.messages[0].reason, 'Unexpected console statement.', 'should have failed')
    t.end()
  })
})
