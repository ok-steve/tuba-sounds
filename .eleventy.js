import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import EleventyNavigation from "@11ty/eleventy-navigation";
import dotenv from "dotenv";
import collections from "./lib/collections/index.js";
import shortcodes from "./lib/shortcodes/index.js";
import transforms from "./lib/transforms/index.js";

dotenv.config();

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(EleventyNavigation);
  eleventyConfig.addPlugin(collections);
  eleventyConfig.addPlugin(shortcodes);
  eleventyConfig.addPlugin(transforms);

  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
  eleventyConfig.addPassthroughCopy("./public");
  eleventyConfig.addPassthroughCopy("./src/sw.js");

  return {
    dir: {
      input: "src",
      output: "dist",
      layouts: "_layouts",
    },
  };
}
