const mainInput = document.querySelector("input");
const mainButton = document.querySelector(".game-settings button");
const timerDiv = document.querySelector(".timer");
let pairs = 0;
let tmpPair = document.querySelector('.tmp-div');
let pairSum = 0;
let numberOfCards;
let min = 0, sec = 0, ms = 0;
let timer = [min, sec, ms];
let togTimer;
let timerShowSpeed = 19; //speed in ms
 
function printTimer()
{
    ms += timerShowSpeed;
    if (ms >= 1000)
    {
        ms = ms % 1000;
        sec += 1;
    }
    if (sec >= 60)
    {
        sec = sec%60;
        min += 1;
    }
    timer = [min, sec, ms];
    if (min>= 1)
    {
        timerDiv.innerHTML = `${timer[0]}:${timer[1]}:${parseInt(timer[2]/10)}`;
    }
    else
    {
        timerDiv.innerHTML = `${timer[1]}:${parseInt(timer[2]/10)}`;
    }
}

function toggleTimer(toggle)
{
    if (toggle === 'start')
    {
        togTimer = setInterval(printTimer, timerShowSpeed);
    }
    if (toggle === 'stop')
    {
        if (min === 0)
        {
            document.querySelector('#time-spent').innerHTML= `You nailed it in ${timerDiv.innerHTML.split(':')[0]} mins and ${timerDiv.innerHTML.split(':')[1]} secs`;
        }
        else
        {
            document.querySelector('#time-spent').innerHTML= `You nailed it in ${timerDiv.innerHTML.split(':')[0]} mins ${timerDiv.innerHTML.split(':')[0]} secs and ${timerDiv.innerHTML.split(':')[1]} milisecs`;
        }
        clearInterval(togTimer);
        min = 0, sec = 0, ms = 0;
        timerDiv.innerHTML = '';
    }
}

function endGame()
{
    document.querySelector('#end-game').style.display='block';
}

function resetGame()
{
    document.querySelector('#new-game').style.display = 'block';
    document.querySelector('#in-game').style.display = 'none';
    document.querySelector('.background').style.cssText = ""
    document.querySelector('#end-game').style.display = 'none';
    pairs = 0;
    tmpPair = document.querySelector('.tmp-div');
    pairSum = 0;
}

function toggleUnclickable()
{
    let element = document.querySelectorAll('.in-game-card')
    for (let i = 0; i < numberOfCards; i++)
    {
        element[i].classList.toggle('unclickable');
    }
}

function checkMatch(element)
{
    if (pairs === 1)
    {
        setTimeout(() => {toggleUnclickable()}, 1000);
    }
    else
    {
        setTimeout(() => {toggleUnclickable()}, 300);
    }

    if (pairs === 1 && tmpPair !== null && tmpPair.className.split(" ")[1] === element.className.split(" ")[1])
    {
        if (pairs === 1)
        {
            pairs = 0;
        }
        element.classList.add('found-pair');
        tmpPair.classList.add('found-pair');
        return '+1pair';
    }
    if (pairs === 0)
    {
        element.classList.add('found-pair');
        tmpPair = element;
        pairs = 1;
    }
    else if (pairs === 1)
    {
        tmpPair.classList.remove('found-pair');
        pairs = 0;
        setTimeout(() => {element.children[0].classList.toggle('fronty'); element.children[1].classList.toggle('back-image');}, 1000); //Unflip
        setTimeout(() => {tmpPair.children[0].classList.toggle('fronty'); tmpPair.children[1].classList.toggle('back-image');}, 1000);

    }
}

function flipCard(element)
{
    element.children[0].classList.toggle('fronty');
    element.children[1].classList.toggle('back-image');
    return checkMatch(element);
}

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
        cards[i] = [`<div onclick="gameTick(this)" class="in-game-card card${i/2} pair1"><div class='front-image face'><img src='arquivos/front.png' alt=''></div> <div class='back-image face'><img src='arquivos/gif${i/2}.gif' alt=''></div></div>`];
        cards[i + 1] = [`<div onclick="gameTick(this)" class="in-game-card card${i/2} pair2"><div class='front-image face'><img src='arquivos/front.png' alt=''></div> <div class='back-image face'><img src='arquivos/gif${i/2}.gif' alt=''></div></div>`];
    }
    const shuffledArray = shuffleArray(cards);
    return shuffledArray;
}

function printCards(array)
{
    let bigText = "";
    let gameTable = document.querySelector(".in-game-background main");
    for(let i = 0; i < array.length; i++)
    {
        bigText += array[i];
    }
    gameTable.innerHTML = bigText;
}

function startGame(cardNumber)
{
    console.log("The Game has Started!");
    document.querySelector("#in-game").style.display = 'block';
    let cards = createCards(cardNumber);
    printCards(cards);
    //startTimer();  TO-DO
    setTimeout(()=>{toggleTimer('start');}, 700);
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
        setTimeout(()=>{document.querySelector("#new-game").style.cssText = "display: none;";}, 700);
        document.querySelector(".background").style.cssText = "opacity: 0;"
        numberOfCards = cardNumber;
        return startGame(cardNumber);
    }
    else 
    {
        return helpStartGame();
    }
}


function gameTick(element)
{
    toggleUnclickable();

    if (flipCard(element) === '+1pair')
    {
        pairSum++;
        console.log(pairSum);
    }
    if (pairSum === numberOfCards / 2)
    {
        //endTimer()
        toggleTimer('stop');
        endGame();
    }
}


mainButton.onclick = function(){checkStart()};