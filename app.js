let tileStack = [];
let score = -1;

const gameBox = document.querySelector("#game");
const homePage = document.querySelector("#homePage");
const squares = document.querySelectorAll(".square");

gameBox.onmousemove = (e) => {
  for (const square of squares) {
    const rect = square.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    square.style.setProperty("--mouse-x", `${x}px`);
    square.style.setProperty("--mouse-y", `${y}px`);
  }
};

const toggleTile = (tileName, toggleTime) => {
  for (const square of squares) {
    if (square.classList[1] === tileName)
      content = square.querySelector(".content");
  }

  content.classList.add(tileName);
  new Audio(`sounds/${tileName}.mp3`).play();
  setTimeout(
    (s) => {
      content.classList.remove(s);
    },
    toggleTime,
    tileName
  );
};

const themeSwitch = () => {
  document.querySelector(":root").classList.toggle("light");
};

const toggleRandom = () => {
  const tiles = "ABCD";
  const randomTile = tiles.charAt(Math.floor(Math.random() * 4));

  tileStack.push(randomTile);
  toggleTile(randomTile, 500);
};

const nextSet = () => {
  if (tileStack[score] !== undefined) {
    toggleTile(tileStack[score], 500);
    score++;
    setTimeout(nextSet, 600);
  } else {
    toggleRandom();
    score = 0;
  }
};

const playGame = () => {
  score++;
  if (tileStack[score] === undefined) {
    document.querySelector("#score").innerText = "Score: " + tileStack.length;

    gameBox.classList.add("unclickable");
    setTimeout(
      () => gameBox.classList.remove("unclickable"),
      score * 600 + 1200
    );
    score = 0;
    setTimeout(nextSet, 750);
  }
};

const newGame = () => {
  gameBox.style.display = "grid";
  homePage.style.display = "none";
  playGame();
};

const gameOver = () => {
  score = -1;
  new Audio("sounds/wrong.mp3").play();
  gameBox.style.display = "none";
  homePage.style.display = "grid";
  tileStack = [];
};

for (const square of squares) {
  square.onclick = (e) => {
    const tileName = e.target.classList[1];
    toggleTile(tileName, 250);

    if (tileName === tileStack[score]) {
      playGame();
    } else {
      setTimeout(gameOver, 150);
    }
  };
}
