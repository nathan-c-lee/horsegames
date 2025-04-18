// beachfront constructor class. creates all uniform beachfront objects north and south of hotel beachfront.
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

// hotel room constructor class. creates all hotel room interiors. 
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

// elevator constructor. constructs all elevators.
// needs work plugging into basement, must create basement first.
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

// hotel floor constructor. constructs all floors and calls hotel room constructor, creating all hotel rooms.
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

		for (let i = 1; i < 72; i++) {
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

// instantiate all uniform beachfronts with beachfront constructor.
let beachfronts = [];
for (let i = 0; i < 14; i++) {
	beachfronts[i] = new beachfront(i);
};

// instantiate all hotel floors and rooms.
let floors = [];
for (let j = 2; j < 9; j++) {
	floors[j] = new hotel_floor(String(j));
}

// instantiate all elevators
const elevators = {
	elev_14: new elevator(14),
	elev_24: new elevator(24),
	elev_48: new elevator(48),
	elev_64: new elevator(64)
};

// get item function moves item from player location to player inventory.
function get_item(item_name, pre, post) {
	const item = player.location.items[item_name];
	let pretext;
	let posttext;
	if (pre) {pretext = pre + "<BR><BR>";}
	if (post) {posttext = "<BR><BR>" + post;}
	if (pretext === undefined) {pretext = "";}
	if (posttext === undefined) {posttext = "";}
	if (item === undefined) {
		return `${pretext}There isn't a ${item_name} here.${posttext}`;
	}
	player.inventory[item_name] = item;
	delete player.location.items[item_name];
	return `${pretext}You got the ${item_name}. it is now in your inventory.${posttext}`;
};

// world object. contains all unique location objects that are not
// instantiated by a constructor class.
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
		locked: true,
		alone: false,
		milton_alive: true,
		set_desc: 0,
		turns_alone: 0,
		resp_opts: {sil: true, apo: true, agg: true},
		milton_return: (action) => {
			if (world.miltons_office.alone && world.miltons_office.milton_alive && !world.miltons_office.bound) {
				console.log('youre still alone')
				if (world.miltons_office.turns_alone >= 3) {
					console.log('miltons back');
					let scissors_txt;
					if (player.inventory["pair of scissors"]) {
						scissors_txt = "You grip the pair of scissors from Milton's desk tightly with your hoof. It looks like you may have to defend yourself.";
					} else {
						scissors_txt = "He seems to have hostile intent. It looks like you may have to defend yourself. Your hooves are unbound, but unforunately you dont have anything that can serve as a weapon. Hopefully you'll be able to ward off his monsterous advances.";
					}
					//world.miltons_office.alone = false;
					//needs to switch at the end of calling function, not here. otherwise it screws up the output. 
					//can check for world.miltons_office.turns_alone > 3
					if (world.miltons_office.bound) {
						world.miltons_office.set_desc = 8;
						player.dead	= true;
						return `Suddenly, you hear the sound of footsteps outside the door, and someone manipulating the lock on the other side of the door. A quiet panic overtakes you as the door begins to open. Milton returns through the doorway, a briefcase in one hand and a sadistic looking grin on his face. 'Look mate, it really didn't have to be this way...' he begins. You're stuck in the chair, and there's nothing you can do as Milton begins to carve into your horseflesh with various implements. You curse at him through hideous screams, and slowly, the life fades from your body.<BR><BR> You have died and your adventure has ended. Thanks for playing! Press 'Ctrl + R' to restart.`;
					} else {
						world.miltons_office.set_desc = 6;
					};
					return `Just as you finish ${action}, you hear the sound of footsteps outside the door, and someone manipulating the lock on the other side of the door. You dash back to the chair and pretend to be bound again, just as the door begins to open. Milton returns through the doorway, a briefcase in one hand and a sadistic looking grin on his face. 'Alright then mate, let's see if we can get some answers...' he begins. ${scissors_txt}`;
				};
				world.miltons_office.turns_alone += 1;
			} else if (world.miltons_office.milton_alive == false) {
				return "";
			} else if (world.maintenance_office.bound) {
				return "You've already freed yourself from the zipties."
			};
			return "";
		},
		description: () => {
			switch (world.miltons_office.set_desc) {
				//default - bound, not alone, scissors and report present - no responses given yet
				case 0: return "You come to under the greenish white glow of an office flourescent tube. Your hooves are bound with zip ties behind the office chair that you're seated in. There's a computer with a blank screen on the desk, a card reader, a coffee mug full of pens and pencils, scissors, tape and other office supplies. Milton is at the desk, standing and faced away from you, writing hurriedly on a sheet of paper on his desk. He doesn't realize that you've come to. You notice the zip tie around your hooves is loose around your wrists. You think you might be able to wiggle out of it, but just as you think this Milton realizes you've awakened, and looks over at you with anger in his eyes. 'Right then mate, what we gonna do 'bout this then?' he mutters as he leans in toward you. <BR><BR> RESPONSE OPTIONS:<BR> - respond aggressively<BR> - remain silent<BR> - suck up and apologize";
				// bound, not alone, 
				case 1: return "You are being held captive in Milton's office, your hooves bound with zip ties behind the office chair that you're seated in. Milton is standing watch over you, angered by your assault and further irritated by your inadaquate response to his questioning. 'You'll have to answer for your actions one way or another mate,' he presses you. <BR><BR> RESPONSE OPTIONS:<BR> - respond aggressively<BR> - remain silent<BR> - suck up and apologize";
				case 2: return "You are being held captive in Milton's office, your hooves bound with zip ties behind the office chair that you're seated in. Milton is standing watch over you, awaiting your response to his vague questioning. 'Let's hear it mate!' he exclaims at you. <BR><BR> RESPONSE OPTIONS:<BR> - respond aggressively<BR> - remain silent<BR> - suck up and apologize";
				case 3: return "You are being held captive in Milton's office, your hooves bound with zip ties behind the office chair that you're seated in. Milton has left you locked in the room alone, leaving in a hurried rage after your indignant response to his questioning. You notice a sharp, sturdy looking pair of scissors on Milton's desk across from you, but your hooves are still bound behind your chair. You hear the faint sound of footsteps and voices down the hall outside the door."
				case 4: return "You are being held captive in Milton's office. Milton has left you locked in the room alone, and you have managed to escape from the zipties. There's a sharp looking pair of scissors on the desk across from you.";
				case 5: return "You are being held captive in Milton's office. Milton has left you locked in the room alone, and you have managed to escape from the zipties.";
				case 6: return "You are being held captive in Milton's office. Milton has returned to finish interrogating you, but you have managed to escape from the zipties.";
				case 7: return "You are in Milton's office. You've coldly murdered Mr. Milton, his body lays lifelessly in a pool of blood on the floor. You've taken his master key, and are able to unlock the door into the hallway.";
				case 8:
					player.dead = true;
					return "You are being held captive in Milton's office. Milton has returned carrying a briefcase, and you're bound in a chair with zipties. Milton sets the briefcase on his desk, and then picks up the report on his desk and throws it away. 'Mate, you picked a bad day to assault me. I would normally just file a report and hand you over to the police, but today, I've finally snapped. I don't get paid enough to deal with this nonsense, and at this point I really just want you to eat shit.' He slides a pair of nitrile gloves on his hands as he says this, and then pulls a bag from his briefcase. He reaches into the bag, and brings forth from it a handful of stinking brown feces, which he procedes to sling onto your face. 'Open wide, you stupid git!' he says, then shoves another handful of the putrid mush into your mouth, as much as he is able. You protest of course, but you are bound in the chair. Milton has the upper hand and is filled with rageful, malicious intent. He continues to humiliate you by covering you with the contents of the bag, and despite your braying and pleading, after a few moments, you are complete covered in it. It's in your mouth, your eyes, your nose, and all over you. The smell is horrendous, and as much as you spit and beg, Milton cannot be swayed. He begins to laugh maniacally as he continues, swearing and wishing every imaginable curse upon you until finally he says, 'Alright then mate, now comes the end.' He grabs the office scissors from his desk, and then proceeds to stab you repeatedly, laughing insanely as he does. You protest and scream horse-screams, but Milton won't stop, your body radiating pain from each puncture as Milton stabs again, and again, and again. You grow weak as blood pours out of you, your vision begins to fade, and your hearing becomes muffled. The awful olfactory sensation of shit seems to have evaporated completely, you can't smell or taste anything now. The pain filling your body subsides, and suddenly you feel as if you are floating, like youre wrapped in a soft blanket on top of a marshmallow cloud. You cant see Milton any more, or the office, just light. Warm, beautiful amber colored light is all there is, as you float, forgetting everything. It's all over now.<BR><BR>You have died. Press CTRL + R to restart your adventure.";
				case 9: 
					let isreport; 
					if (player.inventory["incident report"]) {
						isreport = ""
					} else {
						isreport = "There is an official looking report detailing your initial assault on Mr. Milton lying on the desk. You might want to make it disappear."
					};
					return `You are in Milton's office. Milton's lifeless body lies in a pool of blood on the floor, where you left it after murdering him earlier. The office chair where you had been bound is next to the desk, and various office items are on it next to the computer. ${isreport}`;
			}
			
		},
		items: {
			"pair of scissors": {
				description: "a sharp pair of office scissors",
				commands: {
					"stab milton with scissors": () => {
						// you are here
						if (world.miltons_office.milton_alive == false) {
							return "you've already stabbed Mr. Milton and murdered him in cold blood, his body now lies dead in his office. There's no reason to do it again. "
						}

						if (world.miltons_office.bound) {
							let milton_returned = world.miltons_office.milton_return();
							if (milton_returned) {
								world.miltons_office.alone = false;
								return milton_returned;
							};
							return "you can't do that, you're tied up!";
						}
						
						if (world.miltons_office.alone) {
							return "Milton hasn't returned, you're all alone in his office.";
						}

						player.inventory["master key"] = mobile_npc.milton.inventory["master key"];
						delete mobile_npc.milton.inventory["master key"];
						world.miltons_office.alone = true;
						world.miltons_office.milton_alive = false;
						world.miltons_office.set_desc = 7;
						return "In an act of sheer brutality, you swiftly and callously swing the point of the scissors up from behind your back and forcefully drive them into his ear, through his skull, and into his soft brain. He lets out a loud scream which quickly becomes a gurgle, his eyes roll in the back of his head as blood pours out of his ear, and his convulsing body falls to the floor. After a moment the noises and movement stop, and you remove the white key card from the side of Milton's lifeless body. You sigh softly as the weight of taking a man's life crashes down upon you, a single pearly tear rolls out of the corner of your eye and down your cheek. You mourn the violence this world demands for a moment longer, then sniffle lightly as you wipe the sorrow from your face, refocusing on your mission."
					},
					"stab milton": () => {
						return player.inventory["pair of scissors"].commands["stab milton with scissors"]();
					}
				}
			},
			"incident report": {
				description: "an official looking document detailing how you assaulted Milton",
				commands: {
					"read report": () => {
						return "You take a moment to look over the report detailing your assault on Milton, the hotel security man. (now the game dev needs to take a moment to write out the actual report in detail and include this object in the plot of the game somehow.)"
					}
				}
			}
		},
		commands: {
			"escape from zipties": () => {
				let milton_returned = world.miltons_office.milton_return("escaping");
				// if bound and alone
				if (world.miltons_office.bound && world.miltons_office.alone) {
					world.miltons_office.bound = false;
					world.miltons_office.set_desc = 4;
					if (milton_returned) {
						console.log(milton_returned);
						world.miltons_office.alone = false;
					}
					return `With a little effort, you're able to slip your hooves out of the zipties. You remain seated with your hooves behind your back, but you are free. You hear voices and footsteps approaching outside the office door. They stop for a moment outside and you hear Milton's voice coming from beyond the door, 'He's just inside here. Strangest thing I've ever seen - he's a man, but he's also a horse. Right assaulted me too, he did.' They continue past the door and the footsteps fade to silence. ${"<BR><BR>" + milton_returned}`;
				// if unbound and alone
				} else if (!world.miltons_office.bound && world.miltons_office.alone) {
					if (milton_returned) {
						console.log(milton_returned);
						world.miltons_office.alone = false;
					}
					return `Your hooves are already unbound.${"<BR><BR>" + milton_returned}`;
				// if not alone
				} else {
					world.miltons_office.set_desc = 2;
					world.miltons_office.alone = false;
					return "You consider escaping from the zipties, but then think better of it with Milton keeping a close eye on you.";
				}
			},
			"escape": () => {return world.miltons_office.commands["escape from zipties"]();},
			"get pair of scissors": () => {
				let milton_returned = world.miltons_office.milton_return("getting the scissors");
				// bound
				if (world.miltons_office.bound) {
					return `you can't do that, you're tied up! <BR><BR> ${milton_returned}`;
				}
				// not alone
				if (!world.miltons_office.alone) {
					return "you can't do that, Milton's watching you like a hawk!";
				}
				if (milton_returned) {
					console.log(milton_returned);
					world.miltons_office.alone = false;
				}
				// not bound, alone
				world.miltons_office.set_desc = 5;
				return get_item("pair of scissors", "", milton_returned);
			},
			"get scissors": () => {return world.miltons_office.commands["get pair of scissors"]();},
			"get incident report": () => {
				// bound
				if (world.miltons_office.bound) {
					return "You can't do that, you're tied up!";
				}
				// not alone
				if (!world.miltons_office.alone) {
					return "You can't do that, Milton's watching you like a hawk!";
				}
				let milton_returned = world.miltons_office.milton_return("getting the report");
				
				if (milton_returned) {
					console.log(milton_returned);
					world.miltons_office.alone = false;
				}
				// not bound, alone

				return get_item("incident report", "", milton_returned);
			},
			"get report": () => {return world.miltons_office.commands["get incident report"]()},
			"exit office": () => {
				let milton_returned = world.miltons_office.milton_return("trying to leave");
				// bound
				if (world.miltons_office.bound) {
					if (milton_returned) {
						console.log(milton_returned);
						world.miltons_office.alone = false;
					}
					return `You can't do that, you're tied up! ${"<BR><BR>" + milton_returned}`;
				}
				// alone, locked in
				if (world.miltons_office.alone && world.miltons_office.locked && world.miltons_office.milton_alive) {
					if (milton_returned) {
						console.log(milton_returned);
						world.miltons_office.alone = false;
					}
					return `You're free from the zipties, but the door is locked! You're trapped in Milton's office. ${"<BR><BR>" + milton_returned}`;
				};

				if (world.miltons_office.milton_alive) {
					return "You think about dashing for the exit, but then think better of it with Milton standing over you. The door is probably locked anyway. You notice a key card hanging from Milton's beltloop.";
				};
				
				world.miltons_office.set_desc = 9;
				player.location = world.north_sunrise_emp_hall;
				return player.location.description();
			},
			"leave office": () => {return world.miltons_office.commands["exit office"]();},
			"exit": () => {return world.miltons_office.commands["exit office"]();},
			"leave": () => {return world.miltons_office.commands["exit office"]();},
			"exit room": () => {return world.miltons_office.commands["exit office"]();},
			"leave room": () => {return world.miltons_office.commands["exit office"]();},
			"respond aggressively": () => {
				if (!world.miltons_office.milton_alive) {
					world.miltons_office.set_desc = 7;
					return "Milton's lifeless body lies on the floor, covered in blood. You could speak to him, but he's already gone."
				};
				if (world.miltons_office.alone) {
					return "Milton already left the room, there's no one here to hear you."
				};
				let resp;
				if(world.miltons_office.resp_opts.agg) {
					resp = "You consider his question, knowing nothing you say will quell the anger inside him. Whatever consequenses you face will come regardless, so you hold fast to your conviction: 'STFU' you spit at him. 'I beg your pardon?' he asks with a firey rage burning in his eyes. 'Did I stutter?' you snap back without hesitation. Milton glares at you with a snarl on his face. 'You think you're being smart do you?' he says, right before he throws a heavy punch to the right side of your horseface. 'Ugh!' you exclaim involuntarily as the sting sears across your face. You feel a warm liquid begin to flow out of your nose and dribble across your lips. 'We'll see to this then!' he growls at you, before he turns abruptly and leaves the room. You hear the door lock behind him, and the sound of footsteps fade hurriedly away. You are alone, your face is bleeding, and you know you dont have much time before Milton returns.";
				} else {
					resp = "You've already angered him beyond belief, and it hasn't helped you any. Probably best to keep your horsey mouth shut at this point.";
				}
				world.miltons_office.alone = true;
				world.miltons_office.set_desc = 3;
				world.miltons_office.resp_opts.agg = false;
				return resp;
			}, 
			"remain silent": () => {
				if (!world.miltons_office.milton_alive) {
					world.miltons_office.set_desc = 7;
					return "Milton's lifeless body lies on the floor, covered in blood. You could speak to him, but he's already gone."
				};
				if (world.miltons_office.alone) {
					return "Milton already left the room, there's no one here for you to remain silent for."
				};
				let base_resp;
				if(world.miltons_office.resp_opts.sil) {
					base_resp = "You hear his question, but you do not answer. You look up at him with your beady little horse eyes and tuck your horse lips into your mouth tightly, making it clear that you're taking the fifth. 'Alright then, you little shit,' he sneers at you. 'We'll just sit here till you feel like talking then!' he exclaims as he sits down and props his feet up high on his desk, making himself comfortable and glaring at you. 'We can hang out here all day, mate' he says to you, reclining in his office chair. He continues to await an adequate response.";
				} else {
					base_resp = "You already tried ignoring the problem, it wont go away on its own.";
				}
				world.miltons_office.set_desc = 1;
				world.miltons_office.resp_opts.sil = false;
				if (world.miltons_office.resp_opts.apo) {return `${base_resp} <BR><BR> RESPONSE OPTIONS:<BR> - respond aggressively <BR> - suck up and apologize.`};
				return `${base_resp} <BR><BR> RESPONSE OPTIONS:<BR> - respond aggressively`;
			},
			"suck up and apologize": () => {
				if (!world.miltons_office.milton_alive) {
					world.miltons_office.set_desc = 7;
					return "Milton's lifeless body lies on the floor, covered in blood. You could speak to him, but he's already gone."
				};
				if (world.miltons_office.alone) {
					return "Milton already left the room, there's no one here to hear you."
				};
				let base_resp;
				if(world.miltons_office.resp_opts.apo) {
					base_resp = "You realize that you Milton is justifiably angry with you, and probably wants to beat the tar out of you. You're not sure what he's planning, but perhaps you can smooth things over a bit and talk him down. 'Listen,' you begin timidly, 'I'm sorry I struck you. I don't know what came over me.' <BR>An awkward, silent moment passes. Finally, Milton responds:<BR>'Oh you're sorry? You're sorry mate? Well sorry ain't gonna pay for the stitches they're gonna put in my face,' indicating his split lip. 'You're sorry as can be mate, but you'll have to do better than that.'<BR>Unfortunately, there doesn't seem to be any way to repair the damage you've done at this point. He continues to await an adequate response.";
				} else {
					base_resp = "You already tried to get on his good side, but its too late for that now.";
				};
				world.miltons_office.set_desc = 1;
				world.miltons_office.resp_opts.apo = false;
				if (world.miltons_office.resp_opts.sil) {return `${base_resp} <BR><BR> RESPONSE OPTIONS:<BR> - respond aggressively <BR> - remain silent.`};
				return `${base_resp} <BR><BR> RESPONSE OPTIONS:<BR> - respond aggressively`;
				//return <BR><BR> RESPONSE OPTIONS:<BR> - respond aggressively<BR> - remain silent.";
			},
			"apologize": () => {return world.miltons_office.commands["suck up and apologize"]();},
			"suck up": () => {return world.miltons_office.commands["suck up and apologize"]();},
			"inspect desk": () => {
				let milton_returned = world.miltons_office.milton_return("inspecting the desk");
				if (world.miltons_office.bound) {return "You can see Milton's desk from the chair. There's a computer, some papers, scissors - regular office things. You cant get a close look though, being bound in your chair."};
				if (!world.miltons_office.alone) {return "You can see Milton's desk, and he's seated in the chair behind it. There's a computer, some papers, scissors - regular office things - but you don't dare reveal that you've freed your hooves. You remain seated."};
				let report_txt = "";
				let scissors_txt;
				
				if (world.miltons_office.items["pair of scissors"]) {
					scissors_txt = "There's a sharp looking pair of scissors on the desk, they're probably the closest thing to a weapon in the room. ";
				} else {
					scissors_txt = "There are notably no scissors, you've already taken them and they are now in your inventory. ";
				};
				if (world.miltons_office.items["incident report"]) {
					report_txt = " A document titled 'Incident Report' lies near the keyboard. Under the title a smaller heading reads 'Incident Type: ASSAULT.' It appears to be a report of your tussle with Milton, it may be in your interest to make it disappear.";
				};
				if (milton_returned) {
					world.miltons_office.alone = false;
				};
				return `You take a look over Milton's desk. Mostly it seems quite ordinary, regular office things are found on it. Pens and pencils, stapler, tape dispenser, paperclips and etc. ${scissors_txt}There's a computer, displaying a login page for user 'MPRINCE.' Some sticky notes with various messages and information scrawled on them are scattered around the monitor and keyboard. Nothing immediately appears to be a password. ${report_txt} <BR><BR> ${milton_returned}`;
			}
		}
	},

	north_sunrise_emp_hall: {
		description: () => {return "You are in the north section of the employee hallway outside the hotel's various managerial offices. You see vending machines here, and bulletin boards with information posted on them. Milton's office, to your north, is labeled 'Security'. The hallway continues east and west. To the east, several doorways are visible. To the west, another single door, and a set of double doors."},
		commands: {
			"enter security office": () => {
				if ("master key" in player.inventory) {
					player.location = world.miltons_office; return player.location.description();
				} else {
					return "The door is locked, and you don't have a key.";
				}
			},	
			"sec office": () => {return world.north_sunrise_emp_hall.commands["enter security office"]()},
			"go north": () => {return world.north_sunrise_emp_hall.commands["enter security office"]()},
			"n": () => {return world.north_sunrise_emp_hall.commands["enter security office"]()},
			"go east": () => {player.location = world.east_sunrise_emp_hall; return player.location.description()},
			"e": () => {return world.north_sunrise_emp_hall.commands["go east"]()},
			"go west": () => {player.location = world.west_sunrise_emp_hall; return player.location.description()},
			"w": () => {return world.north_sunrise_emp_hall.commands["go west"]()},
		}
	},

	east_sunrise_emp_hall: {
		description: () => {return "You are in the east section of the employee hallway outside the hotel's various managerial offices."},
		commands: {
			"enter maintenance office": () => {
				if ("master key" in player.inventory) {
					player.location = world.maintenance_office; return player.location.description();
				} else {
					return "The door is locked, and you don't have a key.";
				}
			},
			"maint office": () => {return world.east_sunrise_emp_hall.commands["enter maintenance office"]()},
			"go north": () => {return world.east_sunrise_emp_hall.commands["enter maintenance office"]()},
			"n": () => {return world.east_sunrise_emp_hall.commands["enter maintenance office"]()},
			"enter accounting office": () => {
				if ("master key" in player.inventory) {
					player.location = world.accounting_office; return player.location.description();
				} else {
					return "The door is locked, and you don't have a key.";
				}
			},
			"go east": () => {return world.east_sunrise_emp_hall.commands["enter accounting office"]()},
			"e": () => {return world.east_sunrise_emp_hall.commands["enter accounting office"]()},
			"go west": () => {player.location = world.north_sunrise_emp_hall; return player.location.description()},
			"w": () => {return world.east_sunrise_emp_hall.commands["go west"]()},
			"go south": () => {player.location = world.oceanview_hall_north; return player.location.description()},
			"s": () => {return world.east_sunrise_emp_hall.commands["go south"]()},

		}
	},

	west_sunrise_emp_hall: {
		description: () => {return "You are in the west section of the employee hallway outside the hotel's various managerial offices."},
		commands: {
			"go north": () => {player.location = world.south_under_breezway; return player.location.description()},
			"n": () => {return world.west_sunrise_emp_hall.commands["go north"]()},
			"go east": () => {player.location = world.north_sunrise_emp_hall; return player.location.description()},
			"e": () => {return world.west_sunrise_emp_hall.commands["go east"]()},
			//"go west": () => {return world.west_sunrise_emp_hall.commands[]()},
			//"w": () => {return world.west_sunrise_emp_hall.commands[]()},
			//"go south": () => {return world.west_sunrise_emp_hall.commands[]()},
			//"s": () => {return world.west_sunrise_emp_hall.commands[]()},

		}
	},

	maintenance_office: {
		description: () => {return "You are in the maintenance office"},
		commands: {
			"go south": () => {player.location = world.east_sunrise_emp_hall; return player.location.description()},
			"s": () => {return world.maintenance_office.commands["go south"]()},
			"exit office": () => {return world.maintenance_office.commands["go south"]()},
			"exit": () => {return world.maintenance_office.commands["go south"]()}

		}
	},
	
	accounting_office: {
		description: () => {return "You are in the accounting office"},
		commands: {
			"go west": () => {player.location = world.east_sunrise_emp_hall; return player.location.description()},
			"w": () => {return world.accounting_office.commands["go west"]()},
			"exit office": () => {return world.accounting_office.commands["go west"]()},
			"exit": () => {return world.accounting_office.commands["go west"]()}

		}
	},

	south_under_breezway: {
		description: () => {return "You are in the employee hallway, under the south end of the breezeway."},
		commands: {
			"go south": () => {player.location = world.west_sunrise_emp_hall; return player.location.description()},
			"s": () => {return world.south_under_breezway.commands["go south"]()}
		}
	},

	live_oak: {
		/*!!!!!!!!fix this!!!!!!!!!!!!
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
	*/},
	oceanview_hall_north: {
		//here
		description: () => {return "You are in the northernmost section of the oceanview hallway. it continues south. there is an elevator landing to the east."},
		commands: {
			"go north": () => {player.location = world.east_sunrise_emp_hall; return player.location.description()},
			"n": () => {return world.oceanview_hall_north.commands["go north"]()},
			"go east": () => {player.location = world.elev_24_basement_landing; return player.location.description()},
			"e": () => {return world.oceanview_hall_north.commands["go east"]()},
			//"go west": () => {return world.west_sunrise_emp_hall.commands[]()},
			//"w": () => {return world.west_sunrise_emp_hall.commands[]()},
			"go south": () => {player.location = world.oceanview_hall_south; return player.location.description()},
			"s": () => {return world.oceanview_hall_north.commands["go south"]()},

		}
	},
	oceanview_hall_south: {
		description: () => {return "You are in the south section of the oceanview hallway. it continues north and south. the oceanview room lies to the east."},
		commands: {
			"go north": () => {player.location = world.oceanview_hall_north; return player.location.description()},
			"n": () => {return world.oceanview_hall_south.commands["go north"]()},
			"go east": () => {player.location = world.oceanview_room; return player.location.description()},
			"e": () => {return world.oceanview_hall_south.commands["go east"]()},
			//"go west": () => {return world.west_sunrise_emp_hall.commands[]()},
			//"w": () => {return world.west_sunrise_emp_hall.commands[]()},
			"go south": () => {player.location = world.gym_hall; return player.location.description()},
			"s": () => {return world.oceanview_hall_south.commands["go south"]()},

		}

	},
	elev_24_basement_landing: {
		description: () => {return "You are in the basement level of the hotel, at the elevator landing outside the oceanview terrace. The elevator is accessable here, and to the west a doorway leads out onto the oceanview terrace hall."},
		commands: {
			"enter elevator": () => {player.location = elevators.elev_24; return player.location.description()},
			"go west": () => {player.location = world.oceanview_hall_north; return player.location.description()},
			"w": () => {return world.elev_24_basement_landing.commands["go west"]()},
			"go south": () => {player.location = world.oceanview_room; return player.location.description()},
			"s": () => {return world.elev_24_basement_landing.commands["go south"]()},
		},
	},
	gym_hall: {
		description: () => {return "poop"}
	},
	
	/*
	pool_gate_path: {},
	hive_circle: {},
	valet_garage: {},
	hive_hallway:{},
	the_hive: {},
	*/
};

