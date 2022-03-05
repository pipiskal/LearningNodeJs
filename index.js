// fs gives us the ability to read and write data to files

// Read files Synchronously - Blocking

const fs = require(`fs`); // fs stands for file system

// Sync here stands for synchronous operation
// it will read the data and return it to us
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

const textArr = textIn.split(" ");

const textOut = `This is what we know about avocado |:| ${textIn}. \nCreated on ${Date.now()}`;

// this time to write something to a file
// creates a new file if it doenst exists , in this case output.txt
fs.writeFileSync("./txt/output.txt", textOut);

// Read files ASynchronously -- Non blocking

// 1st paraneter is the error
// 2nd is the data
// it doenst return anything

// ------CALLBACK HELL----
fs.readFile("./txt/starttttt.txt", "utf-8", (error, data1) => {
  if (error) {
    console.log(`Error 🤯`);
    return;
  }
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (error, data2) => {
    fs.readFile("./txt/append.txt", "utf-8", (error, data3) => {
      const fullText = `${data1} \n${data2} \n${data3}`;
      console.log(fullText);

      fs.writeFile("./txt/output.txt", fullText, "utf-8", (error) => {
        console.log("Your file has been written 😄");
      });
    });
  });
});
