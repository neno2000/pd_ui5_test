
QUnit.test( "a basic test example", function( assert ) {
  var value = "hello";
  assert.equal( value, "hello", "We expect value to be hello" );
});
QUnit.test( "a basic test example", function( assert ) {
  var value = kolla();
  assert.equal( value, "hello", "We expect value to be hello" );
});
