let fs = require("fs");
let path = require("path");

fs.readdir(
  `${path.dirname(__dirname)}/03-files-in-folder/secret-folder`,
  (err, files) => {
    if (err) throw err;

    files.forEach((item) => {
      fs.stat(
        `${path.dirname(__dirname)}/03-files-in-folder/secret-folder/${item}`,
        (err, stats) => {
          if (err) throw err;
          if (stats.isFile()) {
            console.log(
              `${item.substr(0, item.lastIndexOf("."))} - ${item.substr(
                item.lastIndexOf(".") + 1
              )} - ${stats.size / 1000}kb`
            );
          }
        }
      );
    });
  }
);
