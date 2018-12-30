
var words = [];
var current_word = null;
var wrong_guesses = 0;
var correctly_guessed = false;

function initialize() {
	$.get( "fr_modern_uniq.txt", function( data ) {
		words = data.split(/\s/);
		set_random_word();
		console.log(words.length + " words in the dictionary.");
	}, "text");
	responsiveVoice.setDefaultVoice("French Female");
}

function get_random_word() {
	return words[Math.floor(Math.random() * words.length)]
}

function set_random_word() {
	current_word = get_random_word();
	wrong_guesses = 0;
	correctly_guessed = false;
	refresh_display();
}

function refresh_display() {
	$("#guess").val("");
	if (correctly_guessed) {
		$("#failedResult").hide()
		$("#successResult").show()
	} else if (wrong_guesses > 0) {
		$("#failedResult").show()
		$("#successResult").hide()
	} else {
		$("#failedResult").hide()
		$("#successResult").hide()
	}
	if (correctly_guessed || wrong_guesses >= 5) {
		$("#newWord").show()
	} else {
		$("#newWord").hide()
	}
}

function speak() {
	responsiveVoice.speak(current_word, "French Female", {rate: 0.7});
}

function guess() {
	var guess = $("#guess").val();
	if (guess === current_word) {
		correctly_guessed = true;
	} else {
		wrong_guesses++;
	}
	refresh_display();
}

function playSound(tag) {
	$(tag).get(0).play();
}

initialize();