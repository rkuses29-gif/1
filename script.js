const scenes = [...document.querySelectorAll(".scene")];
let current = "scene-home";
let noCount = 0;

const music = document.getElementById("music");
const musicToggle = document.getElementById("musicToggle");
const musicInput = document.getElementById("musicInput");

const noStates = [
  {
    gif: "assets/no.gif",
    eyebrow: "oh... you clicked no? 🥺",
    title: "Are you <span>really sure?</span>",
    lead: "Maybe this little surprise can change your mind...",
    hint: ""
  },
  {
    gif: "assets/no2.gif",
    eyebrow: "you clicked no again?! 😭",
    title: "Come on... <span>one more chance?</span>",
    lead: "The surprise is getting a little sad now...",
    hint: "Maybe YES would be a better idea? 🥺"
  },
  {
    gif: "assets/no3.gif",
    eyebrow: "NO AGAIN?! 😭💔",
    title: "You're really making me <span>work for this...</span>",
    lead: "Okay... I'm not giving up that easily.",
    hint: "There is still one more NO... 👀"
  },
  {
    gif: "assets/no4.gif",
    eyebrow: "LAST WARNING 😭",
    title: "PLEASE... <span>just accept it!</span>",
    lead: "This is the final little surprise before I give up dramatically. 🥹",
    hint: "Okay... last chance."
  }
];

function showScene(name) {
  const target = document.getElementById("scene-" + name);
  if (!target) return;
  scenes.forEach((s) => s.classList.remove("active"));
  target.classList.add("active");
  current = target.id;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateNoScene() {
  const gif = document.getElementById("noGif");
  const eyebrow = document.getElementById("noEyebrow");
  const title = document.getElementById("noTitle");
  const lead = document.getElementById("noLead");
  const hint = document.getElementById("noAgainHint");

  const state = noStates[Math.min(noCount, noStates.length - 1)];

  if (gif) gif.src = state.gif;
  if (eyebrow) eyebrow.textContent = state.eyebrow;
  if (title) title.innerHTML = state.title;
  if (lead) lead.textContent = state.lead;
  if (hint) hint.textContent = state.hint;
}

const yesBtn = document.getElementById("yesBtn");
if (yesBtn) yesBtn.addEventListener("click", () => showScene("hug"));

const noBtn = document.getElementById("noBtn");
const noHint = document.getElementById("noHint");
if (noBtn) {
  noBtn.addEventListener("click", () => {
    noCount = 0;
    updateNoScene();
    if (noHint) noHint.textContent = "";
    showScene("no");
  });
}

const noAgain = document.getElementById("noAgain");
const noAgainHint = document.getElementById("noAgainHint");
if (noAgain) {
  noAgain.addEventListener("click", () => {
    if (noCount < noStates.length - 1) {
      noCount += 1;
      updateNoScene();
    } else {
      if (noAgainHint) {
        noAgainHint.textContent = "Okay okay 😭 You win... but I'm still leaving the surprise here 💗";
      }
    }

    noAgain.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-8px)" },
        { transform: "translateX(8px)" },
        { transform: "translateX(0)" }
      ],
      { duration: 300 }
    );
  });
}

document.querySelectorAll("[data-next]").forEach((btn) => {
  btn.addEventListener("click", () => showScene(btn.dataset.next));
});

const restartBtn = document.getElementById("restart");
if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    noCount = 0;
    updateNoScene();
    showScene("home");
  });
}

const celebrateBtn = document.getElementById("celebrateBtn");
const celebrateBox = document.getElementById("celebrateBox");
const celebrateVideo = document.getElementById("celebrateVideo");

if (celebrateBtn && celebrateBox && celebrateVideo) {
  celebrateBox.hidden = true;
  celebrateBtn.textContent = "Let's celebrate 🎉";
  celebrateVideo.volume = 1;
  celebrateVideo.muted = false;
  celebrateVideo.pause();
  celebrateVideo.currentTime = 0;

  celebrateBtn.addEventListener("click", () => {
    const isVisible = !celebrateBox.hidden;

    if (isVisible) {
      celebrateBox.hidden = true;
      celebrateVideo.pause();
      celebrateBtn.textContent = "Let's celebrate 🎉";
      return;
    }

    celebrateBox.hidden = false;
    celebrateBtn.textContent = "Hide celebration 🎉";
    celebrateVideo.currentTime = 0;
    celebrateVideo.load();
    celebrateVideo.volume = 1;
    celebrateVideo.muted = false;

    setTimeout(() => {
      celebrateVideo.play().catch(() => {});
    }, 50);
  });
}

if (musicInput) {
  musicInput.addEventListener("change", () => {
    const file = musicInput.files[0];
    if (!file) return;
    music.src = URL.createObjectURL(file);
    music.play().then(() => {
      musicToggle.textContent = "Music on";
    }).catch(() => {
      musicToggle.textContent = "Press play";
    });
  });
}

if (musicToggle) {
  musicToggle.addEventListener("click", () => {
    if (!music.src) {
      musicInput.click();
      return;
    }
    if (music.paused) {
      music.play();
      musicToggle.textContent = "Music on";
    } else {
      music.pause();
      musicToggle.textContent = "Music off";
    }
  });
}
