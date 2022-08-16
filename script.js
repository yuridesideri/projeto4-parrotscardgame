const mainInput = document.querySelector("input");
const mainButton = document.querySelector(".game-settings button");

function shuffleArray(array)
{
    let tmp;
    let num;
    for (let i = 0; i < array.length; i++)
    {
        num = Math.floor(Math.random() * array.length);
        tmp = array[i];
        array[i] = array[num];
        array[num] = tmp;
    }
    return array;
}

function createCards(cardNumber)
{
    let cards = new Array(cardNumber);
    for (let i = 0; i < cardNumber; i = i + 2)
    {
        cards[i] = [`<div class='in-game-card front card${i/2}'><img src='arquivos/front.png' alt=''></div>`, `<div class='in-game-card back card${i/2}'><img src='arquivos/gif${i/2}.png' alt=''></div>`];
        cards[i + 1] = [`<div class='in-game-card front card${i/2}'><img src='arquivos/front.png' alt=></div>`, `<div class='in-game-card back card${i/2}'><img src='arquivos/gif${i/2}.png' alt=''></div>`];
    }
    const shuffledArray = shuffleArray(cards);
    return shuffledArray;
}

function startGame(cardNumber)
{
    console.log("O Jogo começou!");
    document.querySelector("#in-game").style.display = 'block';
    let cards = createCards(cardNumber);
    printCards(cards);
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
    if (cardNumber >= 4 && cardNumber <= 14 && cardNumber % 2 == 0)
    {
        document.querySelector("#new-game").style.display = 'none';
        return startGame(cardNumber);
    }
    else 
    {
        return helpStartGame();
    }
}

mainButton.onclick = function(){checkStart()};