export const countItems = (list : string[]) => {
  let tagCount = new Map<string, number>();
  list.forEach((item) => {
    if (tagCount.has(item)) {
      tagCount.set(item, tagCount.get(item) + 1);
    } else {
      tagCount.set(item, 1);
    }
  });
  return Array.from(tagCount, ([key, value]) => ({ key, value }));
};
