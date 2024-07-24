if (!('webkitSpeechRecognition' in window)) {
    alert('Your browser does not support speech recognition. Please use Google Chrome.');
} else {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const resultDiv = document.getElementById('result');
    const countDiv = document.getElementById('count');

    let totalCount = 0;

    startButton.addEventListener('click', () => {
        recognition.start();
        startButton.disabled = true;
        stopButton.disabled = false;
    });

    stopButton.addEventListener('click', () => {
        recognition.stop();
        startButton.disabled = false;
        stopButton.disabled = true;
    });

    recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        let count = 0;

        for (let i = 0; i < event.results.length; ++i) {
            let transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += highlightWords(transcript);
            } else {
                interimTranscript += highlightWords(transcript);
            }
            countWords(transcript);
        }

        resultDiv.innerHTML = `<strong>Final:</strong> ${finalTranscript}<br/><strong>Interim:</strong> ${interimTranscript}`;
        countDiv.textContent = `Count: ${totalCount}`;
    };

    recognition.onerror = (event) => {
        console.error(event.error);
    };

    recognition.onend = () => {
        startButton.disabled = false;
        stopButton.disabled = true;
    };

    function highlightWords(text) {
        const keywords = ["です", "ですね"];
        const regex = new RegExp(`(${keywords.join("|")})`, "gi");
        return text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
    }

    function countWords(text) {
        const keywords = ["です", "ですね"];
        const regex = new RegExp(`(${keywords.join("|")})`, "gi");
        if(text.includes("です") || text.includes("ですね")){
            totalCount += 1;
        }
    }
}
