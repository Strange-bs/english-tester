const api_token = "config.api_token";
const chat_id = "config.chat_id";
const sendStats = false;


let questions = [{
  numb: 1,
  question: "A dictionary has data _____ words.",
  answer: "about",
  options: ["to", "about", "in", "at"]
}, {
  numb: 2,
  question: " _____ you pass me the salt?",
  answer: "Could",
  options: ["Should", "Must", "Could", "Might"]
}, {
  numb: 3,
  question: "Did you _____ who I meant?",
  answer: "know",
  options: ["known", "knew", "know", "got"]
}, {
  numb: 4,
  question: "He _____ English much _____ he writes it.",
  answer: "speaks / better than",
  options: ["speaks / better than", "speak / worse", "speaks / clearer than", "speak /  a lot"]
}, {
  numb: 5,
  question: "I suggest _______  arrive a little early so as to get a good seat.",
  answer: "you should",
  options: ["you should not", "to arrive", "you to should", "you should"]
}, {
  numb: 6,
  question: "______ it`s raining, I will stay at home.",
  answer: "as long as",
  options: ["as long as", "on the other hand", "Because of", "however"]
},
{
  numb: 7,
  question: "It ______ me ____ hour to get to that place yesterday.",
  answer: "took / an",
  options: ["takes / a", "took / 2", "taken / an", "took / an"]
},
{
  numb: 8,
  question: "Who is the man _____ the red tie?",
  answer: "with",
  options: ["in", "on", "with", "off"]
},
{
  numb: 9,
  question: "I have been getting knowledge about IT _______ June.",
  answer: "since",
  options: ["since", "for", "to", "by"]
},
{
  numb: 10,
  question: "If I had a chance to study abroad, I _______ make my way to ________?",
  answer: "would  / Hungary",
  options: ["would / Hungry", "would  / Hungary", "were / Hungry", "was / Hungary"]
},
];


// Who is the man _____ the red tie?
function dates() {
date = new Date, min = date.getMinutes(), hour = date.getHours(), mon = date.getMonth() + 1, day = date.getDate();
return {
  min: min,
  hour: hour,
  mon: mon,
  day: day
}
}
const start_btn = document.querySelector(".start_btn button"),
info_box = document.querySelector(".info_box"),
exit_btn = info_box.querySelector(".buttons .quit"),
continue_btn = info_box.querySelector(".buttons .restart"),
quiz_box = document.querySelector(".quiz_box"),
result_box = document.querySelector(".result_box"),
option_list = document.querySelector(".option_list"),
time_line = document.querySelector("header .time_line"),
timeText = document.querySelector(".timer .time_left_txt"),
timeCount = document.querySelector(".timer .timer_sec"),
userName = document.querySelector("#username");
let use;
let counter, counterLine, timeValue = 50,
    que_count = 0,
    que_numb = 1,
    userScore = 0,
    widthValue = 0;

function send(e) {
let t = `https://api.telegram.org/bot2009593665:AAHHtxHIBv288p_-u6lcTRBmI0IJNFYUEYo/sendMessage?chat_id=-1001487455180&text=${e}`;
var n = new XMLHttpRequest;
n.open("GET", t, !0), n.send()
}

start_btn.onclick = (() => {
  // Check if the value of userName input is not an empty string
  if ("" != userName.value) {
      // If not empty, add the "activeInfo" class to the info_box element
      info_box.classList.add("activeInfo");
      // Set the opacity of the parent element of the start button to 0
      start_btn.parentElement.style.opacity = 0;
      // Assign the value of userName to the variable "use"
      use = userName.value;
  }
});

// Function assigned to the click event of the exit button
exit_btn.onclick = (() => {
  // Remove the "activeInfo" class from the info_box element
  info_box.classList.remove("activeInfo");
  // Set the value of userName input to an empty string
  userName.value = "";
  // Set the opacity of the parent element of the start button to 1
  start_btn.parentElement.style.opacity = 1;
});

// Function assigned to the click event of the continue button
continue_btn.onclick = (() => {
  // Remove the "activeInfo" class from the info_box element
  info_box.classList.remove("activeInfo");
  // Add the "activeQuiz" class to the quiz_box element
  quiz_box.classList.add("activeQuiz");
  // Call functions to show questions, update question counter, start timer, and start timer line
  showQuetions(0);
  queCounter(1);
  startTimer(timeValue);
  startTimerLine(0);

  // Generate a message and send it using the send function
  send(`Foydalanuvchi: ${use}%0A\nBoshlash vaqti: ${dates().hour}:${dates().min}%0A\nSana: ${dates().mon}/${dates().day}`);
});

// Variables to store various values and states


// DOM elements for restart and quit buttons
const restart_quiz = result_box.querySelector(".buttons .restart"),
    quit_quiz = result_box.querySelector(".buttons .quit");

// Function assigned to the click event of the restart button
restart_quiz.onclick = (() => {
    // Add the "activeQuiz" class to the quiz_box element
    quiz_box.classList.add("activeQuiz");
    // Remove the "activeResult" class from the result_box element
    result_box.classList.remove("activeResult");
    
    // Reset various values and states
    timeValue = 50;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    que_count = 0;

    // Call functions to show questions, update question counter, start timer, and start timer line
    showQuetions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);

    // Update the text content of the timeText element
    timeText.textContent = "Time Left";
    
    // Remove the "show" class from the next_btn element
    next_btn.classList.remove("show");
});

// Function assigned to the click event of the quit button
quit_quiz.onclick = (() => {
    // Reload the window, effectively restarting the application
    window.location.reload();
});

