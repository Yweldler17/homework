//Question 1. Create map Function
(function () {
    'use strict';

    const myMap = function (theArray, callback) {
        let callbackArray = [];
        for (let i = 0; i < theArray.length; i++) {
            callbackArray.push(callback(theArray[i]));
        }
        return callbackArray;
    };

    const testArray = [2, 4, 6];

    const doubleNum = function (num) {
        if (Number.isInteger(num)) {
            return num * 2;
        }
    };

    const addForty = function (num) {
        if (Number.isInteger(num)) {
            return num + 40;
        }
    };
    console.log(testArray);
    const doubledArray = myMap(testArray, doubleNum);
    console.log(doubledArray);
    const doubledArray2 = myMap(doubledArray, doubleNum);
    console.log(doubledArray2);
    const addedForty = myMap(testArray, addForty);
    console.log(addedForty);
    console.log(testArray);

}());

