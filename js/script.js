const a = new Date("09/02/1998");
let b = new Date();

let month = parseInt((b.getMonth() - a.getMonth()) % 12);
let year = b.getFullYear() - a.getFullYear() + parseInt((a.getMonth() + b.getMonth()) / 12);

let terminal_msg = document.getElementById("container");

let consoleHistory = [];
let historyIndex = consoleHistory.length;

let s = window.getSelection();

let startingSelection = 0;

if (month < 10) {
	month = "0" + month;
}

if (month > 0) {	
	year = year - 1;
}

let datever = year + "." + month;

const getLastLogin = () => {
	terminal_msg.innerHTML += `Last login: ${b.toString()}<br /><br /> Welcome to daimessdn.github.io<br /> Current version: ${datever}<br /><br />`;
}

let consoleInput = `<strong class="machine-console">dimaswehhh@daimessdn.github.io</strong><span class="console-input" contenteditable="true"></span>`;

let consoleInputSelect = document.querySelectorAll('.console-input');
let lastConsoleInput = consoleInputSelect[consoleInputSelect.length - 1];

const generateConsoleInput = () => {
	terminal_msg.innerHTML += consoleInput;
	consoleInputSelect = document.querySelectorAll('.console-input');
	lastConsoleInput = consoleInputSelect[consoleInputSelect.length - 1];
	lastConsoleInput.focus();
};

const focusOnConsoleInput = () => {
	lastConsoleInput.focus();
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
	lastConsoleInput.removeAttribute("contenteditable");

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
	lastConsoleInput.innerHTML = "";
	historyIndex = consoleHistory.length;
	window.scrollTo(0,document.body.scrollHeight);
}

window.addEventListener('focus', () => {
	focusOnConsoleInput();
});

document.addEventListener('keydown', (event) => {
	if (event.key === "Enter") {
		dummyExec_(lastConsoleInput.textContent);
	} else if (event.key === "ArrowUp" && historyIndex > 0) {
		historyIndex -= 1;
		lastConsoleInput.innerHTML = consoleHistory[historyIndex];
		focusOnConsoleInput();
	} else if (event.key === "ArrowDown" && historyIndex < consoleHistory.length) {
		lastConsoleInput.innerHTML = consoleHistory[historyIndex];
		focusOnConsoleInput();
		historyIndex += 1;
  }
});

// document.addEventListener("keyup", () => {
// 	console.log(s);

// 	// oRange = s.getRangeAt(startingSelection); //get the text range
// 	// console.log(oRange)
// 	// oRect = oRange.getBoundingClientRect()
	
// });

document.addEventListener("DOMContentLoaded", () => {
  getLastLogin();
	generateConsoleInput();
  
  // s = window.getSelection();
	// oRange = s.getRangeAt(0); //get the text range
	// console.log(oRange)
	// oRect = oRange.getBoundingClientRect()
})

document.addEventListener("keyup", (event) => {
  event.preventDefault();

  if (window.getSelection) {
    caret = window.getSelection();
    
    if (caret.rangeCount) {
      range = caret.getRangeAt(0);
    }
    
    element = range.commonAncestorContainer.parentElement;

    content = element.textContent;

    modified = content.split();
    
    for (let i = 0; i < modified.length; i++) {
      if (i == range.startOffset) {
        modified[i] = "<span style='background-color: #fff; color: #300a24;'>"
                + modified[i]
                + "</span>";
      }
    }
    
    lastConsoleInput.innerHTML = modified.join('');
    
    console.log(modified);

    return false;

  } else if (document.selection) {
    textRange = document.selection;
    console.log(document.selection);
  }

  // console.log(textRange.parentElement)
})