window.yWeldUtils = window.yWeldUtils || {};
window.yWeldUtils.messageBox = (function () {
    'use strict';

    const offset = 30;
    let leftOffset = -150;
    let topOffset = -75;
    const width = 300;
    const height = 150;
    let nextZindex = 1;

    function removeBox(msgBox) {
        document.body.removeChild(msgBox);
    }

    function show(msg, buttonList, callBack) {
        const messageBox = document.createElement('div');
        const p = document.createElement('p');
        const buttons = document.createElement('div');
        const okButton = document.createElement('button');


        if (buttonList && buttonList.length > 0) {
            for (let i = 0; i < buttonList.length; i++) {
                const myButton = document.createElement('button');
                myButton.id = 'button' + i;
                myButton.innerHTML = buttonList[i];
                buttons.appendChild(myButton);

                myButton.addEventListener('click', () => {
                    removeBox(messageBox);
                    callBack(buttonList[i]);
                });
            }
        } else {
            okButton.innerHTML = 'OK';
            buttons.appendChild(okButton);
        }
        p.innerHTML = msg;
        messageBox.appendChild(p);
        messageBox.appendChild(buttons);
        document.body.appendChild(messageBox);

        messageBox.style.backgroundColor = 'lightblue';
        messageBox.style.padding = '1em';
        messageBox.style.paddingBottom = '38px';
        messageBox.style.boxSizing = 'border-box';
        messageBox.style.width = `${width}px`;
        messageBox.style.height = `${height}px`;
        messageBox.style.position = 'absolute';
        messageBox.style.top = '50%';
        messageBox.style.left = '50%';
        messageBox.style.marginLeft = `${leftOffset}px`;
        messageBox.style.marginTop = `${topOffset}px`;
        messageBox.style.border = '1px solid black';
        messageBox.style.zIndex = nextZindex++;

        p.style.overflow = 'auto';
        p.style.height = '100%';
        p.style.display = 'inline-block';
        p.style.margin = 'auto';

        buttons.style.position = 'absolute';
        buttons.style.bottom = '8px';
        buttons.style.left = 0;
        buttons.style.width = '100%';
        buttons.style.textAlign = 'center';

        leftOffset += offset;
        topOffset += offset;

        messageBox.addEventListener('click', () => {
            messageBox.style.zIndex = nextZindex++;
        });

        if (parseFloat(getComputedStyle(messageBox).left) + leftOffset + width > window.innerWidth) {
            leftOffset -= window.innerWidth - width;
        }

        if (parseFloat(getComputedStyle(messageBox).top) + topOffset + height > window.innerHeight) {
            topOffset -= window.innerHeight - height;
        }

        okButton.addEventListener('click', () => {
            removeBox(messageBox);

        });


    }

    return {
        show: show
    };


}());