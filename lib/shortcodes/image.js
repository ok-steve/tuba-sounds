import Image from "@11ty/eleventy-img";

export default async function (url, alt = "") {
  try {
    const stats = await Image(url, {
      widths: [300],
      urlPath: "/public/img/uploads/",
      outputDir: "./dist/public/img/uploads/",
      cacheOptions: {
        duration: "1y",
        type: "buffer",
        fetchOptions: {
          headers: {
            "Zotero-API-Version": 3,
            "Zotero-API-Key": process.env.ZOTERO_API_KEY,
          },
        },
      },
    });

    return Image.generateHTML(stats, {
      alt,
      loading: "lazy",
      decoding: "async ",
    });
  } catch (err) {
    return ``;
  }
}
