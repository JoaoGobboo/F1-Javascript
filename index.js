let balance = 100;
let raceInProgress = false;

function placeBet() {
    if (raceInProgress) {
        alert("Race already in progress!");
        return;
    }

    const betAmount = parseInt(document.getElementById("betAmount").value);
    const selectedDriver = parseInt(document.getElementById("driver").value);

    if (betAmount < 5 || betAmount > balance) {
        alert("Invalid bet amount!");
        return;
    }

    balance -= betAmount;
    document.getElementById("balance").innerText = balance;

    race(selectedDriver, betAmount);
}

function race(selectedDriver, betAmount) {
    raceInProgress = true;

    const cars = document.querySelectorAll(".car");
    const raceTrackWidth = document.getElementById("race-track").offsetWidth;

    const raceInterval = setInterval(function() {
        const newPositionX = Array.from(cars).map(car => {
            const currentPositionX = parseInt(car.style.transform.match(/-?\d+/g)[0]) || 0;
            return currentPositionX + Math.floor(Math.random() * 10);
        });

        if (newPositionX.some(x => x >= raceTrackWidth)) {
            clearInterval(raceInterval);
            handleRaceFinish(selectedDriver, betAmount, cars);
        } else {
            cars.forEach((car, index) => {
                car.style.transform = `translate(${newPositionX[index]}px, ${car.offsetTop}px)`;
            });
        }
    }, 50);
}

function handleRaceFinish(selectedDriver, betAmount, cars) {
    const winningDriver = Array.from(cars).findIndex(car => parseInt(car.style.transform.match(/-?\d+/g)[0]) >= raceTrackWidth) + 1;

    const resultMessage = document.getElementById("result");
    if (winningDriver === selectedDriver) {
        balance += betAmount * 2;
        resultMessage.innerText = "You won! Congratulations!";
    } else {
        resultMessage.innerText = "You lost! Better luck next time!";
    }

    document.getElementById("balance").innerText = balance;
    raceInProgress = false;
    resetCarPositions();
}

function resetCarPositions() {
    const cars = document.querySelectorAll(".car");

    cars.forEach((car, index) => {
        car.style.transform = `translate(20px, ${index * 20}px)`;
    });
}

window.onload = resetCarPositions;