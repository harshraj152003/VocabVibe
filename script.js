function getWordDefinition() {
    let word = document.getElementById("wordInput").value.trim();

    if (word === "") {
        alert("Please enter a word.");
        return;
    }

    let requestUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(requestUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Something went wrong ${response.status} -> ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            if (data && data[0] && data[0].meanings && data[0].meanings[0] && data[0].meanings[0].definitions && data[0].meanings[0].definitions[0]) {
                let meaning = data[0].meanings[0].definitions[0].definition;
                document.getElementById("definition").innerHTML = `
                    <h2>Definition of "${word}":</h2>
                    <p>${meaning}</p>
                `;
            } else {
                document.getElementById("definition").innerHTML = `
                    <p>No definition found for the word "${word}".</p>
                `;
            }
            document.getElementById("definition").classList.add("show");
        })
        .catch((error) => {
            document.getElementById("definition").innerHTML = `
                <p>Sorry, something went wrong: ${error.message}. Please try again.</p>
            `;
            document.getElementById("definition").classList.add("show");
        });
}