const button = document.getElementById("btn-generate");
const result = document.getElementById("resultado");
const loading = document.getElementById("loading");
const crystal = document.querySelector(".crystal");
const sound = document.getElementById("mystic-sound");

button.addEventListener("click", async () => {
  sound.currentTime = 0;
  sound.play().catch(() => {});
  result.textContent = "";
  result.classList.remove("show");
  loading.classList.remove("hidden");
  crystal.classList.add("loading");

  try {
    const response = await fetch("https://api.adviceslip.com/advice");

    if (!response.ok) {
      throw new Error("Erro ao buscar a sorte");
    }

    const data = await response.json();
    const adviceEN = data.slip.advice;

    const translateResponse = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        adviceEN
      )}&langpair=en|pt`
    );

    if (!translateResponse.ok) {
      throw new Error("Erro na tradução");
    }

    const translatedData = await translateResponse.json();
    const advicePT = translatedData.responseData.translatedText;

    setTimeout(() => {
      result.textContent = `"${advicePT}"`;
      result.classList.add("show");
      loading.classList.add("hidden");
      crystal.classList.remove("loading");
    }, 1500);
  } catch (error) {
    console.error(error);
    setTimeout(() => {
      result.textContent = "O universo está confuso hoje. Tente novamente.";
      result.classList.add("show");
      loading.classList.add("hidden");
      crystal.classList.remove("loading");
    }, 1500);
  }
});
