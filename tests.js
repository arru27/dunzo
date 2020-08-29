const fs = require("fs");
const path = require("path");
const Machine = require("./machine");
const { identity, arrEqual, readFile } = require("./helper");

const testsDirPath = path.join(__dirname, "tests");

const execute = async (input) => {
  const machine = new Machine(input);
  return machine.process();
};

//Runs a single test file and checks if the test has passed or not
const runTest = async (filename) => {
  const file = await readFile(testsDirPath, filename);
  const expected = file.output;
  const actual = await execute(file);
  const isTestPassed = arrEqual(actual, expected);
  const testResult = isTestPassed ? `test passed` : `test failed`;
  console.log(`${testResult} (${filename})`);
  return isTestPassed;
};

//Reads the tests directory which contains all the tests and runs
//each test file
fs.readdir(testsDirPath, function (err, files) {
  if (err) return console.log("Unable to scan directory: " + err);
  const tests = files.map(runTest);
  Promise.all(tests).then((result) =>
    console.log(`${result.filter(identity).length} tests passed`)
  );
});
