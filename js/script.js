let terminal_msg = document.querySelector("#container");

let terminalSession = {
  username: "root",
  hostname: "root",
  config: {
    fontSize: "small",
  },
}; // DEFAULT TERMINAL SESSION

// sound effects
const errorSound = new Audio("sounds/bell.oga");
const openSound = new Audio("sounds/dialog-question.oga");
const commandNotFoundSound = new Audio("sounds/dialog-error.oga");

let consoleHistory = [];
let historyIndex = consoleHistory.length;

let startingSelection = 0;

// PWD section - current directory
const workingDirElement = document.querySelector(".pwd");
let pwd = [];
let pwdStr = ":~$";

let terminalVersion = "00.00"; // DEFAULT TERMINAL VERSION

const getLastLogin = () => {
  b = new Date();
  terminal_msg.innerHTML += `Last login: ${b.toString()}<br />
<br />
Welcome to ${terminalSession.hostname}<br />
Current version: ${terminalVersion}<br /><br />
Type <strong>help</strong> to display help information for using terminal<br />
or visit
 <a href="https://github.com/daimessdn/daimessdn.github.io" target="_blank">
https://github.com/daimessdn/daimessdn.github.io</a><br />
for web documentation.
<br /><br />`;
};

let consoleInput = document.getElementById("input");

let consoleInputSelect = document.querySelectorAll(".console-input");
const generateConsoleInput = () => {
  terminal_msg.innerHTML += consoleInput;
  consoleInputSelect = document.querySelectorAll(".console-input");
  consoleInput.children[2] = consoleInputSelect[consoleInputSelect.length - 1];
  consoleInput.children[2].focus();
};

const focusOnConsoleInput = () => {
  document.getElementById("input").children[2].focus();
};

const dummyExec_ = (command) => {
  terminal_msg.innerHTML += `<strong class="machine-console">${terminalSession.username}@${terminalSession.hostname}</strong><strong class="pwd">${pwdStr}</strong><span class="console-input">${command}</span>`;

  // clear all command spaces
  command = command.trim();
  args = "";

  // record command history
  if (command != "" && command != consoleHistory[consoleHistory.length - 1]) {
    consoleHistory.push(command);
    historyIndex = consoleHistory.length;
  }

  // checking if command has arguments
  if (command.includes(" ")) {
    args = command.substr(command.indexOf(" ") + 1);
    command = command.substr(0, command.indexOf(" "));
  }

  // command + args pre-processing
  command = command.replace("./", "");
  command = command.trim("<br>");
  command = command.trim();

  // update pwd structure
  let prevPwd = JSON.parse(JSON.stringify(pwd));
  let prevFs = fs;

  prevPwd.forEach((dir, dirIndex) => {
    prevFs =
      dirIndex > 0
        ? prevFs.contents.find((dir) => dir.name === prevPwd[dirIndex])
        : prevFs.find((dir) => dir.name === prevPwd[dirIndex]);
  });

  const fileContent = prevPwd.length > 0 ? prevFs.contents : prevFs;
  const fileExecContent = fileContent.filter((file) => file.type == "binary");

  const fileExecContentNames = fileExecContent.map((file) => file.name);

  // trigger response based on commandsm arguments, and dummy file
  if (fileExecContentNames.includes(command)) {
    // open executables (binary) dummy files if exists
    const fileToExec = fileExecContent.find((file) => file.name == command);
    fileToExec.exec();

    openSound.play();
    terminal_msg.innerHTML += "<br />";
  } else if (Object.keys(commands).includes(command)) {
    // executes existing commands
    commands[command].execute(args);
  } else if (command == "") {
    // executes empty response due to empty command
    terminal_msg.innerHTML += "</br>";
  } else {
    // display error response due to not existing command
    terminal_msg.innerHTML += "<br />" + command + ": command not found<br />";
    commandNotFoundSound.play();
  }

  // generateConsoleInput();
  consoleInput.children[2].value = "";

  window.scrollTo(0, document.body.scrollHeight);
};
