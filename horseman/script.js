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

class beachfront {
	constructor(iter) {
		this.description = () => {return "You're on the white sandy beach of Horsey Island, continuing to the north and south for miles."};
		if (iter === 0) {
			this.description = () => {return "You're on the white sandy beach of Horsey Island, extending to the north for miles. An outcropping of rocks and debris blocks your passage to the south."},
			this.commands = {
				"go north": () => {player.location = beachfronts[iter + 1]; return player.location.description()},
				n: () => {return this.commands["go north"]()},
				"go south": () => {return "You can't go that way. An outcropping of rock and debris blocks your path."},
				s: () => {return this.commands["go south"]()}
			}
		} else if (iter === 4) {
			this.commands = {
				"go north": () => {player.location = world.hotel_south_bch; return player.location.description()},
				n: () => {return this.commands["go north"]()},
				"go south": () => {player.location = beachfronts[iter - 1]; return player.location.description()},
				s: () => {return this.commands["go south"]()}
			}
		} else if (iter === 5) {
			this.commands = {
				"go north": () => {player.location = beachfronts[iter + 1]; return player.location.description()},
				n: () => {return this.commands["go north"]()},
				"go south": () => {player.location = world.hotel_north_bch; return player.location.description()},
				s: () => {return this.commands["go south"]()}
			}
		} else if (iter === 13) {
			this.description = () => {return "You're on the white sandy beach of Horsey Island, extending to the south for miles. An outcropping of rocks and debris blocks your passage to the north."},
			this.commands = {
				"go north": () => {return "You can't go that way. An outcropping of rock and debris blocks your path."},
				n: () => {return this.commands["go north"]()},
				"go south": () => {player.location = beachfronts[iter - 1]; return player.location.description()},
				s: () => {return this.commands["go south"]()}
			}
		} else {
			this.commands = {
				"go north": () => {player.location = beachfronts[iter + 1]; return player.location.description()},
				n: () => {return this.commands["go north"]()},
				"go south": () => {player.location = beachfronts[iter - 1]; return player.location.description()},
				s: () => {return this.commands["go south"]()}
			}
		}
	}
};

class hotel_room {
	constructor(rm_index, fl) {
		let section;
		if (rm_index >= 1 && rm_index <= 12) {
			if (fl === "7") {section = "section07_12";
			} else {section = "section01_12";};
		};
		if (rm_index >= 14 && rm_index <= 23) {section = "section14_23"};
		if (rm_index >= 24 && rm_index <= 41) {
			if (fl === "7") {section = "section24_29";
			} else {section = "section24_41";};
		};
		if (rm_index >= 42 && rm_index <= 47) {section = "section42_47"};
		if (rm_index >= 48 && rm_index <= 55) {section = "section48_55"};
		if (rm_index >= 56 && rm_index <= 61) {section = "section56_61"};
		if (rm_index >= 63 && rm_index <= 71) {section = "section63_71"};

		this.description = () => {
			let room_type;
			if (rm_index % 3 === 0){
				room_type = "with a king bed and a sofa";
			} else {
				room_type = "with two queen beds";
			}

			let rm_num;
			if (rm_index.length === 1) {
				rm_num = fl + "0" + rm_index;
			} else {
				rm_num = fl + rm_index;
			}

			let room_side = String(rm_index);
			 
			let overlook;
			if (Number(room_side) < 36) {
				overlook = "the 7th hole of the ocean links golf course, the beach, and the mighty Atlantic ocean.";
			} else {
				overlook = "the pool deck below, and the crashing waves of the Atlantic.";
			}
			return `You are in room ${rm_num}. It's a nice room, ${room_type}. Theres a T.V., safe, thermostat, coffee maker - all the usual ammenities you'd expect. The main attraction, really, is the balcony overlooking ${overlook}`;
		},
		this.commands = {
			"exit": () => {player.location = floors[fl][section]; return player.location.description();}
		}
	}
};

class elevator {
	
	constructor(elev) {
		this.floor = "L";
		this.description = () => {
			if (this.floor === "L") {
				return `You are in the elevator nearest room 1${elev}.`
			} else {
				return `You are in the elevator nearest room ${this.floor}${elev}.`
			}
		};
		
		function desc_maker(this_floor, fl, fl_txt) {
					
			let landing_L;
			let landing_B;
			let landing_fl;

			let B_desc = "GAME UNDER CONSTRUCTION - youre in the basement and it doesnt exist yet, so youre teleported instantly to the elevator landing one level above you.";

			switch(elev) {
				case 14:
					landing_L = world.sunrise_14elev_landing;
					landing_B = world.sunrise_14elev_basement_landing;
					B_desc = "this the desc --- youre in the basement, at the 14 elevator landing "
					if (fl != "L" && fl != "B") {
						landing_fl = floors[fl].el_landing_14;
					};
					break;
				case 24:
					landing_L = world.lobby_48elev_landing;
					landing_B = world.lobby_48elev_landing;
					if (fl != "L" && fl != "B") {
						landing_fl = floors[fl].el_landing_24;
					};
					break;
				case 48:
					landing_L = world.lobby_48elev_landing;
					landing_B = world.lobby_48elev_landing;
					if (fl != "L" && fl != "B") {
						landing_fl = floors[fl].el_room_48;
					};
					break;
				case 64:
					landing_L = world.lobby_48elev_landing;
					landing_B = world.lobby_48elev_landing;
					if (fl != "L" && fl != "B") {
						landing_fl = floors[fl].el_landing_64;
					};
			};

			let desc;
			if (this_floor === String(fl)) {
				return `You are already on the ${fl_txt} floor.`
			}

			if (fl === "L") {
				player.location = landing_L;
				desc = player.location.description();
				return `You push the button labled '${fl}', and the elevator car jerks into motion. After a moment the elevator stops, the door opens, and you step out. <BR> ${desc}`;
			} else if (fl === "B") {
				player.location = landing_B;
				return `this is the elev ::: {B_desc}`;
			} else {
				player.location = landing_fl;
				desc = player.location.description();
				return `You push the button labled '${fl}', and the elevator car jerks into motion. After a moment the elevator stops, the door opens, and you step out. <BR> ${desc}`;
			}
		};

		this.commands = {
			"push b": () => {const output = desc_maker(this.floor, "B", "basement"); this.floor = "B"; return output;},
			"push l": () => {const output = desc_maker(this.floor, "L", "lobby"); this.floor = "L"; return output;},
			"push 2": () => {const output = desc_maker(this.floor, 2, "second"); this.floor = "2"; return output;},
			"push 3": () => {const output = desc_maker(this.floor, 3, "third"); this.floor = "3"; return output;},
			"push 4": () => {const output = desc_maker(this.floor, 4, "fourth"); this.floor = "4"; return output;},
			"push 5": () => {const output = desc_maker(this.floor, 5, "fifth"); this.floor = "5"; return output;},
			"push 6": () => {const output = desc_maker(this.floor, 6, "sixth"); this.floor = "6"; return output;},
			"push 7": () => {const output = desc_maker(this.floor, 7, "seventh"); this.floor = "7"; return output;}
		};

		if (elev === 14 || elev === 24) {
			this.commands["push 8"] = () => {const output = desc_maker(this.floor, 8, "eighth"); this.floor = "8"; return output;};
		}
		
	};
};

class hotel_floor {

