const slotsItems = ["🍒", "🍋", "🥥"];

const depBtn = document.getElementById("dep");
const spinBtn = document.getElementById("spin_btn");


function depchik () {
    const userSumToDep = parseFloat(document.getElementById("dep_value").value);
    const balance = parseFloat(document.getElementById("balanceValue").textContent);

    if (!userSumToDep || isNaN(userSumToDep) || userSumToDep <= 0){
        alert("Enter correct value");
        return
    }
    const newBalance = balance + userSumToDep
    document.getElementById("balanceValue").textContent = newBalance;
    document.getElementById("dep_value").value = 0;

};



function spinGame(){
    const priceSpin = 20;
    const smallWin = 10
    const bigWin = 40
    const balance = parseFloat(document.getElementById("balanceValue").textContent);
    document.querySelector(".your_win").textContent = "";

    if (!balance || balance < priceSpin) {
        alert("Dep before start game")
        return;
    }

    document.getElementById("balanceValue").textContent = balance - priceSpin;

    // Додаємо анімацію обертання
    const slots = document.querySelectorAll(".spin1, .spin2, .spin3");
    slots.forEach(slot => {
        slot.classList.add("spinning");
    });

    // Зупиняємо анімацію через 2 секунди
    setTimeout(() => {
        slots.forEach(slot => {
            slot.classList.remove("spinning");
        });

        const randomItems = getRandomValue();
        
        // Оновлюємо значення слотів
        document.querySelector(".spin1").textContent = randomItems[0];
        document.querySelector(".spin2").textContent = randomItems[1];
        document.querySelector(".spin3").textContent = randomItems[2];

        // Перевіряємо виграш
        if (randomItems[0] === randomItems[1] && randomItems[1] === randomItems[2]) {
            document.getElementById("balanceValue").textContent = (balance - priceSpin) + bigWin;
            document.querySelector(".your_win").innerHTML = `<span class="win-text">Your Big Win: ${bigWin}$</span>`;
            slots.forEach(slot => slot.classList.add("win-animation"));
        } else if (randomItems[0] === randomItems[1] || randomItems[1] === randomItems[2] || randomItems[0] === randomItems[2]) {
            document.getElementById("balanceValue").textContent = (balance - priceSpin) + smallWin;
            document.querySelector(".your_win").innerHTML = `<span class="win-text">Your Win: ${smallWin}$</span>`;
            slots.forEach(slot => slot.classList.add("win-animation"));
        } else {
            document.querySelector(".your_win").innerHTML = `<span class="win-text">LOX</span>`;
            slots.forEach(slot => slot.classList.add("lose-animation"));
        }

        setTimeout(() => {
            slots.forEach(slot => {
                slot.classList.remove("win-animation", "lose-animation");
            });
        }, 500);
    }, 2000);
};


function getRandomValue(){
    const randomArray = [];
    for (let i = 0; i < 3; i++) {
        const randomChoice = slotsItems[Math.floor(Math.random() * slotsItems.length)];
        randomArray.push(randomChoice);
    }
    return randomArray;
};




spinBtn.addEventListener("click", spinGame);
depBtn.addEventListener("click", depchik);

















