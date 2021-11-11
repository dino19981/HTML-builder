const fs = require("fs");
const path = require("path");

makeDir();
async function makeDir() {
  let pathToremove = await fs.promises.readdir(
    path.join(__dirname, "project-dist", "assets")
  );

  for (let i = 0; i < pathToremove.length; i++) {
    await fs.rm(
      path.join(__dirname, "project-dist", "assets", pathToremove[i]),
      { recursive: true },
      (err) => {
        console.log(pathToremove[i] + " remove");
      }
    );
  }

  await fs.mkdir(`${__dirname}/project-dist`, (err) => {
    if (err) {
    }
  });

  await fs.mkdir(`${__dirname}/project-dist/assets`, (err) => {
    if (err) {
    }
    console.log("ass");
  });

  await fs.appendFile(`${__dirname}/project-dist/index.html`, "", (err) => {
    if (err) {
    }
  });

  setTimeout(() => {
    fs.readdir(`${__dirname}/assets`, (err, items) => {
      if (err) throw err;

      items.forEach((item) => {
        fs.mkdir(`${__dirname}/project-dist/assets/${item}`, (err) => {
          if (err);
          console.log(item + " создан");
        });
        fs.readdir(`${__dirname}/assets/${item}`, (err, files) => {
          if (err);
          files.forEach((file) => {});

          files.forEach((file) => {
            fs.promises.copyFile(
              `${__dirname}/assets/${item}/${file}`,
              `${__dirname}/project-dist/assets/${item}/${file}`
            );
          });
        });
      });
    });
  }, 100);
}

async function qwe() {
  fs.readFile(`${__dirname}/template.html`, "utf-8", (err, data) => {
    if (err) throw err;
    let template = data;
    fs.readdir(`${__dirname}/components`, (err, files) => {
      if (err) throw err;
      files.forEach((item) => {
        let comp = item.substr(0, item.lastIndexOf("."));
        let end = item.substr(item.lastIndexOf(".") + 1);
        if (end == "html") {
          fs.readFile(
            `${__dirname}/components/${item}`,
            "utf-8",
            (err, component) => {
              if (err) throw err;

              template = template.replace(`{{${comp}}}`, component);

              fs.writeFile(
                `${__dirname}/project-dist/index.html`,
                template,
                (err) => {
                  if (err) throw err;
                }
              );
            }
          );
        }
      });
    });
  });
}
qwe();

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
              `${__dirname}/project-dist/style.css`,
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