	constructor(floor) {

		function make_commands(rooms, section) {
			
			for (let room in rooms) {
				if (room >= section.r_start && room <= section.r_end) {
					let rm_num;
					if (room.length === 1) {
						rm_num = floor + "0" + room;
					} else {
						rm_num = floor + room;
					}

					let cmd = "enter room " + rm_num;

					section.commands[cmd] = () => {
						if (player.inventory["master key"]) {
							player.location = rooms[room];
							return player.location.description();
						} else {
							return `You attempt to open the door to room ${rm_num}, only to discover that it is firmly locked.`
						}
					}
				}
			}
		}

		let fl_txt = "";
		switch(floor) {
			case "2": fl_txt = "second"; break;
			case "3": fl_txt = "third"; break;
			case "4": fl_txt = "fourth"; break;
			case "5": fl_txt = "fifth"; break;
			case "6": fl_txt = "sixth"; break;
			case "7": fl_txt = "seventh"; break;
			case "8": fl_txt = "eighth";				
		}
		
		this.rooms = [];

		for (i = 1; i < 72; i++) {
			if (i === 13 || i === 66) {
				continue;
			}
			if (Number(floor) === 2 && (i > 12 && i < 24)){
				continue;
			}
			if (Number(floor) === 8 && (i > 23 || i < 14) ) {
				continue;
			}
			if (Number(floor) === 7 && ((i > 29 && i < 42) || i < 7 || i > 61) ) {
				continue;
			}

			this.rooms[i] = new hotel_room(i, floor);

		}


		if (floor !== "7" && floor !== "2" && floor !== "8") {
			this.section01_12 = {
				r_start: 1,
				r_end: 12,
				description: () => {return `You are on the ${fl_txt} floor, in the section of hallway between room ${floor}01 and ${floor}12. There is an elevator landing to your north next to room ${floor}14, and the hallway continues that direction beyond the elevator.`},
				commands: {
					"go north": () => {player.location = floors[floor].el_landing_14; return player.location.description();},
					n: () => {return floors[floor].section01_12.commands["go north"]();}
				}
			};
			make_commands(this.rooms, this.section01_12);

			this.section14_23 = {
				r_start: 14,
				r_end: 23,
				description: () => {return `You are on the ${fl_txt} floor, in the section of hallway between room ${floor}14 and ${floor}23. There is an elevator landing to your north next to room ${floor}24, and the hallway continues that direction beyond the elevator. Another elevator is accessable to the south next to room ${floor}14, and the hallway continues past it.`},
				commands: {
					"go north": () => {player.location = floors[floor].el_landing_24; return player.location.description();},
					n: () => {return floors[floor].section14_23.commands["go north"]();},
					"go south": () => {player.location = floors[floor].el_landing_14; return player.location.description();},
					s: () => {return floors[floor].section14_23.commands["go south"]();}
				}
			};
			make_commands(this.rooms, this.section14_23);

			this.section24_41 = {
				r_start: 24,
				r_end: 41,
				description: () => {return `You are on the ${fl_txt} floor, in the section of hallway between room ${floor}24 and ${floor}41. There is an elevator landing to your south next to room ${floor}24, and the hallway continues that direction beyond the elevator. The hallway continues un-obstructed to your north.`},
				commands: {
					"go north": () => {player.location = floors[floor].section42_47; return player.location.description();},
					n: () => {return floors[floor].section24_41.commands["go north"]();},
					"go south": () => {player.location = floors[floor].el_landing_24; return player.location.description();},
					s: () => {return floors[floor].section24_41.commands["go south"]();}
				}
			};
			make_commands(this.rooms, this.section24_41);

			this.section63_71 = {
				r_start: 63,
				r_end: 71,
				description: () => {return `You are on the ${fl_txt} floor, in the section of hallway between room ${floor}63 and ${floor}71. There is an elevator landing to your south next to room ${floor}63, and the hallway continues that direction beyond the elevator.`},
				commands: {
					"go south": () => {player.location = floors[floor].el_landing_64; return player.location.description();},
					s: () => {return floors[floor].section63_71.commands["go south"]();}
				}
			};
			make_commands(this.rooms, this.section63_71);

			this.el_landing_14 = {
				description: () => {return `You are on the elevator landing next to room ${floor}14, above the sunrise lobby. You may go north, south, or enter the elevator.`},
				commands: {
					"enter elevator": () => {
						elevators.elev_14.floor = String(floor);
						player.location = elevators.elev_14;
						return player.location.description();
					},
					"go north": () => {player.location = floors[floor].section14_23; return player.location.description();},
					n: () => {return floors[floor].el_landing_14.commands["go north"]();},
					"go south": () => {player.location = floors[floor].section01_12; return player.location.description();},
					s: () => {return floors[floor].el_landing_14.commands["go south"]();}
				}
			};
			this.el_landing_24 ={
				description: () => {return `You are on the elevator landing next to room ${floor}24, The hallway continues to your north and south, and the elevator is accessible.`},
				commands: {
					"enter elevator": () => {
						elevators.elev_24.floor = String(floor);
						player.location = elevators.elev_24;
						return player.location.description();
					},
					"go north": () => {player.location = floors[floor].section24_41; return player.location.description();},
					n: () => {return floors[floor].el_landing_24.commands["go north"]();},
					"go south": () => {player.location = floors[floor].section14_23; return player.location.description();},
					s: () => {return floors[floor].el_landing_24.commands["go south"]();}
				}
			};
		}
		if (floor === "7") {
			this.section07_12 = {
				r_start: 7,
				r_end: 12,
				description: () => {return `You are on the ${fl_txt} floor, in the section of hallway between room ${floor}07 and ${floor}12. There is an elevator landing to your north next to room ${floor}14, and the hallway continues that direction beyond it.`},
				commands: {
					"go north": () => {player.location = floors[floor].el_landing_14; return player.location.description();},
					n: () => {return floors[floor].section07_12.commands["go north"]();},
				}
			};
			make_commands(this.rooms, this.section07_12);

			this.section14_23 = {
				r_start: 14,
				r_end: 23,
				description: () => {return `You are on the ${fl_txt} floor, in the section of hallway between room ${floor}14 and ${floor}23. There is an elevator landing to your north next to room ${floor}24, and the hallway continues that direction beyond the elevator. To the south is another elevator landing next to room ${floor}14, and the south hallway also continues past it.`},
				commands: {
					"go north": () => {player.location = floors[floor].el_landing_24; return player.location.description();},
					n: () => {return floors[floor].section14_23.commands["go north"]();},
					"go south": () => {player.location = floors[floor].el_landing_14; return player.location.description();},
					s: () => {return floors[floor].section14_23.commands["go south"]();}
				}
			};
			make_commands(this.rooms, this.section14_23);

			this.section24_29 = {
				r_start: 24,
				r_end: 29,
				description: () => {return `You are on the ${fl_txt} floor, in the section of hallway between room ${floor}24 and ${floor}29. There is an elevator landing to your south next to room ${floor}24, and the hallway continues that direction beyond it.`},
				commands: {
					"go south": () => {player.location = floors[floor].el_landing_24; return player.location.description();},
					s: () => {return floors[floor].section24_29.commands["go south"]();},
				}
			};
			make_commands(this.rooms, this.section24_29);

			this.section42_47 = {
				r_start: 42,
				r_end: 47,
				description: () => {return `You are on the ${fl_txt} floor, in the section of hallway between room ${floor}42 and ${floor}47. The hallway continues to the north and south.`},
				commands: {
					"go north": () => {player.location = floors[floor].section48_55; return player.location.description();},
					n: () => {return floors[floor].section42_47.commands["go north"]();},
				}
			};
			make_commands(this.rooms, this.section42_47);

			this.el_landing_14 = {
				description: () => {return `You are on the elevator landing next to room ${floor}14, above the sunrise lobby. You may go north, south, or enter the elevator.`},
				commands: {
					"enter elevator": () => {
						elevators.elev_14.floor = String(floor);
						player.location = elevators.elev_14;
						return player.location.description();
					},
					"go north": () => {player.location = floors[floor].section14_23; return player.location.description();},
					n: () => {return floors[floor].el_landing_14.commands["go north"]();},
					"go south": () => {player.location = floors[floor].section07_12; return player.location.description();},
					s: () => {return floors[floor].el_landing_14.commands["go south"]();}
				}
			};
			this.el_landing_24 ={
				description: () => {return `You are on the elevator landing next to room ${floor}24, The hallway continues to your north and south, and the elevator is accessible from here.`},
				commands: {
					"enter elevator": () => {
						elevators.elev_24.floor = String(floor);
						player.location = elevators.elev_24;
						return player.location.description();
					},
					"go north": () => {player.location = floors[floor].section24_29; return player.location.description();},
					n: () => {return floors[floor].el_landing_24.commands["go north"]();},
				}
			};
			this.el_landing_64 ={
				description: () => {return `You are on the elevator landing next to room ${floor}64. The hallway continues to your north and south, and the elevator is accessible from here.`},
				commands: {
					"enter elevator": () => {
						elevators.elev_64.floor = String(floor);
						player.location = elevators.elev_64;
						return player.location.description();
					},
					"go south": () => {player.location = floors[floor].section56_61; return player.location.description();},
					s: () => {return floors[floor].el_landing_64.commands["go south"]();}
				}
			};
		}
		if (floor === "2") {
			this.section01_12 = {
				r_start: 1,
				r_end: 12,
				description: () => {return `You are on the ${fl_txt} floor, in the section of hallway between room ${floor}01 and ${floor}12. There is an elevator landing to your north next to room ${floor}14.`},
				commands: {
					"go north": () => {player.location = floors[floor].el_landing_14; return player.location.description();},
					n: () => {return floors[floor].section01_12.commands["go north"]();},
					"go south": () => {return `You cant go that way, the hallway ends at room ${floor}01`;},
					s: () => {return floors[floor].section01_12.commands["go south"]();},
				}
			};
			make_commands(this.rooms, this.section01_12);

			this.section24_41 = {
				r_start: 24,
				r_end: 41,
				description: () => {return `You are on the ${fl_txt} floor, in the section of hallway between room ${floor}24 and ${floor}41. There is an elevator landing to your south next to room ${floor}24, and the hallway continues that direction beyond the elevator. The hallway continues un-obstructed to your north.`},
				commands: {
					"go north": () => {player.location = floors[floor].section42_47; return player.location.description();},
					n: () => {return floors[floor].section24_41.commands["go north"]();},
					"go south": () => {player.location = floors[floor].el_landing_24; return player.location.description();},
					s: () => {return floors[floor].section24_41.commands["go south"]();}
				}
			};
			make_commands(this.rooms, this.section24_41);

			this.section63_71 = {
				r_start: 63,
				r_end: 71,
				description: () => {return `You are on the ${fl_txt} floor, in the section of hallway between room ${floor}63 and ${floor}71. There is an elevator landing to your south next to room ${floor}63, and the hallway continues that direction beyond the elevator.`},
				commands: {
					"go south": () => {player.location = floors[floor].el_landing_64; return player.location.description();},
					s: () => {return floors[floor].section63_71.commands["go south"]();}
				}
			};
			make_commands(this.rooms, this.section63_71);

			this.el_landing_14 = {
				description: () => {return `You are on the elevator landing next to room ${floor}14, above the sunrise lobby. The elevator is accessable from here, and the hallway continues to the south.`},
				commands: {
					"enter elevator": () => {
						elevators.elev_14.floor = String(floor);
						player.location = elevators.elev_14;
						return player.location.description();
					},
					"go south": () => {player.location = floors[floor].section01_12; return player.location.description();},
					s: () => {return floors[floor].el_landing_14.commands["go south"]();}
				}
			};
			this.el_landing_24 ={
				description: () => {return `You are on the elevator landing next to room ${floor}24. The elevator is accessable from here, and a hallway leads to your north.`},
				commands: {
					"enter elevator": () => {
						elevators.elev_24.floor = String(floor);
						player.location = elevators.elev_24;
						return player.location.description();
					},
					"go north": () => {player.location = floors[floor].section24_41; return player.location.description();},
					n: () => {return floors[floor].el_landing_24.commands["go north"]();}
				}
			};
		}
		
		if (floor === "8") {
			this.section14_23 = {
				r_start: 14,
				r_end: 23,
				description: () => {return `You are on the ${fl_txt} floor, in the section of hallway between room ${floor}14 and ${floor}23. There is an elevator landing to your north next to room ${floor}24. There's another elevator landing to the south next to room ${floor}14.`},
				commands: {
					"go north": () => {player.location = floors[floor].el_landing_24; return player.location.description();},
					n: () => {return floors[floor].section14_23.commands["go north"]();},
					"go south": () => {player.location = floors[floor].el_landing_14; return player.location.description();},
					s: () => {return floors[floor].section14_23.commands["go south"]();}
				}
			};
			make_commands(this.rooms, this.section14_23);

			this.el_landing_14 = {
				description: () => {return `You are on the elevator landing next to room ${floor}14, above the sunrise lobby. The elevator is acessable, and the hallway continues north from here.`},
				commands: {
					"enter elevator": () => {
						elevators.elev_14.floor = String(floor);
						player.location = elevators.elev_14;
						return player.location.description();
					},
					"go north": () => {player.location = floors[floor].section14_23; return player.location.description();},
					n: () => {return floors[floor].el_landing_14.commands["go north"]();}
				}
			};

			this.el_landing_24 ={
				description: () => {return `You are on the elevator landing next to room ${floor}24, The elevator is accessable here, and the hallway continues south.`},
				commands: {
					"enter elevator": () => {
						elevators.elev_24.floor = String(floor);
						player.location = elevators.elev_24;
						return player.location.description();
					},
					"go south": () => {player.location = floors[floor].section14_23; return player.location.description();},
					s: () => {return floors[floor].el_landing_24.commands["go south"]();}
				}
			};

			return;
		};

		if (floor != "7" && floor != "8") {
			this.section42_47 = {
				r_start: 42,
				r_end: 47,
				description: () => {return `You are on the ${fl_txt} floor, in the section of hallway between room ${floor}42 and ${floor}47. The hallway continues to the north. To the south, the hallway dead ends at a wall.`},
				commands: {
					"go north": () => {player.location = floors[floor].section48_55; return player.location.description();},
					n: () => {return floors[floor].section42_47.commands["go north"]();}
				}
			};
			make_commands(this.rooms, this.section42_47);

			this.el_landing_64 ={
				description: () => {return `You are on the elevator landing next to room ${floor}64, The elevator is accessable from here, and the hallway continues to your north and south.`},
				commands: {
					"enter elevator": () => {
						elevators.elev_64.floor = String(floor);
						player.location = elevators.elev_64;
						return player.location.description();
					},
					"go north": () => {player.location = floors[floor].section63_71; return player.location.description();},
					n: () => {return floors[floor].el_landing_64.commands["go north"]();},
					"go south": () => {player.location = floors[floor].section56_61; return player.location.description();},
					s: () => {return floors[floor].el_landing_64.commands["go south"]();}
				}
			};
		};
		
		this.el_room_48 = {
			description: () => {return `You are in the elevator room next to room ${floor}48, above the main lobby. The elevator is accessable from here, and a door to the west leads into a long hallway running north/south along the hotel. `},
			commands: {
				"enter elevator": () => {
					elevators.elev_48.floor = String(floor);
					player.location = elevators.elev_48;
					return player.location.description();
				},
				"go west": () => {player.location = floors[floor].section48_55; return player.location.description()},
				w: () => {return player.location.commands["go west"]()},
				"enter hall": () => {return player.location.commands["go west"]()}
			}
		};

		this.section48_55 = {
			r_start: 48,
			r_end: 55,
			description: () => {return `You are on the ${fl_txt} floor, in the section of outdoor hallway from room ${floor}48 to room ${floor}55. The elevator room next to room ${floor}48 is accessable from here, and the hallway continues to your north and south.`},
			commands: {
				"enter elevator room": () => {player.location = floors[floor].el_room_48; return player.location.description()},
				//`enter room ${floor}48`: () => {player.location = floors[floor].rooms[48]; return player.location.description()},
				"go north": () => {player.location = floors[floor].section56_61; return player.location.description();},
				n: () => {return floors[floor].section48_55.commands["go north"]();},
				"go south": () => {player.location = floors[floor].section42_47; return player.location.description();},
				s: () => {return floors[floor].section48_55.commands["go south"]();}
			},
			
			
		};
		make_commands(this.rooms, this.section48_55);

		this.section56_61 = {
			r_start: 56,
			r_end: 61,
			description: () => {return `You are on the ${fl_txt} floor, in the section of outdoor hallway from room ${floor}56 to room ${floor}61. The elevator landing by room ${floor}63 is accessable to the north. The hallway continues past it to the north, and to the south.`},
			commands: {
				"go north": () => {player.location = floors[floor].el_landing_64; return player.location.description();},
				n: () => {return floors[floor].section56_61.commands["go north"]();},
				"go south": () => {player.location = floors[floor].section48_55; return player.location.description();},
				s: () => {return floors[floor].section56_61.commands["go south"]();}
			},
		};
		make_commands(this.rooms, this.section56_61);					
	}
};


