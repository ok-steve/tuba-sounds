import { URL } from "url";
import EleventyFetch from "@11ty/eleventy-fetch";

export default async function (url) {
  const { origin } = new URL(url);

  try {
    const { html } = await EleventyFetch(`${origin}/oembed?url=${url}`, {
      duration: "1y",
      type: "json",
    });

    return html;
  } catch (err) {
    return `<a href="${url}">${url}</a>`;
  }
}
