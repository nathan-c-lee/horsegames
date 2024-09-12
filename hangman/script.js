import {complete_words} from "./wordlist.js";
let words;

const word_choose = document.getElementById("word-choose");
const new_word = document.getElementById("new-word");
const new_word_submit = document.getElementById("new-word-submit");
const graphic = document.getElementById("graphic");
const reveal_box = document.getElementById("reveal-box");
const input_submit = document.getElementById("input-submit");

const bad_letters = [];
const word_list = [];

new_word.focus()
new_word_submit.onclick = () => {
	if (new_word.value === "") {
		words = complete_words;
		word_choose.remove();
		graphic.style = "visibility: visible";
		reveal_box.style = "visibility: visible";
		input_submit.style = "visibility: visible";
		game(true);
	} else {
		words = new_word.value + "\n";
		word_choose.remove();
		graphic.style = "visibility: visible";
		reveal_box.style = "visibility: visible";
		input_submit.style = "visibility: visible";
		game();
	}	
}

new_word.onkeypress = (ev) => {
	if (ev.keyCode === 13) {
		new_word_submit.click();
	}
}

function game(indexer) {
	let last = 0;
	for (var i = 1; i < words.length; i++) {
		let this_word;
		if (words[i] === "\n") {
			this_word = words.slice(last, i);
			word_list.push(this_word);
			last = i + 1;
		}
	}


	const letter_status = document.getElementById("letter-status");
	const reveal = document.getElementById("reveal-row");
	const input = document.getElementById("input");
	const submit = document.getElementById("submit");
	const hangman = document.getElementById("hangman");

	input.focus();

	const man_parts = [
		document.getElementById("man-head"),
		document.getElementById("man-body"),
		document.getElementById("arm-left"),
		document.getElementById("arm-right"),
		document.getElementById("leg-left"),
		document.getElementById("leg-right")
	]


	let lchar = 65;
	for (i = 0; i < 26; i++) {
		let this_l = String.fromCharCode(lchar + i);
		let l_box = document.createElement("div");
		let l = document.createElement("h2");
		l_box.style.display = "inline-block";
		l.innerHTML = this_l;
		l_box.append(l);
		letter_status.append(l_box);
	}

	function get_word_index() {
		if(indexer){
			return Math.floor(Math.random() * 10000);
		} else {
			return 0;
		}
		
	}

	let word_index;
	while (word_index === undefined || word_index > word_list.length) {
		word_index = get_word_index();	
	}

	console.log(word_list.length);
	console.log(word_index);


	let game_word = word_list[word_index].toLowerCase();
	let turn = 0;

	console.log(game_word);

	let word_len = game_word.length;

	for (var i = 0; i < word_len; i++) {
		let letter = document.createElement("h1");
		//letter.innerHTML = "_";
		if (game_word[i] === " "){
			letter.innerHTML = "/"
		} else {
			letter.innerHTML = "_";
		}
		letter.id = i;
		let letter_box = document.createElement("td");
		letter_box.append(letter);
		reveal.append(letter_box);
	}

	submit.onclick = () => {
		const in_val = input.value.toLowerCase();
		if (in_val == "") {
			input.focus()
			return;
		}
		for (letter of bad_letters) {
			if (in_val === letter) {
				alert("BAD LETTER");
				input.value = "";
				input.focus();
				return;
			}
		}

		const in_len = in_val.length;
		let num_hits = 0;

		if (in_val === game_word) {
			for (i = 0; i < word_len; i++) {
				const ch = (game_word[i]);
				const el = document.getElementById(i);
				el.innerHTML = ch;
			}
		} else if (in_len === 1) {

			for (i = 0; i < word_len; i++) {
				if (game_word[i] === in_val) {
					const ch = (game_word[i]);
					const el = document.getElementById(i);
					el.innerHTML = ch;
					num_hits++;
				}
			}
			if (num_hits === 0) {
				bad_letters.push(in_val);
				for (i = 0; i < 26; i++) {
					const el = letter_status.childNodes[i].childNodes[0];
					if (in_val === el.innerHTML.toLowerCase()) {	
						el.innerHTML = el.innerHTML.strike();
					}

				}
				turn++;
				let show_el = man_parts[turn - 1];
				if (turn === 6) {
					alert(`IT'S "${game_word.toUpperCase()}", DUMMY`);
					location.reload();
				} else {
					alert("WRONG, ya stupid idiot.");
					show_el.style = "visibility: visible";
				}
			}

			input.value = "";
			input.focus()
		} else {
			alert("WRONG, ya stupid idiot.");
			input.value = "";
			input.focus();
			return;
		}
	};

	input.onkeypress = (ev) => {
		if (ev.keyCode === 13) {
			submit.click();
		}
	}
}