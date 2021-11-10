const path = require("path");
const dirPath = path.join(__dirname, "files");

const { copyFile, mkdir, rm, readdir } = require("fs/promises");

async function func() {
  await rm(
    `04-copy-directory/files-copy`,
    { force: true, recursive: true },
    (err) => {
      if (err) {
        console.error(error.message);
      }
    }
  );
  await mkdir(`04-copy-directory/files-copy`, { recursive: true }, (err) => {
    if (err) {
      console.log(err.message);
    }
  });
  const files = await readdir(dirPath);
  for (const file of files) {
    await copyFile(
      `04-copy-directory/files/${file}`,
      `04-copy-directory/files-copy/${file}`
    );
  }
}

func();
