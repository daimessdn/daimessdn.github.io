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
})

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

	size = terminalSession.config.fontSize === "small" ? "16px" : (
		       terminalSession.config.fontSize === "medium" ? "18px" : "20px"
		   );
	
	document.body.style.fontSize = size;
	consoleInput.children[1].style.fontSize = size;
	document.querySelector(".console-input").style.fontSize = size;
	document.querySelector("#font-size").style.fontSize = size;
	}
	
	document.getElementById(optionId).style.animation = "icon-blink .3s ease";
	setTimeout(() => {
		document.getElementById(optionId).style.animation = "none";
	}, 300);
});

let timeout;

document.addEventListener("mousemove", () => {
	let externalOption = document.querySelector("#external-options");

	externalOption.style.opacity = 1;
	clearTimeout(timeout);
	
  timeout = setTimeout(() => {
		externalOption.style.opacity = 0;
	}, 5000);
});