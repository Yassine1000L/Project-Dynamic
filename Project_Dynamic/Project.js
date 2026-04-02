'use strict';

const URL = "https://opendata.brussels.be/api/explore/v2.1/catalog/datasets/parcours_street_art/records?limit=24";


let alleData = [];

async function haalDataOp() {
    try {
        const response = await fetch(URL);
        const data = await response.json();

        alleData = data.results;
        toonData(alleData);

    } catch (fout) {
        console.error(fout);
    }
}

function toonData(items) {
    const container = document.getElementById("resultaten");
    container.innerHTML = "";

    for (let item of items) {
        const kaart = document.createElement("div");
        kaart.classList.add("card");

        kaart.innerHTML = `
            <h3>${item.name_nl || "Geen naam"}</h3>
            <p>${item.artist_name || "Onbekend"}</p>
        `;

        container.appendChild(kaart);
    }
}

    haalDataOp();
