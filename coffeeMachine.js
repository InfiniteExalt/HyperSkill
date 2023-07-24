const input = require('sync-input');

let cm = {'water': 400, 'milk': 540, 'beans': 120, 'cups': 9, 'sum': 550};
let kinds = [{'water': 250, 'milk': 0, 'beans': 16, 'cost': 4},
    {'water': 350, 'milk': 75, 'beans': 20, 'cost': 7},
    {'water': 200, 'milk': 100, 'beans': 12, 'cost': 6}];

function state() {
    console.log(`\nThe coffee machine has:
${cm.water} ml of water
${cm.milk} ml of milk
${cm.beans} g of coffee beans
${cm.cups} disposable cups
$${cm.sum} of money`);
}

function buy() {
    let kind = input("\nWhat do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino:\n");
    if (kind != "back") {
        kind -= 1;
        if (cm.water < kinds[kind].water) {
            console.log("Sorry, not enough water!");
        } else if (cm.milk < kinds[kind].milk) {
            console.log("Sorry, not enough milk!");
        } else if (cm.beans < kinds[kind].beans) {
            console.log("Sorry, not enough coffee beans!");
        } else if (cm.cups < kinds[kind].cups) {
            console.log("Sorry, not enough cups!");
        } else {
            cm.water -= kinds[kind].water;
            cm.milk -= kinds[kind].milk;
            cm.beans -= kinds[kind].beans;
            cm.sum += kinds[kind].cost;
            cm.cups -= 1;
        }
    }
}

function fill() {
    cm.water += parseInt(input("Write how many ml of water you want to add:\n"));
    cm.milk += parseInt(input("Write how many ml of milk you want to add:\n"));
    cm.beans += parseInt(input("Write how many grams of coffee beans you want to add:\n"));
    cm.cups += parseInt(input("Write how many disposable coffee cups you want to add:\n"));
}

function take() {
    console.log(`I gave you ${cm.sum}\n`);
    cm.sum = 0;
}

while(true) {
    let cmd = input(`\nWrite action (buy, fill, take, remaining):\n`);
    if (cmd === 'buy') {
        buy();
    }
    if (cmd === 'fill') {
        fill();
    }
    if (cmd === 'take') {
        take();
    }
    if (cmd === "remaining") {
        state();
    }
    if (cmd === "exit") {
        break;
    }
}

