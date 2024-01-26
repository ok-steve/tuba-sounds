module.exports = function (path) {
  let match;
  const collection = this.ctx.collections.all;

  for (let entry of collection) {
    if (entry.inputPath.includes(path)) {
      match = entry;
      break;
    }
  }

  if (match !== undefined) {
    return match.url;
  }  
};
