import embed from "./embed.js";
import image from "./image.js";

const shortcodes = {
  embed,
  image,
};

export default (config) => {
  Object.entries(shortcodes).forEach((item) => {
    const [name, shortcode] = item;
    // TODO should these be async shortcodes?
    config.addShortcode(name, shortcode);
  });
};
