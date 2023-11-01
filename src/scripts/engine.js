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
  actions: {
    button: document.querySelector("#next-duel"),
  },
};

function init() {}

init();
