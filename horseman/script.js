/*
This game was written for entertainment and educational purposes only.
The geographic location described and replicated in the gameplay of this script is a real
place, and some of the carachters are inspired by real people who might be found at that
location. To protect their identity and anonynomity, the true names of these people and
places have been changed to a reasonable degree. Beyond the generalized description of the
location, and the most basic caracature of a handful of the game's carachters, the antics
and representation of any of the game carachters or locations is a work of pure fiction, 
is outlandish, absurd, and befitting of an 80's inspired text-based adventure game 
centered around a main playable carachter who is a horseman. (I picture this as a human
with the head of a horse and hooves at the end of his arms and legs, but the details 
of Wild Mr. Horseman's appearance are left to the imagination of the player.) The 
long-and-short of it being: All of this game and its similarity to anyone or anything in
reality is either coincidental, or done in jest and in good sport. I hope it is enjoyed
by all who play it.
*/

const text_window = document.getElementById("text-window");
const input = document.getElementById("input");
const submit = document.getElementById("submit");

let move_count = 0;

import {mobile_npc, player} from "./world.js";

const initial_p =  document.createElement("p");
let npc_present = "";
for (let npc in mobile_npc) {
	if (mobile_npc[npc].location == player.location) {
		npc_present = npc_present.concat(mobile_npc[npc].add_desc() + '<br><br>');
	}
}
initial_p.innerHTML = "Welcome to THE ADVENTURES OF WILD MR. HORSEMAN! enter commands to interact with the world. Type 'help' if you get stuck. Good luck!<br><br>Suddenly, you become aware of a ringing sound. As you squint open your eyes, you see nothing but bright, bluish light, and blurry sandy white colored objects swirling around you. You're completely disoriented, and your head is splitting. You close your eyes, let out a groan, and roll over as the ringing in your ears begins to fade and is overtaken by the sound of gently crashing waves. After a moment, you open them again, and breathe in deeply. The air is salty and humid, and the light is blinding, but you're able to sit up slowly, re-orient, and look around.<br><br>" + player.location.description() + "<br><br>" + `${npc_present}`;
text_window.append(initial_p);

function process_input(in_val) {
	const terminal_output = document.createElement("p");

	if(player.dead) {
		terminal_output.innerHTML = "You have died, and your adventure has ended. Thanks for playing. <BR><BR> Press 'Ctrl + R' to restart the game.";
	}

	for (let command in player.commands) {
		if (command === in_val) {
			move_count += 1;
			terminal_output.innerHTML = move_mobile_npcs(player.commands[in_val]());
			return terminal_output;
		}
	};

	for (let command in player.location.commands) {
		if (command === in_val) {
			move_count += 1;
			terminal_output.innerHTML = move_mobile_npcs(player.location.commands[in_val]());
			return terminal_output;
		}
	};
	
	for (let i in player.inventory) {
		const item = player.inventory[i];
		for (let command in item.commands) {
			if (command === in_val) {
				move_count += 1;
				terminal_output.innerHTML = move_mobile_npcs(item.commands[in_val]());
				return terminal_output;
			}
		}
	};

	// npc interactions
	let interact_var = 0;
	for (let npc in mobile_npc) { 
		//console.log(interact_var, npc, player.location, mobile_npc[npc].location);
		interact_var ++;
		if (player.location == mobile_npc[npc].location) {
			for (let command in mobile_npc[npc].npc_commands) {
				console.log(command);
				if (in_val == command) {
					move_count += 1;
					terminal_output.innerHTML = move_mobile_npcs(mobile_npc[npc].npc_commands[in_val](), npc);
					return terminal_output;
				}
			}	
		} else {
			continue;
		}
	}

	terminal_output.innerHTML = "don't be stupid, man.";
	return terminal_output;
};

function move_mobile_npcs(command_output, skip) {
	for (let npc in mobile_npc) {
		if (npc == skip) {
			console.log(npc)
			continue;
		}
		if (move_count % mobile_npc[npc].move_on === 0) {
			const current_loc = mobile_npc[npc].location;
			const available_moves = mobile_npc[npc].location.npc_options.move;
			
			const rand_index = Math.floor(Math.random() * Object.keys(available_moves).length);
			
			for (let move in available_moves) {
				if (rand_index === available_moves[move].index) {
					mobile_npc[npc].location = available_moves[move].f();
				} 
			};
		}
	}

	for (let npc in mobile_npc){
		if (player.location === mobile_npc[npc].location  && npc != skip) {
			const npc_text = mobile_npc[npc].add_desc();
			return command_output + "<br>" + npc_text;
		}
	}
	return command_output;
};

submit.onclick = () => {
	const new_p = process_input(input.value.toLowerCase());
	const player_command = document.createElement("p");
	player_command.innerHTML = "--> " + input.value;

	text_window.append(player_command)
	text_window.append(new_p);
	new_p.scrollIntoView(true);
	input.value = "";
}

input.onkeydown = (ev) => {
	if (ev.key === "Enter") {
		submit.click();
	}
}

input.focus();