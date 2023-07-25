// write your code here
const input = require('sync-input');

function displayGifts() {
    console.log("Here's the list of gifts:\n");
    gifts.forEach(gift => {
        console.log(`${gift.id}- ${gift.name}, Cost: ${gift.price} tickets`);
    });
}

function buyGift() {
    if (gifts.length > 0) {
        console.log('Enter the number of the gift you want to get:');
    } else{
        console.log("Wow! There are no gifts to buy.\n");
        return;
    }
    const id = Number(input());

        if (isNaN(id)) {
        console.log('Please enter a valid number!\n');
        return;
    }
    const chosenGiftIndex = gifts.findIndex(
        gift => gift.id === id
    );
    const chosenGift = gifts[chosenGiftIndex];
    if (typeof chosenGift === 'undefined') {
        console.log('There is no gift with that number!\n')
        return;
    }
    if (tickets < chosenGift.price){
        console.log('You don\'t have enough tickets to buy this gift.\n')
        return;
    }
    console.log(`Here you go, one ${chosenGift.name}!`);
    tickets -= chosenGift.price;
    gifts.splice(chosenGiftIndex, 1);
    console.log(`Total tickets: ${tickets}`);
}

function addTickets() {
    console.log('Enter the ticket amount:');
    const ticketsToAdd = Number(input());
    if (isNaN(ticketsToAdd)) {
        console.log('Please enter a valid number between 0 and 1000.');
        return;
    }
    if(Number.isNaN(ticketsToAdd) || ticketsToAdd < 0 || ticketsToAdd > 1000){
        console.log("Please enter a valid number between 0 and 1000.");
        console.log();
        return;
    }
    tickets += ticketsToAdd;
    displayTickets();
}

function displayTickets() {
    console.log(`Total tickets: ${tickets}`);
}

let tickets = 0;

const names = [
    'Teddy Bear',
    'Big Red Ball',
    'Huge Bear',
    'Candy',
    'Stuffed Tiger',
    'Stuffed Dragon',
    'Skateboard',
    'Toy Car',
    'Basketball',
    'Scary Mask'
];

const prices = [10, 5, 50, 8, 15, 30, 100, 25, 20, 75];


const gifts = names.map((name, index) => {
    return { name: name, price: prices[index], id: index + 1 };
});

console.log('WELCOME TO THE CARNIVAL GIFT SHOP!');
console.log('Hello friend! Thank you for visiting the carnival!');
displayGifts(gifts);
let choice = '5';
do {
    console.log('What do you want to do?');
    console.log('1-Buy a gift 2-Add tickets 3-Check tickets 4-Show gifts 5-Exit the shop');
    choice = input();
    switch (choice) {
        case '1':
            buyGift();
            if(gifts.length === 0){
                console.log("Wow! There are no gifts to buy.\n");
                break;
            }
            break;
        case '2':
            addTickets();
            break;
        case '3':
            displayTickets();
            break;
        case '4':
            displayGifts();
            if(gifts.length === 0){
                console.log("Wow! There are no gifts to buy.\n");
                break
            }
            break;
        case '5':
            break;
        default:
            console.log('Please enter a valid number!\n');
    }
} while (choice !== '5');
console.log('Have a nice day!');
