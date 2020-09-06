'use strict';

/*global $ */

const msgDisplay = $('#msgDisplay');
const allowSubmit = $('#allowSubmit');
const submit = $('#submit');
const first = $('#first');
const last = $('#last');
const address = $('#address');
const email = $('#email');
const phone = $('#phone');
const accountInfo = $('#accountInfo');
submit.prop('disabled', true);

allowSubmit.change(function () {
    if (allowSubmit.is(':checked')) {
        submit.prop('disabled', false);
        clearDisplay();
    } else {
        submit.prop('disabled', true);
    }
});

function clearDisplay() {
    msgDisplay.text('');
    accountInfo.text('');
}

function clearForm() {
    first.val('');
    last.val('');
    address.val('');
    email.val('');
    phone.val('');
    allowSubmit.prop('checked', false);
    submit.prop('disabled', true);
}

submit.click(function (e) {
    e.preventDefault();
    let msg = first.val() + " ";
    msg += last.val();
    msgDisplay.text('Hello ' + msg + "! Your account information is below");
    accountInfo.text("Address: " + address.val() + " - Email: " + email.val() + " - Phone:" + phone.val());
    accountInfo.text();
    clearForm();

});