let beachfronts = [];

for (i = 0; i < 14; i++) {
	beachfronts[i] = new beachfront(i);
};

let floors = [];

for (j = 2; j < 9; j++) {
	floors[j] = new hotel_floor(String(j));
}

const elevators = {
	elev_14: new elevator(14),
	elev_24: new elevator(24),
	elev_48: new elevator(48),
	elev_64: new elevator(64)
};

const world = {
	north_pool: {
		description: () => {
			let on_tbl;			
			if (world.north_pool.items["bottle of water"]) {
				on_tbl = "<br>There is a table here with a bottle of water on it.";
			} else {
				on_tbl = "";
			}
			return `You are on the north quadrant of the pool deck. The entrance to the oceanside grill is open, and just beyond it to the east a gate in the fence leading to the beach. To the west, a hallway leads past Camp Amelia to another gate in the distance. To the south, a walkway passes between the infinity pool and the family pool to the south quadrant of the pool deck. The east and west quadrant of the pool deck are accessable to the south east and south west.${on_tbl}`;
		},
		items: {
			"bottle of water": {
				full: true,
				description: "a tall, refreshing bottle of crisp, clean water.",
				commands: {
					"drink water": () => {
						if (player.inventory["bottle of water"].full) {
							player.inventory["bottle of water"].full = false;
							player.inventory["bottle of water"].description = "an empty bottle";
							return "you bring the tall bottle of crisp, refreshing water to your lips and drink - *glug* *glug* *glug* - its gone. you feel refreshed."
						} else {
							return "you cant do that, the bottle is empty."
						}
					},
					"pour water on man": () => {}
				}
			}
		},
		commands: {
			"get water": () => {return get_item("bottle of water");},
			"go south west": () => {player.location = world.west_pool; return player.location.description()},
			"go south east": () => {player.location = world.east_pool; return player.location.description()},
			"go south": () => {player.location = world.south_pool; return player.location.description()},
			"go east": () => {player.location = world.hotel_north_bch; return player.location.description()},
			//"go west": () => {player.location = world.!!!!!; return player.location.description()},
			sw: () => {return world.north_pool.commands["go south west"]()},
			se: () => {return world.north_pool.commands["go south east"]()},
			s: () => {return world.north_pool.commands["go south"]()},
			e: () => {return world.north_pool.commands["go east"]()},
			//w: () => {return world.north_pool.commands["go west"]()}
		},
		npc_options: {
			move: {
				south_west: {
					index: 0,
					f: () => {return world.west_pool}
				},
				south_east: {
					index: 1,
					f: () => {return world.east_pool}
				},
				south: {
					index: 2,
					f: () => {return world.south_pool}
				},
				/*east: {
					index: 3,
					f: () => {return world.!!!!!}
				},
				west: {
					index: 4,
					f: () => {return world.!!!!!}
				}*/
			} 
		}
		
	},

	west_pool: {
		description: () => {return "You are on the west quadrant of the pool deck. To the east is the fountain, and the infinity pool past that. To the west is the entrance to the hotel lobby. the pool deck continues north and south around the infinity pool."},
		commands: {
			"go north": () => {player.location = world.north_pool; return player.location.description()},
			"go south": () => {player.location = world.south_pool; return player.location.description()},
			n: () => {return world.west_pool.commands["go north"]()},
			s: () => {return world.west_pool.commands["go south"]()},
			"enter lobby": () => {player.location = world.hotel_lobby; return player.location.description()},
			lobby: () => {return world.west_pool.commands["enter lobby"]()},
			"go west": () => {return world.west_pool.commands["enter lobby"]()},
			w: () => {return world.west_pool.commands["enter lobby"]()}
		},
		npc_options: {
			move: {
				north: {
					index: 0,
					f: () => {return world.north_pool}
				},
				south: {
					index: 1,
					f: () => {return world.south_pool}
				},
				lobby: {
					index: 0,
					f: () => {return world.hotel_lobby}
				}
			}
		}
	},

	east_pool: {
		description: () => {return "You are on the east quadrant of the pool deck. To your west the family pool and splash pad are bustling with excitement. To the east, a fence seperates the pool deck from the white sandy beach of Horsey Island, where the calm waves of the Atlantic ocean are soothingly crashing against the shore. The pool deck continues around the pools to the north and south."},
		commands: {
			"go north": () => {player.location = world.north_pool; return player.location.description()},
			"go south": () => {player.location = world.south_pool; return player.location.description()},
			n: () => {return world.east_pool.commands["go north"]()},
			s: () => {return world.east_pool.commands["go south"]()}
		},
		npc_options: {
			move: {
				north: {
					index: 0,
					f: () => {return world.north_pool}
				},
				south: {
					index: 1,
					f: () => {return world.south_pool}
				}
			}
		}
	},

	south_pool: {
		description: () => {return "You are on the pool deck, in the south quadrant. To the east, a fence seperates the pool deck from the beach. Further to the south, a gate in the fence leads to a pathway along the side of the hotel.";},
		commands: {
			"go north west": () => {player.location = world.west_pool; return player.location.description()},
			"go north east": () => {player.location = world.east_pool; return player.location.description()},
			"go north": () => {player.location = world.north_pool; return player.location.description()},
			"go south": () => {player.location = world.dunes_path_1; return player.location.description()},
			nw: () => {return world.south_pool.commands["go north west"]()},
			ne: () => {return world.south_pool.commands["go north east"]()},
			n: () => {return world.south_pool.commands["go north"]()},
			s: () => {return world.south_pool.commands["go south"]()}
		},
		npc_options: {
			move: {
				north_west: {
					index: 0,
					f: () => {return world.west_pool}
				},
				north_east: {
					index: 1,
					f: () => {return world.east_pool}
				},
				north: {
					index: 2,
					f: () => {return world.north_pool}
				},
				/*south: {
					index: 3,
					f: () => {return world.dunes_path_1}
				}*/
			}
		} 
	},

	hotel_north_bch: {
		description: () => {return "You are on a section of white, sandy beach, in front of the northern half of the Luxe Resort on Horsey Island. The beach extends for miles to the north and south, and a gate to your west leads to the pool deck outside the resort. To the east, the waves of the calm yet mighty Atlantic roll gently against the shore."},
		commands: {
			"go north": () => {player.location = beachfronts[5]; return player.location.description()},
			"go south": () => {player.location = world.hotel_south_bch; return player.location.description()},
			"go west":  () => {player.location = world.north_pool; return player.location.description()},
			n: () => {return world.hotel_north_bch.commands["go north"]()},
			s: () => {return world.hotel_north_bch.commands["go south"]()},
			w: () => {return world.hotel_north_bch.commands["go west"]()}
		},
		npc_options: {
			move: {
				/*north: {
					index: 0,
					f: () => {return world.north_pool}
				},
				south: {
					index: 1,
					f: () => {return world.south_pool}
				}*/
			}
		}
	},

	hotel_south_bch: {
		description: () => {return "You are on a section of white, sandy beach, in front of the southern half of the Luxe Resort on Horsey Island. The beach extends for miles to the north and south."},
		commands: {
			"go north": () => {player.location = world.hotel_north_bch; return player.location.description()},
			n: () => {return world.hotel_south_bch.commands["go north"]()},
			"go south": () => {player.location = beachfronts[4]; return player.location.description()},
			s: () => {return world.hotel_south_bch.commands["go south"]()},
		},
		npc_options: {
			move: {
				/*north: {
					index: 0,
					f: () => {return world.!!!!}
				},
				south: {
					index: 1,
					f: () => {return world.!!!!}
				}*/
			}
		}
	},

	dunes_path_1: {
		description: () => {return "You are on the north section of the dunes path. The hotel towers above you to the west, and to your east the dunes stand between you and the beach. The path continues to the south, and a gate in the fence to your north leads to the pool deck."},
		commands: {
			"go north": () => {player.location = world.south_pool; return player.location.description()},
			n: () => {return world.dunes_path_1.commands["go north"]()},
			"go south": () => {player.location = world.dunes_path_2; return player.location.description()},
			s: () => {return world.dunes_path_1.commands["go south"]()},
		},
		npc_options: {
			move: {
				/*north: {
					index: 0,
					f: () => {return world.!!!!}
				},
				south: {
					index: 1,
					f: () => {return world.!!!!}
				}*/
			}
		}
	},

	dunes_path_2: {
		description: () => {return "You are on the south section of the dunes path. The hotel towers above you to the west, and to your east the dunes stand between you and the beach. The path continues to the north, and the oceanview terrace lies to the south."},
		commands: {
			"go north": () => {player.location = world.dunes_path_1; return player.location.description()},
			n: () => {return world.dunes_path_2.commands["go north"]()},
			"go south": () => {player.location = world.oceanview_terrace; return player.location.description()},
			s: () => {return world.dunes_path_2.commands["go south"]()},
		},
		npc_options: {
			move: {
				/*north: {
					index: 0,
					f: () => {return world.!!!!}
				},
				south: {
					index: 1,
					f: () => {return world.!!!!}
				}*/
			}
		}
	},

	oceanview_terrace: {
		description: () => {return "You are on the oceanview terrace. To the north, a path along the dunes leads to the pool deck in the distance. To the east, a fence at the edge of the terrace prevents you from climbing on the dunes, which separate you from the beach. To the west, a door leads inside to an elevator landing."},
		commands: {
			"go north": () => {player.location = world.dunes_path_2; return player.location.description()},
			n: () => {return world.oceanview_terrace.commands["go north"]()},
			"go west":  () => {player.location = world.sunrise_14elev_basement_landing; return player.location.description()},
			w: () => {return world.oceanview_terrace.commands["go west"]()},
			//"go south": () => {player.location = world.oceanview_terrace; return player.location.description()},
			//s: () => {return world.oceanview_terrace.commands["go south"]()},
		},
		npc_options: {
			move: {
				/*north: {
					index: 0,
					f: () => {return world.!!!!}
				},
				south: {
					index: 1,
					f: () => {return world.!!!!}
				}*/
			}
		}
	},

	hotel_lobby: {
		description: () => {return "You are in the Hotel Lobby. It is bright and well decorated, you see several agents behind the check in desk, patiently awaiting the end of their shifts. To the east, large glass doors lead out to the pool deck, and the beach beyond that. To the west, the front drive of the hotel is bustling with activity. To the north you see the bar in the seaglass lounge. To the south, a passage leads to the main elevator landing."},
		commands: {
			"go east": () => {player.location = world.west_pool; return player.location.description()},
			e: () => {return world.hotel_lobby.commands["go east"]()},
			"go west": () => {player.location = world.front_entrance; return player.location.description()},
			w: () => {return world.hotel_lobby.commands["go west"]()},
			"go north": () => {player.location = world.seaglass; return player.location.description()},
			n: () => {return world.hotel_lobby.commands["go north"]()},
			"enter seaglass": () => {return world.hotel_lobby.commands["go north"]()},
			"go south": () => {player.location = world.lobby_48elev_landing; return player.location.description()},
			s: () => {return world.hotel_lobby.commands["go south"]()}
		},
		npc_options: {
			move: {
				east: {
					index: 0,
					f: () => {return world.west_pool}
				},
				west: {
					index: 1,
					f: () => {return world.front_entrance}
				},
				seaglass: {
					index: 2,
					f: () => {return world.seaglass}
				},
				south: {
					index: 3,
					f: () => {return world.lobby_48elev_landing}
				}
			}
		}
	},
	seaglass: {
		description: () => {return "You are in the seaglass lounge. The lounge is bustling with activity, resort guests scattered around the various seating in the room. Two bartenders are behind the bar, busily exchanging banter and helping numerous people. The hotel lobby lies to the south."},
		commands: {
			"go south": () => {player.location = world.hotel_lobby; return player.location.description()},
			s: () => {return world.seaglass.commands["go south"]()},
			"exit seaglass": () => {return world.seaglass.commands["go south"]()},
			//"go north": () => {player.location = world.!!!!!; return player.location.description()},
			//n: () => {return world.seaglass.commands["go north"]()}
		},
		npc_options: {
			move: {
				/*north: {
					index: 0,
					f: () => {return world.!!!!}
				},*/
				south: {
					index: 0,
					f: () => {return world.hotel_lobby}
				}
			}
		}
	},
	front_entrance: {
		description: () => {return "You are at the front entrance of the Luxe Horsey Island Resort. Several bellmen and valets are present, some assisting hotel guests with luggage or their vehicles, others waiting attentively for any opportunity to assist. In particular, a friendly looking man, who's nametag reads 'Raymond DeScott', is smiling and greeting people enthusiastically as he opens the front door to the lobby for the many people going in and out. You may enter the lobby to the east through Raymond's door, or travel along the hotel's outdoor hallway to the north, or enter the breezeway to your south. You may also take the steps to your west down onto the front drive, where several cars are waiting under the porte-cochère."},
		commands: {
			"go east": () => {player.location = world.hotel_lobby; return player.location.description()},
			e: () => {return world.front_entrance.commands["go east"]()},
			"go west": () => {player.location = world.front_drive; return player.location.description()},
			w: () => {return world.front_entrance.commands["go west"]()},
			"go south": () => {player.location = world.breezeway_north; return player.location.description()},
			s: () => {return world.front_entrance.commands["go south"]()},
			"tackle raymond and do the thing": () => {return "You abruptly tackle Raymond, the friendly bellman, to the ground and wrestle around with him there for a moment. A small group of people stop to watch as the commotion ensues, and invariably Raymond becomes romantically incensed by the horseplay, due to the instinctive nature of his species when it comes to wrastlin' an'a horseplayin' for an audience. After a few moments, a small crowd had gathered, but just as soon as it seemed to be becoming a spectator worthy scuffle, the tone of the encounter shifted and the veracity of the horseplay dampened to a soft lover's quarrel. The scene quickly becomes too tender for the public surroundings, and so the two of you disappear to a nearby storage closet, affectionately refferred to as 'The Deep' by it's keepers, and Mr. DeScott and Wild Mr. Horseman would remain uninterrupted behind its door for nearly 37 minutes. Upon leaving The Deep, Raymond and you return to the front entrance, where the crowd has dispersed and business carries on as usual."}
		},
		npc_options: {
			move: {
				east: {
					index: 0,
					f: () => {return world.hotel_lobby}
				},
				west: {
					index: 1,
					f: () => {return world.front_drive}
				},
				south: {
					index: 1,
					f: () => {return world.breezeway_north}
				}
			}
		}
	},
	front_drive: {
		description: () => {return "You are on the front driveway of the Luxe Hotel, under the porte-cochère. There are vehicles coming and going, and valet attendents running around hurriedly, and bellmen bringing and taking cartfuls of luggage to and from the numerous cars on the drive way. You may go up the steps leading to the front entrance to the east, or you may go to the tram stop to your west."},
		commands: {
			"go east": () => {player.location = world.front_entrance; return player.location.description()},
			e: () => {return world.front_drive.commands["go east"]()},
		},
		npc_options: {
			move: {
				east: {
					index: 0,
					f: () => {return world.front_entrance}
				}
			}
		}
	},
	lobby_48elev_landing: {
		////add an elevator
		description: () => {return "You are at the elevator landing in the main lobby of the hotel. A passage to the north leads into the lobby, where the sounds of travellers arriving and departing echo through the building. The elevator is accessible here, as well as the concierge office."},
		commands: {
			"enter elevator": () => {
				elevators.elev_48.floor = 'L';
				player.location = elevators.elev_48;
				return player.location.description();
			},
			"go north": () => {player.location = world.hotel_lobby; return player.location.description()},
			n: () => {return world.lobby_48elev_landing.commands["go north"]()},
		},
		npc_options: {
			move: {
				north: {
					index: 0,
					f: () => {return world.hotel_lobby}
				}
			}
		}
	},
	breezeway_north: {
		description: () => {return "You are on the north end of the breezeway. The front entrance to the hotel is busy with activity to your north, and the breezeway continues south."},
		commands: {
			"go north": () => {player.location = world.front_entrance; return player.location.description()},
			n: () => {return world.breezeway_north.commands["go north"]()},
			"go south": () => {player.location = world.cc_elev_landing; return player.location.description()},
			s: () => {return world.breezeway_north.commands["go south"]()},
			"go south east": () => {player.location = world.section42_47; return player.location.description()},
			se: () => {return world.breezeway_north.commands["go south east"]()},
		},
		npc_options: {
			move: {
				north: {
					index: 0,
					f: () => {return world.front_entrance}
				},
				south: {
					index: 1,
					f: () => {return world.cc_elev_landing}
				},
				se: {
					index: 2,
					f: () => {return world.section42_47}
				} 
			}
		}
	},

	section42_47: {
		description: () => {return "You are in the section of hallway between roooms 142 and 147. The breezeway is accessible to the north west, and the hallway continues to the south."},
		commands: {
			"go north west": () => {player.location = world.breezeway_north; return player.location.description()},
			nw: () => {return world.section42_47.commands["go north west"]()},
			n: () => {return world.section42_47.commands["go north west"]()},
			"go south": () => {player.location = world.section24_41; return player.location.description()},
			s: () => {return world.section42_47.commands["go south"]()},
		},
		npc_options: {
			move: {
				northwest: {
					index: 0,
					f: () => {return world.breezeway_north}
				},
				south: {
					index: 1,
					f: () => {return world.section24_41}
				}
			}
		}
	},

	section24_41: {
		description: () => {return "You are in the section of hallway between roooms 124 and 141. The hallway continues to the north, and the elevator landing lies to the south."},
		commands: {
			"go north": () => {player.location = world.section42_47; return player.location.description()},
			n: () => {return world.section24_41.commands["go north"]()},
			"go south": () => {player.location = world.elev_24_landing; return player.location.description()},
			s: () => {return world.section24_41.commands["go south"]()},
		},
		npc_options: {
			move: {
				north: {
					index: 0,
					f: () => {return world.section42_47}
				},
				south: {
					index: 1,
					f: () => {return world.elev_24_landing}
				}
			}
		}
	},

	elev_24_landing: {
		description: () => {return "You are on the lobby floor, at the elevator landing nearest room 124. The elevator is accessible here, a hallway lies to the south, and a ramp to the east leads up to the breezeway."},
		commands: {
			"go east": () => {player.location = world.breezeway_south; return player.location.description()},
			e: () => {return world.elev_24_landing.commands["go east"]()},
			"go north": () => {player.location = world.section24_41; return player.location.description()},
			n: () => {return world.elev_24_landing.commands["go north"]()},
			"enter elevator": () => {player.location = elevators.elev_24; return player.location.description()},
		},
		npc_options: {
			move: {
				east: {
					index: 0,
					f: () => {return world.breezeway_south}
				},
				south: {
					index: 1,
					f: () => {return world.section24_41}
				}
			}
		}
	},

	cc_elev_landing: {
		////add an elevator
		description: () => {return "You are on the middle section of the breezeway. The conference center is in the distance to the west, just down the steps next to the elevator, both of which lead down to the conference center lawn. The breezeway continues to the north and south."},
		commands: {
			"go north": () => {player.location = world.breezeway_north; return player.location.description()},
			n: () => {return world.cc_elev_landing.commands["go north"]()},
			"go south": () => {player.location = world.breezeway_south; return player.location.description()},
			s: () => {return world.cc_elev_landing.commands["go south"]()},
		},
		npc_options: {
			move: {
				north: {
					index: 0,
					f: () => {return world.breezeway_north}
				},
				south: {
					index: 1,
					f: () => {return world.breezeway_south}
				}
			}
		}
	},
	breezeway_south: {
		description: () => {return "You are on the south end of the breezeway, which continues to the north. To the east, the elevator landing by room 124 lies at the bottom of the ramp, and to the south a glass double door leads into the sunrise lobby, where you smell bacon."},
		commands: {
			"go north": () => {player.location = world.cc_elev_landing; return player.location.description()},
			n: () => {return world.breezeway_south.commands["go north"]()},
			"go south": () => {player.location = world.sunrise_lobby; return player.location.description()},
			s: () => {return world.breezeway_south.commands["go south"]()},
			"go east": () => {player.location = world.elev_24_landing; return player.location.description()},
			e: () => {return world.breezeway_south.commands["go east"]()},
		},
		npc_options: {
			move: {
				north: {
					index: 0,
					f: () => {return world.cc_elev_landing}
				},
				south: {
					index: 1,
					f: () => {return world.sunrise_lobby}
				}
			}
		}
	},

	sunrise_lobby: {
		description: () => {return "You are in the Sunrise Lobby, the hotel's secondary lobby in the south tower. It is smaller than the main lobby, but just as well decorated and attended to. The sounds of a dining hall and smell of bacon and eggs overwhelms the room, emanating from the Sunrise Cafe where hotel guests are enjoying the continental breakfast. A doorway to you north leads out on to the breezeway, and to your south the elevator landing lies just beyond the cafe."},
		commands: {
			"go north": () => {player.location = world.breezeway_south; return player.location.description()},
			n: () => {return world.sunrise_lobby.commands["go north"]()},
			//"enter live oak": () => {player.location = world.live_oak; return player.location.description()},
			//"enter sunrise cafe": () => {player.location = !!!!!!!; return player.location.description()},
			"go south": () => {player.location = world.sunrise_14elev_landing; return player.location.description()},
			s: () => {return world.sunrise_lobby.commands["go south"]()},
		},
		npc_options: {
			move: {
				north: {
					index: 0,
					f: () => {return world.breezeway_south}
				},
				south: {
					index: 1,
					f: () => {return world.sunrise_14elev_landing}
				},
				/*l_oak: {
					index: 2,
					f: () => {return world.live_oak}
				}*/
			}
		}
	},
	sunrise_14elev_landing: {
		description: () => {return "You are in the sunrise lobby, at the elevator landing nearest to room 112. To your south, a doorway leads out of the sunrise lobby to the hallway. To your north, the sunrise lobby is busy with activity - mostly guests waiting in line to be seated in the sunrise cafe, which fills the entire lobby with the delicious aroma of bacon and eggs."},
		commands: {
			"enter elevator": () => {player.location = elevators.elev_14; return player.location.description()},
			"go north": () => {player.location = world.sunrise_lobby; return player.location.description()},
			n: () => {return world.sunrise_14elev_landing.commands["go north"]()},
			"go south": () => {player.location = world.section101_112; return player.location.description()},
			s: () => {return world.sunrise_14elev_landing.commands["go south"]()},
		},
		npc_options: {
			move: {
				north: {
					index: 0,
					f: () => {return world.sunrise_lobby}
				},
				south: {
					index: 1,
					f: () => {return world.section101_112}
				}
			}
		}
	},
	sunrise_14elev_basement_landing: {
		description: () => {return "You are in the basement level of the hotel, at the sunrise elevator landing. The elevator is accessable here, and to the east a doorway leads out onto the oceanview terrace."},
		commands: {
			"enter elevator": () => {player.location = elevators.elev_14; return player.location.description()},
			"go east": () => {player.location = world.oceanview_terrace; return player.location.description()},
			e: () => {return world.sunrise_14elev_landing.commands["go east"]()},
		},
		npc_options: {
			move: {
				east: {
					index: 0,
					f: () => {return world.oceanview_terrace}
				},
				
			}
		}
	},
	section101_112: {
		description: () => {return "You are on the lobby floor, in the section of hallway south of the sunrise lobby, between rooms 101 and 112. To your north, a set of glass doors leads to the sunrise lobby elevator. To the west, a foot path is accessable which leads to the captain's court villas - just south of the hotel."},
		commands: {
			"go north": () => {player.location = world.sunrise_14elev_landing; return player.location.description()},
			n: () => {return world.section101_112.commands["go north"]()},
			//"go south": () => {player.location = world.!!!!!; return player.location.description()},
			//s: () => {return world.section101_112.commands["go south"]()},
		},
		npc_options: {
			move: {
				north: {
					index: 0,
					f: () => {return world.sunrise_14elev_landing}
				},
				/*south: {
					index: 1,
					f: () => {return world.!!!!!!!}
				}*/
			}
		}
	},

	miltons_office: {
		bound: true,
		seated: true,
		locked: true,
		turns_in_office: 0,
		description: () => {return "You come to under the greenish white glow of an office flourescent tube. Your hooves are bound with zip ties behind the office chair that you're seated in. You're alone, but you hear voices outside the door. There's a computer with a blank screen on the desk, a card reader, a coffee mug full of pens and pencils, scissors, tape and other office supplies. As you await your fate, you notice the zip tie around your hooves is loose around your wrists. You quickly grab the scissors off the desk, and then hide your hands back behind the chair. No sooner do you have your weapon concealed than the door bursts open, Milton storms in with a clipboard and anger in his eyes. 'Right then mate, what we gonna do 'bout this then?' he mutters as he leans in toward you."},
		items: {
			"pair of scissors": {
				description: "a sharp pair of office scissors",
				commands: {
					"stab milton with scissors": () => {
						player.inventory["master key"] = mobile_npc.prince.inventory["master key"];
						delete mobile_npc.prince.inventory["master key"];
						return "As he leans in, you swiftly and callously swing the point of the scissors up from behind your back and forcefully drive them into his ear, through his skull, and into his soft brain. He lets out a loud scream which quickly becomes a gurgle, his eyes roll in the back of his head as blood pours out of his ear, and his convulsing body falls to the floor. After a moment the noises and movement stop, and you remove the white key card from the side of Milton's lifeless body. You sigh softly as the weight of taking a man's life crashes down upon you, a single pearly tear rolls out of the corner of your eye and down your cheek. You mourn the violence this world demands for a moment longer, then sniffle lightly as you wipe the sorrow from your face, refocusing on your mission."
					},
				}
			}
		},
		commands: {
			/*"escape from zipties": () => {
				world.miltons_office.turns_in_office += 1;
				if (world.miltons_office.bound) {
					world.miltons_office.bound = false;
					return "With a little effort, you're able to slip your hooves out of the zipties. You remain seated with your hooves behind your back, but you are free. You hear voices and footsteps approaching outside the office door. They stop for a moment outside and you hear Milton's voice coming from beyond the door, 'He's just inside here. Strangest thing I've ever seen - he's a man, but he's also a horse. Right assaulted me too, he did.' They continue past the door and the footsteps fade to silence.";
				} else {
					return "Your hooves are already unbound.";
				}
			},*/
			"get scissors": () => {
				world.miltons_office.turns_in_office += 1;
				get_item("pair of scissors");
			},
			"exit office": () => {
				
				player.location.seated = false;
				
			}
		}
	},
	sunrise_emp_hall: {
		description: () => {return "You are in the employee hallway outside the hotel's managerial various offices. You see vending machines,  There are several doorways here labeled 'Security', 'Maintenence', and 'Accounting' respectively, and a set of double doors to the south at the end of the hall."},
		commands: {
		}
	},

	/*live_oak: {
		!!!!!!!!fix this!!!!!!!!!!!!
		description: () => {return "GAME UNDER CONSTRUCTION - live oak"},
		commands: {
			"go north": () => {player.location = world.breezeway_south; return player.location.description()},
			n: () => {return world.sunrise_lobby.commands["go north"]()},
			"enter live oak": () => {player.location = world.live_oak; return player.location.description()},
			"go south": () => {player.location = world.sunrise_14elev_landing; return player.location.description()},
			s: () => {return world.sunrise_lobby.commands["go south"]()}
		},
		npc_options: {
			move: {
				north: {
					index: 0,
					f: () => {return world.breezeway_south}
				},
				south: {
					index: 1,
					f: () => {return world.sunrise_14elev_landing}
				}
			}
		}
	},
	pool_gate_path: {},
	hive_circle: {},
	valet_garage: {},
	hive_hallway:{},
	the_hive: {},
	*/
};

