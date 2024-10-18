const commands = {
  clear: {
    arguments: [],
    execute: () => {
      terminal_msg.innerHTML = "";
    },
  },
  echo: {
    arguments: [],
    execute: (arguments) => {
      terminal_msg.innerHTML += "<br />" + args + "<br />";
    },
  },
  date: {
    arguments: [],
    execute: (arguments) => {
      terminal_msg.innerHTML += "<br />" + new Date() + "<br />";
    },
  },
  exit: {
    arguments: [],
    execute: (arguments) => {
      terminal_msg.innerHTML += "<br />Bye!<br />";
      setTimeout(window.close(), 300);
    },
  },
  help: {
    arguments: [],
    execute: (arguments) => {
      terminal_msg.innerHTML += `<br />
            Here are commands you can play with.<br />
            <br />
            <strong>clear</strong>\xa0\xa0\xa0\xa0\xa0clear terminal console<br />
            <strong>echo</strong>\xa0\xa0\xa0\xa0\xa0\xa0display a line of text<br />
            <strong>date</strong>\xa0\xa0\xa0\xa0\xa0\xa0show current date<br />
            <strong>exit</strong>\xa0\xa0\xa0\xa0\xa0\xa0exit terminal session<br />
            <strong>help</strong>\xa0\xa0\xa0\xa0\xa0\xa0display available commands help<br />
            <strong>history</strong>\xa0\xa0\xa0display console history<br />
            <strong>hostname</strong>\xa0\xa0display system host name<br />
            <strong>ls</strong>\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0list directory contents<br />
            <strong>reset</strong>\xa0\xa0\xa0\xa0\xa0reset terminal session<br />
            <strong>reboot</strong>\xa0\xa0\xa0\xa0reset terminal machine (I mean, not real machine)<br />
            <strong>test</strong>\xa0\xa0\xa0\xa0\xa0\xa0testing command<br />
            <strong>uname</strong>\xa0\xa0\xa0\xa0\xa0display small system info<br />
            <strong>whoami</strong>\xa0\xa0\xa0\xa0display session user name<br />
            <br />
            Other command<br />
            <strong>portfolio</strong>\xa0shows my portfolio (although I'm not sure you'll get something)<br />
            `;
    },
  },
  history: {
    arguments: ["-c"],
    execute: (arguments) => {
      if (arguments.includes("-c")) {
        consoleHistory = [];
      } else if (arguments.length == 0) {
        for (let i = 0; i < consoleHistory.length - 1; i++) {
          let currentLine = (i + 1).toString();
          let lineLength = currentLine.length;
          let maxLineLength = consoleHistory.length.toString().length;

          let extraSpace = "\xa0".repeat(maxLineLength - lineLength);

          terminal_msg.innerHTML +=
            "<br />" + extraSpace + currentLine + " " + consoleHistory[i];
        }
      } else {
        terminal_msg.innerHTML +=
          "<br />" +
          "history: invalid arguments " +
          arguments.join(" ") +
          "<br />";

        new Audio("sounds/Sosumi.aiff.wav").play();
      }

      terminal_msg.innerHTML += "<br />";
    },
  },
  hostname: {
    arguments: [],
    execute: (arguments) => {
      terminal_msg.innerHTML += "<br>" + terminalSession.hostname + "</br>";
    },
  },
  ls: {
    arguments: [],
    execute: (arguments) => {
      terminal_msg.innerHTML += `<br />
                                        <span style='color: #4E9A06; font-weight: bold;'>
                                            ${
                                              executable.join("\xa0\xa0\xa0") +
                                              "\xa0\xa0\xa0" +
                                              oilshit.join("\xa0\xa0\xa0")
                                            }
                                        </span><br />`;
    },
  },
  reboot: {
    arguments: [],
    execute: (arguments) => {
      setTimeout(() => {
        document.body.style.backgroundColor = "#000";
        document.getElementById("external-options").style.display = "none";
        document.getElementById("shortcut").style.display = "none";
        commands.reset.execute(arguments, 5000);
        setTimeout(
          () => {
            document.body.style.backgroundColor = "#300a24";
          },
          4500,
          (async = true)
        );
        setTimeout(
          () => {
            document.getElementById("external-options").style.display = "block";
            document.getElementById("shortcut").style.display = "block";
          },
          4750,
          (async = true)
        );
      }, 300);
    },
  },
  reset: {
    arguments: [],
    execute: (arguments, bootTime = 750) => {
      consoleInput.style.display = "none";
      terminal_msg.innerHTML = "";
      consoleHistory = [];
      historyIndex = consoleHistory.length;
      setTimeout(() => {
        getLastLogin();
        consoleInput.style.display = "block";
      }, bootTime);
    },
  },
  test: {
    arguments: [],
    execute: (arguments) => {
      terminal_msg.innerHTML += "</br>";
    },
  },
  uname: {
    arguments: [],
    execute: (arguments) => {
      terminal_msg.innerHTML += "<br />(Not) Linux  <br />";
    },
  },
  whoami: {
    arguments: [],
    execute: (arguments) => {
      terminal_msg.innerHTML += "<br>" + terminalSession.username + "</br>";
    },
  },

  // non Linux-based commands
  portfolio: {
    arguments: [],
    execute: async (arguments) => {
      console.log(args);
      const accumulatedCommands = ("portfolio " + args).trim();

      console.log("ini portfolio", accumulatedCommands);

      consoleInput.style.display = "none";

      await fetch("https://ipa-ndd.vercel.app/api/command/exec", {
        method: "POST",
        body: JSON.stringify({ command: accumulatedCommands }),
        headers: { "Content-Type": "application/json" },
        referrerPolicy: "no-referrer",
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          const output = res.data.output;
          terminal_msg.innerHTML += `<br />${output.replace(
            /(?:\r\n|\r|\n)/g,
            "<br>"
          )}<br />`;
          consoleInput.style.display = "flex";
          document.querySelector(".console-input").focus();

          if (res.data.link != null) {
            window.open(res.data.link, "_blank");
          }
        })
        .catch((error) => {
          console.warn(error.message);
          consoleInput.style.display = "flex";
          terminal_msg.innerHTML += "<br />portfolio: command not found<br />";
          document.querySelector(".console-input").focus();
        });
    },
  },
};
