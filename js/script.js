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

const errorSound = new Audio('sounds/bell.oga');

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

		new Audio("sounds/Blow.aiff.wav").play();
		terminal_msg.innerHTML += `${command} opened.<br />`;
	} else if (Object.keys(commands).includes(command)) {
		commands[command].execute();
	} else if (command == "") {
		terminal_msg.innerHTML += "</br>";
	} else {
		terminal_msg.innerHTML += "<br />" + command + ": command not found<br />";
		new Audio("sounds/Sosumi.aiff.wav").play();
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
			errorSound.cloneNode().play();
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
			errorSound.cloneNode().play();

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