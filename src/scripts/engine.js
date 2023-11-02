const state = {
  score: {
    playerScore: 0,
    computerScore: 0,
    scoreBox: document.querySelector("#score_points"),
  },
  cardSprites: {
    avatar: document.querySelector("#card-image"),
    name: document.querySelector("#card-name"),
    type: document.querySelector("#card-type"),
  },
  fieldCards: {
    player: document.querySelector("#player-field-card"),
    computer: document.querySelector("#computer-field-card"),
  },
  playersSides: {
    player1: "player-cards",
    player1Box: document.querySelector("#player-cards"),
    player2: "computer-cards",
    player2Box: document.querySelector("#computer-cards"),
  },
  actions: {
    button: document.querySelector("#next-duel"),
  },
};

const pathImages = "./src/assets/icons";

const cardData = [
  {
    id: 0,
    name: "Blue Eyes White Dragon",
    type: "Paper",
    img: `${pathImages}/dragon.png`,
    winOf: [1],
    loseOf: [2],
  },
  {
    id: 1,
    name: "Dark Magician",
    type: "Rock",
    img: `${pathImages}/magician.png`,
    winOf: [2],
    loseOf: [0],
  },
  {
    id: 2,
    name: "Exodia",
    type: "Scissors",
    img: `${pathImages}/exodia.png`,
    winOf: [0],
    loseOf: [1],
  },
];

async function getRandomCardID() {
  const randomIndex = Math.floor(Math.random() * cardData.length);

  return cardData[randomIndex].id;
}

async function createCardImage(idCard, fieldSide) {
  const cardImage = document.createElement("img");
  cardImage.setAttribute("height", "100px");
  cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
  cardImage.setAttribute("data-id", idCard);
  cardImage.classList.add("card");

  if (fieldSide === state.playersSides.player1) {
    cardImage.addEventListener("click", () => {
      setCardsField(cardImage.getAttribute("data-id"));
    });

    cardImage.addEventListener("mouseover", () => {
      drawSelectedCard(idCard);
    });
  }

  return cardImage;
}

async function showHiddenCardFieldsImage(isShow) {
  if (isShow) {
    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";
  }

  if (!isShow) {
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";
  }
}

async function hiddenCardDetails() {
  state.cardSprites.avatar.src = "";
  state.cardSprites.name.textContent = "Select a card";
  state.cardSprites.type.textContent = "";
}

async function setCardsField(cardId) {
  await removeAllCardsImages();

  let computerCardId = await getRandomCardID();

  await showHiddenCardFieldsImage(true);

  await hiddenCardDetails();

  await drawCardsInField(cardId, computerCardId);

  let duelResults = await checkDuelResults(cardId, computerCardId);

  await updateScore();
  await drawButton(duelResults);
}

async function drawCardsInField(cardId, computerCardId) {
  state.fieldCards.player.setAttribute("src", cardData[cardId].img);
  state.fieldCards.computer.setAttribute("src", cardData[computerCardId].img);
}

async function removeAllCardsImages() {
  let { player1Box, player2Box } = state.playersSides;

  let imgElements = player1Box.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());

  imgElements = player2Box.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());
}

async function checkDuelResults(playerCardId, computerCardId) {
  let duelResults = "draw";
  let playerCard = cardData[playerCardId];

  if (playerCard.winOf.includes(computerCardId)) {
    duelResults = "win";
    state.score.playerScore++;
  }

  if (playerCard.loseOf.includes(computerCardId)) {
    duelResults = "lose";
    state.score.computerScore++;
  }

  if (duelResults !== "draw") {
    await playAudio(duelResults);
  }

  return duelResults;
}

async function drawButton(text) {
  state.actions.button.textContent = text.toLocaleUpperCase();
  state.actions.button.style.display = "block";
}

async function updateScore() {
  state.score.scoreBox.textContent = `WIN : ${state.score.playerScore} | LOSE : ${state.score.computerScore}`;
}

async function drawCards(cardNumbers, fieldSide) {
  for (let i = 0; i < cardNumbers; i++) {
    const randomIdCard = await getRandomCardID();
    const cardImage = await createCardImage(randomIdCard, fieldSide);

    document.getElementById(fieldSide).appendChild(cardImage);
  }
}

async function drawSelectedCard(index) {
  state.cardSprites.avatar.src = cardData[index].img;
  state.cardSprites.name.textContent = cardData[index].name;
  state.cardSprites.type.textContent = `Attribute : ${cardData[index].type}`;
}

async function resetDuel() {
  state.actions.button.style.display = "none";

  state.fieldCards.player.style.display = "none";
  state.fieldCards.computer.style.display = "none";

  init();
}

async function playAudio(status) {
  const audio = new Audio(`./src/assets/audios/${status}.wav`);
  audio.play();
}

function init() {
  showHiddenCardFieldsImage(false);

  drawCards(5, state.playersSides.player1);
  drawCards(5, state.playersSides.player2);
}

init();
