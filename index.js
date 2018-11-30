var stylelint = require("stylelint");
var postcss=require("postcss");
var ruleName = "plugin/stylelint-selector-no-empty";
var nearestSelector = "";
var messages = stylelint.utils.ruleMessages(ruleName, {
  expected: function(selector) {

    if (selector.length > 0) {
      return "Unexpected empty selector near '"+selector+"'";
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
      try
        {
      if (rule != undefined) {
      nearestSelector = "";
      var selectorlist=rule.selector.split(',');
      var selectorLength=selectorlist.length;
      for(var i=0;i<selectorLength;i++)
      {
          var s=selectorlist[i];
          if(s.trim().length==0)
          {
            reportError(rule,result);
            continue;
          }
          nearestSelector = s;
          var spacesplitedselectors=postcss.list.space(s);
          checkEmptySelector(spacesplitedselectors,result,rule);
       }
      }
    }
    catch(err)
    {
      console.log(err);
    }
    });
  }
function checkEmptySelector(spacesplitedselectors,result,rule)
{
  var spaceSepertedSellength=spacesplitedselectors.length;
  for(var j=0;j<spaceSepertedSellength;j++)
  {
    var sp=spacesplitedselectors[j];
    if((sp.startsWith('.')|| sp.startsWith('#')) && sp.trim().length>1)
    {
      sp=sp.slice(1);
    }
    var classSelectorsWithoutdot=sp.split('.');
    var classSellen=classSelectorsWithoutdot.length;
    for(var k=0;k<classSellen;k++)
    {
      var idSelectorsWithoutpound=classSelectorsWithoutdot[k].split('#');
      var idSellen=idSelectorsWithoutpound.length;
      for(var l=0;l<idSellen;l++)
      {
        var selector=idSelectorsWithoutpound[l];
        if (selector.trim().length == 0) {
          reportError(rule,result);
          return;
        }
      }
    }
  }
}

function reportError(rule,result)
{
  stylelint.utils.report({
    result,
    ruleName,
    message: messages.expected(nearestSelector),
    node: rule,
    word: rule.node
  });
}
});
