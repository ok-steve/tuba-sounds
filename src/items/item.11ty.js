class Item {
  data() {
    return {
      permalink({ item }) {
        return `items/${this.slugify(item.data.title)}-${this.slugify(
          item.key
        )}/`;
      },
      pagination: {
        data: 'collectionItems',
        size: 1,
        alias: 'item',
        addAllPagesToCollections: true,
      },
      eleventyComputed: {
        title: ({ item }) => item.data.title,
        date: ({ item }) => item.data.dateAdded,
        creators: ({ item }) =>
          item.data.creators.map(
            ({ name, firstName, lastName, creatorType }) => ({
              name: name || `${firstName} ${lastName}`,
              role: creatorType,
            })
          ),
        publisher: ({ item }) => item.data.label,
        datePublished: ({ item }) => item.data.date,
        tags: ({ item }) => item.data.tags?.map(({ tag }) => tag),
        thumbnailUrl: ({ item }) => {
          const images = item.children?.filter(
            ({ data }) =>
              data.linkMode === 'imported_file' ||
              (data.linkMode === 'linked_url' &&
                (data.url.endsWith('jpg') || data.url.endsWith('jpeg')))
          );

          if (!images || images.length === 0) return;

          if (this.data.linkMode === 'imported_file') {
            return images[0].links.enclosure.href;
          } else {
            return images[0].data.url;
          }
        },
        audio: ({ item }) => {
          const audio = item.children?.filter(
            ({ data }) =>
              data.linkMode === 'linked_url' &&
              !data.url.endsWith('jpg') &&
              !data.url.endsWith('jpeg')
          );

          if (!audio || audio.length === 0) return;

          return audio.map(({ data }) => data.url);
        },
      },
    };
  }

  render({ item }) {
    return item.data.abstractNote;
  }
}

module.exports = Item;
