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
let moves = 0;


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
    deck[id].flip();
}


function incrementMoves(){
    document.getElementsByClassName('moves')[0].textContent = ++moves;
}
function resetMoves(){
    document.getElementsByClassName('moves')[0].textContent = moves = 0;
}



function restart(){

    //moves = 0;
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

const resetBtn = document.getElementsByClassName('restart')[0];
resetBtn.addEventListener('click', restart);

createDeck();




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
