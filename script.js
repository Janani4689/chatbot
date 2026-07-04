async function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const message = input.value.trim();

    if (message === "") return;

    chatBox.innerHTML += `<div class="user">${message}</div>`;
    input.value = "";

    const typing = document.createElement("div");
    typing.className = "bot";
    typing.innerHTML = "Typing...";
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        typing.innerHTML = data.reply;
    } catch (error) {
        typing.innerHTML = "Sorry! Unable to connect to AI server.";
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}
