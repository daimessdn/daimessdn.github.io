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
		Last login: ${b.toString()}<br />
		Welcome to daimessdn.github.io<br />
		Current version: ${datever}<br />`;
}

let consoleInput = `
	<strong
		class="machine-console">daimessdn@daimessdn.github.io</strong><span class="console-input"
				contenteditable="true" 
				onkeydown="if (event.keyCode == 13) {
						       dummyExec_(this.innerHTML);
						   }
							
						   if (this.innerHTML === ' ') {
							   this.innerHTML = this.innerHTML;
						   } else if (event.keyCode === 8) {
						       if (this.innerHTML.length === 1) {
							       this.innerHTML = ' ';
						       }
					       }"></span>
`;

let consoleInputSelect = document.querySelectorAll('.console-input');

const focusInConsoleInput = () => {
	terminal_msg.innerHTML += consoleInput;
	consoleInputSelect = document.querySelectorAll('.console-input');
	consoleInputSelect[consoleInputSelect.length - 1].select;
};

document.getElementById("date_ver").innerHTML = datever;
document.title = "@dimaswehhh " + datever;

let executable = ["journal", "codebread", "simpth", "generic-sensor"];

function dummyExec_(command) {
	consoleInputSelect[consoleInputSelect.length - 1].removeAttribute("contenteditable");

	command = command.replace("./", "");
	command = command.trim();
	
	if (executable.includes(command)) {
		terminal_msg.innerHTML += "<br />Opening <em>" + command + "</em>, please wait...<br />";

		window.open(window.location.origin + "/" + command, "_blank", "height=500,width=400,location=no");

		terminal_msg.innerHTML += `${command} opened.<br />`;

	} else if (command == "clear") {
		terminal_msg.innerHTML = "";
	} else if (command == "exit") {
		terminal_msg.innerHTML += "<br />Bye!<br />"

		setTimeout(window.close(), 300);
	}

	else {
		terminal_msg.innerHTML += "<br />" + command + ": command not found<br />";
	}

	terminal_msg.innerHTML += consoleInput;
}