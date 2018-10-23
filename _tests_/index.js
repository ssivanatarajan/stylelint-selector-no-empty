const testRule = require("stylelint-test-rule-tape");
const selectorNoEmpty = require("..");

testRule(selectorNoEmpty.rule, {
  ruleName: selectorNoEmpty.ruleName,
  config: [true],

  accept: [
    {
      code: ".a,.b { display: inline; }"
    }
  ],
  reject: [
   {
     code: '.a,,.b{color:black;}',

     message: "Unexpected empty selector near '.a' (" +selectorNoEmpty.ruleName+ ")",
     line: 1,
     column: 1
   },

   {
     code: ',.abhd,.ab{color:black;}',
     message: 'Unexpected empty selector ('+selectorNoEmpty.ruleName +')',
     line: 1,
     column: 1
   },
 ]
});
