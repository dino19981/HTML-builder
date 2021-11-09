const fs = require("fs");
const path = require("path");

async function func() {
  await fs.access(path.join(__dirname, "files-copy"), (err) => {
    if (err) {
      console.log("папки нет");
      fs.mkdir(path.join(__dirname, "files-copy"), (err) => {
        if (err) {
        }
      });
      return;
    }

    console.log("папка есть");
    fs.readdir(path.join(__dirname, "files-copy"), (err, files) => {
      console.log(files);
    });
  });
  await fs.readdir(path.join(__dirname, "files-copy"), (err, files) => {
    if (err);
    files.forEach((elem) => {
      console.log(elem);
      fs.unlink(path.join(__dirname, "files-copy", elem), (err) => {
        if (err) throw err;
      });
    });
  });

  fs.readdir(path.join(__dirname, "files-copy"), (err, files) => {
    console.log(files);
  });

  await fs.readdir(
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
}

func();
