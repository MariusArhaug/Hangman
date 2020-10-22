function checkLetter(input,array) { 			//checks every letter
	var answer = [...input.toLowerCase()];  	//turns the input to answer array with each character	
	for (var i = 0; i < answer.length; i++) { 	
		if (array.includes(answer[i])) { 
			if (!correctLetters.includes(answer[i])) {
				correctLetters.push(answer[i]); 	//if list of correctLetters doesnt include current letter, push
			}
		}
		letterList(answer[i]);	
	}
	console.log('correctwords: ' + correctLetters);	
}


function checkWord() {
	var input = document.getElementById("txtX").value; 			//get user input
	emptyInput();
	if (inputChecker(input)) {
		if (!wrongLetters.includes(input)) {
			if (input.toLowerCase() === word.toLowerCase()) {  	//if input is equal to word // success
				alert("winner");
				hideButtons(0);
			}
			else { 												// else, check each letter
		 		checkLetter(input, ...selectedWord);
			}
		} 
		else {
			alert("You must use a letter that has not been used");
			return;
		}
	} 
	else {
		alert("You must fill in a word")
	}
}

function removeDuplicatesv2(array) {
	let unique_array = []
	unique_array.forEach((x) => {
		if (!unique_array.includes(x)){
			unique_array.push(x);
		}
	})
	return unique_array;
}