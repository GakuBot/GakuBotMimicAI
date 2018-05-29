let mimic = new Mimic();
mimic.generatePopulation();

const savedMimicRaw = localStorage.getItem('mimic');
const savedMimicOpponentNetworkRaw = localStorage.getItem('mimicOpponentNetwork');
const savedEvolutionIteration = localStorage.getItem('mimicEvolutionIteration');

// If a way to save the network is found, uncomment below
// const isSavedDataAvailable = notUndefinedOrNull(savedMimicRaw)
//                             && notUndefinedOrNull(savedMimicOpponentNetworkRaw)
//                             && notUndefinedOrNull(savedEvolutionIteration);
//
// function notUndefinedOrNull(input){
//   return typeof input !== "undefined" && input !== null;
// }
// If a way to save the network is found, uncomment below
// function loadSavedMimicData(){
//   const savedMimic = JSON.parse(savedMimicRaw);
//   const savedMimicOpponentNeat = JSON.parse(savedMimicOpponentNetworkRaw);
//   var Network = synaptic.Network;
//
//   mimic["noOfWins"] = parseInt(savedMimic["noOfWins"]);
//   mimic["noOfLosses"] = parseInt(savedMimic["noOfLosses"]);
//   mimic["opponentNetwork"] = Network.fromJSON(savedMimicOpponentNeat);
//   mimic["evolutionIteration"] = parseInt(savedEvolutionIteration);
// }

// If a way to save the network is found, uncomment below
// if(isSavedDataAvailable){
//   pageNumberLimit = 5;
//   headerText.splice(0, 0, "Save Data");
//   titleText.splice(0, 0, "Local saved data has been detected");
//   contentText.splice(0, 0, "Would you like to load previously saved data?");
//   buttonText.splice(0, 0, "No");
//   document.getElementById("progress-button-load").classList.remove("d-none");
//   $("#canvas-overlay .card-header h2").html(headerText[pageNumber]);
//   $("#canvas-overlay .card-title").html(titleText[pageNumber]);
//   $("#canvas-overlay .card-text").html(contentText[pageNumber]);
//   $("#canvas-overlay #progress-button").html(buttonText[pageNumber]);
//
//   document.getElementById("progress-button-load").addEventListener("click", function(e){
//     e.preventDefault();
//     document.getElementById("progress-button-load").classList.add("d-none");
//     loadSavedMimicData();
//     pageNumber += 1
//     $("#canvas-overlay .card-header h2").html(headerText[pageNumber]);
//     $("#canvas-overlay .card-title").html(titleText[pageNumber]);
//     $("#canvas-overlay .card-text").html(contentText[pageNumber]);
//     $("#canvas-overlay #progress-button").html(buttonText[pageNumber]);
//   });
// }


let iteration = 0;
let finalOutcome = {};
let finalPlayer;
let finalOpponent;
let evolutionIterationProcess;
let playProcess;
let movementProcess;

const headerText = ["Gakubot Mimic", "Rules", "How to play", "Strategy", "Other versions"];
const titleText = ["This is a machine learning game", "Rules:", "Movement", "How will you play?", ""];
const contentText = ["You play. The AI learns.<br><br>After every round that you play, the AI looks at the decisions that you made and learns from them.<br><br> Then it uses this information to try and imitate the way that you play.",
"<div class='mb-5'><div class='w-75 d-inline-block'>You are a yellow circle.</div><img class='w-20 ml-5p align-top' src='../images/player.png'></div>\
  <div class='mb-5'> <img class='w-20 mr-5p align-top'  src='../images/home.png'><div class='w-75 d-inline-block'>Your aim is to get home to the brown circle in the middle.</div></div>\
  <div class='mb-5'><div class='w-75 d-inline-block'>You need to get home before your opponent, a pink circle. If the pink circle gets home first, you lose.</div><img class='w-20 ml-5p align-top' src='../images/opponent.png'></div>\
  <div>If you touch or 'tag' your opponent, then the one of you who is closest to home when you touch is unable to move for a few seconds.</div>",
"You move via tapping in the direction that you want to move in.<br><br> A yellow reticule should appear wherever you click on the screen.<br><br> Your yellow circle will move in that direction",
"Will you make a beeline for the target? <br><br>Will you be agressive and first seek to subdue your opponent by tagging them before going towards the objective? <br><br>And what will the computer do?",
"For more information, and other versions of Gakubot, see <a href='https://www.gakubot.com'>GakuBot.com</a>"];
const buttonText = ["Rules ▶", "Guide ▶", "Strategy ▶", "Versions ▶", "Menu"];

