//Question 1.
(function () {
    'use strict';

    const bankAccount = {
        balance: 100,
        performTransaction: function (amount) {
            if (Number.isInteger(amount)) {
                this.balance += amount;
            }
        }
    };

    console.log(bankAccount.balance);
    bankAccount.performTransaction(250);
    console.log(bankAccount.balance);
    bankAccount.performTransaction(-89);
    console.log(bankAccount.balance);
}());
//Question 2.
(function () {
    'use strict';

    const bankAccount2 = {
        balance: 100,
    };

    const performTransaction2 = function (amount) {
        if (Number.isInteger(amount)) {
            this.balance += amount;
        }
    };

    console.log(bankAccount2.balance);
    performTransaction2.call(bankAccount2, 250);
    console.log(bankAccount2.balance);
    performTransaction2.call(bankAccount2, -89);
    console.log(bankAccount2.balance);
}());