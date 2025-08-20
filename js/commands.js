const commands = {
  cat: {
    arguments: [],
    execute: () => {
      let prevPwd = JSON.parse(JSON.stringify(pwd));
      let prevFs = fs;

      prevPwd.forEach((dir, dirIndex) => {
        prevFs =
          dirIndex > 0
            ? prevFs.contents.find((dir) => dir.name === prevPwd[dirIndex])
            : prevFs.find((dir) => dir.name === prevPwd[dirIndex]);
      });

      console.log('masuk cat exec', prevPwd, prevFs)

      // checking file to cat based on args
      if (args.length > 0) {
        const fileName = args;

        const fileToCat = prevPwd.length > 0 ? prevFs.contents.find(file => file.name === fileName) : prevFs.find(file => file.name === fileName);
        if (fileToCat) {
          if (fileToCat.type === "normal")
            terminal_msg.innerHTML += `<br />${fileToCat.cat}<br />`;
          else if (fileToCat.type === "dir")
            terminal_msg.innerHTML += `<br />cat: is a directory<br />`;
        } else  {
          terminal_msg.innerHTML += `<br />cat: no such file or directory<br />`;
        }
      } else {
        terminal_msg.innerHTML += `<br />cat: require at least 1 argumnt<br />`;
      }
    }
  },
  cd: {
    arguments: [],
    execute: () => {
      const dirs = args.split("/");

      // init previous directory and file content
      let prevPwd = JSON.parse(JSON.stringify(pwd));
      let prevFs = fs;

      prevPwd.forEach((dir, dirIndex) => {
        prevFs =
          dirIndex > 0
            ? prevFs.contents.find((dir) => dir.name === prevPwd[dirIndex])
            : prevFs.find((dir) => dir.name === prevPwd[dirIndex]);
      });

      // delete last directory
      if (args === "..") {
        pwd.pop();
      }

      if (args !== ".." && args !== "." && args !== "") {
        // proceed to directory
        let selectedDir = prevFs;
        for (let i = 0; i < dirs.length; i++) {
          if (dirs[i] !== "" && dirs[i] != "..") {
            selectedDir =
              pwd.length > 0
                ? selectedDir.contents.find((dir) => dir.name === dirs[i])
                : selectedDir.find((dir) => dir.name === dirs[i]);

            if (selectedDir !== undefined) {
              pwd.push(dirs[i]);
            } else {
              terminal_msg.innerHTML += `<br />cd: ${args}: no such file or directory`;
              pwd = prevPwd;
              break;
            }
          } else if (dirs[i] == "..") {
            // get top filesystem directory
            let tempDir = fs;
            let topPwd = pwd.slice(0, -1);

            for (let j = 0; j < topPwd.length; j++) {
              let topSelectedDir = tempDir.find((x) => x.name === topPwd[j]);

              if (j != topPwd.length - 1) {
                tempDir = topSelectedDir;
              }
            }

            selectedDir = tempDir;
            pwd.pop();
          }
        }
      }

      pwdStr = ":~" + (pwd.length > 0 ? "/" : "") + pwd.join("/") + "$";
      workingDirElement.innerHTML = pwdStr;
      terminal_msg.innerHTML += "<br />";
    },
  },
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
            <strong>cd</strong>\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0change working directory<br />
            <strong>clear</strong>\xa0\xa0\xa0\xa0\xa0clear terminal console<br />
            <strong>echo</strong>\xa0\xa0\xa0\xa0\xa0\xa0display a line of text<br />
            <strong>date</strong>\xa0\xa0\xa0\xa0\xa0\xa0show current date<br />
            <strong>exit</strong>\xa0\xa0\xa0\xa0\xa0\xa0exit terminal session<br />
            <strong>help</strong>\xa0\xa0\xa0\xa0\xa0\xa0display available commands help<br />
            <strong>history</strong>\xa0\xa0\xa0display console history<br />
            <strong>hostname</strong>\xa0\xa0display system host name<br />
            <strong>ls</strong>\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0list directory contents<br />
            <strong>pwd</strong>\xa0\xa0\xa0\xa0\xa0\xa0\xa0print working directory<br />
            <strong>reset</strong>\xa0\xa0\xa0\xa0\xa0reset terminal session<br />
            <strong>reboot</strong>\xa0\xa0\xa0\xa0reset terminal machine (I mean, not real machine)<br />
            <strong>test</strong>\xa0\xa0\xa0\xa0\xa0\xa0testing command<br />
            <strong>uname</strong>\xa0\xa0\xa0\xa0\xa0display small system info<br />
            <strong>whoami</strong>\xa0\xa0\xa0\xa0display session user name<br />
            <br />
            Other commands<br />
            <strong>contact</strong>\xa0\xa0\xa0reach me out: --via WhatsApp or by e-mail<br />
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
      terminal_msg.innerHTML += `<br>${terminalSession.hostname}</br>`;
    },
  },
  ls: {
    arguments: [],
    execute: (arguments) => {
      let output = "";

      let workingDirContent = fs;
      pwd.forEach((a, aIndex) => {
        workingDirContent =
          aIndex > 0
            ? workingDirContent.contents.find((dir) => dir.name === a)
            : workingDirContent.find((dir) => dir.name === a);
      });

      let lsResult =
        pwd.length > 0 ? workingDirContent.contents : workingDirContent;

      lsResult.forEach((f) => {
        let textStyle;

        switch (f.type) {
          case "dir":
            textStyle = "text-blue";
            break;

          case "binary":
            textStyle = "text-green";
            break;

          default:
            textStyle = "text-white";
        }

        output += `<span class="${textStyle}">${f.name}</span>\xa0\xa0\xa0`;
      });

      terminal_msg.innerHTML +=
        pwd.length > 0
          ? lsResult && lsResult.length > 0
            ? `<br />${output}<br />`
            : "<br />"
          : lsResult.length > 0
          ? `<br />${output}<br />`
          : `<br />`;
    },
  },
  pwd: {
    arguments: [],
    execute: () => {
      terminal_msg.innerHTML += `<br />~/${pwd.join("/")}<br />`;
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
      terminal_msg.innerHTML += `<br>${terminalSession.username}</br>`;
    },
  },

  // non Linux-based commands
  portfolio
  : {
    arguments: [],
    execute: async (arguments) => {
      const accumulatedCommands = ("portfolio " + args).trim();

      consoleInput.style.display = "none";

      await fetch("https://ipa-ndd.vercel.app/api/command/exec", {
        method: "POST",
        body: JSON.stringify({ command: accumulatedCommands }),

        headers: { "Content-Type": "application/json" },

        referrerPolicy: "no-referrer",
      })
        .then((res) => res.json())
        .then((res) => {
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
          console.error(error.message);
          consoleInput.style.display = "flex";
          terminal_msg.innerHTML += "<br />portfolio: command not found<br />";
          document.querySelector(".console-input").focus();
        });
    },
  },
  contact: {
    arguments: [],
    execute: async (arguments) => {
      const accumulatedCommands = ("contact " + args).trim();

      consoleInput.style.display = "none";

      await fetch("https://ipa-ndd.vercel.app/api/command/exec", {
        method: "POST",
        body: JSON.stringify({ command: accumulatedCommands }),

        headers: { "Content-Type": "application/json" },

        referrerPolicy: "no-referrer",
      })
        .then((res) => res.json())
        .then((res) => {
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
          console.error(error.message);
          consoleInput.style.display = "flex";
          terminal_msg.innerHTML += "<br />contact: command not found<br />";
          document.querySelector(".console-input").focus();
        });
    },
  },
};
