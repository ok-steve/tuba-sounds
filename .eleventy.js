const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const EleventyNavigation = require("@11ty/eleventy-navigation");

require("dotenv").config();

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(EleventyNavigation);

  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
  eleventyConfig.addPassthroughCopy("./public");
  eleventyConfig.addPassthroughCopy("./src/sw.js");

  ["album"].forEach((name) => {
    eleventyConfig.addCollection(name, require(`./lib/collections/${name}`));
  });

  ["embed", "image"].forEach((key) =>
    eleventyConfig.addShortcode(key, require(`./lib/shortcodes/${key}`))
  );

  ["inputPathToUrl"].forEach((key) =>
    eleventyConfig.addFilter(key, require(`./lib/filters/${key}`))
  );

  ["minify"].forEach((name) => {
    eleventyConfig.addTransform(name, require(`./lib/transforms/${name}`));
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      layouts: "_layouts",
    },
  };
};
