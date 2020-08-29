const fs = require("fs");
const Machine = require("./machine");
const { readFile } = require("./helper");

//Main function which drives the code
const main = async () => {
  const input = await readFile(__dirname, process.argv[2]);
  const machine = new Machine(input);
  const result = await machine.process();
  result.map((str) => console.log(str));
};

main();
