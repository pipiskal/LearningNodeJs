const fs = require("fs");

const text = fs.readFileSync(`${__dirname}/../txt/input.txt`, "utf-8");

// read async

fs.readFile(`${__dirname}/../txt/input.txt`, "utf-8", (error, data) => {
  if (error) {
    console.log(error);
  }
  dataTest = data.split(" ");
  console.log(dataTest);
});

// write data Synch

let text1 = "this is a beatiful day and i want to write a lot of code";

fs.writeFileSync(`${__dirname}/volume1.txt`, text1);

// lets do the same asynchronously

let text2 =
  "this a text that will be written asynchronously and it needs to be nice";

fs.writeFile(`${__dirname}/volumeAsync.txt`, text2, (err) => {
  if (err) console.log(err);

  console.log("file written");
});
