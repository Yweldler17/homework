(function () {
    /*global $ */
    'use strict';

    function Vehicle(colorChoice) {
        this.color = colorChoice;
        this.speed = 0;
    }

    Vehicle.prototype.go = function (speed) {
        this.speed = speed;
        console.log(`This vehicle is now moving at ${this.speed} MPH`);
        moving = setInterval(moveVehicle, 750 / this.speed);
    };

    Vehicle.prototype.print = function () {
        console.log(`This vehicle is ${this.color} and is traveling at ${this.speed} MPH`);
    };

    function Plane(colorChoice) {
        this.color = colorChoice;
        this.speed = 0;
    }

    Plane.prototype = Object.create(Vehicle.prototype);
    Plane.prototype.go = function (speed) {
        this.speed = speed;
        console.log(`This vehicle is now flying at ${this.speed} MPH`);
        moving = setInterval(moveVehicle, 750 / this.speed);
    };

    // const myCar = new Vehicle('Blue');
    // console.log(myCar);
    // myCar.print();
    // myCar.go(100);
    // console.log(myCar);

    // const myPlane = new Plane('Orange');
    // console.log(myPlane);
    // myPlane.go(100);
    // myPlane.print();
    // myCar.print();
    // console.log(myPlane);
    // console.log(myCar);

    /////////////////////////////
    //Just for fun...

    Vehicle.prototype.drawElement = function () {
        imageBox.append(carImage);
        carImage.css({ fill: this.color });
    };

    Plane.prototype.drawElement = function () {
        imageBox.append(planeImage);
        planeImage.css({ fill: this.color });
    };

    const imageBox = $('#imageBox');
    const createButton = $('#create');
    const colorElem = $("#color");
    const goButton = $('#goButton');
    const speedElem = $('#speed');
    const vehicleSelected = $('#vehicleSelect');
    let newCar;
    let newPlane;
    let vehicleType;
    let moving;
    let currentSpeed;
    let vehicleCreated = false;


    function moveVehicle() {
        if (vehicleType === 'plane') {
            let currentHeight = parseInt(imageBox.css('top'), 10) - (0.001);
            imageBox.css({ top: `${currentHeight}px` });
        }
        let currentSpot = parseInt(imageBox.css('left'), 10);
        if (currentSpot > 3000) {
            stopMoving();
            carImage.remove();
            planeImage.remove();
        }
        currentSpot = currentSpot + 2;
        imageBox.css({ left: `${currentSpot}px` });
    }

    function stopMoving() {
        clearInterval(moving);
        vehicleCreated = false;
    }

    createButton.click(() => {
        carImage.remove();
        planeImage.remove();
        imageBox.css({ left: `0px` });
        imageBox.css({ top: `72%` });
        clearInterval(moving);
        vehicleType = vehicleSelected.find(':selected').val();
        if (vehicleType === 'car') {
            newCar = new Vehicle(colorElem.val());
            newCar.drawElement();
            vehicleCreated = true;
            console.log(newCar);
        } else {
            newPlane = new Plane(colorElem.val());
            newPlane.drawElement();
            vehicleCreated = true;
            console.log(newPlane);
        }
    });

    goButton.click(() => {
        if (vehicleCreated) {
            if (vehicleType === 'car') {
                currentSpeed = speedElem.val();
                newCar.go(currentSpeed);
                newCar.print();
            } else {
                currentSpeed = speedElem.val();
                newPlane.go(currentSpeed);
                newPlane.print();
            }
        }
    });

    const carImage = $(`<svg width="280pt" version="1.0" viewBox="0 0 1280.000000 640.000000" xmlns="http://www.w3.org/2000/svg">
    <metadata>Created by potrace 1.15, written by Peter Selinger 2001-2017</metadata>
    <g id="carPic" transform="translate(0 640) scale(.1 -.1)">
        <path d="m3525 5341c-72-18-79-28-90-121-4-30-11-62-16-71-4-9-97-51-206-94-774-304-1348-540-1603-661-163-77-222-91-421-104-85-5-170-14-189-20-101-32-362-58-620-63l-115-2-47-80c-47-78-47-80-29-100 34-36 35-77 5-177-30-99-34-178-19-370 5-67 4-88-6-88-29 0-83-56-110-114-50-106-74-343-48-467 13-58 13-62 3-159-5-54 16-238 28-244 2-1 29-20 61-41 73-49 123-103 132-143 17-79 167-155 355-181 104-15 969-97 1087-104l32-2 5 160c7 230 50 394 146 559 281 479 917 673 1405 429 316-159 530-424 598-742 22-106 29-365 13-519l-8-82h3002c2855 0 3002 1 2995 18-33 87-56 325-45 461 28 320 177 567 459 759 399 273 847 282 1243 24 239-157 397-392 460-687 18-84 15-341-5-430-8-38-14-71-12-73 7-8 386 20 478 34 180 28 253 65 304 152 24 41 28 57 28 127-1 44-9 117-20 163-18 79-18 88-2 190 31 199 40 306 41 497 1 176-1 195-23 260-46 135-103 190-283 274-222 104-633 220-1168 330-523 108-1524 210-2054 211h-229l-236 139c-813 477-1593 884-1852 966-498 157-1598 195-2892 100l-188-14-47 30c-92 58-223 89-297 70zm1912-311c13-45 58-305 88-515 33-226 74-539 71-542-7-7-1672 40-2054 58-357 16-464 56-573 215-62 91-87 225-59 326 12 40 56 74 192 148 369 198 799 289 1618 340 246 15 290 16 510 16l194-1 13-45zm649 10c383-36 717-86 934-139 210-52 451-163 720-332 141-88 379-259 380-271 0-5-14-8-32-8-48 0-114-37-140-78-24-39-30-113-15-189l9-43h-904-904l-176 540-175 540h47c25 0 141-9 256-20z" />
        <path d="m2617 3125c-431-82-774-440-838-875-17-117-7-292 24-410 113-436 497-751 947-777 507-29 959 313 1076 813 28 117 26 348-4 467-94 378-383 670-760 768-105 27-336 34-445 14zm378-310c84-21 209-85 280-142 116-94 210-242 251-393 23-87 24-260 0-355-58-237-242-439-473-519-531-186-1074 277-969 828 30 152 94 274 206 386 111 110 237 178 385 206 84 16 235 11 320-11z" />
        <path d="m2918 2568c2-90 7-167 12-172 17-17 108 58 201 166l51 57-48 31c-52 33-131 65-185 75l-34 6 3-163z" />
        <path d="m2591 2700c-62-22-167-82-164-94 3-13 237-216 249-216 7 0 15 7 18 16 8 20 8 127-1 232-7 95-8 96-102 62z" />
        <path d="m3209 2355c-57-64-105-123-107-131-6-25 46-35 157-29 58 3 121 8 139 11 33 5 34 6 27 42-7 44-64 167-92 201l-19 24-105-118z" />
        <path d="m2260 2409c-31-44-68-133-77-186l-6-33h155c165 0 201 9 181 44-13 24-204 216-214 216-5 0-22-18-39-41z" />
        <path d="m2786 2354c-36-35 0-87 44-64 26 14 26 56 1 70-25 13-27 13-45-6z" />
        <path d="m2751 2186c-57-32-68-111-22-157 43-42 101-43 143-1s41 100-1 143c-33 32-78 38-120 15z" />
        <path d="m2560 2136c-19-23-8-61 18-64 44-7 67 32 36 62-19 20-38 20-54 2z" />
        <path d="m3002 2124c-27-19-28-36-3-58 25-23 61-6 61 29 0 33-30 49-58 29z" />
        <path d="m2245 1993c-77-6-76-5-59-65 16-55 61-146 92-186l18-23 103 122c57 67 104 129 105 138 1 14-14 16-104 17-58 0-127-1-155-3z" />
        <path d="m3165 1981c-44-4-61-10-63-22-3-16 210-229 228-229 22 0 86 141 105 228l7 32-109-2c-59-1-135-4-168-7z" />
        <path d="m2776 1914c-19-18-19-20-6-45 6-11 21-19 35-19 20 0 45 24 45 44 0 10-32 36-45 36-7 0-21-7-29-16z" />
        <path d="m2589 1743c-86-90-139-151-139-162 0-25 179-101 236-101h27l-7 143c-9 166-13 187-35 187-9 0-46-30-82-67z" />
        <path d="m2936 1801c-6-10-24-168-29-258-3-60-2-63 19-63 79 0 262 68 248 92-5 7-53 64-108 126-93 105-117 124-130 103z" />
        <path d="m10723 3125c-318-58-597-266-743-555-223-441-98-996 289-1288 112-84 188-125 311-166 274-91 545-70 802 61 552 282 735 983 392 1500-225 339-651 521-1051 448zm385-315c348-98 579-443 532-796-67-508-596-796-1055-574-239 116-396 352-412 620-20 335 192 640 516 745 122 40 289 42 419 5z" />
        <path d="m11017 2568c3-90 9-167 14-172 13-14 53 18 155 122l95 97-23 18c-50 40-189 97-235 97-10 0-11-33-6-162z" />
        <path d="m10705 2706c-50-16-133-58-163-82l-23-19 121-107c67-60 128-108 135-108 23 0 27 39 20 186-8 162-4 157-90 130z" />
        <path d="m11307 2354c-59-65-107-126-107-136 0-11 11-18 38-22 44-7 278 7 289 17 15 16-51 183-94 236l-19 24-107-119z" />
        <path d="m10362 2413c-39-62-70-134-78-184l-7-39h152c86 0 161 5 172 10 17 10 18 13 5 38-8 15-59 71-114 125l-99 99-31-49z" />
        <path d="m10888 2359c-24-14-23-56 2-69 44-23 80 29 44 64-18 19-23 19-46 5z" />
        <path d="m10851 2187c-49-29-66-101-35-146 9-13 32-29 50-37 29-12 39-12 68 0 99 41 85 180-19 192-24 3-50-1-64-9z" />
        <path d="m10660 2136c-19-23-8-61 18-64 44-7 67 32 36 62-19 20-38 20-54 2z" />
        <path d="m11096 2124c-9-8-16-22-16-29 0-13 26-45 36-45 20 0 44 25 44 45 0 14-8 29-19 35-25 13-27 13-45-6z" />
        <path d="m10335 1991c-60-6-60-6-57-36 9-69 104-248 122-229 57 61 210 250 207 258-4 12-176 17-272 7z" />
        <path d="m11267 1983c-68-5-79-19-47-60 23-31 200-193 210-193 3 0 20 24 37 53 29 48 52 111 67 180l6 27-107-2c-60-1-134-3-166-5z" />
        <path d="m10870 1910c-16-31 4-62 38-58 21 2 28 9 30 32 5 45-47 65-68 26z" />
        <path d="m10651 1703c-56-59-101-113-101-120 0-28 172-103 237-103h26l-7 123c-10 179-15 207-36 207-10 0-63-48-119-107z" />
        <path d="m11035 1801c-7-12-23-144-29-243-4-77-4-78 19-78 45 0 130 22 193 51l64 29-19 23c-65 82-198 227-209 227-7 0-15-4-19-9z" />
    </g>
</svg>`);

    const planeImage = $(`<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="280pt" viewBox="0 0 1280.000000 640.000000"
    preserveAspectRatio="xMidYMid meet">
        <metadata>
             Created by potrace 1.15, written by Peter Selinger 2001-2017
         </metadata>
         <g id="planePic" transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)">
            <path d="M6593 5311 c1 -408 -2 -636 -12 -783 l-14 -207 -61 -5 c-34 -3 -173
             -10 -311 -16 -256 -11 -1908 -85 -3137 -141 l-686 -31 -175 141 c-97 77 -178
                148 -180 158 -3 10 -13 77 -23 150 -9 72 -20 137 -24 143 -7 11 -267 41 -282
                33 -5 -2 -8 -17 -8 -34 0 -16 -2 -29 -4 -29 -3 0 -245 193 -539 428 -293 236
                -538 432 -544 435 -10 6 -483 -39 -490 -47 -2 -2 199 -340 446 -752 l449 -749
                -106 -12 c-116 -12 -231 -44 -258 -70 -13 -14 -16 -32 -12 -100 6 -113 33
                -152 141 -208 l78 -39 -64 -41 c-36 -22 -225 -141 -421 -265 -201 -127 -349
                -227 -340 -228 9 -2 116 6 238 18 l221 23 275 107 c151 59 349 137 439 174
                l164 65 86 -24 c153 -44 1045 -246 1302 -295 73 -14 400 -38 819 -60 1485 -77
                1710 -91 1850 -115 47 -8 115 -15 153 -15 37 0 67 -3 67 -8 0 -16 -304 -395
                -368 -458 -16 -16 -574 -438 -1240 -939 l-1211 -910 32 -33 c84 -87 222 -76
                426 34 364 197 1699 962 2336 1338 42 25 86 46 98 46 12 0 116 -18 232 -40
                484 -91 760 -120 1163 -120 l192 0 38 39 c96 99 131 386 63 518 -31 61 -91
                120 -136 132 -94 26 -309 11 -632 -44 -83 -14 -157 -25 -164 -25 -8 0 139 102
                326 228 l340 227 155 6 c115 5 196 14 315 38 187 38 369 82 475 116 41 13 100
                26 130 29 147 15 742 38 1595 61 1349 36 1639 45 1750 55 238 22 877 193 1080
                290 83 39 149 92 165 130 16 38 1 159 -26 216 -31 66 -119 123 -302 198 -99
                40 -158 73 -269 150 -158 108 -291 175 -408 205 -226 60 -901 114 -1225 99
                -85 -4 -663 -30 -1285 -58 -621 -28 -1258 -57 -1415 -64 -157 -7 -286 -13
                -286 -12 -2 1 -246 644 -431 1136 -64 168 -117 306 -118 307 -1 2 -91 19 -201
                38 -109 19 -207 37 -216 39 -16 4 -17 -34 -15 -573z m674 -2816 c45 -19 104
                -88 117 -135 4 -15 -2 -9 -15 15 -28 53 -68 95 -91 95 -27 0 -67 -29 -82 -59
                -35 -66 -48 -318 -22 -405 8 -26 31 -67 51 -91 20 -25 32 -45 27 -45 -6 0 -13
                6 -15 13 -3 7 -6 5 -6 -5 -2 -50 84 9 121 82 31 62 38 54 9 -12 -10 -24 -33
                -56 -51 -73 l-32 -30 -196 3 c-226 2 -451 16 -632 36 -138 16 -720 118 -720
                126 1 3 114 70 252 150 138 80 292 171 342 204 99 64 89 61 381 107 308 49
                484 57 562 24z m130 -197 c-3 -7 -5 -2 -5 12 0 14 2 19 5 13 2 -7 2 -19 0 -25z
                m10 -151 c-2 -23 -3 -1 -3 48 0 50 1 68 3 42 2 -26 2 -67 0 -90z m-10 -79 c-3
                -7 -5 -2 -5 12 0 14 2 19 5 13 2 -7 2 -19 0 -25z m-10 -40 c-3 -8 -6 -5 -6 6
                -1 11 2 17 5 13 3 -3 4 -12 1 -19z"/>
                <path d="M6875 2485 c-55 -8 -180 -27 -279 -44 -177 -30 -179 -31 -255 -80
                -42 -27 -186 -113 -321 -192 -135 -78 -249 -145 -253 -149 -19 -16 534 -110
                801 -135 163 -16 569 -33 625 -27 23 3 27 7 21 24 -4 15 -3 18 6 13 9 -5 11
                -4 6 4 -4 6 -11 9 -15 7 -17 -11 -64 109 -67 174 -8 137 37 400 68 400 5 0 4
                -9 -2 -21 -11 -20 -10 -20 20 2 27 21 29 24 13 31 -29 11 -260 7 -368 -7z
                m309 -7 c-5 -7 -20 -31 -35 -53 -14 -22 -40 -75 -56 -118 -25 -65 -29 -86 -22
                -120 4 -23 8 -64 9 -90 0 -41 -5 -53 -28 -75 -16 -15 -55 -36 -88 -47 -101
                -34 -433 -26 -972 26 -62 5 -132 14 -155 19 l-42 9 50 -4 c28 -3 145 -14 260
                -24 492 -47 765 -50 866 -11 97 36 111 66 90 192 -7 41 -3 59 25 132 32 83 53
                124 82 159 17 20 27 23 16 5z"/>
        </g>
   </svg>`);

}());


