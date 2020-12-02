const commands = {
	clear: {
        arguments: [],
        execute: () => {
            terminal_msg.innerHTML = "";
        }
    },
    exit: {
        arguments: [],
        execute: () => {
                terminal_msg.innerHTML += "<br />Bye!<br />";
                setTimeout(window.close(), 300);
        }
    },
	help: {
        arguments: [],
        execute: () => {
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
        }
    },
	history: {
        execute: () => {
            for (let i = 0; i < consoleHistory.length - 1; i++) {
                terminal_msg.innerHTML += "<br />" + (i + 1) + " " + consoleHistory[i];
            }
    
            terminal_msg.innerHTML += "<br />";
        }
    },
	hostname: {
        arguments: [],
        execute: () => { terminal_msg.innerHTML += "<br>" + terminalSession.hostname + "</br>"; }
    },
    ls: {
        arguments: [],
        execute: () => {
            terminal_msg.innerHTML += `<br />
                                        <span style='color: #4E9A06; font-weight: bold;'>
                                            ${executable.join("\xa0\xa0\xa0")}
                                        </span><br />`;
        }
    },
    reboot: {
        arguments: [],
        execute: () => {
            setTimeout(() => {
                document.body.style.backgroundColor = "#000";
                document.getElementById("external-options").style.display = "none";
                document.getElementById("shortcut").style.display = "none";
                commands.reset.execute(5000);
                setTimeout(() => {
                    document.body.style.backgroundColor = "#300a24";
                }, 4500, async=true)
                setTimeout(() => {
                    document.getElementById("external-options").style.display = "block";
                    document.getElementById("shortcut").style.display = "block";
                }, 4750, async=true);
            }, 300);
        },
    },
    reset: {
        arguments: [],
        execute: (bootTime = 750) => {
            consoleInput.style.display = "none";
            terminal_msg.innerHTML = "";
            consoleHistory = [];
            historyIndex = consoleHistory.length;
            setTimeout(() => { 
                getLastLogin();
                consoleInput.style.display = "block";	
            }, bootTime);
        }
    },
    test: {
        arguments: [],
        execute: () => { terminal_msg.innerHTML += "</br>"; }
    },
    whoami: {
        arguments: [],
        execute: () => { terminal_msg.innerHTML += "<br>" + terminalSession.username + "</br>"; },
    }
    
};