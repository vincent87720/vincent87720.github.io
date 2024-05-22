export const orderByDateDesc = (array: any[]) => {
  return array.sort((a: any, b: any) => {
    return new Date(b.frontmatter.create).valueOf() - new Date(a.frontmatter.create).valueOf();
  });
};
