//Global variables //
var wordList = ['apple', 'banana', 'pineapple', 'pear', 'xd', 'omega', 'hangman'];
const selectedWord = [];

var word;
var c;
var loadingScreen;
var mainGame;
//-----------------//

window.onload = start; 

function start() {		
	c = document.getElementById("canvas"); 
	printOut(wrongLetters);			   	//Update both number of points and tries
	loadingScreen = document.getElementsByClassName("game-options")[0];
	mainGame = document.getElementsByClassName("game-main")[0];
	
	//lets you use enter key to input info
	document.getElementById("txtX").addEventListener("keyup", (e) => {
		e.preventDefault();

		if (e.keyCode == 13) {
			document.getElementById("check").click();
		}

	});
	
}

//decides if it is multiplayer game or singleplayer game
function play(n) {
	var inputContainer = document.getElementsByClassName("input")[0];
	var userWord = document.getElementById("txtY").value;

	if (n == 0) {
		hideElements(loadingScreen, mainGame, "none", "block");
		randomWord(); //choose a new random word
		updateValues()
		createLetterBox();
	}
	//chooes multiplayer hide the two divs and display a third div with input
	if (n == 1) {
		hideGameOptions("none","block");
	}
	if (n == 2) {
		if (inputChecker(userWord)) {
			hideElements(loadingScreen, mainGame, "none", "block");

			word = userWord.toLowerCase();
			selectedWord.push(word);
			emptyInput();
			createLetterBox();
			updateValues();
			return selectedWord;
		}
	}
}
	
function updateLength() { //work in progress
	let input = document.getElementById('txtY').value;
	let maxLength = 10;
	let length = maxLength - input.length;
	if (input == (" " || "")) {
		maxLength = 10;
	}
	if (length >= 0) {	
		document.getElementById('wordLength').innerHTML = length;
		} else {
			alert("out of word length");
			return;
		}	
}

	const illegalCharacters = ['.' , ',' , '¨' , '^' , '' , '_' , '<' , '>' , '|' , '§' , '#' ]; //work in progress
function inputChecker(input) {
	if (input != "" || input.length > 0){
		return true;
	}
}

function emptyInput() {
	document.getElementById("txtX").value = null;
}

function randomWord() {	//create random integer, to choose from wordlsit array
	var random = Math.floor(Math.random()*wordList.length);
	word = wordList[random];
	selectedWord.splice(0,1,word);
	return selectedWord;
}
	var tries = 1;
function updateValues() {
	var fails = wrongLetters.length;
	if (fails != 0) {
		drawStickMan(fails);
	}
	if (!tries > 0) { 
		return;
	}
	
	
	tries = 14 - wrongLetters.length;
	 
	if (verify() == true) {
		alert("winner!");
		hideButtons(0);
	}
	printOut();
}

function changeClass(element, classBefore, classAfter) {				//Change class to an element
	element.classList.remove(classBefore);
	element.classList.add(classAfter);
}

function verify() {
	var correctWord = removeDuplicates(...selectedWord);
	if (wrongLetters.length == 14) {									//gives fail first so that you cant write entire alphabet
		return false;
	}
	if (correctWord.sort().join(',') == correctLetters.sort().join(',')){
    	return true;
	}	
}

	var correctLetters = [];
function checkLetter(input, array) {
	var answer = [...input.toLowerCase()];

	answer.forEach( (x) => {
		if (array.includes(x) && !correctLetters.includes(x)) {
			correctLetters.push(x);
		}
		letterList(x);
	});
	 console.log("right "+ correctLetters)
	 console.log("wrong "+ wrongLetters);
}

function checkWord() {			//checks word
	let input = document.getElementById("txtX").value;
	emptyInput();

	if (inputChecker(input) != true) {
		alert("you must fill in a word");
		return;
	}
	if(wrongLetters.includes(input)){
		alert("you must use a letter that has not been used!");
		return;
	}
	if(!(input.toLowerCase() == word.toLowerCase())) {
		checkLetter(input, ...selectedWord);
	}
	else {
		correctLetters.push(...input);
		updateValues();
		showLetters();
	}
}

function reset(n) {		//reset values 
	correctLetters.splice(0,correctLetters.length);	//clears array values
	wrongLetters.splice(0,wrongLetters.length);
	removeLetterBox();
	printOut();
	clearCanvas();
	
	if (n == 0) {	//reset entire page
		hideElements(loadingScreen, mainGame, "block", "none");
		hideGameOptions("block","none");
		hideButtons(1);
		return;	
	}
	if (n == 1) {	//reset game
		randomWord();
		createLetterBox();
		hideButtons(1);
		return;	
	}
}

function hideGameOptions(style1, style2) {
	let div = document.getElementsByClassName("game-options-choice");
	div[0].style.display = style1;
	div[1].style.display = style1;

	//multiplayer div
	div[2].style.display = style2;
}

function hideElements(element1,element2, style1, style2) {
	element1.style.display = style1;
	element2.style.display = style2;
}

function hideButtons(n) { //hide start/reset buttons
	let submitBtn = document.getElementById("check");
	let resetBtn = document.getElementById("reset");
	if (n == 0) {	
		hideElements(submitBtn, resetBtn, "none", "block");
	}	
	if (n == 1) {
		hideElements(submitBtn, resetBtn, "block", "none");
	}
}
	
	var wrongLetters = []			//list over all wrongletters used
function letterList(text) {
	if (!wrongLetters.includes(text) && (!correctLetters.includes(text))) { 
		wrongLetters.push(...text);				//turns a string into array of characters 
	}
	wrongLetters = removeDuplicates(wrongLetters);     //removes any duplicates;
	printOut();
	updateValues();
	showLetters();
}