const mobile_npc = {
	"THE Mitchall LeBratten": {
		move_on: 2,
		location: world.front_entrance,
		add_desc: () => {return "A grizzled old man is standing here. He is wearing a Hotel uniform, the waist of his short pants hanging awkwardly cock-eyed off of one hip, a walkie-talkie on his belt pulling down the other end of his waistline almost to the top of his thigh. A pair of thin wire frame glasses are held tightly against his face with rubber bands around the back of his head. A wide grin akin to the 'The Joker' rests frighteningly on his face. Around his neck, he wears a necklace with several human ears and dog tags strung on it. You see his name tag reads 'Mitch' as he approaches you, dropping several 'Halls' menthol throat lozenge wrappers behind him as he walks. 'Hey there Buddy, I'm the Awesome Guy! I served in Vietnam, you know 'Lone Survivor' stuff, that's where I got these!' He lifts his grotesque ear-necklace for emphasis. 'Then I was a lineman for AT&T for 30 years, did lots of cable repair work after the hurricanes, you know? Anyway I took a full pension buy out a few years back, now im just livin the dream! Another day in Paradise!' he then turns to wish a confused man and his son 'Happy Mother's Day' before walking back to his post near the door, dropping a few more 'Halls' wrappers on the way."},
		inventory: {}
	},
	/*"npc3": {
		move_on: 1,
		location: world.west_pool,
		add_desc: () => {return "test npc3 is here"},
		inventory: {}
	},
	"npc2": {
		move_on: 1,
		location: world.west_pool,
		add_desc: () => {return "test npc2 is here"},
		inventory: {}
	},
	"npc1": {
		move_on: 1,
		location: world.west_pool,
		add_desc: () => {return "test npc1 is here"},
		inventory: {}
	},*/
	"old crazy": {
		move_on: 3,
		location: world.west_pool,
		add_desc: () => {return "theres an elderly gentleman looking around awkwardly and mumbling to himself under his breath."},
		inventory: {}
	},
	prince: {
		move_on: 100,
		location: world.breezeway_north,
		inventory: {
			"master key": {
				description: "a plain white key card, hanging on a key ring.",
				commands: {}
			}
		},
		add_desc: () => {
			let master = "";
			if (mobile_npc.prince.inventory["master key"]){
				master = " A white key card hangs off of his hip on a caribeaner attatched to his beltloop."
			}
			return `Milton, better known as 'Prince' the hotel security man, is here. He glances at you, smiles and says 'Why the long face, mate?' in his signiture british accent.${master}`;
		},
		
		npc_commands: {
			"fight milton for key": () => {
				let roll = Math.floor(Math.random() * 4) + 1;
				if (roll > 3) {
					player.inventory["master key"] = mobile_npc.prince.inventory["master key"];
					delete mobile_npc.prince.inventory["master key"];
					return "Suddenly and without warning, you lunge at Milton from a horses arm length, blindsiding the unsuspecting security man right in the jaw with your hardened hoof. Incredibly, this does not knock him unconscious, though blood immediately begins pouring from his mouth and nose. 'Bloody F--kin Hell mate!' he spits as he squares up to you. The two of you spar for several minutes, each landing a number of solid blows. Milton fights galliantly, but alas, the initial sucker-punch seems to have set the tone of the fight and after landing another hoof in Milton's swelling and bloodied face, he falls unconscious to the ground. You bend down and remove the key card from his hip, and let out low 'neigh' as you observe the bloodied prize held by your hoof. You look down at Milton's defeated body, and for a brief moment you are filled with compassion and remorse, your soul bitterly lamenting the violence this world demands. The feeling passes as quickly as it came, and your mind returns to your mission." 
				} else {
					player.location = world.miltons_office;
					
					return `Suddenly and without warning, you lunge at Milton from a horses arm length, throwing a solid right cross towards his jaw. Milton however, is faster than you estimated and manages to dodge your attack. 'Aye, what the hell mate? That's really unacceptable mate, you're definitely gettin documented for that one!' He exclaims as he squares up to you. After a few minutes of active sparring, Milton lands a heavy blow right between your beady horse eyes, and its lights out.<br><br>${world.miltons_office.description()}`
				}
				
			},
			"fight prince for key": () => {return mobile_npc.prince.npc_commands["fight Milton for key()"]}
		}
	}
};

