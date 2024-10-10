import minify from "./minify.js";

const transforms = {
  minify,
};

export default (config) => {
  Object.entries(transforms).forEach((item) => {
    const [name, transform] = item;
    config.addTransform(name, transform);
  });
};
