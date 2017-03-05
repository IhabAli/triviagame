/*questions*/
var triviaQuestions = [{
	question: "When was Cartoon Network founded?",
	answerList: ["1979", "1992", "1995", "2000"],
	answer: 1
},{
	question: "Who are the two main characters of 'Adventure time'?",
	answerList: ["Finn and Jake", "Timmy and Vicky", "Spongebob and Patric", "Kenan and Kel"],
	answer: 0
},{
	question: "Which of the following is NOT a Cartoon Network show?",
	answerList: ["Spongebob SquarePants", "Dexter's Laboratory", "Ed, Edd n Eddy", "Kids next door"],
	answer: 0
},{
	question: "Which of the following is the oldest Cartoon Network show?",
	answerList: ["Samurai Jack", "Evil Con Carne", "The Powerpuff Girls", "Courage the Cowardly Dog"],
	answer: 2
},{
	question: "Jerry from 'Tom and Jerry' is what type of rodent?",
	answerList: ["Chipmunk", "Rat", "Hamster", "Mouse"],
	answer: 3
},{
	question: "Which Looney Tunes character is known for stuttering?",
	answerList: ["Porky Pig", "Elmer Fudd", "Bugs Bunny", "Daffy Duck"],
	answer: 0
},{
	question: "In the series 'Johnny Bravo', what is the title character's catchphrase?",
	answerList: ["Hey Daddy-O", "Ohhhh Mama!", "Groovey!", "YEAH-UH!"],
	answer: 1
},{
	question: "What unique power does Jake the Dog possess in the series 'Adventure Time'?",
	answerList: ["flying", "X-ray vision", "Change Body shape", "Teleportation"],
	answer: 2
},{
	question: "What is the name of the kind-hearted but clueless woman in the series 'Courage the Cowardly Dog'?",
	answerList: ["Michelle", "Muriel", "Madeline", "Mary"],
	answer: 1
},{
	question: "In which fictional city does the series 'Chowder' take place?",
	answerList: ["Ice Cream Land", "Chocolate City", "Pasta Village", "Marzipan City"],
	answer: 3
},{
	question: "Along with Blossom and Bubbles, what is the name of the third superhero in 'The Powerpuff Girls'?",
	answerList: ["Buttercup", "Butterscotch", "Butternut", "Astro Girl"],
	answer: 0
},{
	question: "Who is the villain in the Cartoon Network series 'Samurai Jack'?",
	answerList: ["Abu", "Aku", "Tarzan", "Haiku"],
	answer: 1
},{
	question: "How many 'Ben 10' series have been on Cartoon Network?",
	answerList: ["3", "2", "5", "4"],
	answer: 3
},{
	question: "What job do Mordecai and Rigby share on Cartoon Network's 'Regular Show'?",
	answerList: ["Groundskeepers", "HouseKeepers", "Janitors", "Mechanics"],
	answer: 0
},{
	question: "Who was the founder of cartoon network?",
	answerList: ["Neil Armstrong", "Buzz Aldrin", "Betty Cohen", "John Glenn"],
	answer: 2
}];
/*commands whether they got the question correct, incorrect, or the time */
var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's Correct!",
	incorrect: "No, that's not correct.",
	endTime: "Time is up!",
	finished: "Alright! Let's see your scores."
}
/*buttons and functions*/
$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	/*new questions*/
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
