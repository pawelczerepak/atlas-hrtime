const isFn = fn => fn && typeof fn === "function";

const hasHR = () => typeof process !== "undefined" && isFn(process.hrtime);
const hasNow = () => typeof performance !== "undefined" && isFn(performance.now);

module.exports = { isFn, hasHR, hasNow }