let pageNumber = 0;
let pageNumberLimit = 4;

var trainDataPlayHuman = function(){
  if(mimic.currentRound < 1){
    mimic.currentRound++;
    document.getElementById("loading-icon").classList.remove("d-none");
    setTimeout(function(){
      mimic.evolve();
      trainDataPlayHuman();
    }, 100);
  }else{
    mimic.setInitialPositionValue();
    mimic.prepareDuel();
  }
};

document.getElementById("progress-button").addEventListener("click", function(e){
  e.preventDefault();
  if(pageNumber < pageNumberLimit){
    pageNumber += 1
    $("#canvas-overlay .card-header h2").html(headerText[pageNumber]);
    $("#canvas-overlay .card-title").html(titleText[pageNumber]);
    $("#canvas-overlay .card-text").html(contentText[pageNumber]);
    $("#canvas-overlay #progress-button").html(buttonText[pageNumber]);
  }else{
    pageNumber = 0;
    howToPlayToMenuScreen();
  }
});

document.getElementById("play-again-button").addEventListener("click", function(e){
  e.preventDefault();
  document.getElementById("continue-canvas-overlay").classList.add("d-none");
  trainDataPlayHuman();
});

document.getElementById("play-now-button").addEventListener("click", function(e){
  e.preventDefault();
  howToPlayToMenuScreen();
  $("#canvas-overlay").hide();
  trainDataPlayHuman();
});

document.getElementById("how-to-play-button").addEventListener("click", function(e){
  e.preventDefault();
  $("#canvas-overlay .card-header h2").html(headerText[pageNumber]);
  $("#canvas-overlay .card-title").html(titleText[pageNumber]);
  $("#canvas-overlay .card-text").html(contentText[pageNumber]);
  $("#canvas-overlay #progress-button").html(buttonText[pageNumber]);
  menuToHowToPlayScreen();
});

document.getElementById("menu-button").addEventListener("click", function(e){
  e.preventDefault();
  $("#canvas-overlay").show();
  mimic.currentRound--;

  cancelAnimationFrame(mimic.animationProcess);
  howToPlayToMenuScreen();
});

var menuToHowToPlayScreen = function(){
  document.getElementById("game-menu").classList.add("d-none");
  document.getElementById("how-to-play-explanation").classList.remove("d-none");
}

var howToPlayToMenuScreen = function(){
  document.getElementById("how-to-play-explanation").classList.add("d-none");
  document.getElementById("game-menu").classList.remove("d-none");
}

var roundOver = function(){
  const gameResult = mimic.gameResultWin;
  const noOfWins = mimic.noOfWins;
  const noOfLosses = mimic.noOfLosses;
  const noOfGames = mimic.noOfGames;

  // If a way to save the network is found, uncomment below
  // localStorage.setItem('mimic', JSON.stringify(mimic));
  // localStorage.setItem('mimicOpponentNetwork', JSON.stringify(mimic.opponentNetwork.toJSON()));
  // localStorage.setItem('mimicEvolutionIteration', mimic.currentGen);

  document.getElementById("continue-canvas-overlay").classList.remove("d-none");
  document.getElementById("play-again-button").disabled = true;
  document.getElementById("post-game-message-title").innerHTML = noOfWins > noOfLosses ? "You're on top!" : "Keep going!";
  document.getElementById("post-game-message").innerHTML = noOfWins > noOfLosses ? "You currently have more wins than losses: that's great! Keep playing to see the AI get better." : "You currently don't have more wins than losses. Keep playing to try and get the better of the AI.";
  document.getElementById("post-game-results-played").innerHTML =  "Played: " + noOfGames;
  document.getElementById("post-game-results-won").innerHTML =  "Won: " + Math.round((100 * (noOfWins / (noOfWins + noOfLosses)))) + "% (" + noOfWins + "/" + (noOfWins + noOfLosses) + ")";
  document.getElementById("post-game-results-lost").innerHTML = "Lost: " + Math.round((100 * (noOfLosses / (noOfWins + noOfLosses)))) + "% (" + noOfLosses + "/" + (noOfWins + noOfLosses) + ")";
  document.getElementById("post-game-results-won-bar").style.width = Math.round(100 * (noOfWins / (noOfWins + noOfLosses))) + "%";
  document.getElementById("post-game-results-lost-bar").style.width = Math.round(100 * (noOfLosses / (noOfWins + noOfLosses))) + "%";
}
