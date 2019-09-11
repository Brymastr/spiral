const fs = require('fs');
const writeStream = fs.createWriteStream('./primes.txt');

function isPrime(num) {
  for (let i = 2; i < num; i++) if (num % i === 0) return false;
  return num > 1;
}

const d1 = new Date();
for (let i = 1; i < 1000000; i++)
  writeStream.write(`${isPrime(i) ? 1 : 0}`);
console.log((new Date() - d1) * .001);
