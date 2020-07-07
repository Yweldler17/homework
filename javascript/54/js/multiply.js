'use strict';

//question 1.
function multiply(x, y) {
    return x * y;
}

console.log(multiply(3, 9));
console.log(multiply(5, 3));
console.log(multiply(4, 4));

//question 2.
function getMultiplier() {
    return function (c, d) {
        return c * d;
    };
}

const mulitplier2 = getMultiplier();
console.log(mulitplier2(12, 10));
console.log(mulitplier2(8, 11));
console.log(mulitplier2(3, 16));

//question 3.

function closureMultiply(e) {
    return function (f) {
        return e * f;
    };
}

const mulitplier3 = closureMultiply(6);
const mulitplier4 = closureMultiply(8);
const mulitplier5 = closureMultiply(4);

console.log(mulitplier3(10));
console.log(mulitplier3(5));
console.log(mulitplier4(14));
console.log(mulitplier4(8));
console.log(mulitplier5(21));
console.log(mulitplier5(13));