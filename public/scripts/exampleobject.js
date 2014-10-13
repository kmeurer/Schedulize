// THIS FILE DEMONSTRATES THE OBJECT STORAGE METHODS OF OUR MONGO DB
// IN ASSIGN.JS, OBJECTS COME IN IN THIS FORMAT

var employees = {
	1: {name: 'Kevin Meurer', shiftsDesired: 3, availability: [], edges:[], canManage: true},
	2: {name: 'Paul Allen', shiftsDesired: 4, availability: [], edges:[], canManage: false},
	3: {name: 'Ray Ramon', shiftsDesired: 2, availability: [], edges:[], canManage: true},
	4: {name: 'Riley Zinar', shiftsDesired: 1, availability: [], edges:[], canManage: true},
	5: {name: 'Jeff Gladchun', shiftsDesired: 3, availability: [], edges:[], canManage: false},
	6: {name: 'Will Burgo', shiftsDesired: 3, availability: [], edges:[], canManage: false},
	7: {name: 'Andrew Teich', shiftsDesired: 2, availability: [], edges:[], canManage: false},
	8: {name: 'Conor McNulty', shiftsDesired: 1, availability: [], edges:[], canManage: false},
	9: {name: 'Andrew Morrison', shiftsDesired: 4, availability: [], edges:[], canManage: true},
	10: {name: 'Mike Crafts', shiftsDesired: 3, availability: [], edges:[], canManage: false},
	11: {name: 'Tade Anzalone', shiftsDesired: 4, availability: [], edges:[], canManage: false},
	12: {name: 'Justin Pinili', shiftsDesired: 0, availability: [], edges:[], canManage: true}
};

var shifts = {
	1: {name: '1430-1630/mon/man', time: '1430-1630', day: 'mon', type: 'man', edges: []},
	2: {name: '1630-1830/mon/man', time: '1630-1830', day: 'mon', type: 'man', edges: []},
	3: {name: '830-1030/mon/cash', time: '830-1030', day: 'mon', type: 'cash', edges: []},
	4: {name: '1030-1230/mon/cash', time: '1030-1230', day: 'mon', type: 'cash', edges: []},
	5: {name: '1430-1630/mon/cash', time: '1430-1630', day: 'mon', type: 'cash', edges: []},
	6: {name: '1630-1830/mon/cash', time: '1630-1830', day: 'mon', type: 'cash', edges: []},
	7: {name: '1830-2030/mon/cash', time: '1830-2030', day: 'mon', type: 'cash', edges: []},
	8: {name: '1430-1630/tues/man', time: '1430-1630', day: 'tues', type: 'man', edges: []},
	9: {name: '1630-1830/tues/man', time: '1630-1830', day: 'tues', type: 'man', edges: []},
	10: {name: '830-1030/tues/cash', time: '830-1030', day: 'tues', type: 'cash', edges: []},
	11: {name: '1030-1230/tues/cash', time: '1030-1230', day: 'tues', type: 'cash', edges: []},
	12: {name: '1430-1630/tues/cash', time: '1430-1630', day: 'tues', type: 'cash', edges: []},
	13: {name: '1630-1830/tues/cash', time: '1630-1830', day: 'tues', type: 'cash', edges: []},
	14: {name: '1830-2030/tues/cash', time: '1830-2030', day: 'tues', type: 'cash', edges: []},
	15: {name: '1430-1630/wed/man', time: '1430-1630', day: 'wed', type: 'man', edges: []},
	16: {name: '1630-1830/wed/man', time: '1630-1830', day: 'wed', type: 'man', edges: []},
	17: {name: '830-1030/wed/cash', time: '830-1030', day: 'wed', type: 'cash', edges: []},
	18: {name: '1030-1230/wed/cash', time: '1030-1230', day: 'wed', type: 'cash', edges: []},
	19: {name: '1430-1630/wed/cash', time: '1430-1630', day: 'wed', type: 'cash', edges: []},
	20: {name: '1630-1830/wed/cash', time: '1630-1830', day: 'wed', type: 'cash', edges: []},
	21: {name: '1830-2030/wed/cash', time: '1830-2030', day: 'wed', type: 'cash', edges: []},
	22: {name: '1430-1630/thurs/man', time: '1430-1630', day: 'thurs', type: 'man', edges: []},
	23: {name: '1630-1830/thurs/man', time: '1630-1830', day: 'thurs', type: 'man', edges: []},
	24: {name: '830-1030/thurs/cash', time: '830-1030', day: 'thurs', type: 'cash', edges: []},
	25: {name: '1030-1230/thurs/cash', time: '1030-1230', day: 'thurs', type: 'cash', edges: []},
	26: {name: '1430-1630/thurs/cash', time: '1430-1630', day: 'thurs', type: 'cash', edges: []},
	27: {name: '1630-1830/thurs/cash', time: '1630-1830', day: 'thurs', type: 'cash', edges: []},
	28: {name: '1830-2030/thurs/cash', time: '1830-2030', day: 'thurs', type: 'cash', edges: []},
	29: {name: '1430-1630/fri/man', time: '1430-1630', day: 'fri', type: 'man', edges: []},
	30: {name: '1630-1830/fri/man', time: '1630-1830', day: 'fri', type: 'man', edges: []},
	31: {name: '830-1030/fri/cash', time: '830-1030', day: 'fri', type: 'cash', edges: []},
	32: {name: '1030-1230/fri/cash', time: '1030-1230', day: 'fri', type: 'cash', edges: []},
	33: {name: '1430-1630/fri/cash', time: '1430-1630', day: 'fri', type: 'cash', edges: []},
	34: {name: '1630-1830/fri/cash', time: '1630-1830', day: 'fri', type: 'cash', edges: []},
	35: {name: '1830-2030/fri/cash', time: '1830-2030', day: 'fri', type: 'cash', edges: []},
};

var flowNetwork = new assign.FlowNetwork(employees, shifts);
flowNetwork.assignEdges();
var network = flowNetwork.network;