const player = {
	//START LOCATION
	location: world.breezeway_north,
	inventory: {
		"set of horse shoes": {
			description: "a set of 4 horseshoes, which you wear on your hooves",
			commands: {
				"throw horse shoes": () => {
					return "You take off your horse shoes and throw them. They sail through the air and land a short distance from you, where you look at them for a moment. On further consideration, you decide you won't make it far without them, so you retrieve them and replace them on your hooves."
				}
			}
		}
	},
	commands: {
		inventory: () => {
			let contents = "INVENTORY:";
			for (i in player.inventory) {
				contents = contents + "<br>-- " + i + ": " + player.inventory[i].description; 
			}
			return contents + "<br>";
		},
		inv: () => {return player.commands.inventory()},
		look: () => {return player.location.description()},
		help: () => {return "You can type commands in the text bar below to interact with the world. You can type full commands, such as 'go north', or 'go east'. You can also type shorthand for those types of 'go direction' commands. i.e. the command 'nw' is the same as typing 'go north west'. You can check your inventory with 'inventory' or 'inv'. Some commands are dependent on your location, objects or carachters present in the world, or items in your inventory. Also, you are a horse. A horseman, actually. Not a man who rides horses, but a horse who is a man. Neigh."},
		lc: () => {
			let cmds_txt = "";
			let header_txt = "Location Commands:"
			for (cmd in player.location.commands) {
				cmds_txt = cmds_txt + "<br>-- " + cmd;
			}

			return header_txt + cmds_txt + "<br>";
		},
		ic: () => {
			let cmds_txt = "";
			let header_txt = "Inventory Commands:"
			for (item in player.inventory) {
				cmds_txt = cmds_txt + "<br>* " + item;
				for (i_cmd in player.inventory[item].commands) {
					cmds_txt = cmds_txt + "<br>-- " + i_cmd;
				}
			}

			return header_txt + cmds_txt + "<br>";
		},
		chc: () => {
			let cmds_txt = "";
			let header_txt = "Carachter Commands:"
			for (npc in mobile_npc) {
				console.log(mobile_npc[npc].location, player.location)
				if (mobile_npc[npc].location == player.location) {
					for (cmd in mobile_npc[npc].npc_commands) {
						cmds_txt = cmds_txt + "<br>-- " + cmd;
					};
				}
			};
			if (cmds_txt === "") {
				return "No npc commands are available";
			};
			return header_txt + cmds_txt + "<br>";
		},
		"show all commands": () => {
			let cmds_txt = "AVAILABLE COMMANDS:"
			cmds_txt = cmds_txt + "<br> Player Commands:"
			for (cmd in player.commands) {	
				cmds_txt = cmds_txt + "<br>-- " + cmd;
			}

			cmds_txt = cmds_txt + "<br><br>" + player.commands.lc() + "<br>" + player.commands.ic() + "<br>"+ player.commands.chc() + "<br>";


			return cmds_txt;
		},
		ac: () => {return player.commands["show all commands"]()},
		////debugs only!!! vvv
		"show npcs": () => {
			for (i in mobile_npc){
				console.log(`${i}: `, mobile_npc[i].location.description());
			}
			return "this is a debug command. it is not part of the game.";
		}
	}
};

