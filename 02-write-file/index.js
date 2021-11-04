const readline = require("readline");
const fs = require("fs");
const path = require("path");
const { stdin: input, stdout: output } = require("process");

fs.open(`${path.dirname(__filename)}/text.txt`, "w", (err) => {
  if (err) throw err;
});
const rl = readline.createInterface({ input, output });

function qwe() {
  rl.question("Введите ваше сообщение: ", (answer) => {
    if (answer == "exit") {
      process.exit();
    } else {
      fs.appendFile(`${path.dirname(__filename)}/text.txt`, answer, (err) => {
        if (err) throw err;
      });
    }
    qwe();
  });
}
qwe();

process.on("exit", (code) => {
  console.log("");
  console.log("Запись в файл завершена");
});
