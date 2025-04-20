export const stripHtml = (content) => {
  if (content) {
    const noTags = content.replace(/<[^>]*>?/gm, "");
    const noEntities = noTags.replace(/&[^;]+;/gm, "");
    return noEntities;
  }

};