// all moveable npc objects. (immobile npcs are part of location descriptions)
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
	},*/
	"old crazy": {
		move_on: 3,
		location: world.west_pool,
		add_desc: () => {return "theres an elderly gentleman looking around awkwardly and mumbling to himself under his breath."},
		inventory: {}
	},
	milton: {
		dead: false,
		move_on: 2,
		location: world.breezeway_north,
		inventory: {
			"master key": {
				description: "a plain white key card, hanging on a key ring.",
				commands: {}
			}
		},
		add_desc: () => {
			let master = "";
			if (mobile_npc.milton.inventory["master key"]){
				master = " A white key card hangs off of his hip on a caribeaner attatched to his beltloop."
			}
			return `Milton, also known as 'Prince' the hotel security man, is here. He glances at you, smiles and says 'Why the long face, mate?' in his signiture british accent.${master}`;
		},
		
		npc_commands: {
			"fight milton for key": () => {
				let roll = Math.floor(Math.random() * 4) + 1;
				if (roll > 3) {
					player.inventory["master key"] = mobile_npc.milton.inventory["master key"];
					delete mobile_npc.milton.inventory["master key"];
					return "Suddenly and without warning, you lunge at Milton from a horses arm length, blindsiding the unsuspecting security man right in the jaw with your hardened hoof. Incredibly, this does not knock him unconscious, though blood immediately begins pouring from his mouth and nose. 'Bloody F--kin Hell mate!' he spits as he squares up to you. The two of you spar for several minutes, each landing a number of solid blows. Milton fights galliantly, but alas, the initial sucker-punch seems to have set the tone of the fight and after landing another hoof in Milton's swelling and bloodied face, he falls unconscious to the ground. You bend down and remove the key card from his hip, and let out low 'neigh' as you observe the bloodied prize held by your hoof. You look down at Milton's defeated body, and for a brief moment you are filled with compassion and remorse, your soul bitterly lamenting the violence this world demands. The feeling passes as quickly as it came, and your mind returns to your mission." 
				} else {
					player.location = world.miltons_office;
					return `Suddenly and without warning, you lunge at Milton from a horses arm length, throwing a solid right cross towards his jaw. Milton however, is faster than you estimated and manages to dodge your attack. 'Aye, what the hell mate? That's really unacceptable mate, you're definitely gettin documented for that one!' He exclaims as he squares up to you. After a few minutes of active sparring, Milton lands a heavy blow right between your beady horse eyes, and its lights out.<br><br>${world.miltons_office.description()}`
				}
				
			},
			"fight prince for key": () => {return mobile_npc.milton.npc_commands["fight milton for key"]()},
			"fight milton": () => {return mobile_npc.milton.npc_commands["fight milton for key"]()},
			"fight prince": () => {return mobile_npc.milton.npc_commands["fight milton for key"]()}
		}
	}
};

