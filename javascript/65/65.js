(function () {
    'use strict';

    /*global $ */

    const fileForm = $('#fileForm');
    const fileInput = $('#fileInput');
    const displayFile = $('#fileInfo');
    const submitButton = $('#submit');
    const loadSpinner = $('.loader');
    submitButton.prop('disabled', true);

    fileInput.keyup(function () {
        if (fileInput.val().length > 0) {
            submitButton.prop('disabled', false);
        } else {
            submitButton.prop('disabled', true);
        }
    });

    fileForm.submit(e => {
        e.preventDefault();
        loadSpinner.show();
        setTimeout(() => {
            let loadFile = fileInput.val();
            fetch(loadFile)
                .then(checkError)
                .then(r => displayFile.text(r))
                .catch(error => displayFile.text(error));
            fileInput.val('');
            loadSpinner.hide();
            submitButton.prop('disabled', true);
            displayFile.css('border', '2px solid black');
        }, 2000);
    });

    function checkError(response) {
        if (response.status >= 400) {
            throw Error(response.statusText);
        } else {
            return response.text();
        }
    }

}());