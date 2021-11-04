let fs = require("fs");
let path = require("path");

let styles = [];

fs.access(`${__dirname}/project-dist/bundle.css`, (err) => {
  if (!err) {
    fs.unlink(`${__dirname}/project-dist/bundle.css`, (err) => {
      if (err) {
      }
    });
  } else {
  }
  fs.open(`${__dirname}/project-dist/bundle.css`, "r+", (err) => {
    if (err) {
    }
  });
});

fs.readdir(path.join(__dirname, "styles"), (err, files) => {
  if (err) throw err;
  for (let i = 0; i < files.length; i++) {
    if (path.extname(files[i]) == ".css") {
      fs.stat(`${__dirname}/styles/${files[i]}`, (err, stats) => {
        if (err) throw err;
        if (stats.isFile()) {
          let stream = new fs.ReadStream(`${__dirname}/styles/${files[i]}`, {
            encoding: "utf-8",
          });
          stream.on("readable", (err) => {
            if (err) throw err;

            fs.appendFile(
              `${__dirname}/project-dist/bundle.css`,
              stream.read() + `\n`,
              (err) => {
                if (err) throw err;
              }
            );
            stream.close();
          });
        }
      });
    }
  }
});
