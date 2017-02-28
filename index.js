var eslint = require('eslint')

module.exports = function (options) {
  var engine = new eslint.CLIEngine(options)

  return function (node, file) {
    var messages = engine.executeOnText(node.value, file.path)
    messages.results[0].messages.forEach(function (message) {
      // Combine position of fenced code block with position
      // of code within the code block to produce actual location
      var pos = {
        line: node.position.start.line + message.line,
        column: message.column
      }
      var msg = message.message
      switch (message.severity) {
        case 1:
          file.message(msg, pos)
          break
        case 2:
          try {
            file.fail(msg, pos)
          } catch (err) {}
          break
      }
    })
  }
}
