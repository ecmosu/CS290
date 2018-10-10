//Write a JavaScript program that declares a function but calls it before it is declared.
//Because of function hoisting this will work in JavaScript. Go prove it!
test1();
function test1()
{
    console.log("Test1 was run");
}

//Also write a function which is assigned to a variable. 
//Call it before it is assigned and prove that this does not work.
test2();
var test2 = function()
{
    console.log("Test2 was run");
};