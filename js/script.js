const a = new Date("09/02/1998");
let b = new Date();

let month = parseInt((b.getMonth() - a.getMonth()) % 12);

let year = b.getFullYear() - a.getFullYear() + parseInt((a.getMonth() + b.getMonth()) / 12);

if (month < 10) {
	month = "0" + month;
}

if (month > 0) {	
	year = year - 1;
}

let datever = year + "." + month;

document.getElementById("date_ver").innerHTML = datever;
document.title = "@dimaswehhh " + datever;

// let command_val = document.getElementById("dummy-cli").lastElementChild.value;
let terminal_msg = document.getElementById("container");

let executable = ["journal", "codebread", "simpth", "generic-sensor"];

function dummyExec_(command) {
	if (executable.includes(command)) {
		command = command.replace("./", "");
		// console.log(command);
		// console.log(window.location.origin);
		
		terminal_msg.innerHTML += "Opening <em>" + command + "</em>, plase wait...<br />";

		window.open(window.location.origin + "/" + command, "_blank", "height=500,width=400,location=no");

		terminal_msg.innerHTML += `${command} opened.<br />`;

	} else if (command == "clear") {
		terminal_msg.innerHTML = "";
	} else if (command == "exit") {
		terminal_msg.innerHTML += "Bye!"

		setTimeout(window.close(), 300);
	}

	else {
		terminal_msg.innerHTML += command + ": command not found<br />";
	}

	document.getElementById("dummy-cli").lastElementChild.value = ""
}