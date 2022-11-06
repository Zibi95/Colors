const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

function changeTitle(text) {
  $("#level-title").text(text);
}

function nextSequence() {
  const randomNumber = Math.floor(Math.random() * 4);
  animatePress(buttonColors[randomNumber]);
  gamePattern.push(buttonColors[randomNumber]);
  changeTitle(`Level ${gamePattern.length}`);
  playSound(buttonColors[randomNumber]);
  userClickedPattern = [];
}

function playSound(id) {
  const audio = new Audio(`sounds/${id}.mp3`);
  audio.play();
}

function animatePress(currentCoulour) {
  $(`#${currentCoulour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentCoulour}`).removeClass("pressed");
  }, 100);
}

function gameOver() {
  playSound("wrong");
  gamePattern = [];
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  changeTitle("Press A Key to Start");
}

function checkAnswer() {
  const latestIndex = userClickedPattern.length - 1;
  if (userClickedPattern[latestIndex] === gamePattern[latestIndex]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    gameOver();
  }
}

$(".btn").click(function (e) {
  $(this).fadeOut(50).fadeIn(50);

  playSound(this.id);

  animatePress(this.id);

  userClickedPattern.push(this.id);

  checkAnswer(userClickedPattern.length);
});

$(document).keydown(function () {
  if (gamePattern.length === 0) {
    nextSequence();
  }
});
