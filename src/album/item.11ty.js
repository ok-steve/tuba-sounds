class Item {
  data() {
    return {
      layout: false,
      permalink({ item }) {
        return `album/${this.slugify(item.data.title)}-${this.slugify(
          item.key
        )}.md`;
      },
      pagination: {
        data: "collectionItems",
        size: 1,
        alias: "item",
        addAllPagesToCollections: true,
      },
      eleventyComputed: {
        title: ({ item }) => item.data.title,
        date: ({ item }) => item.data.dateAdded,
        byArtist: ({ item }) =>
          item.data.creators.map(
            ({ name, firstName, lastName, creatorType }) => ({
              name: name || `${firstName} ${lastName}`,
              roleName: creatorType,
            })
          ),
        publisher: ({ item }) => item.data.label,
        datePublished: ({ item }) => item.data.date,
        tags: ({ item }) => item.data.tags?.map(({ tag }) => tag),
        thumbnailUrl: ({ item }) => {
          const images = item.children?.filter(
            ({ data }) =>
              data.linkMode === "imported_file" ||
              (data.linkMode === "linked_url" &&
                (data.url.endsWith("jpg") || data.url.endsWith("jpeg")))
          );

          if (!images || images.length === 0) return;

          if (this.data.linkMode === "imported_file") {
            return images[0].links.enclosure.href;
          } else {
            return images[0].data.url;
          }
        },
        audio: ({ item }) => {
          const audio = item.children?.filter(
            ({ data }) =>
              data.linkMode === "linked_url" &&
              !data.url.endsWith("jpg") &&
              !data.url.endsWith("jpeg")
          );

          if (!audio || audio.length === 0) return;

          return audio.map(({ data }) => data.url);
        },
      },
    };
  }

  render(data) {
    return `---
title: '${data.title}'
permalink: false
date: ${data.date}
byArtist: ${data.byArtist
      ?.map(
        ({ name, roleName }) => `
  - name: ${name}
    roleName: ${roleName}`
      )
      .join(``)}
publisher: ${data.publisher}
datePublished: ${data.datePublished}
tags: ${data.tags?.map(
      (tag) => `
  - ${tag}
`
    )}
thumbnailUrl: ${data.thumbnailUrl}
audio: ${data.audio
      ?.map(
        (url) => `
  - url: ${url}
`
      )
      .join(``)}
---
${data.item.data.abstractNote}`;
  }
}

module.exports = Item;
