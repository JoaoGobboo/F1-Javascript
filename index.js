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
        let raceFinished = false;

        cars.forEach(function(car) {
            const currentPositionX = parseInt(car.style.transform.match(/-?\d+/g)[0]) || 0;
            const currentPositionY = parseInt(car.style.transform.match(/-?\d+/g)[1]) || 0;
            const newPositionX = currentPositionX + Math.floor(Math.random() * 10);

            if (newPositionX >= raceTrackWidth) {
                raceFinished = true;
            }

            if (raceFinished) {
                clearInterval(raceInterval);

                const winningDriver = Array.from(cars).indexOf(car) + 1;

                if (winningDriver === selectedDriver) {
                    balance += betAmount * 2;
                    document.getElementById("result").innerText = "You won! Congratulations!";
                } else {
                    document.getElementById("result").innerText = "You lost! Better luck next time!";
                }

                document.getElementById("balance").innerText = balance;
                raceInProgress = false;

                resetCarPositions();
            } else {
                car.style.transform = "translate(" + newPositionX + "px, " + currentPositionY + "px)";
            }
        });
    }, 50);
}

function resetCarPositions() {
    const cars = document.querySelectorAll(".car");
    const initialPositionX = 20; // Posição X inicial
    const offsetY = 20; // Diferença vertical entre os carros

    cars.forEach(function(car, index) {
        const newPositionY = index * offsetY; // Incrementando a posição Y para posicionar abaixo do carro anterior
        car.style.transform = "translate(" + initialPositionX + "px, " + newPositionY + "px)"; // Definindo a posição transform
    });
}

window.onload = function() {
    resetCarPositions();
};