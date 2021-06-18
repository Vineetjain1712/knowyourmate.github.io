// code by webdevtrick (https://webdevtrick.com)
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function populate() {
    if(quiz.isEnded()) {
        showScores();
        // addlink();

    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    if (quiz.score>3) {
        var gameOverHTML = `<h1>Hurrayyyy!!</h1>`
        
    } else {
        var gameOverHTML = `<h1>Bad luck... </h1>`
    }
    gameOverHTML += "<p> <br> </p>";
    gameOverHTML += "<h2 id='score' > You rushed a match of : " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    document.getElementById("quiz").style.color = "rgb(238, 163, 225)";
    document.getElementById("quiz").style.textShadow = "2px 2px darkblue";
    element.innerHTML = gameOverHTML;
    document.getElementById("newlink").style.display = "block"
    
};

// create questions here
var questions = [
    new Question("What did i think about you when i first saw you?", ["Friend", "love", "Bf/Gf", "Just a person"], "love"),
    new Question("Which food do i like the most?", ["Momos", "Burger","Ice-cream", "Chocolate"], "Momos"),
    new Question("What's the cutest thing about you i like the most?", ["Smile", "Laugh", "Hairs", "Eyes"], "Laugh"),
    new Question("Which pet i like the most?", ["Cat", "Birds", "Fish", "Dog"], "Dog")
    new Question("What would my reaction if you'll kiss me?", ["Slap you", "Kiss you back","Became shy", "Stop talking"], "Became shy"),
];
// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();

