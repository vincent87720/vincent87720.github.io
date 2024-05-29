export const orderByDateDesc = (array: any[]) => {
  return array.sort((a: any, b: any) => {
    return (
      new Date(b.frontmatter.create).valueOf() -
      new Date(a.frontmatter.create).valueOf()
    );
  });
};

export const sortTag = (tagMap) => {
  return tagMap.sort((a, b) => {
    if (b.value - a.value == 0) {
      var nameA = a.key.toUpperCase();
      var nameB = b.key.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    }
    return b.value - a.value;
  });
};
