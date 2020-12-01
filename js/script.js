const a = new Date("09/02/1998");
let b = new Date();

let month = parseInt((b.getMonth() - a.getMonth()) % 12);
let year = b.getFullYear() - a.getFullYear() + parseInt((a.getMonth() + b.getMonth()) / 12);

let terminal_msg = document.getElementById("container");

let terminalConfig = {
	fontSize: "medium"
};

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
	terminal_msg.innerHTML += `Last login: ${b.toString()}<br />
							   <br />
							   Welcome to daimessdn.github.io<br />
							   Current version: ${datever}<br /><br />
							   Type <strong>help</strong> to display help information for using terminal<br />
							   or visit <a href="https://github.com/daimessdn">https://github.com/daimessdn</a> for web documentation.
							   <br /><br />`;
}

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

document.title = "@dimaswehhh " + datever + "";

const executable = ["journal", "codebread", "simpth", "generic-sensor", "las_converter"];

const commands = {
	clear: () => {
		terminal_msg.innerHTML = "";
	},
	exit: () => {
		terminal_msg.innerHTML += "<br />Bye!<br />";
		setTimeout(window.close(), 300);
	},
	help: () => {
		terminal_msg.innerHTML += `<br />
		Here are commands you can play with.<br />
		<br />
		<strong>clear</strong>\xa0\xa0\xa0\xa0clear terminal console<br />
		<strong>exit</strong>\xa0\xa0\xa0\xa0\xa0exit terminal session<br />
		<strong>help</strong>\xa0\xa0\xa0\xa0\xa0display available commands help<br />
		<strong>hostname</strong>\xa0display system host name<br />
		<strong>ls</strong>\xa0\xa0\xa0\xa0\xa0\xa0\xa0list directory contents<br />
		<strong>reset</strong>\xa0\xa0\xa0\xa0reset terminal session<br />
		<strong>test</strong>\xa0\xa0\xa0\xa0\xa0testing command<br />
		<strong>whoami</strong>\xa0\xa0\xa0display session user name<br />
		`;
	},
	hostname: () => { terminal_msg.innerHTML += "<br>daimessdn.github.io</br>"; },
	ls: () => {
		terminal_msg.innerHTML += `<br />
									<span style='color: #4E9A06; font-weight: bold;'>
										${executable.join("\xa0\xa0\xa0")}
									</span><br />`;
	},
	reset: () => {
		consoleInput.style.display = "none";
		terminal_msg.innerHTML = "";
		consoleHistory = [];
		historyIndex = consoleHistory.length;
		setTimeout(() => { 
			getLastLogin();
			consoleInput.style.display = "block";	
		}, 750);
	},
	test: () => { terminal_msg.innerHTML += "</br>"; },
	whoami: () => { terminal_msg.innerHTML += "<br>dimaswehhh</br>"; },
};

const dummyExec_ = (command) => {
	terminal_msg.innerHTML += `<strong class="machine-console">dimaswehhh@daimessdn.github.io</strong>
							   <span class="console-input">${command}</span>`;

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

	// generateConsoleInput();
	consoleInput.children[1].value = "";

	if (command != "") {
		consoleHistory.push(command);
		historyIndex = consoleHistory.length;
	}

	window.scrollTo(0, document.body.scrollHeight);
}

window.addEventListener('focus', () => {
	focusOnConsoleInput();
});

document.addEventListener('keydown', (event) => {
	if (event.key === "Enter") {
		dummyExec_(consoleInput.children[1].value);
	} else if (event.key === "ArrowUp" && historyIndex > 0) {
		historyIndex -= 1;
		consoleInput.children[1].value = consoleHistory[historyIndex];
	} else if (event.key === "ArrowDown") {
		if (historyIndex < consoleHistory.length) {
			consoleInput.children[1].value = consoleHistory[historyIndex];
			historyIndex += 1;
		} else {
			consoleInput.children[1].value = "";
		}
	}

	consoleInput.children[1].focus();
});

document.addEventListener("DOMContentLoaded", () => {
  getLastLogin();
  // generateConsoleInput();
  // terminalKeyboard();
})

const terminalKeyboard = () => {
  if (window.getSelection) {
    caret = window.getSelection();
    
    if (caret.rangeCount) {
      range = caret.getRangeAt(0);
    
   	  element = range.commonAncestorContainer.parentElement;
      content = element.textContent;
	  HTMLContent = element.value.slice(0, range.startOffset)
					+ '<span style="background-color: #fff; color: #300a24">'
					+ element.value.slice(range.startOffset, range.endOffset)
					+ '</span>'
					+ element.value.slice(range.endOffset, content.length);
	}
    
  } else if (document.selection) {
      textRange = document.selection;
      console.log(document.selection);
  }

  // console.log(textRange.parentElement)
  consoleInput.children[1].innerHTML = HTMLContent;
};

document.addEventListener("click", (event) => {
	let optionId = event.target.id;

	if (optionId === "font-size") {
		if (terminalConfig.fontSize === "small") {
			terminalConfig.fontSize = "medium";
		} else if (terminalConfig.fontSize === "medium") {
			terminalConfig.fontSize = "large";
		} else {
			terminalConfig.fontSize = "small";
		}
	document.body.style.fontSize = terminalConfig.fontSize;
	document.getElementById("font-size").style.fontSize = terminalConfig.fontSize;
	}
});