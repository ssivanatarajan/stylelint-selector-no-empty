var stylelint = require("stylelint");
var ruleName = "stylelint/stylelint-no-empty-selector";
var nearestSelector = "";
var messages = stylelint.utils.ruleMessages(ruleName, {
  expected: function(selector) {
    nearestSelector = "";
    if (selector.length > 0) {
      return "Unexpected empty selector near " + selector;
    } else {
      return "Unexpected empty selector";
    }
  }
});
module.exports = stylelint.createPlugin(ruleName, function(enabled) {
  if (!enabled) {
    return;
  }
  return function(root, result) {
    root.walkRules(rule => {


      if (rule != undefined) {
        var selectors = rule.selector.split(',');
        var selLength = selectors.length;
        for (var i = 0; i < selLength; i++) {
          if (selectors[i].trim().length == 0) {
            stylelint.utils.report({
              result,
              ruleName,
              message: messages.expected(nearestSelector),
              node: rule,
              word: rule.node

            });
          } else {
            nearestSelector = selectors[i];
          }
        }

      }
    });
  }

});
