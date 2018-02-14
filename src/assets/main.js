let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let messageNode = document.getElementById('message');
let resultsNode = document.getElementById('results');
let CodeNode = document.getElementById('code');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
	if (!attempt.value && !answer.value) {
	console.log('1');
		setHiddenFields();
	}
	if (validateInput(input.value)) {
		attempt.value++;
	} else {
		return false;
	}
	if(getResults(input.value)) {
		setMessage('You Win! :)');
		showAnswer(true);
		showReplay();
	} else if (attempt.value >= 10) {
		setMessage('You Lose! :(');
		showAnswer(false);
		showReplay();
	} else {
		setMessage('Incorrect, try again.');
	}
}

//implement new functions here
function setHiddenFields(min = 0, max = 9999) {
	attempt.value = 0;
	answer.value = (Math.floor(Math.random() * max-min) + min + '').padStart(4, '0');
}

function setMessage(message) {
	messageNode.innerHTML = message;
}

function validateInput(input) {
	if (input.length === 4) {
		return true;
	}
	setMessage('Guesses must be exactly 4 characters long.');
	return false;
}

function getResults(input) {
	var i = 0, success = 0, innerHtml = '';
	innerHtml += '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
	input = input + '';
	answer_value = answer.value + '';
	for (i in input) {
		if (input[i] === answer_value[i]) {
			innerHtml += '<span class="glyphicon glyphicon-ok"></span>';
			success++;
		} else if (answer_value.indexOf(input[i]) != -1) {
			innerHtml += '<span class="glyphicon glyphicon-transfer"></span>';
		} else {
			innerHtml += '<span class="glyphicon glyphicon-remove"></span>';
		}
	}
	resultsNode.innerHTML += innerHtml + '</div></div>';
	return success === answer_value.length;
}

function showAnswer(win) {
	code.innerHTML = answer.value;
	win ? code.classList.add('success') : code.classList.add('failure');
}

function showReplay() {
	document.getElementById('guessing-div').style.display = 'none';
	document.getElementById('replay-div').style.display = 'block';
}