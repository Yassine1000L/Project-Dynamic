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

function zoekNamenOp() {

    const zoekTerm = document.getElementById("zoekbalk").value.toLowerCase();

    if (zoekTerm === "") {
        toonData(alleData);
        return;
    }

    const gevondenNamen = alleData.filter(item => {

        let naam = (item.name_nl || "").toLowerCase();
        let artiest = (item.artist_name || "").toLowerCase();

        return naam.includes(zoekTerm) || artiest.includes(zoekTerm);
    });

    toonData(gevondenNamen);
}

window.addEventListener("load", function () {

<<<<<<< HEAD
    haalDataOp();

    const zoekbalk = document.getElementById("zoekbalk");
    zoekbalk.addEventListener("input", zoekNamenOp);

    // FILTER TOGGLE
    const filterKnop = document.getElementById("filterknop");
    const filterMenu = document.getElementById("filtermenu");

    filterKnop.addEventListener("click", function () {
        filterMenu.classList.toggle("actief");
    });

});
=======



function sorteerOpArtiestEnStreetart() {

    const keuzeNaam = document.getElementById("sorteerOpNaam").value;
    const keuzeArtiest = document.getElementById("sorteerOpArtiest").value;

    alleData.sort((a, b) => {
        let naam1 = (a.name_nl || "").toLowerCase();
        let naam2 = (b.name_nl || "").toLowerCase();
        let artiest1 = (a.artist_name || "").toLowerCase();
        let artiest2 = (b.artist_name || "").toLowerCase();

    
        if (keuzeArtiest !== "keuze") {
            if (artiest1 !== artiest2) {
                if (keuzeArtiest === "dalend") {
                    if (artiest1 < artiest2) return -1;
                    if (artiest1 > artiest2) return 1;
                } else {
                    if (artiest1 > artiest2) return -1;
                    if (artiest1 < artiest2) return 1;
                }
            }
        }

        if (keuzeNaam !== "keuze") {
            if (keuzeNaam === "dalend") {
                if (naam1 < naam2) return -1;
                if (naam1 > naam2) return 1;
            } else {
                if (naam1 > naam2) return -1;
                if (naam1 < naam2) return 1;
            }
        }

        return 0; 
    });

    toonData(alleData);
}

const sorteerknopStreetartsnaam = document.getElementById("sorteerOpNaam");
const sorteerknopArtiest = document.getElementById("sorteerOpArtiest");

if (sorteerknopStreetartsnaam) sorteerknopStreetartsnaam.addEventListener("change", sorteerOpArtiestEnStreetart);
if (sorteerknopArtiest) sorteerknopArtiest.addEventListener("change", sorteerOpArtiestEnStreetart);




haalDataOp();
>>>>>>> b1496a3132bcb09703a9409f4a3bbb791f779396