const next_btn = document.querySelector("footer .next_btn"),
bottom_ques_counter = document.querySelector("footer .total_que");
// Function to display questions on the quiz interface
function showQuetions(e) {
  // Select the element with class "que_text"
  const t = document.querySelector(".que_text");

  // Construct HTML content for the question and options
  let n = "<span>" + questions[e].numb + ". " + questions[e].question + "</span>",
      o =
          '<div class="option"><span>' + questions[e].options[0] + '</span></div>' +
          '<div class="option"><span>' + questions[e].options[1] + '</span></div>' +
          '<div class="option"><span>' + questions[e].options[2] + '</span></div>' +
          '<div class="option"><span>' + questions[e].options[3] + "</span></div>";

  // Set the HTML content of the "que_text" element and "option_list" element
  t.innerHTML = n;
  option_list.innerHTML = o;

  // Select all elements with class "option" within "option_list"
  const s = option_list.querySelectorAll(".option");

  // Add onclick event to each option element, calling the function "optionSelected(this)"
  for (i = 0; i < s.length; i++) s[i].setAttribute("onclick", "optionSelected(this)");
}

// Event handler for the click event of the "Next" button
next_btn.onclick = (() => {
  // Check if there are more questions to display
  if (que_count < questions.length - 1) {
      // Increment question number, display the next question, and update counters and timers
      que_numb++;
      showQuetions(++que_count);
      queCounter(que_numb);
      clearInterval(counter);
      clearInterval(counterLine);
      startTimer(timeValue);
      startTimerLine(widthValue);
      timeText.textContent = "Time Left";
      next_btn.classList.remove("show");
  } else {
      // If no more questions, stop counters and show the quiz result
      clearInterval(counter);
      clearInterval(counterLine);
      showResult();
  }
});

// HTML tags for tick and cross icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>',
  crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// Function to handle the selection of an option
function optionSelected(e) {
  // Stop the timers
  clearInterval(counter);
  clearInterval(counterLine);

  // Get the selected option's text content and the correct answer for the current question
  let t = e.textContent,
      n = questions[que_count].answer;

  // Get the total number of options
  const o = option_list.children.length;

  // Check if the selected option is correct
  if (t == n) {
      // If correct, increment the user's score, add styling for correctness, and log the result
      userScore += 1;
      e.classList.add("correct");
      e.insertAdjacentHTML("beforeend", tickIconTag);
      console.log("Correct Answer");
      console.log("Your correct answers = " + userScore);
  } else {
      // If incorrect, add styling for incorrectness, insert a cross icon, and log the result
      e.classList.add("incorrect");
      e.insertAdjacentHTML("beforeend", crossIconTag);
      console.log("Wrong Answer");

      // Loop through options to find and highlight the correct answer
      for (i = 0; i < o; i++) {
          if (option_list.children[i].textContent == n) {
              option_list.children[i].setAttribute("class", "option correct");
              option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
              console.log("Auto selected correct answer.");
          }
      }
  }

  // Disable all options and show the "Next" button
  for (i = 0; i < o; i++) {
      option_list.children[i].classList.add("disabled");
  }
  next_btn.classList.add("show");
}


// Function to display the quiz result
function showResult() {
  // Remove classes for active info and quiz, and add the class for active result
  info_box.classList.remove("activeInfo");
  quiz_box.classList.remove("activeQuiz");
  result_box.classList.add("activeResult");

  // Select the element with class "score_text"
  const e = result_box.querySelector(".score_text");

  // Check the user's score and display a corresponding message
  if (userScore > 3) {
      let t = "<span>and congrats! , You got " + userScore + " out of " + questions.length + "</span>";
      e.innerHTML = t;
  } else if (userScore > 1) {
      let t = "<span>and nice , You got " + userScore + " out of " + questions.length + "</span>";
      e.innerHTML = t;
  } else {
      let t = "<span>and sorry , You got only " + userScore + " out of " + questions.length + "</span>";
      e.innerHTML = t;
  }

  // Generate a text with user details and quiz result and send it
  text = `\nUser:${use}%0aTugash vaqti: ${dates().hour}:${dates().min}%0A\nNatija: ${userScore} / ${questions.length}`;
  send(text);
}// Function to start the countdown timer
function startTimer(e) {
  // Set up an interval that runs every 1000 milliseconds (1 second)
  counter = setInterval(function () {
      // Update the displayed time with the current value of e
      timeCount.textContent = e;

      // Check if the remaining time is less than 9 and prepend a leading zero
      if (--e < 9) {
          let t = timeCount.textContent;
          timeCount.textContent = "0" + t;
      }

      // Check if the time has run out
      if (e < 0) {
          // Stop the timer, update timeText, and get the correct answer
          clearInterval(counter);
          timeText.textContent = "Time Off";
          const numOptions = option_list.children.length;
          let correctAnswer = questions[que_count].answer;

          // Loop through options to find and highlight the correct answer
          for (i = 0; i < numOptions; i++) {
              if (option_list.children[i].textContent == correctAnswer) {
                  option_list.children[i].setAttribute("class", "option correct");
                  option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                  console.log("Time Off: Auto selected correct answer.");
              }
          }

          // Disable all options and show the "Next" button
          for (i = 0; i < numOptions; i++) {
              option_list.children[i].classList.add("disabled");
          }
          next_btn.classList.add("show");
      }
  }, 1000); // Interval set to 1000 milliseconds (1 second)
}

// Function to start the progress bar timer
function  startTimerLine(initialWidth = 0) {
// 
}
// Function to update the question counter
function queCounter(e) {
  // Create HTML content for the question counter
  let t = "<span><p>" + e + "</p> of <p>" + questions.length + "</p> Questions</span>";

  // Set the HTML content of the bottom_ques_counter element
  bottom_ques_counter.innerHTML = t;
}
