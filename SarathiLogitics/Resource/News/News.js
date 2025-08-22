document.querySelectorAll(".readmorebtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const articleId = btn.getAttribute("data-id");
    window.location.href = `Detail.html?id=${articleId}`;
  });
});
