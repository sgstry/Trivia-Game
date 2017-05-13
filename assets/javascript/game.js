
var game = {
	questions: [{
					question: "Which of the following teams has won the English Premier League title the most?",
					choices: ["Chelsea", "Arsenal", "Manchester United", "Liverpool"],
					images: ["assets/images/ch_logo.png","assets/images/ars_logo.png","assets/images/mu_logo.png","assets/images/liv_logo.png"],
					correct: 2,
					guessedAnswer: ""
				},
	            {
					question: "Which player earned the Best Player of the Year award last year? (2016)",
					choices: ["Cristiano Ronaldo", "Neymar", "Luis Suarez", "Lionel Messi"],
					images: ["assets/images/cr7_pic.jpg","assets/images/neymar.jpg","assets/images/suarez.png","assets/images/messi.png"],
					correct: 0,
					guessedAnswer: ""
				},
	            {
					question: "Which of the following teams won the UEFA Champions League last year? (2016)",
					choices: ["Barcelona", "Chelsea", "Bayern Munich", "Real Madrid"],
					images: ["assets/images/barc_logo.png","assets/images/ch_logo.png","assets/images/bm_logo.png","assets/images/rm_logo.png"],
					correct: 3,
					guessedAnswer: ""
				},
				  {
					question: "Which country won the last World Cup? (2014)",
					choices: ["Brazil", "Germany", "Argentina", "Spain"],
					images: ["assets/images/braz.png","assets/images/germany.png","assets/images/argen.png","assets/images/spain.png"],
					correct: 1,
					guessedAnswer: ""
				},
			    {
					question: "Who scored the most goals in the English Premier League this season? (2017)",
					choices: ["Zlatan Ibrahimovic", "Diego Costa", "Romelu Lukaku", "Eden Hazard"],
					images: ["assets/images/zlatan.jpg","assets/images/diego.png","assets/images/romelu.png","assets/images/eden.png"],
					correct: 2,
					guessedAnswer: ""
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

	function playAgain() {
		game.currentIndex = 0;
		for(var i=0;i<game.questions.length;i++) {
			game.questions[i].guessedAnswer = "";
		}
		clearInterval(intervalId);
		answerChosen = false;
		timeIsUp = false;
		numCorrect = 0;
		numIncorrect = 0;

		$("#results").css("display", "none");
		$("#game").css("background-color", "#cccccc");
		$("#game").css("border", "none");
		$("#timer").css("display", "table");
		$("#start").css("display", "table");
		$("#playAgain").css("display", "none");
		$("#endRoundMessage").css("display", "none");
		$("#resultsDetail").empty();

		$("#imageTL").css("display", "none");
		$("#imageTR").css("display", "none");
		$("#imageBL").css("display", "none");
		$("#imageBR").css("display", "none");
		$("#choiceA").css("display", "none");
		$("#choiceA").css("background-color", "white");
		$("#choiceB").css("display", "none");
		$("#choiceB").css("background-color", "white");
		$("#choiceC").css("display", "none");
		$("#choiceC").css("background-color", "white");
		$("#choiceD").css("display", "none");
		$("#choiceD").css("background-color", "white");
		$("#answersTop").css("display", "block");
		$("#answersBottom").css("display", "block");
	}

	function showResults() {
		$("#timer").css("display", "none");
		$("#question").css("display", "none");
		$("#playAgain").css("display", "table");
		$("#answersTop").css("display", "none");
		$("#answersBottom").css("display", "none");
		$("#game").css("background-color", "white");
		$("#game").css("border", "solid");

		$("#results").css("display", "block");
		for(var i = 0;i < game.questions.length;i++) {
			var question = $("<div>"+game.questions[i].question+"</div>");
			$("#resultsDetail").append($(question));
			var result = $("<div>"+"You answered: "+game.questions[i].guessedAnswer+". The correct answer was: "+game.questions[i].choices[game.questions[i].correct]+".</div>");
			$("#resultsDetail").append($(result));
			var br = $("<br>");
			$("resultsDetail").append($(br));
		}
	}

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

		  wait: function() {
		  	stopwatch.time = 0;
		  	clearInterval(intervalId);
		  	intervalId = setInterval(stopwatch.waitCount, 1000);
		  },

		  waitCount: function() {
		  	stopwatch.time++;
		  	if(stopwatch.time === 3) {
		  		if(game.currentIndex < game.numberOfQuestions) {
			  		stopwatch.reset();
			  		clearInterval(intervalId);
			  		$("#endRoundMessage").css("display", "none");
	    			$("#next").css("display", "none");
	    			$(".answerChoice").css("background-color", "white");
	    			answerChosen = false;
	    			timeIsUp = false;
			  		nextQuestion();
		  		}
		  		else {
		  			stopwatch.reset();
			  		clearInterval(intervalId);
			  		showResults();
		  		}	
		  	}
		  },

		  count: function() {
		    stopwatch.time++;
		    var convertedTime = stopwatch.timeConverter(stopwatch.time);
		    $("#timer").html(convertedTime);
		    if(stopwatch.time === 10) {
		    	stopwatch.stop();
		    	timeIsUp = true;
		    	answerChosen = true;
		    	highlightCorrectAnswer();
		    	highlightIncorrectAnswers();
		    	game.questions[game.currentIndex].guessedAnswer = "Ran out of time";
		    	game.currentIndex++;

		    	if(game.currentIndex < game.numberOfQuestions) {
		    		$("#endRoundMessage").text(timeUpMessage + game.questions[game.currentIndex-1].choices[game.questions[game.currentIndex-1].correct]);
		    		// $("#next").css("margin-top", "20px");
		    		// $("#next").css("display", "table");
		    	} else {
		    		$("#endRoundMessage").text("Game over! You scored a "+numCorrect+" out of "+game.numberOfQuestions);
		    	}

		    	$("#endRoundMessage").css("display", "table");
		    	stopwatch.wait();
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

	$("#playAgain").on("click", function() {
		playAgain();
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
			game.questions[game.currentIndex].guessedAnswer = $(this).text();
			game.currentIndex++;
			numCorrect++;
			if(game.currentIndex < game.numberOfQuestions) {
				$("#endRoundMessage").text(congratsMessage);
		    	// $("#next").css("margin-top", "20px");
		    	// $("#next").css("display", "table");
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
			game.questions[game.currentIndex].guessedAnswer = $(this).text();
			game.currentIndex++;
			numIncorrect++;
			if(game.currentIndex < game.numberOfQuestions) {
				$("#endRoundMessage").text(loserMessage);
		    	// $("#next").css("margin-top", "20px");
		    	// $("#next").css("display", "table");
		    } else {
		    	$("#endRoundMessage").text("Game over! You scored a "+numCorrect+" out of "+game.numberOfQuestions);
		    }

		    $("#endRoundMessage").css("display", "table");
		}
		stopwatch.wait();
	});

	function nextQuestion() {
		intervalId = setInterval(stopwatch.count, 1000);
	    $("#question").text("Question "+(game.currentIndex+1)+": " + game.questions[game.currentIndex].question);
	    $("#question").css("display", "table");
	    $("#choiceA").text(game.questions[game.currentIndex].choices[0]);
	    $("#choiceA").css("display", "table");
	    $("#imageTL").attr("src", game.questions[game.currentIndex].images[0]);
	    $("#imageTL").css("display", "table");
	    $("#choiceB").text(game.questions[game.currentIndex].choices[1]);
	    $("#choiceB").css("display", "table");
	    $("#imageTR").attr("src", game.questions[game.currentIndex].images[1]);
	    $("#imageTR").css("display", "table");
	    $("#choiceC").text(game.questions[game.currentIndex].choices[2]);
	    $("#choiceC").css("display", "table");
	    $("#imageBL").attr("src", game.questions[game.currentIndex].images[2]);
	    $("#imageBL").css("display", "table");
	    $("#choiceD").text(game.questions[game.currentIndex].choices[3]);
	    $("#choiceD").css("display", "table");
	    $("#imageBR").attr("src", game.questions[game.currentIndex].images[3]);
	    $("#imageBR").css("display", "table");
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