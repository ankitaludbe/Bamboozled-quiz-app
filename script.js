document.addEventListener("DOMContentLoaded", () => {
  const questionEl = document.querySelector(".que");
  const answersEl = document.querySelector(".answers");
  const nextBtn = document.querySelector(".btnnxt");
  const befBtn = document.querySelector(".btnbef");
  let scoreEl = document.querySelector(".score");

  const apiKey = "OHFh9BwchK7D8lXzqFS6MnINWrZT8Ubif3ulUPNx";
  const apiUrl =
    "https://quizapi.io/api/v1/questions?category=react&difficulty=Easy&limit=10";

  let quizData = [];
  let currentIndex = 0;
  let score = 0;

  async function getData() {
    const response = await fetch(apiUrl, { headers: { "X-Api-Key": apiKey } });
    quizData = await response.json();
    console.log(quizData);
    showQuestion();
  }

  function showQuestion() {
    const q = quizData[currentIndex];
    questionEl.textContent = currentIndex+1 + "." + " " +q.question;
    // questionEl.textContent = q.question;

    answersEl.innerHTML = "";
    Object.entries(q.answers).forEach(([key, ans]) => {
      if (ans) {
        const divas = document.createElement("button");
        divas.className = "ans";
        divas.textContent = ans;
        divas.dataset.key = key;
        divas.addEventListener("click", () => {
          const isCorrect = q.correct_answers[key + "_correct"] === "true";
          if (isCorrect) {
            divas.style.backgroundColor = "green";
            // alert("Correct!");
            score++;
            scoreEl.textContent = "Your score is: " + score + " / 10";
          } else {
            divas.style.backgroundColor = "red";
            // alert("Wrong! Choose again.");
          }
          const allButtons = answersEl.querySelectorAll("button");
          allButtons.forEach(btn => btn.disabled = true);
        });
        answersEl.appendChild(divas);
        
      }
    });
  }
  
  // function befQue() {
  //   if(currentIndex < quizData.length && currentIndex != quizData.length){
  //     currentIndex--;
  //     showQuestion();
  //   } else {
  //     answersEl.innerHTML = "";
  //     befBtn.style.display = "none";
  //   }
   
  // }

  // befBtn.addEventListener("click",befQue);
  
  function nextQue() {
    currentIndex++;
    if (currentIndex < quizData.length) {
      showQuestion();
    } else {
      questionEl.textContent = "🎉 Quiz Finished!";
      answersEl.innerHTML = "";
      nextBtn.style.display = "none";
    }
  }

  nextBtn.addEventListener("click", nextQue);

  getData();
});
