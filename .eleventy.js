const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');
const EleventyNavigation = require('@11ty/eleventy-navigation');

require('dotenv').config();

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(EleventyNavigation);

  eleventyConfig.setServerPassthroughCopyBehavior('passthrough');
  eleventyConfig.addPassthroughCopy('./public');
  eleventyConfig.addPassthroughCopy('./src/sw.js');

  return {
    dir: {
      input: 'src',
      output: 'dist',
      layouts: '_layouts',
    },
  };
};
