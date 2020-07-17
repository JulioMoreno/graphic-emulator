import Validator from "./validate/validator";
const validator = new Validator();
const readline = require("readline");
let storeCommands = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const setCommand = (arrCommands) => {
  let res;
  for (const com of arrCommands) {
    const [c, ...args] = com;
    if (c in commands) {
      res = commands[c](res, ...args);
    } else commands["default"];
  }
};

const commands = {
  I: createImage,
  C: createImage,
  L: addColour,
  H: horizontal,
  V: vertical,
  S: showContent,
  default: getBack,
};

function createImage(bitmap, N, M) {
  N = Math.min(+N, 250);
  M = Math.min(+M, 250);
  bitmap = Array.from(
    {
      length: M,
    },
    () =>
      Array.from(
        {
          length: N,
        },
        () => "O"
      )
  );
  return bitmap;
}

function getBack() {
  storeCommands = [];
  console.log("Valor invalido");
  rl.close();
}

function addColour(bitmap, X, Y, C) {
  const x = X - 1;
  const y = Y - 1;
  if (x >= bitmap[0].length || y >= bitmap.length) {
    console.error(`The coordinates ${x}/${y} doesn't exist`);
    return bitmap;
  }

  if (typeof C != "string" || C.length > 1) {
    console.error(`Color ${C} is not valid`);
    return bitmap;
  }
  bitmap[y][x] = C;
  return bitmap;
}

function horizontal(bitmap, X1, X2, Y, C) {
  for (let pos = +X1; pos <= +X2; pos += 1) {
    bitmap = addColour(bitmap, pos, Y, C);
  }
  return bitmap;
}


function vertical(bitmap, X, Y1, Y2, C) {
  for (let pos = +Y1; pos <= +Y2; pos += 1) {
    bitmap = addColour(bitmap, +X, pos, C);
  }
  return bitmap;
}

function showContent(bitmap) {
  const string = bitmap.reduce((string, row) => {
    string += row.join("") + "\n";
    return string;
  }, "");
  console.log(string);
  return bitmap;
}

const asyncReadLine = () => {
  rl.question("Insert a command: ", (command) => {
    let input = command.toUpperCase();
    let cleanStr = input.replace(/\s/g, "");
    if (cleanStr === "") {
      console.log("Invalid value");
      return asyncReadLine();
    }
    storeCommands.push(cleanStr.toUpperCase());
    if (input === "S") {
      setCommand(storeCommands);
      return rl.close();
    } else if (input === "X") return rl.close();
    asyncReadLine();
  });
};

asyncReadLine();
