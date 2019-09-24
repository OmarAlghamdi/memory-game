/*
 * Create a list that holds all of your cards
 */

class card {

    constructor(no, isFlipped, isMatched, DOM){
        this.id = no;
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


let deck = [];
let deckDOM = null;
let openedCard = null;
let starCount = 5;
let moves = time = matchedPairs = 0;
let timer;
let winMsg = document.getElementsByClassName('win')[0];


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



function tick(){
    time++;
    
    document.getElementsByClassName('time')[0].textContent = formatTime(time);
}

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

function createDeck(){
    getDOM();
    for (let i = 0; i < 16; i++) {
        const c = new card(i, false, false, deckDOM[i]);
        deckDOM[i].addEventListener('click', listener);
        deck.push(c);
    }

}

function listener(e){
    id = e.target.id;
    try{
        deck[id].flip();
    } catch (e){

    }
    
}


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

function getDOM(){
    const cards = document.getElementsByClassName('card');
    const dom = [];
    for (const card of cards) {
        dom.push(card);
    }
    deckDOM = dom;
}





/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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

const resetBtns = document.getElementsByClassName('restart');
for (let i = 0; i < resetBtns.length; i++) {
    resetBtns[i].addEventListener('click', newGame);    
}


createDeck();
newGame();



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
