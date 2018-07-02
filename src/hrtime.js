const { isFn, hasHR, hasNow } = require("./util");

module.exports = () => {
  if (hasHR()) return (t0=0) => {
    const t1 = process.hrtime();
    return t1[0]*1e9+t1[1]-t0
  }
  const now = hasNow() ? performance.now.bind(performance) : Date.now;
  return (t0=0) => now()*1e6-t0
}
