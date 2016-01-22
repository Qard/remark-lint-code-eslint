var remark = require('remark')
var lint = require('remark-lint')
var lintCode = require('remark-lint-code')
var tap = require('tap')

var eslint = require('./index')

var processor = remark.use(lint, {
  'final-newline': false,
  external: [lintCode],
  'lint-code': {
    js: {
      module: eslint,
      options: {
        rules: {
          'no-console': 2
        }
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
  processor.process('```js\nconsole.log("wat")\n```', function (err, file, res) {
    t.equal(file.messages[0].reason, 'Unexpected console statement.', 'should have failed')
    t.end()
  })
})
