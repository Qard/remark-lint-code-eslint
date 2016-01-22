var eslint = require('eslint')

module.exports = function (options) {
  var engine = new eslint.CLIEngine(options)

  return function (node, file) {
    var messages = engine.executeOnText(node.value, file.filePath())
    messages.results[0].messages.forEach(function (message) {
      var msg = message.message
      switch (message.severity) {
        case 1: file.warn(msg, node); break
        case 2: file.fail(msg, node); break
      }
    })
  }
}
