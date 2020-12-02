const a = new Date("09/02/1998");
let b = new Date();

let month = parseInt((b.getMonth() - a.getMonth()) % 12);
let year = b.getFullYear() - a.getFullYear() + parseInt((a.getMonth() + b.getMonth()) / 12);

let terminal_msg = document.getElementById("container");

let terminalSession = {
	username: "dimaswehhh",
	hostname: "daimessdn.github.io",
	config: {
		fontSize: "medium"
	}
}

const errorSound = new Audio('bell.oga');

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
							    <a href="https://github.com/daimessdn" target="_blank">
									https://github.com/daimessdn</a>
								for web documentation.
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

document.title = "@" + terminalSession.username + " " + datever + "";

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
	history: () => {
		for (let i = 0; i < consoleHistory.length - 1; i++) {
			terminal_msg.innerHTML += "<br />" + (i + 1) + " " + consoleHistory[i];
		}

		terminal_msg.innerHTML += "<br />";
	},
	hostname: () => { terminal_msg.innerHTML += "<br>" + terminalSession.hostname + "</br>"; },
	ls: () => {
		terminal_msg.innerHTML += `<br />
									<span style='color: #4E9A06; font-weight: bold;'>
										${executable.join("\xa0\xa0\xa0")}
									</span><br />`;
	},
	reboot: () => {
		setTimeout(() => {
			document.body.style.backgroundColor = "#000";
			document.getElementById("external-options").style.display = "none";
			document.getElementById("shortcut").style.display = "none";
			commands.reset(5000);
			setTimeout(() => {
				document.body.style.backgroundColor = "#300a24";
			}, 4500, async=true)
			setTimeout(() => {
				document.getElementById("external-options").style.display = "block";
				document.getElementById("shortcut").style.display = "block";
			}, 4750, async=true);
		}, 300);
	},
	reset: (bootTime = 750) => {
		consoleInput.style.display = "none";
		terminal_msg.innerHTML = "";
		consoleHistory = [];
		historyIndex = consoleHistory.length;
		setTimeout(() => { 
			getLastLogin();
			consoleInput.style.display = "block";	
		}, bootTime);
	},
	test: () => { terminal_msg.innerHTML += "</br>"; },
	whoami: () => { terminal_msg.innerHTML += "<br>" + terminalSession.username + "</br>"; },
};

const dummyExec_ = (command) => {
	terminal_msg.innerHTML += `<strong class="machine-console">${terminalSession.username}@${terminalSession.hostname}</strong>
	<span class="console-input">${command}</span>`;
	
	if (command.trim() != "") {
		consoleHistory.push(command);
		historyIndex = consoleHistory.length;
	}
	
	command = (consoleInput.children[1].value).split(" ")[0]

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

		new Audio("Blow.aiff.wav").play();
		terminal_msg.innerHTML += `${command} opened.<br />`;
	} else if (Object.keys(commands).includes(command)) {
		commands[command]();
	} else if (command == "") {
		terminal_msg.innerHTML += "</br>";
	} else {
		terminal_msg.innerHTML += "<br />" + command + ": command not found<br />";
		new Audio("Sosumi.aiff.wav").play();
	}

	// generateConsoleInput();
	consoleInput.children[1].value = "";

	window.scrollTo(0, document.body.scrollHeight);
}

window.addEventListener('focus', () => {
	focusOnConsoleInput();
});

document.addEventListener('keydown', (event) => {
	if (event.key === "Enter") {
		dummyExec_(consoleInput.children[1].value);
	} else if (event.key === "ArrowUp" && historyIndex >= 0) {
		if (historyIndex === 0) {
			errorSound.play();
		} else {
			historyIndex -= 1;
			consoleInput.children[1].value = consoleHistory[historyIndex];
		}
	} else if (event.key === "ArrowDown") {
		if (historyIndex < consoleHistory.length) {
			consoleInput.children[1].value = consoleHistory[historyIndex];
			historyIndex += 1;
		} else {
			consoleInput.children[1].value = "";
			errorSound.play();
		}
	} else if (event.key == "ArrowLeft") {
		if (window.getSelection) {
			sel = window.getSelection();
			
			if (sel.rangeCount) {
				console.log(sel.getRangeAt(0).commonAncestorContainer.children);
			}
		}
	}

	document.getElementById("shortcut").innerHTML = "<kbd>" + event.key + "</kbd>";

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

document.getElementById("external-options").addEventListener("click", (event) => {
	let optionId = event.target.id;

	if (optionId === "font-size") {
		if (terminalSession.config.fontSize === "small") {
			terminalSession.config.fontSize = "medium";
		} else if (terminalSession.config.fontSize === "medium") {
			terminalSession.config.fontSize = "large";
		} else {
			terminalSession.config.fontSize = "small";
		}
	document.body.style.fontSize = terminalSession.config.fontSize;
	consoleInput.children[1].style.fontSize = terminalSession.config.fontSize;
	// document.getElementsByClassName("console-input").style.fontSize = terminalSession.config.fontSize;
	document.getElementById("font-size").style.fontSize = terminalSession.config.fontSize;

	}
	
	document.getElementById(optionId).style.animation = "icon-blink .3s ease";
	setTimeout(() => {
		document.getElementById(optionId).style.animation = "none";
	}, 300);
});