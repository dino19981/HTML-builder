const path = require("path");
const fs = require("fs");

//
let stream = new fs.ReadStream(`${__dirname}/text.txt`, { encoding: "utf-8" });

stream.on("readable", (err) => {
  if (err) throw err;
  console.log(stream.read());
  stream.close();
});
