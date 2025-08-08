async function getResponse() {
    const prompt = document.getElementById("prompt").value;
    const resBox = document.getElementById("response");
    resBox.innerText = "Thinking...";

    const res = await fetch("http://localhost:5000/api/ai", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    resBox.innerText = data.reply;
}
