








/*

let burger1 = new  menuIteams('Halloumiburgare', '645 kcal',  'Halloumi, briochebröd och majonnäs',
    'gluten', '60kr', '/img/burger1.jpg');
let burger2 = new menuIteams('Halloumiburgaren2.0', '700 kcal',  'Umamidressing, halloumi, briochebröd',
    'gluten, laktos', '70kr', '/img/burger2.jpg');
let burger3 = new menuIteams('Halloumiburgaren3.0', '800 kcal',  'halloumi, lökringar, majonnäs',
    'gluten, laktos', '80kr', '/img/burger3.jpg');
let burger4 = new menuIteams('Vegburgare', '670 kcal',  'vegoburgare, majonnäs, sötpotatisbröd',
    'gluten, laktos', '85kr', '/img/burger4.jpg');
let burger5 = new menuIteams('Veganburgare', '720 kcal',  'veganburgare, vegan-majonnäs, sötpotatisbröd', 'gluten', '80kr', '/img/burger5.jpg');





 */



const vm2 = new Vue({
    el: '#kontaktinfo',
    data: {
        namn: '',
        mail: '',
        street: '',
        hnumber: '',
        betalingsmetod: '',
        man: '',
        kvinna: '',
        annat:  '',
        anonymt: '',

    },
    methods: {

        markDone: function (namn, mail, betalingsmetod, man, kvinna, annat, anonymt) {
            let myElement = document.getElementById("order");
            document.getElementById("order").innerHTML = "";
            let namnid = document.createElement('p');
            let mailid = document.createElement("p");
            let checkedid = document.createElement("p");
            let manid = document.createElement("p");
            let kvinnaid = document.createElement("p");
            let annatid = document.createElement("p");
            let anonymtid = document.createElement("p");
            namnid.appendChild(document.createTextNode(namn));
            mailid.appendChild(document.createTextNode(mail));
            streetid.appendChild(document.createTextNode(street));
            hnumberid.appendChild(document.createTextNode(hnumber));
            checkedid.appendChild(document.createTextNode(betalingsmetod));
            myElement.appendChild(namnid);
            myElement.appendChild(mailid);
            myElement.appendChild(checkedid);
            if (man) {
                manid.appendChild(document.createTextNode(man));
                myElement.appendChild(manid);
            }
            if (kvinna) {
                kvinnaid.appendChild(document.createTextNode(kvinna));
                myElement.appendChild(kvinnaid);
            }
            if (annat) {
                annatid.appendChild(document.createTextNode(annat));
                myElement.appendChild(annatid);
            }
            if (anonymt) {
                anonymtid.appendChild(document.createTextNode(anonymt));
                myElement.appendChild(anonymtid);
            }
            let burgers = vm.getBurgers();
            for(burg in burgers){
                let burgerstuff = document.createElement("p");
                burgerstuff.appendChild(document.createTextNode(burgers[burg]))
                myElement.appendChild(burgerstuff);


            }

        }}

});



    const vm = new Vue({
        el: '#burgare',
        data: {
            array: food,
            burgers: []
    },
    methods:{

        getBurgers: function() {

            return this.burgers;
        }

    }

    })

/*

function menuIteams(n, k, i, a, p, pth){

    this.namn = n;
    this.cal = k;
    this.ingredienser = i;
    this.allergier = a;
    this.price = p;
    this.image =  pth;
    this.iteam = function(){

        return this.namn  + ' ' + this.cal;

    };

}

 */

'use strict';
const socket = io();

/* eslint-disable-next-line no-unused-vars */
const vm1 = new Vue({
    el: '#dots',
    data: {
        orders: {},
    },
    created: function() {
        /* When the page is loaded, get the current orders stored on the server.
         * (the server's code is in app.js) */
        socket.on('initialize', function(data) {
            this.orders = data.orders;
        }.bind(this));

        /* Whenever an addOrder is emitted by a client (every open map.html is
         * a client), the server responds with a currentQueue message (this is
         * defined in app.js). The message's data payload is the entire updated
         * order object. Here we define what the client should do with it.
         * Spoiler: We replace the current local order object with the new one. */
        socket.on('currentQueue', function(data) {
            this.orders = data.orders;
        }.bind(this));
    },
    methods: {
        getNext: function() {
            /* This function returns the next available key (order number) in
             * the orders object, it works under the assumptions that all keys
             * are integers. */
            let lastOrder = Object.keys(this.orders).reduce(function(last, next) {
                return Math.max(last, next);
            }, 0);
            return lastOrder + 1;
        },
        addOrder: function(event) {
            /* When you click in the map, a click event object is sent as parameter
             * to the function designated in v-on:click (i.e. this one).
             * The click event object contains among other things different
             * coordinates that we need when calculating where in the map the click
             * actually happened. */
            let offset = {
                x: event.currentTarget.getBoundingClientRect().left,
                y: event.currentTarget.getBoundingClientRect().top,
            };
            socket.emit('addOrder', {
                orderId: this.getNext(),
                details: {
                    x: event.clientX - 10 - offset.x,
                    y: event.clientY - 10 - offset.y,
                },
                orderItems: ['Beans', 'Curry'],
            });
        },
    },
});
