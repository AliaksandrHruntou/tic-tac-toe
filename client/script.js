const url = window.location.origin;
let socket = io.connect(url);

let myTurn = true;
let symbol;

const message = document.getElementById("message");
const buttons = document.querySelectorAll(".board button");

buttons.forEach((btn) => btn.addEventListener("click", () => makeMove(btn)));
// buttons.forEach((btn) => btn.setAttribute("disabled", true));

function makeMove(btn) {
  console.log("makeMoveClip");
  if (!myTurn) {
    return;
  }

  if (btn.innerHTML.length) {
    return;
  }
  socket.emit("make.move", {
    symbol: symbol,
    position: btn.id,
  });
}

socket.on("move.made", function (data) {
  document.getElementById(data.position).innerHTML = data.symbol;

  myTurn = data.symbol !== symbol;

  if (!isGameOver()) {
    renderTurnMessage();
  } else {
    if (myTurn) {
      message.innerHTML = "You Lost.";
    } else {
      message.innerHTML = "You won!";
    }
    buttons.forEach((btn) => btn.setAttribute("disabled", true));
  }
});

socket.on("game.begin", function (data) {
  symbol = data.symbol;
  myTurn = symbol === "X";
  renderTurnMessage();
});
