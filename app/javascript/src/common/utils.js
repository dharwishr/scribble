export const searchWithTitle = (data, input) =>
  data.filter(item => {
    if (input !== "") {
      return item?.title?.toLowerCase()?.includes(input?.toLowerCase());
    }

    return item;
  });
