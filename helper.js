//Contains helper functions for main.js and tests.js

const fs = require("fs");
const path = require("path");

const identity = (a) => a;

//Checks if two arrays are equal used in test.js
const arrEqual = (a, b) => {
  if (a.length != b.length) return false;
  return a.every((value, i) => value == b[i]);
};

//Reads json file at the given path and returns a javascript object
const readFile = async (dirPath, filename) =>
  JSON.parse(fs.readFileSync(path.join(dirPath, filename)));

//Mimics the machine processing time. Waits 500ms
const setTimeout500 = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

module.exports = {
  identity,
  arrEqual,
  readFile,
  setTimeout500,
};