const initial_p =  document.createElement("p");
npc_present = "";
for (npc in mobile_npc) {
	if (mobile_npc[npc].location == player.location) {
		npc_present = npc_present.concat(mobile_npc[npc].add_desc() + '<br><br>');
	}
}
initial_p.innerHTML = "Welcome to THE ADVENTURES OF WILD MR. HORSEMAN! enter commands to interact with the world. Type 'help' if you get stuck. Good luck!<br><br>Suddenly, you become aware of a ringing sound. As you squint open your eyes, you see nothing but bright, bluish light, and blurry sandy white colored objects swirling around you. You're completely disoriented, and your head is splitting. You close your eyes, let out a groan, and roll over as the ringing in your ears begins to fade and is overtaken by the sound of gently crashing waves. After a moment, you open them again, and breathe in deeply. The air is salty and humid, and the light is blinding, but you're able to sit up slowly, re-orient, and look around.<br><br>" + player.location.description() + "<br><br>" + `${npc_present}`;
text_window.append(initial_p);

function process_input(in_val) {
	const terminal_output = document.createElement("p");

	for (command in player.commands) {
		if (command === in_val) {
			move_count += 1;
			terminal_output.innerHTML = move_mobile_npcs(player.commands[in_val]());
			return terminal_output;
		}
	};

	for (command in player.location.commands) {
		if (command === in_val) {
			move_count += 1;
			terminal_output.innerHTML = move_mobile_npcs(player.location.commands[in_val]());
			return terminal_output;
		}
	};
	
	for (i in player.inventory) {
		const item = player.inventory[i];
		for (command in item.commands) {
			if (command === in_val) {
				move_count += 1;
				terminal_output.innerHTML = move_mobile_npcs(item.commands[in_val]());
				return terminal_output;
			}
		}
	};

	// npc interactions
	let interact_var = 0;
	for (npc in mobile_npc) { 
		//console.log(interact_var, npc, player.location, mobile_npc[npc].location);
		interact_var ++;
		if (player.location == mobile_npc[npc].location) {
			for (command in mobile_npc[npc].npc_commands) {
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

function get_item(item_name) {
	const item = player.location.items[item_name];
	if (item === undefined) {
		return `there isnt a ${item_name} here`;
	}
	player.inventory[item_name] = item;
	delete player.location.items[item_name];
	return `you got the ${item_name}. it is now in your inventory.`;
};


function move_mobile_npcs(command_output, skip) {
	for (npc in mobile_npc) {
		if (npc == skip) {
			console.log(npc)
			continue;
		}
		if (move_count % mobile_npc[npc].move_on === 0) {
			const current_loc = mobile_npc[npc].location;
			const available_moves = mobile_npc[npc].location.npc_options.move;
			
			const rand_index = Math.floor(Math.random() * Object.keys(available_moves).length);
			
			for (move in available_moves) {
				if (rand_index === available_moves[move].index) {
					mobile_npc[npc].location = available_moves[move].f();
				} 
			};
		}
	}

	for (npc in mobile_npc){
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