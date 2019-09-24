
// Card object used to represnt a card and its opetations 

class card {

    constructor(isFlipped, isMatched, DOM){
        this.flipped = isFlipped;
        this.matched = isMatched;
        this.dom = DOM;
    }
    flip(){
        if(openedCard == null || openedCard != this)
            incrementMoves();
        if(!this.flipped){
            this.flipped = true;
            this.dom.className = "card show open";
            if(openedCard == null){
                openedCard = this;
            } else {
                this.match(this);
            }
        }
    }
    match(card){
        if(card.dom.children[0].className == openedCard.dom.children[0].className){
            card.matched = true;
            card.dom.className = "card match";
            openedCard.matched = true;
            openedCard.dom.className = "card match";
            openedCard = null;
            matchedPairs++;
            if (matchedPairs == 8) 
                win();
        } else {
            setTimeout(function(){
                card.flipped = false;
                card.dom.className = "card";
                openedCard.flipped = false;
                openedCard.dom.className = "card";
                openedCard = null;                
            }, 500);
        }

    }
    reset(){
        this.flipped = false;
        this.matched = false;
        this.dom.className = "card";
    }
    
    
}

// global variables
let deck = [];
let deckDOM = null;
let openedCard = null;
let starCount = 5;
let moves = time = matchedPairs = 0;
let timer;
let winMsg = document.getElementsByClassName('win')[0];


// setting listeners to handle clicking on new game
const resetBtns = document.getElementsByClassName('restart');
for (let i = 0; i < resetBtns.length; i++) {
    resetBtns[i].addEventListener('click', newGame);    
}

// start tha game one page loaded
createDeck();
newGame();

// creating a deck and card objects out of html
function createDeck(){
    getDOM();
    for (let i = 0; i < 16; i++) {
        const c = new card(false, false, deckDOM[i]);
        deckDOM[i].addEventListener('click', listener);
        deck.push(c);
    }

}

// handle creating new game instance
function newGame() {
    
    winMsg.style.display = "none";
    time = matchedPairs = 0;
    timer = setInterval(tick, 1000);
    resetMoves(); 

    for (const card of deck) {
        card.reset();
    }

    shuffle(deckDOM);

    const parent = document.getElementsByClassName('deck')[0];
    for (const card of deckDOM) {
        parent.removeChild(card);
    }
    for (const card of deckDOM) {
        parent.appendChild(card);
    }
    
}

// win action method called win the player win to display the winning message
function win() {
    winMsg.style.display = "block";

    clearInterval(timer);
    document.getElementsByClassName('r-time')[0].textContent = formatTime(time);
    document.getElementsByClassName('r-moves')[0].textContent = moves;
    let span = document.getElementsByClassName('star-holder')[0];
    span.innerHTML = "";
    for (let i = 0; i < starCount; i++) {
        const newStar = document.createElement('I');
        newStar.className = "fa fa-star";
        span.appendChild(newStar);
    }
    
}


// card click listenter
function listener(e){
    id = e.target.id;
    try{
        deck[id].flip();
    } catch (e){

    }
    
}

// handles moves incremtation and star rating
// star rating is based on number of moves
function incrementMoves(){
    document.getElementsByClassName('moves')[0].textContent = ++moves;
    if(moves > 20 && starCount > 1)
        if(moves % 5 == 0){
            const stars = document.getElementsByClassName('stars')[0];
            const star = document.getElementsByTagName('li')[0];
            stars.removeChild(star);
            starCount--;
        }
}

// reset both moves to zero and stars to 5 stars when a new game start
function resetMoves(){
    document.getElementsByClassName('moves')[0].textContent = moves = 0;
    const stars = document.getElementsByClassName('stars')[0];
    const star = document.getElementsByTagName('li')[0];
    
    for (let i = starCount; i < 5; i++) {
        const newStar = document.createElement('LI');
        newStar.innerHTML = star.innerHTML;
        stars.appendChild(newStar);
        starCount++;
    }
}

// getting the html represntation of each card 
function getDOM(){
    const cards = document.getElementsByClassName('card');
    const dom = [];
    for (const card of cards) {
        dom.push(card);
    }
    deckDOM = dom;
}

// time handler
function tick(){
    time++;
    
    document.getElementsByClassName('time')[0].textContent = formatTime(time);
}

// utility function to format the time as string
function formatTime(seconds){
    let timeString = "", mm, ss;
    mm = (seconds - seconds%60) / 60 ;
    ss = seconds%60;
    if(mm < 10)
        timeString += "0";
    timeString += mm;
    timeString += ":";
    if(ss <10)
        timeString += "0";
    timeString += ss;
    return timeString;
}

// shuffle the deck of cards
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}