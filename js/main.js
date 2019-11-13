// "use strict";

let actualPlayer;
// let actualPlayersOut = []; // Joueurs éliminés
let actualHand = [];
let actualNumCards = 0; // Entre 1 et 4 (simple, double, triple, carré)
let actualValue;
let firstRound = true;
const defaultDeck = [3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2];


let playersEndHand = [];



// fichier final
let playersEndFinal = [];
let endGame = false;


const round = () => {


    // if (endGame == true) {
    //     console.log('FINIIIIII');
    //     return (0);

    // }

    // console.log(actualValue);

    // if (actualValue == 2) {
    //     endGame = true;
    //     console.log ('TERMINE');
    //     // isStop = true;
    //     stopNextPlayer();
    //     return (0);
    // }

    if (actualPlayer == players + 1) {
        actualPlayer = 1;
        // on attend que le bouton 'valider' soit ok
        console.log('IA END');
    } else {
        if (firstRound) {
            console.log('IA BEGINS');
            iaFirstRound(actualPlayer);
        } else {
            console.log('IA NEXT');
            iaNextRound(actualPlayer);
        }
    }
}


/*
** ************************  I.A  ***************************
*/

const iaFirstRound = (player) => {
    let tmpArray = allDecks[player - 1];
    let smallestValue = [tmpArray.shift()];

    firstRound = false;
    actualNumCards = 1;

    // optimiser avec une boucle ?
    if (tmpArray.length > 0) {
        if (tmpArray[0][0] == smallestValue[0][0]) {
            smallestValue.push(tmpArray.shift());
            actualNumCards++;
        }
        if (tmpArray[0][0] == smallestValue[0][0]) {
            smallestValue.push(tmpArray.shift());
            actualNumCards++;
        }
        if (tmpArray[0][0] == smallestValue[0][0]) {
            smallestValue.push(tmpArray.shift());
            actualNumCards++;
        }
    }
    console.log('IA ' + player + ' play (' + smallestValue[0][0] + ') - {' + actualNumCards + '}');
    actualHand = [...smallestValue];
    actualValue = smallestValue[0][0];
}

/*
** Tour suivant pour l'IA
** Elle joue une carte supérieure ou égale à la dernière posée en même nombre (paire, etc).
*/
const iaNextRound = (player) => {
    const length = actualHand.length;
    const lastValue = actualHand[length - 1][0];
    const indexDefaultDeck = defaultDeck.indexOf(lastValue);
    let index;
    let removed;
    let i;
    let j;

    for (i = indexDefaultDeck; i < defaultDeck.length; i++) {
        console.log('defaultDeck[i]', defaultDeck[i]);

        if (countValue[player - 1][defaultDeck[i]] == actualNumCards) {

            console.log('IA joue ' + defaultDeck[i] + ' !');
            console.log('IA ' + player + ' play (' + defaultDeck[i] + ') - {' + actualNumCards + '}');
            
            index = allDecks[player - 1].findIndex(find => find[0] == defaultDeck[i]);
            removed = allDecks[player - 1].splice(index, actualNumCards);
            // console.log(removed);
            for (j = 0; j < removed.length; j++)
                actualHand.push(removed[j]);

            actualValue = actualHand[actualHand.length - 1][0];
            // console.log('actualValue', actualValue);
            // console.log(allDecks[player - 1]);
            // console.log('----------------');

            return (1);
        }
    }
    // Si le bot ne peux pas jouer, il sort du jeu
    playersEndHand.push(player);
    console.log(`IA ${player} can't play...`);
    return (0);
}

/*
** ***********************  Player  ************************
*/

const playerRound = () => {
    let tmp;
    let i;
    let index;

    firstRound = false;

    // if (playersEndHand.indexOf(1) != -1)


    for (i = 0; i < cardsPlayed.length; i++) {
        tmp = [];
        tmp.push(cardsPlayed[i].split(';'));
        actualValue = isNaN(tmp[0][0]) ? tmp[0][0] : parseInt(tmp[0][0]);
        actualHand.push([actualValue, tmp[0][1]]);

        // test (ok)
        index = allDecks[0].findIndex(find => find[0] == actualValue && find[1] == tmp[0][1]);
        if (index > -1)
            allDecks[0].splice(index, 1);

        // test (pas ok)
        // $( '#' + actualValue + ';' + tmp[0][1]).remove();

        // console.log(index);
    }
    actualNumCards = cardsPlayed.length;
    actualValue = isNaN(tmp[0][0]) ? tmp[0][0] : parseInt(tmp[0][0]);

    // console.log(actualHand);

    actualPlayer++;
    nextPlayer();
}

/*
** ********************** End of hands **********************
*/

const endHand = () => {

}


/*
** ************************  Final  *************************
*/

/*
** Pour savoir si un joueur à posé toutes ses cartes.
*/
const endGameForPlayer = (player) => {
    if (allDecks[player - 1].length == 0) {
        if (player == 1) {
            console.log('Vous avez posé toutes vos cartes !');
            playersEndFinal.push(player);
            return (1);
        } else {
            console.log('Nope ! Il vous reste des cartes...');
            return (0);
        }
    }
}

const endGameForAll = () => {
    if (playersEndFinal.length == players) {
        
        // here pour le classement (président -neutre - trou du cul)

        console.log('Partie terminé !');
        return (1);
    } else {
        return (0);
    }
}



/*
** Play some cards.
*/


// ----------------------------------------------

const start = () => {
    // players = getPlayersNumber();
    players = 4;

    for (let i = 0; i < players; i++)
        allDecks[i] = [];
    
    cardDistribution(players);
    sortCardsDecks();

    // detectBeginner();
    actualPlayer = detectBeginner();
    // console.log(actualPlayer);
    // if (actualPlayer != 1) {
        // iaRound(actualPlayer);
        // console.log(actualPlayer)
        // round();

        

    // }
}

start();