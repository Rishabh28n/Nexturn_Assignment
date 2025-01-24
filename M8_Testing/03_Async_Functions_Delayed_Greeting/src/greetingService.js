function delayedGreeting(name, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      reject(new Error("Delay cannot be negative"));
      return;
    }
    setTimeout(() => {
      resolve(`Hello, ${name}!`);
    }, delay);
  });
}

module.exports = { delayedGreeting };
