'use strict';

const URL = "https://opendata.brussels.be/api/explore/v2.1/catalog/datasets/parcours_street_art/records?limit=24";

let alleData = [];

async function haalDataOp() {
    try {
        const response = await fetch(URL);
        const data = await response.json();

        alleData = data.results;

        vulFilters();

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








function sorteerOpArtiestEnStreetart() {

    const keuzeNaam = document.getElementById("sorteerOpNaam").value;
    const keuzeArtiest = document.getElementById("sorteerOpArtiest").value;

    alleData.sort((a, b) => {

        let naamA = (a.name_nl || "").toLowerCase();
        let naamB = (b.name_nl || "").toLowerCase();

        let artiestA = (a.artist_name || "").toLowerCase();
        let artiestB = (b.artist_name || "").toLowerCase();

        // Eerst sorteren op artiest
        if (keuzeArtiest === "asc") {
            if (artiestA < artiestB) return -1;
            if (artiestA > artiestB) return 1;
        }

        if (keuzeArtiest === "desc") {
            if (artiestA > artiestB) return -1;
            if (artiestA < artiestB) return 1;
        }

        // Daarna op naam
        if (keuzeNaam === "asc") {
            if (naamA < naamB) return -1;
            if (naamA > naamB) return 1;
        }

        if (keuzeNaam === "desc") {
            if (naamA > naamB) return -1;
            if (naamA < naamB) return 1;
        }

        return 0;
    });

    toonData(alleData);
}











function vulFilters() {

    console.log(alleData[0]);

    const postcodeSelect = document.getElementById("postcode");
    const jaarSelect = document.getElementById("jaar");

    let postcodes = [];
    let jaren = [];

    for (let item of alleData) {

    if (item.postalcode && !postcodes.includes(item.postalcode)) {
    postcodes.push(item.postalcode);
        }

    if (item.real_date && !jaren.includes(item.real_date)) {
    jaren.push(item.real_date);
        }
    }

    for (let pc of postcodes) {
        let option = document.createElement("option");
        option.value = pc;
        option.textContent = pc;
        postcodeSelect.appendChild(option);
    }

    for (let jaar of jaren) {
        let option = document.createElement("option");
        option.value = jaar;
        option.textContent = jaar;
        jaarSelect.appendChild(option);
    }
}










function filterData() {

    const gekozenPostcode = document.getElementById("postcode").value;
    const gekozenJaar = document.getElementById("jaar").value;

    const gefilterd = alleData.filter(item => {

        let postcode = item.postalcode || "";
        let jaar = item.real_date || "";

        let matchPostcode = gekozenPostcode === "" || postcode == gekozenPostcode;
        let matchJaar = gekozenJaar === "" || jaar.includes(gekozenJaar);

        return matchPostcode && matchJaar;
    });

    toonData(gefilterd);
}










const sorteerknopStreetartsnaam = document.getElementById("sorteerOpNaam");
const sorteerknopArtiest = document.getElementById("sorteerOpArtiest");

if (sorteerknopStreetartsnaam) sorteerknopStreetartsnaam.addEventListener("change", sorteerOpArtiestEnStreetart);
if (sorteerknopArtiest) sorteerknopArtiest.addEventListener("change", sorteerOpArtiestEnStreetart);

window.addEventListener("load", function () {

    haalDataOp();

    document.getElementById("postcode").addEventListener("change", filterData);
    document.getElementById("jaar").addEventListener("change", filterData);

    const zoekbalk = document.getElementById("zoekbalk");
    zoekbalk.addEventListener("input", zoekNamenOp);

    
    const filterKnop = document.getElementById("filterknop");
    const filterMenu = document.getElementById("filtermenu");

    filterKnop.addEventListener("click", function () {
        filterMenu.classList.toggle("actief");
    });

});

   

