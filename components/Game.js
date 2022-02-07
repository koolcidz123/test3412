AFRAME.registerComponent("game-play", {
  schema: {
    elementId: { type: "string", default: "#ring1" },
  },
  update: function () {
    this.isCollided(this.data.elementId);
  },

  init: function () {
    var duration = 10;
    const timerEl = document.querySelector("#timer");
    this.startTimer(duration, timerEl);
  },



  startTimer: function (duration, timerEl) {
    var minutes;
    var seconds;

    setInterval =(() => {
        if (duration >= 0) {
          minutes = parseInt(duration / 60);
          seconds = parseInt(duration % 60);

          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          if (seconds < 10) {
            seconds = "0" + seconds;
          }

          timerEl.setAttribute("text", {
            value: minutes + ":" + seconds,
          });

          duration -= 1;
        }
        else {
          this.gameOver()
        }
      },
      1000);


  },



  updateScore: function () {
    const element = document.querySelector("#score");
    var count = element.getAttribute("text").value
    var currentScore = parseInt(count)
    currentScore += 1;
    element.setAttribute("text", { value: currentScore })

  },
  isCollided: function (elemntId) {
    const element = document.querySelector(elemntId);
    element.addEventListener("collide", (e) => {
      if (elemntId.includes("#ring")) {
        element.setAttribute("visible", false);
        this.updateScore()

      }
      else if (elemntId.includes("#hurdle")) {
        element.setAttribute("visible", false);
        this.updateScore()
      }

      else {
        this.gameOver()
      }

    });
  },

  gameOver: function () {
    const element = document.querySelector("#timer");
    const elementId = document.querySelector("#over");
    elementId.setAttribute("visible", true)
  },

});
