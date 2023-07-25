// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

const CoffeeMachine = {
    isRunning: true,
    moneyAvailable: 550,
    disposableCups: 9,
    qtWater: 400,
    qtMilk: 540,
    qtCoffeeBeans: 120,
    coffeeTypes: [
        {
            name: "Espresso",
            requiredWater: 250,
            requiredCoffeeBeans: 16,
            requiredMilk: 0,
            price: 4
        },
        {
            name: "Latte",
            requiredWater: 350,
            requiredCoffeeBeans: 20,
            requiredMilk: 75,
            price: 7
        },
        {
            name: "Cappuccino",
            requiredWater: 200,
            requiredCoffeeBeans: 12,
            requiredMilk: 100,
            price: 6
        }
    ],
    operations: [
        function buyCoffee() {
            const coffeeType = input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu: ");

            switch (coffeeType) {
                case '1':
                    this.makeCoffee('Espresso');
                    break;
                case '2':
                    this.makeCoffee('Latte');
                    break;
                case '3':
                    this.makeCoffee('Cappuccino');
                    break;
                case 'back':
                    this.init();
                    break;
            }
        },
        function fillCoffee() {
            const waterToAdd = input("Write how many ml of water you want to add: ");
            const milkToAdd = input("Write how many ml of milk you want to add: ");
            const beansToAdd = input("Write how many grams of coffee beans you want to add: ");
            const cupsToAdd = input("Write how many disposable cups you want to add: ");

            this.qtMilk += parseInt(milkToAdd);
            this.qtCoffeeBeans += parseInt(beansToAdd);
            this.qtWater += parseInt(waterToAdd);
            this.disposableCups += parseInt(cupsToAdd);
        },
        function takeMoney() {
            console.log(`I gave you ${this.moneyAvailable}`);
            this.moneyAvailable = 0;
        }
    ],
    setOperation() {
        const operation = input("Write action (buy, fill, take, remaining, exit): ").toLowerCase();
        const [ buyCoffee, fillCoffee, takeMoney ] = this.operations;

        switch (operation) {
            case 'buy':
                buyCoffee.call(this);
                break;
            case 'fill':
                fillCoffee.call(this);
                break;
            case 'take':
                takeMoney.call(this);
                break;
            case 'remaining':
                this.showState();
                break;
            case 'exit':
                this.isRunning = false;
        }
    },
    makeCoffee(coffeeType) {
        const coffee = this.coffeeTypes.find(coffee => coffee.name === coffeeType);

        if (this.qtWater < coffee.requiredWater) {
            console.log("Sorry, not enough water!\n");
            return;
        } else if (this.qtMilk < coffee.requiredMilk) {
            console.log("Sorry, not enough milk!\n");
            return;
        } else if (this.qtCoffeeBeans < coffee.requiredCoffeeBeans) {
            console.log("Sorry, not enough coffee beans!\n");
            return;
        } else if (this.disposableCups < 1) {
            console.log("Sorry, not enough disposable cups!\n");
            return;
        }

        console.log("I have enough resources, making you a coffee!\n");

        if (coffee) {
            this.moneyAvailable += coffee.price;
            this.disposableCups -= 1;
            this.qtCoffeeBeans -= coffee.requiredCoffeeBeans;
            this.qtMilk -= coffee.requiredMilk;
            this.qtWater -= coffee.requiredWater;
        }
    },
    showState() {
        console.log("The coffee machine has:");
        console.log(`${this.qtWater} ml of water`);
        console.log(`${this.qtMilk} ml of milk`);
        console.log(`${this.qtCoffeeBeans} g of coffee beans`);
        console.log(`${this.disposableCups} disposable cups`);
        console.log(`$${this.moneyAvailable} of money\n`);
    },
    init() {
        while (this.isRunning) {
            this.setOperation();
        }
    }
}

CoffeeMachine.init();
