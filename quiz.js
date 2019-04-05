
var words = [];
var current_word = null;
var wrong_guesses = 0;
var score = 0;
var correctly_guessed = false;

function set_words() {
	var list = $("#list").val()
	$.get(list, function( data ) {
		words = data.split(/\s/);
		score = 0;
		set_random_word();
		refresh_display();
		console.log(words.length + " words in the dictionary.");
	}, "text");
}

function initialize() {
	set_words("lists/merfip1.txt");
	responsiveVoice.setDefaultVoice("French Female");
}

function get_random_word() {
	return words[Math.floor(Math.random() * words.length)].toLowerCase()
}

function set_random_word() {
	current_word = get_random_word();
	wrong_guesses = 0;
	correctly_guessed = false;
}

function refresh_display() {
	$("#guess").val("");
	if (correctly_guessed) {
		$("#failedResult").attr("hidden", true)
		$("#successResult").attr("hidden", false)
	} else if (wrong_guesses > 0) {
		$("#failedResult").attr("hidden", false)
		$("#successResult").attr("hidden", true)
	} else {
		$("#failedResult").attr("hidden", true)
		$("#successResult").attr("hidden", true)
	}
	if (wrong_guesses >= 5) {
		$("#newWord").attr("hidden", false)
	} else {
		$("#newWord").attr("hidden", true)
	}
	$("#score").text("Score: " + score.toString())
}

function speak() {
	responsiveVoice.speak(current_word, "French Female", {rate: 0.7});
}

function guess() {
	var guess = $("#guess").val().toLowerCase();
	if (guess === current_word) {
		correctly_guessed = true;
		score++;
		refresh_display();
		set_random_word();
	} else {
		wrong_guesses++;
		score = 0;
		refresh_display();
	}
}

function playSound(tag) {
	$(tag).get(0).play();
}

initialize();