const { add, square } = require('./utils');

it("Should add two numbers", () => {
    let result = add(11, 33);
    if(result !== 44)
    throw new Error(`Expected 44, but got ${result}`);
})

it("Should square a number", () => {
    let result = square(2);
    if(result !== 4)
    throw new Error(`Expected 4, but got ${result}`);
})