const a = new Date("09/02/1998");
let b = new Date();

let year = b.getFullYear() - a.getFullYear();
let month = 12 - a.getMonth() + b.getMonth();

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

function dummyExec_(command) {
	if (command == "./journal" || command == "./codebread") {
		command = command.replace("./", "");
		// console.log(command);
		// console.log(window.location.origin);
		
		terminal_msg.innerHTML += "Opening <em>" + command + "</em>, plase wait...<br />";

		window.open(window.location.origin + "/" + command, "_blank", height=500, width=400);

		terminal_msg.innerHTML += `${command} opened.`;

	} else if (command == "clear") {
		terminal_msg.innerHTML = "";
	}
	else {
		terminal_msg.innerHTML += command + ": command not found<br />";
	}

	document.getElementById("dummy-cli").lastElementChild.value = ""
}