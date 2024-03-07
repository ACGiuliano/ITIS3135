'use strict';

/**
 * Returns a string of the count and Bet or Hold
 * @param {array} cards - an array of cards
 * @returns {string} - message 
 */
function countCards(cards) {

    let counter = 0;

   for (let card of cards) {
    switch (card) {
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            counter++;
            break;
        case 7:
        case 8:
        case 9:
            break;
        case 10:
        case 'J':
        case 'Q':
        case 'K':
        case 'A':
            counter--;
            break;
    }
   }

   if (counter <= 0){
        return console.log(`${counter} Hold`);
    }
    else if (counter > 0) {
        return console.log(`${counter} Bet`);
    }
        
}
//uncomment following test code after implementing the function
console.log(countCards([2, 3, 7, 'K', 'A']));
console.log(countCards([2, 3, 4, 5, 6]));
console.log(countCards([7, 8, 9]));
console.log(countCards([10, 'J', 'Q', 'K', 'A']));
console.log(countCards([3, 7, 'Q', 8, 'A']));
console.log(countCards([2, 2, 10]));
console.log(countCards([2, 9, 'J', 2, 7]));
console.log(countCards([3, 2, 'A', 10, 'K']));

