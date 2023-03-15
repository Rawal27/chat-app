const socket = io();
const textarea = document.querySelector("#textarea");
const chatArea = document.querySelector(".chat__area");
let user;

/** Creates a pop-up to enter user name when localhost:3000 gets hit */
do {
  user = prompt("Please enter your name: ");
} while (!user);

/** Targets the text area on keyup event */
textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

/** Function that sends message to other localhost servers */
const sendMessage = (message) => {
  let messageObject = {
    user: user,
    message: message.trim(),
  };

  appendMessage(messageObject, "outgoing");
  textarea.value = "";
  scrollToBottom();

  socket.emit("message", messageObject);
};

/** Function that appends messages to all the browser tabs or
 * rooms those are supposed to receive the messages */
const appendMessage = (messageObject, messageType) => {
  const mainDiv = document.createElement("div");
  const className = messageType;
  mainDiv.classList.add(className, "message");

  const markup = `
    <h4>${messageObject.user}</h4>
    <p>${messageObject.message}</p>
    `;
  mainDiv.innerHTML = markup;
  chatArea.appendChild(mainDiv);
};

socket.on("message", (message) => {
  appendMessage(message, "incoming");
  scrollToBottom();
});

/** Default scroll to the end chat or last message */
const scrollToBottom = () => {
  chatArea.scrollTop = chatArea.scrollHeight;
};
