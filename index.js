let incrementals = 0;
let avaliableCash = 0;

// Business
let unsoldIncrementals = 0;
let incrementalCost = 30;
let sellChance = 1;
let sellSpeedMulti = 1;

// Manufacturing
let avaliableParts = 1000;
let partsCost = 14;
let partMakeSpeedMulti = 1;

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const to2DP = (number) => {
    return (Math.round(number * 100) / 100).toFixed(2);
}


setInterval(() => sellIncremental(), sellInterval());

generatePartPrice();
setInterval(() => generatePartPrice(), randomNumber(1000, 10000));

function updateIncrementals() {
    if (avaliableParts > 0) {
        avaliableParts--;
        incrementals++;
        unsoldIncrementals++;
    }
    document.getElementById("incrementals").textContent = incrementals;
    document.getElementById("unsoldAmount").textContent = unsoldIncrementals;
    document.getElementById("avaliableParts").textContent = avaliableParts;
}


function sellIncremental() {    
    if (unsoldIncrementals > 0) {
        let toSell = Math.min(unsoldIncrementals, 10)
        unsoldIncrementals -= toSell;
        avaliableCash += incrementalCost * toSell;
        document.getElementById("unsoldAmount").textContent = unsoldIncrementals;
        document.getElementById("cash").textContent = avaliableCash / 100;
        document.getElementById("avgCashPerSec").textContent = strip(((incrementalCost * toSell) / 100) / (sellInterval() / 1000));
        document.getElementById("amountSoldPerSec").textContent = Math.floor(toSell / (sellInterval() / 1000))
    } else {
        document.getElementById("avgCashPerSec").textContent = to2DP(0);
    }

}

function buyParts() {
    if (avaliableCash >= partsCost) {
        avaliableParts += 1000;
        avaliableCash -= partsCost;
        console.log("worked");

        document.getElementById("avaliableParts").textContent = avaliableParts;
        document.getElementById("cash").textContent = avaliableCash / 100;
    }
}

function generatePartPrice() {
    partsCost = randomNumber(10, 30) * 100;
    document.getElementById("partsCost").textContent = partsCost / 100;
}


function strip(number) {
    return (parseFloat(number).toPrecision(2));
}

function sellInterval() {
    return strip(1000 / sellChance);
}