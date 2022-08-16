const mainInput = document.querySelector("input");
const mainButton = document.querySelector(".game-settings button");

function startGame(cardNumber)
{
    console.log("O Jogo começou!");
}

function helpStartGame()
{
    let text = document.querySelector(".difficulty");
    text.classList.add('red-alert-animation');
    text.innerHTML = 'Type an even from 4 to 14'
    setTimeout(() => {text.classList.remove('red-alert-animation')}, 1000);
    setTimeout(() => {text.innerHTML = 'TYPE IN THE NUMBER OF CARDS'}, 3000);

}


function checkStart()
{
    let cardNumber = mainInput.value;
    if (cardNumber >= 4 && cardNumber <= 14)
    {
        return startGame(cardNumber);
    }
    else 
    {
        return helpStartGame();
    }
}

mainButton.onclick = function(){checkStart()};