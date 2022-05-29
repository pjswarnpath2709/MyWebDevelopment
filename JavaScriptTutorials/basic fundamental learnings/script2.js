'use strict';

const calcAverage = (score1, score2, score3) => {
    return (score1 + score2 + score3) / 3;
}

const calcWinner = function (totalScore1, totalScore2) {
    if (totalScore1 >= 2 * totalScore2) {
        return "Dolphins won the game";
    } else if (totalScore2 >= 2 * totalScore1) {
        return "Koalas won the game";
    } else {
        return "no one wins the game";
    }
}



console.log(
    calcWinner(
        calcAverage(65, 54, 19),
        calcAverage(23, 354, 207)
    )
);