function getWordDefinition() {
    let word = document.getElementById("wordInput").value.trim();

    if (word === "") {
        alert("Please enter a word.");
        return;
    }

    let requestUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    
    const xhr = new XMLHttpRequest();

    xhr.open("GET", requestUrl, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let responseData = JSON.parse(xhr.responseText);
            let meaning = responseData[0].meanings[0].definitions[0].definition;

            document.getElementById("definition").innerHTML = `
                <h2>Definition of "${word}":</h2>
                <p>${meaning}</p>
            `;
            document.getElementById("definition").classList.add("show");
        } else if (xhr.readyState === 4) {
            document.getElementById("definition").innerHTML = `
                <p>Sorry, no definition found for the word "${word}". Please try again.</p>
            `;
            document.getElementById("definition").classList.add("show");
        }
    };

    xhr.send();
}