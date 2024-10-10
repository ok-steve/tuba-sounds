export default function () {
  return {
    getTagsFromCollection(collection) {
      return Array.from(
        new Set(
          collection.flatMap((item) => item.data.tags).filter((item) => item)
        )
      );
    },
  };
}
