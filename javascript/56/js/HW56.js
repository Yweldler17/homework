const daysGetter = (function () {
    'use strict';

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return {
        getDay: function (index) {
            return weekdays[index - 1];
        },
        getIndex: function (name) {
            return weekdays.findIndex(elem => elem.toLowerCase() === name.toLowerCase()) + 1;
        }
    };

}());

console.log(daysGetter.getDay(3));
console.log(daysGetter.getIndex('wednesday'));

const interestCalc = (function () {
    'use strict';

    let interestRate = 10;
    let years = 10;
    let compound = 12;

    return {
        setRate: function (rate) {
            if (Number.isInteger(rate)) {
                interestRate = rate;
            }
        },
        setYears: function (timePeriod) {
            if (Number.isInteger(timePeriod)) {
                years = timePeriod;
            }
        },
        setCompound: function (compoundAmnt) {
            if (Number.isInteger(compoundAmnt)) {
                compound = compoundAmnt;
            }
        },
        calculateInterest: function (principal) {
            return Math.round(principal * (Math.pow(1 + ((interestRate / 100) / compound), (compound * years))));
        }
    };
}());


interestCalc.setRate(5);
interestCalc.setYears(20);
interestCalc.setCompound(24);
console.log(interestCalc.calculateInterest(250));

interestCalc.setRate(7);
interestCalc.setYears(12);
interestCalc.setCompound(6);
console.log(interestCalc.calculateInterest(1000));

