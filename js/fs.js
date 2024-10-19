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
