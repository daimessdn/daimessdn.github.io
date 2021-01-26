const a = new Date("09/02/1998");
let b = new Date();

let month = parseInt((b.getMonth() - (-12 + a.getMonth())) % 12);
let year = b.getFullYear() - a.getFullYear() + parseInt((a.getMonth() + b.getMonth()) / 12);

let terminal_msg = document.querySelector("#container");

let terminalSession = {
	username: "dimaswehhh",
	hostname: "daimessdn.github.io",
	config: {
		fontSize: "small"
	}
}

// sound effects
const errorSound = new Audio('sounds/bell.oga');
const openSound = new Audio("sounds/dialog-question.oga");
const commandNotFoundSound = new Audio("sounds/dialog-error.oga");

let consoleHistory = [];
let historyIndex = consoleHistory.length;

let startingSelection = 0;

if (month < 10) {
	month = "0" + month;
}

if (month > 0) {	
	year = year - 1;
}

let datever = year + "." + month;

const getLastLogin = () => {
	b = new Date();
	terminal_msg.innerHTML += `Last login: ${b.toString()}<br />
							   <br />
							   Welcome to ${terminalSession.hostname}<br />
							   Current version: ${datever}<br /><br />
							   Type <strong>help</strong> to display help information for using terminal<br />
							   or visit
							    <a href="https://github.com/daimessdn/daimessdn.github.io" target="_blank">
									https://github.com/daimessdn/daimessdn.github.io</a><br />
								for web documentation.
							   <br /><br />`;
};

let consoleInput = document.getElementById("input");

let consoleInputSelect = document.querySelectorAll('.console-input');
const generateConsoleInput = () => {
	terminal_msg.innerHTML += consoleInput;
	consoleInputSelect = document.querySelectorAll('.console-input');
	consoleInput.children[1] = consoleInputSelect[consoleInputSelect.length - 1];
	consoleInput.children[1].focus();
};

const focusOnConsoleInput = () => {
	document.getElementById("input").children[1].focus();
};

document.title = "@" + terminalSession.username + " " + datever + "";

const executable = ["journal", "codebread", "simpth", "generic-sensor"];
const oilshit = ["gloss-oleum", "las_converter"]

const dummyExec_ = (command) => {
	terminal_msg.innerHTML += `<strong class="machine-console">${terminalSession.username}@${terminalSession.hostname}</strong>
	<span class="console-input">${command}</span>`;

	command = command.trim();
	args = "";
	
	if (command != "" && command != consoleHistory[consoleHistory.length - 1]) {
		consoleHistory.push(command);
		historyIndex = consoleHistory.length;
	}
	
	if (command.includes(" ")) {
		args = command.substr(command.indexOf(' ') + 1);
		command = command.substr(0, command.indexOf(' '));
	}

	console.log(command);
	console.log(args);

	command = command.replace("./", "");
	command = command.trim("<br>");
	command = command.trim();
	
	if (executable.includes(command)) {
		terminal_msg.innerHTML += `<br />Opening <em>${command}</em>, please wait...<br />`;
		
		window.open(
			"https://daimessdn.github.io/" + command,
			"_blank",
			"height=500,width=400,location=no"
		);

		openSound.play();
		terminal_msg.innerHTML += `${command} opened.<br />`;
	} else if (oilshit.includes(command)) {
		terminal_msg.innerHTML += `<br />Opening <em>${command}</em>, please wait...<br />`;
		
		window.open(
			"https://oilshit.github.io" + "/" + command,
			"_blank",
			"height=500,width=400,location=no"
		);

		openSound.play();
		terminal_msg.innerHTML += `${command} opened.<br />`;
	} else if (Object.keys(commands).includes(command)) {
		commands[command].execute(args);
	} else if (command == "") {
		terminal_msg.innerHTML += "</br>";
	} else {
		terminal_msg.innerHTML += "<br />" + command + ": command not found<br />";
		commandNotFoundSound.play();
	}

	// generateConsoleInput();
	consoleInput.children[1].value = "";

	window.scrollTo(0, document.body.scrollHeight);
}
