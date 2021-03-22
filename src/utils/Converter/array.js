export const removeDuplicateSearch = (recentSearch, description) => {
  recentSearch.forEach((item, index) => {
    if (item.description === description) {
      recentSearch.splice(index, 1);
    }
  });
};
