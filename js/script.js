const a = new Date("09/02/1998");
let b = new Date();

let month = parseInt((b.getMonth() - a.getMonth()) % 12);
let year = b.getFullYear() - a.getFullYear() + parseInt((a.getMonth() + b.getMonth()) / 12);

let terminal_msg = document.getElementById("container");

if (month < 10) {
	month = "0" + month;
}

if (month > 0) {	
	year = year - 1;
}

let datever = year + "." + month;

const getLastLogin = () => {
	terminal_msg.innerHTML += `
		Last login: ${b.toString()}<br /><br />
		Welcome to daimessdn.github.io<br />
		Current version: ${datever}<br />`;
}

let consoleInput = `<strong class="machine-console">dimaswehhh@daimessdn.github.io</strong><span class="console-input" contenteditable="true"></span>`;

let consoleInputSelect = document.getElementsByClassName('console-input');

const focusInConsoleInput = () => {
	terminal_msg.innerHTML += consoleInput;
	consoleInputSelect = document.getElementsByClassName('console-input');
	consoleInputSelect[consoleInputSelect.length - 1].textContent = "";
	consoleInputSelect[consoleInputSelect.length - 1].focus();
};

// document.getElementById("date_ver").innerHTML = datever;
document.title = "@dimaswehhh " + datever;

let executable = ["journal", "codebread", "simpth", "generic-sensor", "las_converter"];

const dummyExec_ = (command) => {
	consoleInputSelect[consoleInputSelect.length - 1].removeAttribute("contenteditable");

	command = command.replace("./", "");
	command = command.replace("<br>", "");
	command = command.trim();
	
	if (executable.includes(command)) {
		terminal_msg.innerHTML += "<br />Opening <em>" + command + "</em>, please wait...<br />";

		window.open(window.location.origin + "/" + command, "_blank", "height=500,width=400,location=no");

		terminal_msg.innerHTML += `${command} opened.<br />`;
	} else if (command == "clear") {
		terminal_msg.innerHTML = "";
	} else if (command == "whoami") {
		terminal_msg.innerHTML += "<br>dimaswehhh</br>";
	} else if (command == "hostname") {
		terminal_msg.innerHTML += "<br>daimessdn.github.io</br>";
	} else if (command == "ls") {
		terminal_msg.innerHTML += "<br />" + executable.join("\xa0\xa0\xa0") + "<br />";
	} else if (command == "exit") {
		terminal_msg.innerHTML += "<br />Bye!<br />"

		setTimeout(window.close(), 300);
	}

	else {
		terminal_msg.innerHTML += "<br />" + command + ": command not found<br />";
	}

}

window.addEventListener('focus', () => consoleInputSelect[consoleInputSelect.length - 1].focus());

document.addEventListener('keydown', (event) => {
	if (event.keyCode == 13) {
		dummyExec_(consoleInputSelect[consoleInputSelect.length - 1].textContent);
		focusInConsoleInput();
	} else if (event.keyCode === 8) {
		if (consoleInputSelect[consoleInputSelect.length - 1].textContent.length === 1) {
			consoleInputSelect[consoleInputSelect.length - 1].textContent = ' ';
		}
	};
});

document.addEventListener("DOMContentLoaded", () => {
	getLastLogin();
	focusInConsoleInput();
})