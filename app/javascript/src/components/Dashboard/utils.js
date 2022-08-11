export const sortArticles = (articles, displayedArticles) => {
  const status = displayedArticles.status;
  const category = displayedArticles.category;

  if (status !== "All" && category !== "All") {
    return articles.filter(
      article =>
        article.status === status &&
        article.assigned_category.title === category
    );
  } else if (status === "All" && category !== "All") {
    return articles.filter(
      article => article.assigned_category.title === category
    );
  } else if (status !== "All" && category === "All") {
    return articles.filter(article => article.status === status);
  }

  return articles;
};
