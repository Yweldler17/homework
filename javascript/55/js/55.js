'use strict';

//function to generate a random upper or lowercase letter.
function randomLetter() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    let rnum = Math.floor(Math.random() * chars.length);
    let randomChar = chars.substring(rnum, rnum + 1);
    return randomChar;
}

//function to add random letters to an array.
function addLetters(ourArray) {
    if (ourArray.length < 1) {
        let rnum = Math.ceil(Math.random() * 3);
        for (let i = 0; i < rnum + 1; i++) {
            ourArray.push(randomLetter());
        }
    }
}

function isCapitol(ourLetter) {
    return ourLetter === ourLetter.toUpperCase();
}

function isNotCapitol(ourLetter) {
    return !isCapitol(ourLetter);
}

//Question 1. Write your own version of the built in array "every" function
function myEvery(ourArray, callback) {
    let result = true;
    for (let i = 0; i < ourArray.length; i++) {
        if (!callback(ourArray[i])) {
            result = false;
            break;
        }
    }
    return result;
}

//Question 2. Write your own version of the built in array "some" function
function mySome(ourArray, callback) {
    let result = false;
    for (let i = 0; i < ourArray.length; i++) {
        if (callback(ourArray[i])) {
            result = true;
            break;
        }
    }
    return result;
}
//Question 3. Write a function called onlyIf.
function onlyIf(ourArray, callback, action) {
    for (let i = 0; i < ourArray.length; i++) {
        if (callback(ourArray[i])) {
            action(ourArray[i]);
        }
    }
}
//Question 4. use the built in array operators filter and forEach instead.
function onlyIf2(ourArray, callback, action) {
    ourArray.filter(callback).forEach(action);
}

//3 test arrays
const letters1 = [];
const letters2 = [];
const letters3 = [];
// filling all 3 arrays with random letters.
addLetters(letters1);
addLetters(letters2);
addLetters(letters3);

//myEvery function checking for all UpperCase
console.log('Are all of these letters UpperCase?', letters1, myEvery(letters1, x => x === x.toUpperCase()));
console.log('Are all of these letters UpperCase?', letters2, myEvery(letters2, isCapitol));
console.log('Are all of these letters UpperCase?', letters3, myEvery(letters3, isCapitol));
//myEvery function checking for all LowerCase
console.log('Are all of these letters LowerCase?', letters1, myEvery(letters1, x => x !== x.toUpperCase()));
console.log('Are all of these letters LowerCase?', letters2, myEvery(letters2, isNotCapitol));
console.log('Are all of these letters LowerCase?', letters3, myEvery(letters3, isNotCapitol));
//mySome function checking for some UpperCase
console.log('Are some of these letters UpperCase?', letters1, mySome(letters1, x => x === x.toUpperCase()));
console.log('Are some of these letters UpperCase?', letters2, mySome(letters2, isCapitol));
console.log('Are some of these letters UpperCase?', letters3, mySome(letters3, isCapitol));
//mySome function checking for some LowerCase
console.log('Are some of these letters LowerCase?', letters1, mySome(letters1, x => x !== x.toUpperCase()));
console.log('Are some of these letters LowerCase?', letters2, mySome(letters2, isNotCapitol));
console.log('Are some of these letters LowerCase?', letters3, mySome(letters3, isNotCapitol));
//onlyIf printing only uppercase letters
onlyIf(letters1, x => x === x.toUpperCase(), x => console.log(x));
onlyIf(letters2, isCapitol, x => console.log(x));
onlyIf(letters3, isCapitol, x => console.log(x));
console.log('The letters above are UpperCase');
//onlyIf printing only lowercase letters
onlyIf2(letters1, x => x !== x.toUpperCase(), x => console.log(x));
onlyIf2(letters2, isNotCapitol, x => console.log(x));
onlyIf2(letters3, isNotCapitol, x => console.log(x));
console.log('The letters above are LowerCase');

//Comparison to built in function of every.
console.log('My function:', myEvery(letters1, isCapitol), 'Built in function:', letters1.every(isCapitol));
console.log('My function:', myEvery(letters2, isNotCapitol), 'Built in function:', letters2.every(isNotCapitol));
console.log('My function:', myEvery(letters3, isCapitol), 'Built in function:', letters3.every(isCapitol));
//Comparison to built in function of some.
console.log('My function:', mySome(letters1, isCapitol), 'Built in function:', letters1.some(isCapitol));
console.log('My function:', mySome(letters2, isNotCapitol), 'Built in function:', letters2.some(isNotCapitol));
console.log('My function:', mySome(letters3, isCapitol), 'Built in function:', letters3.some(isCapitol));
