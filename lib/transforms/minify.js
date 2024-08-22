const { minify } = require("html-minifier");

module.exports = function (content, outputPath) {
  if (
    process.env.ELEVENTY_RUN_MODE === "build" &&
    outputPath &&
    outputPath.endsWith(".html")
  ) {
    return minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
    });
  }

  return content;
};
