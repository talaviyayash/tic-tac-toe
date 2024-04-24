let WhoToClick = "o";
const winnerElement = document.getElementById("winner");
const allBtn = document.querySelectorAll(".btn");
let btn1 = document.getElementById("1");
let btn2 = document.getElementById("2");
let btn3 = document.getElementById("3");
let btn4 = document.getElementById("4");
let btn5 = document.getElementById("5");
let btn6 = document.getElementById("6");
let btn7 = document.getElementById("7");
let btn8 = document.getElementById("8");
let btn9 = document.getElementById("9");
const undoArray = [[0, 0, 0, 0, 0, 0, 0, 0, 0]];
const redoArray = [];
const matchEndElement = document.getElementById("matchEnd");
let matchEnd = false;
let winOrNot = false;
function clickme(e) {
  if (WhoToClick == "o") {
    btnClicked(e, "o");
  } else {
    btnClicked(e, "x");
  }
}

function btnClicked(e, whoseTurn) {
  const clickedElement = document.getElementById(`${e.target.id}`);
  clickedElement.innerHTML = whoseTurn;
  clickedElement.disabled = true;
  WhoToClick = whoseTurn == "x" ? "o" : "x";
  const pushArray = [...undoArray[undoArray.length - 1]];
  pushArray[Number(e.target.id) - 1] = whoseTurn;
  pushArray.turn = whoseTurn;
  undoArray[undoArray.length] = pushArray;
  winnerElement.innerHTML = `YOUR TURN ${WhoToClick}`;
  matchEndOrNot();
  matchPattern(whoseTurn);
}
function undoOneStep() {
  if (matchEnd || winOrNot) {
    return 0;
  }
  if (undoArray.length - 1 == 0) {
    return 0;
  }
  redoArray.push(undoArray.pop());
  printArray(undoArray[undoArray.length - 1]);
  console.log("test", undoArray);
}
function redoOneStep() {
  if (matchEnd || winOrNot) {
    return 0;
  }
  if (redoArray.length == 0) {
    return 0;
  }
  printArray(redoArray[redoArray.length - 1]);
  undoArray.push(redoArray.pop());
}
function printArray(arr) {
  arr.map((val, index) => {
    const selectedElement = document.getElementById(`${index + 1}`);
    if (val == "x" || val == "o") {
      selectedElement.disabled = true;
      selectedElement.innerHTML = `${val}`;
      return 0;
    }
    selectedElement.disabled = false;
    selectedElement.innerHTML = ``;
  });
  WhoToClick = arr.turn == "x" ? "o" : "x";
  winnerElement.innerHTML = `YOUR TURN ${WhoToClick}`;
}
function matchPattern(who) {
  const anyOneWin =
    (btn1.innerHTML == who && btn2.innerHTML == who && btn3.innerHTML == who) ||
    (btn4.innerHTML == who && btn5.innerHTML == who && btn6.innerHTML == who) ||
    (btn7.innerHTML == who && btn8.innerHTML == who && btn9.innerHTML == who) ||
    (btn1.innerHTML == who && btn4.innerHTML == who && btn7.innerHTML == who) ||
    (btn2.innerHTML == who && btn5.innerHTML == who && btn8.innerHTML == who) ||
    (btn3.innerHTML == who && btn6.innerHTML == who && btn9.innerHTML == who) ||
    (btn1.innerHTML == who && btn5.innerHTML == who && btn9.innerHTML == who) ||
    (btn3.innerHTML == who && btn5.innerHTML == who && btn7.innerHTML == who);
  if (anyOneWin) {
    matchEndElement.innerHTML = `${who} IS WIN`;
    disableAll();
    winOrNot = true;
  }
}
function disableAll() {
  const allBtn = document.querySelectorAll(".btn");
  Array.from(allBtn).forEach((val) => {
    val.disabled = true;
  });
}
function restartAll() {
  Array.from(allBtn).forEach((val) => {
    val.disabled = false;
    val.innerHTML = "";
  });
  undoArray.length = 1;
  redoArray.length = 0;
  matchEndElement.innerHTML = "";
  matchEnd = false;
  winOrNot = false;
}
function setWhoIsFirst(e) {
  WhoToClick = e.target.value;
  if (confirm("are u want to restart game?")) {
    restartAll();
    winOrNot = true;
    winnerElement.innerHTML = `YOUR TURN ${WhoToClick}`;
  }
}

function matchEndOrNot() {
  const allBtn = document.querySelectorAll(".btn");
  const match = Array.from(allBtn).every((val) => {
    return val.disabled == true;
  });
  if (match) {
    matchEnd = true;
    matchEndElement.innerHTML = "Match is ended";
  }
}
