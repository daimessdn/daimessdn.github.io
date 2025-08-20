const fs = [
  {
    name: "games",
    type: "dir",
    exec: null,
    contents: [
      {
        name: "typing-aquarium",
        type: "binary",
        cat: null,
        exec: () => {
          window.open("https://daimessdn.github.io/typing-aquarium", "_blank");
        },
      },
      {
        name: "path-thern",
        type: "binary",
        cat: null,
        exec: () => {
          window.open("https://daimessdn.github.io/path-thern", "_blank");
        },
      },
      {
        name: "sasscape-room",
        type: "binary",
        cat: null,
        exec: () => {
          window.open("https://daimessdn.github.io/sasscape-room", "_blank");
        },
      },
    ],
  },
  {
    name: "personal",
    type: "dir",
    exec: null,
    contents: [
      {
        name: "skills.txt",
        type: "normal",
        cat: "HTML, CSS, JavaScript,<br />React, Vue, PHP, Python",
      },
      {
        name: "hobby.txt",
        type: "normal",
        cat: "eating, sleeping, beating, and &lt;coding /&gt;",
      },
      {
        name: "readme.txt",
        type: "normal",
        cat: "thank you for reading me (づ｡◕‿‿◕｡)づ",
      },
    ],
  },
  {
    name: "folder1",
    type: "dir",
    exec: null,
    contents: [
      {
        name: "folder2",
        type: "dir",
        exec: null,
        contents: [],
      },
    ],
  },
  {
    name: "hello.txt",
    type: "normal",
    cat: "hello, world!",
  },
];
