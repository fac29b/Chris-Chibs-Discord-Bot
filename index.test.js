const { add2, add3 } = require('./index');

it("Should add two numbers using add2 from index", () => {
    let result = add2(11, 33);
    if(result !== 44)
    throw new Error(`Expected 44, but got ${result}`);
})

it("Should add two numbers using add3 from index", () => {
    let result = add3(11, 33);
    if(result !== 44)
    throw new Error(`Expected 44, but got ${result}`);
})