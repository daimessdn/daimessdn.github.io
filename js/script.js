const a = new Date("09/02/1998");
let b = new Date();

let month = parseInt((b.getMonth() - a.getMonth()) % 12);
let year = b.getFullYear() - a.getFullYear() + parseInt((a.getMonth() + b.getMonth()) / 12);

let terminal_msg = document.getElementById("container");

let consoleHistory = [];
let historyIndex = consoleHistory.length;

if (month < 10) {
	month = "0" + month;
}

if (month > 0) {	
	year = year - 1;
}

let datever = year + "." + month;

const getLastLogin = () => {
	terminal_msg.innerHTML += `Last login: ${b.toString()}<br /><br /> Welcome to daimessdn.github.io<br /> Current version: ${datever}<br />`;
}

let consoleInput = `<strong class="machine-console">dimaswehhh@daimessdn.github.io</strong><span class="console-input" contenteditable="true"></span>`;

let consoleInputSelect = document.querySelectorAll('.console-input');

const generateConsoleInput = () => {
	terminal_msg.innerHTML += consoleInput;
	consoleInputSelect = document.querySelectorAll('.console-input');
	consoleInputSelect[consoleInputSelect.length - 1].focus();
};

const focusOnConsoleInput = () => {
	consoleInputSelect[consoleInputSelect.length - 1].focus();
};

document.title = "@dimaswehhh " + datever + "";

const executable = ["journal", "codebread", "simpth", "generic-sensor", "las_converter"];

const commands = {
	clear: () => { terminal_msg.innerHTML = ""; },
	exit: () => {
		terminal_msg.innerHTML += "<br />Bye!<br />";
		setTimeout(window.close(), 300);
	},
	hostname: () => { terminal_msg.innerHTML += "<br>daimessdn.github.io</br>"; },
	ls: () => {
		terminal_msg.innerHTML += `<br />
									<span style='color: #4E9A06; font-weight: bold;'>
										${executable.join("\xa0\xa0\xa0")}
									</span><br />`;
	},
	reset: () => {
		terminal_msg.innerHTML = "";
		consoleHistory = [];
		historyIndex = consoleHistory.length;
		getLastLogin();
	},
	test: () => { terminal_msg.innerHTML += "</br>"; },
	whoami: () => { terminal_msg.innerHTML += "<br>dimaswehhh</br>"; },
};

const dummyExec_ = (command) => {
	consoleInputSelect[consoleInputSelect.length - 1].removeAttribute("contenteditable");

	command = command.replace("./", "");
	command = command.trim("<br>");
	command = command.trim();
	
	if (executable.includes(command)) {
		terminal_msg.innerHTML += `<br />Opening <em>${command}</em>, please wait...<br />`;
		
		window.open(
			window.location.origin + "/" + command,
			"_blank",
			"height=500,width=400,location=no"
		);

		terminal_msg.innerHTML += `${command} opened.<br />`;
	} else if (Object.keys(commands).includes(command)) {
		commands[command]();
	} else if (command == "") {
		terminal_msg.innerHTML += "</br>";
	} else {
		terminal_msg.innerHTML += "<br />" + command + ": command not found<br />";
	}

	consoleHistory.push(command);
	generateConsoleInput();
	consoleInputSelect[consoleInputSelect.length - 1].innerHTML = "";
	historyIndex = consoleHistory.length;
	window.scrollTo(0,document.body.scrollHeight);
}

window.addEventListener('focus', () => {
	focusOnConsoleInput();
});

document.addEventListener('keydown', (event) => {
	if (event.key === "Enter") {
		dummyExec_(consoleInputSelect[consoleInputSelect.length - 1].textContent);
	} else if (event.key === "ArrowUp" && historyIndex > 0) {
		historyIndex -= 1;
		consoleInputSelect[consoleInputSelect.length - 1].innerHTML = consoleHistory[historyIndex];
		focusOnConsoleInput();
	} else if (event.key === "ArrowDown" && historyIndex < consoleHistory.length) {
		consoleInputSelect[consoleInputSelect.length - 1].innerHTML = consoleHistory[historyIndex];
		focusOnConsoleInput();
		historyIndex += 1;
	}

	// console.log(consoleInputSelect[consoleInputSelect.length - 1].innerHTML);
});

document.addEventListener("DOMContentLoaded", () => {
	getLastLogin();
	generateConsoleInput();
})