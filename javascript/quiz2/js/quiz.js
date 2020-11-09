(function () {
    /*global $ */
    'use strict';

    const displayFile = $('#fileInfo');
    const ordersInfo = $('#ordersInfo');
    let orderList = [];


    fetch('quiz.json')
        .then(r => r.json())
        .then((orders) => {
            let orderItems = [];
            orders.forEach(order => {
                order.items.forEach(item => {
                    orderItems.push(new Item(item.item, item.quantity, item.total));
                });
                orderList.push(new Order(order.customer, order.address, orderItems));
                orderItems = [];
            });
            displayOrders(orderList);
        })
        .catch(error => displayFile.text(error));

    class Item {

        constructor(name, quantity, totalPrice) {
            this.name = name;
            this.quantity = quantity;
            this.price = totalPrice / quantity;
            this.totalPrice = totalPrice;
        }
    }

    class Order {

        constructor(customerName, customerAddress, itemList) {
            this.customerName = customerName;
            this.customerAddress = customerAddress;
            this.itemList = itemList;
        }

        get total() {
            let returnVal = 0;
            this.itemList.forEach(item => {
                returnVal += item.totalPrice;
            });
            return returnVal;
        }
    }

    function displayOrders(list) {
        for (let i = 0; i < list.length; i++) {
            $(`<h1>Customer: ${list[i].customerName}</h1>
            <h3>Address: ${list[i].customerAddress}</h3>`).appendTo(ordersInfo);
            ordersInfo.append(getItemList(list[i].itemList));
            ordersInfo.append($(`<h4>Order Total Price: ${list[i].total}</h4>`));
        }
    }


    function getItemList(itemList) {
        let returnVal = $(`<div></div>`);
        itemList.forEach(item => {
            $(`<p> Item: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}</p>`).appendTo(returnVal);
        });
        return returnVal;
    }

}());