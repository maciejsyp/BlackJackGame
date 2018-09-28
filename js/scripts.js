(function() {
  const blackJack = 21;

  let buttonPlayerOne = document.getElementById("getCardPlayerOne");
  let stopButtonPlayerOne = document.getElementById("stopGettingCardsPlayerOne");
  let outputPlayerOne = document.getElementById("showSumPlayerOne");

  let buttonPlayerTwo = document.getElementById("getCardPlayerTwo");
  let stopButtonPlayerTwo = document.getElementById("stopGettingCardsPlayerTwo");
  let outputPlayerTwo = document.getElementById("showSumPlayerTwo");

  let currentCard = document.getElementById("currentCard");
  let checkResultButton = document.getElementById("checkResult");

  let playerOneMainScore = document.getElementById("playerOneMainScore");
  let playerTwoMainScore = document.getElementById("playerTwoMainScore");

  let counterPlayerOne = 0;
  let counterPlayerTwo = 0;

  // functions used by all players

  function getRandomCard(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function showRandomCard() {
    return getRandomCard(2, 11);
  }

  function countCards() {
    let card = showRandomCard();
    currentCard.value = card;
    return card;
  }

  function checkDifference() {
    let playerOneDifference = blackJack - counterPlayerOne;
    let playerTwoDifference = blackJack - counterPlayerTwo;

    if (playerOneDifference > playerTwoDifference) {
      reset();
      playerTwoMainScore.value++;
    } else if (playerOneDifference > playerTwoDifference) {
      reset();
      playerOneMainScore.value++;
    }
    //  else {
    // //     reset();
    //     playerOneMainScore.value++;
    //     playerTwoMainScore.value++;
    // }
  }

  function checkScore() {
    if (
      outputPlayerOne.value > blackJack &&
      outputPlayerTwo.value <= blackJack
    ) {
      reset();
      playerTwoMainScore.value++;
    } else if (
      outputPlayerOne.value <= blackJack &&
      outputPlayerTwo.value > blackJack
    ) {
      reset();
      playerOneMainScore.value++;
    } else if (outputPlayerOne.value === blackJack) {
      reset();
      playerOneMainScore++;
    } else if (outputPlayerTwo.value === blackJack) {
      reset();
      playerTwoMainScore++;
    } else if (outputPlayerOne > blackJack && outputPlayerTwo > blackJack) {
      reset();
    } else if (
      buttonPlayerOne.disabled === true &&
      buttonPlayerTwo.disabled === true
    ) {
      checkDifference();
    } else return;
  }

  function reset() {
    counterPlayerOne = 0;
    counterPlayerTwo = 0;
    currentCard.value = "";
    outputPlayerOne.value = counterPlayerOne;
    outputPlayerTwo.value = counterPlayerTwo;
    buttonPlayerOne.disabled = false;
    buttonPlayerTwo.disabled = false;
  }

  function checkMainScore() {
    if (playerOneMainScore.value === 10) {
      alert("Wygrał gracz numer 1!");
      reset();
    } else if (playerTwoMainScore.value === 10) {
      alert("Wygrał gracz numer 2");
      reset();
    }
  }

  // playerOne functions
  buttonPlayerOne.addEventListener(
    "click",
    function() {
      outputPlayerOne.value = counterPlayerOne += countCards();
    },
    false
  );

  stopButtonPlayerOne.addEventListener(
    "click",
    function() {
      buttonPlayerOne.disabled = true;
    },
    false
  );
  // playerTwo functions
  buttonPlayerTwo.addEventListener(
    "click",
    function() {
      outputPlayerTwo.value = counterPlayerTwo += countCards();
      checkScore();
    },
    false
  );

  stopButtonPlayerTwo.addEventListener(
    "click",
    function() {
      buttonPlayerTwo.disabled = true;
    },
    false
  );

  checkResultButton.addEventListener("click", checkScore, false);

  checkMainScore();
})();