// player object (inventory, default and debug commands )
const player = {
	//START LOCATION
	location: world.north_sunrise_emp_hall,
	dead: false,
	inventory: {
		"set of horse shoes": {
			description: "a set of 4 horseshoes, which you wear on your hooves",
			commands: {
				"throw horse shoes": () => {
					return "You take off your horse shoes and throw them. They sail through the air and land a short distance from you, where you look at them for a moment. On further consideration, you decide you won't make it far without them, so you retrieve them and replace them on your hooves."
				},
				"throw horseshoes": () => {
					return player.inventory["set of horse shoes"].commands["throw horse shoes"]();
				}
			}
		},
		/*"master key": {
			description: "a plain white key card, hanging on a key ring.",
			commands: {}
		}*/
	},
	commands: {
		inventory: () => {
			let contents = "INVENTORY:";
			for (let i in player.inventory) {
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
			for (let cmd in player.location.commands) {
				cmds_txt = cmds_txt + "<br>-- " + cmd;
			}

			return header_txt + cmds_txt + "<br>";
		},
		ic: () => {
			let cmds_txt = "";
			let header_txt = "Inventory Commands:"
			for (let item in player.inventory) {
				cmds_txt = cmds_txt + "<br>* " + item;
				for (let i_cmd in player.inventory[item].commands) {
					cmds_txt = cmds_txt + "<br>-- " + i_cmd;
				}
			}

			return header_txt + cmds_txt + "<br>";
		},
		chc: () => {
			let cmds_txt = "";
			let header_txt = "Carachter Commands:"
			for (let npc in mobile_npc) {
				console.log(mobile_npc[npc].location, player.location)
				if (mobile_npc[npc].location == player.location) {
					for (let cmd in mobile_npc[npc].npc_commands) {
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
			for (let cmd in player.commands) {	
				cmds_txt = cmds_txt + "<br>-- " + cmd;
			}

			cmds_txt = cmds_txt + "<br><br>" + player.commands.lc() + "<br>" + player.commands.ic() + "<br>"+ player.commands.chc() + "<br>";


			return cmds_txt;
		},
		ac: () => {return player.commands["show all commands"]()},
		////debugs only!!! vvv
		"show npcs": () => {
			for (let i in mobile_npc){
				console.log(`${i}: `, mobile_npc[i].location.description());
			}
			return "this is a debug command. it is not part of the game.";
		}
	}
};

// export npcs and player. needed world info is passed as player.location or
// npc.location. actual world object is not needed by main script.
export {mobile_npc, player};