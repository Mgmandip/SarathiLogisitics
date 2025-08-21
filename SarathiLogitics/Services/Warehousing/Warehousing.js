const learnMoreButtons = document.querySelectorAll(".learnMoreBtn");

learnMoreButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const targetPage = this.dataset.target;
    window.location.href = targetPage;
  });
});