function removeDuplicates(array){		//removes any duplicates from an array i.e [a,a] => [a]; 
	var unique_array = [];
	for(var i = 0; i < array.length; i++){
		if(unique_array.indexOf(array[i]) == -1){
		  	unique_array.push(array[i])
		}
	}
    return unique_array;
}

function createLetterBox() {		//creates div elements that display letters 
	var container = document.getElementsByClassName("word-column2")[0];

	//loops through the number of letters in the guess word 
	for (let i = 0; i < selectedWord[0].length; i++) { //create a div element with a letter
		var letter = selectedWord[0][i];
		var div = document.createElement("DIV");
		var p  = document.createElement("P");
		p.innerHTML = letter;
		div.id = letter;
		div.className = "letterBox Hidden"; //Intially hides the letters 
		div.appendChild(p);
		container.appendChild(div);
	}
	removeBlanks();
	//addWordContainer();
}

function removeLetterBox() {
	let container = document.getElementsByClassName("word-column2")[0];
	container.innerHTML = null;

}

function showLetters() {
	var letters = document.getElementsByClassName("letterBox");
	for (var i = 0; i < letters.length; i++) {
		if(correctLetters.includes(letters[i].id)) {

			changeClass(letters[i], "Hidden", "Visible"); //change classes, to display correct guessed letters
		}
	}
}

function addWordContainer() {
	let div = document.getElementsByClassName("letterBox");

	for (var i = 0; i < div.length; i++) {
		if (!(div[i+1].id == ("" || " "))) {
			
		}	
	}
}

function removeBlanks() {
	let div = document.getElementsByClassName("letterBox");

	for (var i = 0; i < div.length; i++) {
		if(div[i].id == ("" || " ")) {
			changeClass(div[i], "Hidden" , "EmptySpace");
		}	
	}
	if (selectedWord[0].includes(" ")){
		correctLetters.push(" "); 	//adds a blank space to correctLetter, since we cant remove from original array
	} 
}

function printOut() {		//print out various info, tries, points, total points, and lettersused
	document.getElementById("border").innerHTML = wrongLetters;
	document.getElementById("tries").innerHTML = tries;
}
	
function drawLine(x1,y1,x2,y2,color) {
	let ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.fillStyle = color;
	ctx.stroke();
	ctx.closePath();
}

function drawCircle(x1,y1,radius, arc, color) {
	let ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.arc(x1, y1, radius, 0, arc * Math.PI);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
}

function drawStickMan(n) {
	//legs for the apartus 
	if (n>=1) {  drawLine(100,350,50,400, "#000");}
	if (n>=2) {  drawLine(100,350,150,400, "#000");}
	//Long stick and horisontal line
	if (n>=3) {  drawLine(100,350,100,75, "#000");}
	if (n>=4) {  drawLine(100,75,250,75, "#000");}	
	//rope and support beam
	if (n>=5) {  drawLine(100,125,150,75, "#000");}
	if (n>=6) {  drawLine(250,75,250,130, "#000");}
	//head and eyes 
	if (n>=7) {  drawCircle(250,160,30, 2, "white");
				 drawCircle(235,160, 4, 2, "white");		
				 drawCircle(265,160, 4, 2, "white");}
	//neck and mouth (smiley)
	if (n>=8) {  
		drawLine(250,200,250,200, "#000");
		drawCircle(250, 175, 8, 1);
	}
	//torso and arms
	if (n>=9) {  drawLine(250,250,250,190, "#000");}
	if (n>=10){  drawLine(250,200,200,200, "#000");}
	if (n>=11){  drawLine(250,200,300,200, "#000");}
	//legs
	if (n>=12){  drawLine(300,300,250,250, "#000");}
	if (n == 13) { 
		drawLine(200,300,250,250, "#000");
		//stickman dies after 2 seconds when his last leg is drawn
		//setInterval(drawStickMan, 1000, 14);
	}
	//dead
	if (n == 14) {
		//clear face
		drawCircle(250, 160, 30 ,2, "white");
		//cross eyes left eye, first cross section from left to right corner
		drawLine(230,150,237.5,157.5, "#000");
		drawLine(237.5,150,230,157.5, "#000");

		//right eye , first cross section from left to right corner 
		drawLine(262.5,150,270,157.5, "#000");
		drawLine(270,150,262.5,157.5, "#000");
		
		//change mouth
		drawLine(235, 175, 265, 175, "#000");

		alert("you died!");
		return;
	}
}

function clearCanvas() {
	let ctx = c.getContext("2d");	
		ctx.clearRect(0,0, c.width, c.height);
	
}

function show(n, input) {
	var backgroundBlack = document.getElementsByClassName("alert")[0];
	var msg = document.getElementById("message");

	hideElements(backgroundBlack, msg, "block", "block");
	msg.childNodes[3].innerHTML = input;

	if (n == "red") {
		if (message.className.includes("alert-success")) {
			changeClass(msg, "alert-success", "alert-danger");
		}
	}
	if (n == "green") {
		changeClass(msg, "alert-danger", "alert-success"); 
	}
	if (n == -1) {
		hideElements(backgroundBlack, msg, "none", "none");
	}
}

window.onclick = function(event) {										//Hides modal when clicking on window 
	var alert = document.getElementsByClassName("alert");

	for (let i = 0; i < alert.length; i++) {

		if (event.target === alert[i]) {
        	alert[i].style.display = "none";
    	}
	}
}