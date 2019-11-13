// color (diamond, heart, spade, club)
let deck = [
    [2, '♠'], [2, '♣'], [2, '♡'], [2, '♢']
    , [3, '♠'], [3, '♣'], [3, '♡'], [3, '♢']
    , [4, '♠'], [4, '♣'], [4, '♡'], [4, '♢']
    , [5, '♠'], [5, '♣'], [5, '♡'], [5, '♢']
    , [6, '♠'], [6, '♣'], [6, '♡'], [6, '♢']
    , [7, '♠'], [7, '♣'], [7, '♡'], [7, '♢']
    , [8, '♠'], [8, '♣'], [8, '♡'], [8, '♢']
    , [9, '♠'], [9, '♣'], [9, '♡'], [9, '♢']
    , [10, '♠'], [10, '♣'], [10, '♡'], [10, '♢']
    , ['J', '♠'], ['J', '♣'], ['J', '♡'], ['J', '♢']
    , ['Q', '♠'], ['Q', '♣'], ['Q', '♡'], ['Q', '♢']
    , ['K', '♠'], ['K', '♣'], ['K', '♡'], ['K', '♢']
    , ['A', '♠'], ['A', '♣'], ['A', '♡'], ['A', '♢']
];
let players;
const allDecks = [];
const countValue = [];


/* 
** Récupération du nombre de joueurs sélectionnés par l'utilisateur.
** Entre 2 et 5 joueurs pour un total entre 3 et 6.
*/ 
const getPlayersNumber = () => {
    let getInput = 0;
    
    while (getInput < 2 || getInput > 5 || isNaN(getInput))
        getInput = parseInt(prompt('Combiens de joueurs adverses voulez-vous affronter ?\nEntre 2 et 5 adversaires.', 2));
    return (getInput + 1);
}

/*
** Distribution du paquet de carte aléatoirement.
*/
const cardDistribution = (players) => {
    let indexPlayer = 0;
    let randomCard;

    while (deck.length > 0) {
        if (indexPlayer === players)
            indexPlayer = 0;
        randomCard = Math.floor(Math.random() * Math.floor(deck.length));
        allDecks[indexPlayer].push(deck[randomCard]);
        deck.splice(randomCard, 1);
        indexPlayer++;
    }
    console.log('Distribution des cartes', allDecks);
    countCardsByValue();
}

/*
** Decompte du nombre de carte par valeur.
*/
const countCardsByValue = () => {
    let i;
    let j;
    let counts;
    let value;

    for (i = 0; i < allDecks.length; i++) {
        counts = [];
        for (j = 0; j < allDecks[i].length; j++) {
            value = allDecks[i][j][0];
            counts[value] = counts[value] ? counts[value] + 1 : 1;
        }
        countValue.push(counts);
    }
    console.log('Decompte des cartes par valeur', countValue);
}


/*
** Tri des paquets de cartes (3 - 10, J, Q, K, A, 2).
*/
const sortCardsDecks = () => {
    let i;

    for (i = 0; i < allDecks.length; i++) {
        allDecks[i].sort((a, b) => {
            if ((a[0] == 'J' && (Number.isInteger(b[0]) && b[0] != 2))
                || (a[0] == 'Q' && (Number.isInteger(b[0]) && b[0] != 2 || b[0] == 'J'))
                || (a[0] == 'K' && (Number.isInteger(b[0]) && b[0] != 2 || b[0] == 'J' || b[0] == 'Q'))
                || (a[0] == 'A' && (Number.isInteger(b[0]) && b[0] != 2 || b[0] == 'J' || b[0] == 'Q' || b[0] == 'K'))
                || (a[0] == 2 && (Number.isInteger(b[0]) && b[0] != 2 || b[0] == 'J' || b[0] == 'Q' || b[0] == 'K' || b[0] == 'A')))
                return (1);
            if ((b[0] == 'J' && Number.isInteger(a[0]) && a[0] != 2)
                || (b[0] == 'Q' && (Number.isInteger(a[0]) && a[0] != 2 || a[0] == 'J'))
                || (b[0] == 'K' && (Number.isInteger(a[0]) && a[0] != 2 || a[0] == 'J' || a[0] == 'Q'))
                || (b[0] == 'A' && (Number.isInteger(a[0]) && a[0] != 2 || a[0] == 'J' || a[0] == 'Q' || a[0] == 'K'))
                || (b[0] == 2 && (Number.isInteger(a[0]) && a[0] != 2 || a[0] == 'J' || a[0] == 'Q' || a[0] == 'K' || a[0] == 'A')))
                return (-1);
            if (Number.isInteger(a[0]) && Number.isInteger(b[0]))
                return (a[0] - b[0]);
            return (0);
        });
    }
    console.log(allDecks);
}

/*
** Detecte la dame de coeur pour savoir quel joueur commence.
*/
const detectBeginner = () => {
    let i;
    let j;

    for (i = 0; i < allDecks.length; i++) {
        for (j = 0; j < allDecks[i].length; j++) {
            if (allDecks[i][j][0] == 'Q' && allDecks[i][j][1] == '♡') {
                if (++i == 1)
                    console.log('Vous commencez la partie !');
                else
                    console.log(`Le joueur ${i} commence la partie`);
                return (i);
            }
        }
    }
}