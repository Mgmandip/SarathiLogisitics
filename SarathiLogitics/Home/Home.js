function switchTab(tab) {
  const tabs = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-btn");

  tabs.forEach((t) => t.classList.remove("active"));
  buttons.forEach((b) => b.classList.remove("active"));

  document.getElementById(tab + "-tab").classList.add("active");
  document
    .querySelector(`.tab-btn[onclick="switchTab('${tab}')"]`)
    .classList.add("active");
}

const learnMoreButtons = document.querySelectorAll(".learnMoreBtn");

learnMoreButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const targetPage = this.dataset.target;
    window.location.href = targetPage;
  });
});
