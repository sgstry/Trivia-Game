
var game = {
	questions: [{
					question: "This is question1",
					choices: ["This is choice 1", "This is choice 2", "This is choice 3", "This is choice 4"],
					correct: 1
				},
	            {
					question: "This is question2",
					choices: ["This is choice 1", "This is choice 2", "This is choice 3", "This is choice 4"],
					correct: 0
				},
	            {
					question: "This is question3",
					choices: ["This is choice 1", "This is choice 2", "This is choice 3", "This is choice 4"],
					correct: 2
				},
				  {
					question: "This is question4",
					choices: ["This is choice 1", "This is choice 2", "This is choice 3", "This is choice 4"],
					correct: 3
				},
			    {
					question: "This is question5",
					choices: ["This is choice 1", "This is choice 2", "This is choice 3", "This is choice 4"],
					correct: 1
				}],
	currentIndex: 0,
	numberOfQuestions: 5
};

var intervalId;

var timeUpMessage = "Oops, time's up! The correct answer is: ";
var congratsMessage = "Congrats! That is the correct answer!";
var loserMessage = "Not so fast! That answer is incorrect!";
var answerChosen = false;
var timeIsUp = false;
var numCorrect = 0;
var numIncorrect = 0;



$(document).ready(function() {

	function highlightIncorrectAnswers() {
		switch (game.questions[game.currentIndex].correct) {
			case 0:
				$("#choiceB").css("background-color", "red");
				$("#choiceC").css("background-color", "red");
				$("#choiceD").css("background-color", "red");
				break;
			case 1:
				$("#choiceA").css("background-color", "red");
				$("#choiceC").css("background-color", "red");
				$("#choiceD").css("background-color", "red");
				break;
			case 2:
				$("#choiceA").css("background-color", "red");
				$("#choiceB").css("background-color", "red");
				$("#choiceD").css("background-color", "red");
				break;
			case 3:
				$("#choiceA").css("background-color", "red");
				$("#choiceB").css("background-color", "red");
				$("#choiceC").css("background-color", "red");
				break;
		}
	};

	function highlightCorrectAnswer() {
		switch (game.questions[game.currentIndex].correct) {
			case 0:
				$("#choiceA").css("background-color", "green");
				break;
			case 1:
				$("#choiceB").css("background-color", "green");
				break;
			case 2:
				$("#choiceC").css("background-color", "green");
				break;
			case 3:
				$("#choiceD").css("background-color", "green");
				break;
		}
	};

	var stopwatch = {

		  time: 0,

		  reset: function() {
		    stopwatch.time = 0;
		    $("#timer").html("00:00");
		  },

		  start: function() {
		    $("#start").css("display", "none");
		    nextQuestion();
		  },

		  stop: function() {
		    clearInterval(intervalId);
		  },

		  count: function() {
		    stopwatch.time++;
		    var convertedTime = stopwatch.timeConverter(stopwatch.time);
		    $("#timer").html(convertedTime);
		    console.log(stopwatch.time);
		    if(stopwatch.time === 10) {
		    	stopwatch.stop();
		    	timeIsUp = true;
		    	answerChosen = true;
		    	highlightCorrectAnswer();
		    	highlightIncorrectAnswers();
		    	game.currentIndex++;

		    	if(game.currentIndex < game.numberOfQuestions) {
		    		$("#endRoundMessage").text(timeUpMessage + game.questions[game.currentIndex-1].choices[game.questions[game.currentIndex-1].correct]);
		    		$("#next").css("margin-top", "20px");
		    		$("#next").css("display", "table");
		    	} else {
		    		$("#endRoundMessage").text("Game over! You scored a "+numCorrect+" out of "+game.numberOfQuestions);
		    	}

		    	$("#endRoundMessage").css("display", "table");
		    }
		  },

		  timeConverter: function(t) {

		    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
		    var minutes = Math.floor(t / 60);
		    var seconds = t - (minutes * 60);

		    if (seconds < 10) {
		      seconds = "0" + seconds;
		    }

		    if (minutes === 0) {
		      minutes = "00";
		    }

		    else if (minutes < 10) {
		      minutes = "0" + minutes;
		    }

		    return minutes + ":" + seconds;
		  }
	};

	$("#start").on("click", function(){
		stopwatch.start();
	});

	$(".answerChoice").mouseover(function(){
		if(!answerChosen) {
			$(this).css("background-color", "yellow");
		}
	});

	$(".answerChoice").mouseout(function(){
		if(!answerChosen) {
    		$(this).css("background-color", "white");
		}
	});

	$(".answerChoice").on("click", function() {
		//Correct answer chosen in time
		if(!answerChosen && !timeIsUp && stopwatch.time < 30 && $(this).text() === game.questions[game.currentIndex].choices[game.questions[game.currentIndex].correct]) {
			clearInterval(intervalId);
			$(this).css("background-color", "green");
			answerChosen = true;
			game.currentIndex++;
			numCorrect++;
			if(game.currentIndex < game.numberOfQuestions) {
				$("#endRoundMessage").text(congratsMessage);
		    	$("#next").css("margin-top", "20px");
		    	$("#next").css("display", "table");
		    } else {
		    	$("#endRoundMessage").text("Game over! You scored a "+numCorrect+" out of "+game.numberOfQuestions);
		    }

		    $("#endRoundMessage").css("display", "table");
		}
		//Wrong answer chosen
		else if(!answerChosen && !timeIsUp && stopwatch.time < 30 && $(this).text() !== game.questions[game.currentIndex].choices[game.questions[game.currentIndex].correct]) {
			clearInterval(intervalId);
			$(this).css("background-color", "red");
			highlightCorrectAnswer();
			answerChosen = true;
			game.currentIndex++;
			numIncorrect++;
			if(game.currentIndex < game.numberOfQuestions) {
				$("#endRoundMessage").text(loserMessage);
		    	$("#next").css("margin-top", "20px");
		    	$("#next").css("display", "table");
		    } else {
		    	$("#endRoundMessage").text("Game over! You scored a "+numCorrect+" out of "+game.numberOfQuestions);
		    }

		    $("#endRoundMessage").css("display", "table");
		}
	});

	function nextQuestion() {
		intervalId = setInterval(stopwatch.count, 1000);
	    $("#question").text("Question "+(game.currentIndex+1)+": " + game.questions[game.currentIndex].question);
	    $("#question").css("display", "table");
	    $("#choiceA").text(game.questions[game.currentIndex].choices[0]);
	    $("#choiceA").css("display", "table");
	    $("#choiceB").text(game.questions[game.currentIndex].choices[1]);
	    $("#choiceB").css("display", "table");
	    $("#choiceC").text(game.questions[game.currentIndex].choices[2]);
	    $("#choiceC").css("display", "table");
	    $("#choiceD").text(game.questions[game.currentIndex].choices[3]);
	    $("#choiceD").css("display", "table");
	}

	$("#next").on("click", function() {
		$("#endRoundMessage").css("display", "none");
    	$("#next").css("display", "none");
    	$(".answerChoice").css("background-color", "white");
    	answerChosen = false;
    	timeIsUp = false;
    	stopwatch.reset();
    	nextQuestion();
	})



});