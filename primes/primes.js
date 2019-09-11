const fs = require('fs');
const inputFile = fs.readFileSync('./primes.txt', 'utf8');
const outputFile = fs.createWriteStream('./output.txt');

const primes = inputFile.split(/[^0-9]+/);
primes.shift();

let i = 0, num = 1;
let lastPrime = 0;
const limit = 10000000;
const d1 = new Date();
while (true) {
  const currentPrime = primes[i++];

  const numberOfZeros = currentPrime - lastPrime - 1;
  // console.log(lastPrime, currentPrime, numberOfZeros)
  for (let j = 0; j < numberOfZeros; j++) {
    outputFile.write('0');
    num++;
  }
  const d2 = new Date();
  // console.log(`#${num}`, d2 - d1);
  lastPrime = currentPrime;
  outputFile.write('1');
  if (++num >= limit) break;
}