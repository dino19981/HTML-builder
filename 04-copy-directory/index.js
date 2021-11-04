const fs = require("fs");
const path = require("path");

fs.mkdir(path.join(__dirname, "files-copy"), (err) => {
  if (err) {
  }
  console.log(1231);
});

fs.readdir(
  `${path.dirname(__dirname)}/04-copy-directory/files`,
  (err, files) => {
    if (err) throw err;
    for (let item of files) {
      fs.promises.copyFile(
        path.join(__dirname, "files", item),
        path.join(__dirname, "files-copy", item)
      );
    }
  }
);
