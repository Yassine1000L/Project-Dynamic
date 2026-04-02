'use strict';

const URL = "https://opendata.brussels.be/api/explore/v2.1/catalog/datasets/parcours_street_art/records?limit=24";

let alleData = [];
let huidigeWeergave = "data";

//test yassine



async function haalDataOp() {
    const response = await fetch(URL);
    const data = await response.json();

    alleData = data.results;

    vulFilters();
    toonData(alleData);
}





function toonData(items) {

    if (huidigeWeergave === "favorieten") return;

    const container = document.getElementById("resultaten");
    container.innerHTML = "";

    for (let item of items) {

        const kaart = document.createElement("div");
        kaart.classList.add("card");

       kaart.innerHTML = `
    <h3>${item.name_nl || "Geen naam"}</h3>

    <p><strong>Artiest:</strong> ${item.artist_name || "Onbekend"}</p>

    <p><strong>Jaar:</strong> ${item.real_date ? item.real_date.split("-")[0] : "Onbekend"}</p>

    <p><strong>Postcode:</strong> ${item.postalcode || "Onbekend"}</p>

    <p><strong>Beschrijving:</strong> ${item.description_nl || "Geen beschrijving"}</p>

    <button class="fav">⭐</button>
`;


        kaart.querySelector(".fav").onclick = () => {
            voegToeAanFavorieten(item);
        };

        container.appendChild(kaart);
    }
}






function voegToeAanFavorieten(item) {

    let fav = JSON.parse(localStorage.getItem("fav")) || [];

    fav.push(item);

    localStorage.setItem("fav", JSON.stringify(fav));

    alert("Toegevoegd!");
}







function toonFavorieten() {

    huidigeWeergave = "favorieten";

    const container = document.getElementById("resultaten");
    container.innerHTML = "";

    let fav = JSON.parse(localStorage.getItem("fav")) || [];

    if (fav.length === 0) {
        container.innerHTML = "<h2>Geen favorieten</h2>";
        return;
    }

    fav.forEach((item, index) => {

        const kaart = document.createElement("div");
        kaart.classList.add("card");

        kaart.innerHTML = `
            <h3>${item.name_nl}</h3>
            <p><strong>Artiest:</strong> ${item.artist_name}</p>
            <p><strong>Jaar:</strong> ${item.real_date ? item.real_date.split("-")[0] : "Onbekend"}</p>
            <p><strong>Postcode:</strong> ${item.postalcode || "Onbekend"}</p>
            <p><strong>Beschrijving:</strong> ${item.description_nl || "Geen beschrijving"}</p>

            <button class="remove-btn">Verwijderen</button>
        `;

    
        kaart.querySelector(".remove-btn").onclick = () => {
            verwijderFavoriet(index);
        };

        container.appendChild(kaart);
    });
}







function verwijderFavoriet(index) {

    let fav = JSON.parse(localStorage.getItem("fav")) || [];

    fav.splice(index, 1);

    localStorage.setItem("fav", JSON.stringify(fav));

    toonFavorieten(); 
}






function zoekNamenOp() {

    huidigeWeergave = "data";

    const zoekTerm = document.getElementById("zoekbalk").value.toLowerCase();

    const resultaat = alleData.filter(item => {
        let naam = (item.name_nl || "").toLowerCase();
        let artiest = (item.artist_name || "").toLowerCase();
        return naam.includes(zoekTerm) || artiest.includes(zoekTerm);
    });

    toonData(resultaat);
}






function sorteerOpArtiestEnStreetart() {

    huidigeWeergave = "data";

    const keuzeNaam = document.getElementById("sorteerOpNaam").value;
    const keuzeArtiest = document.getElementById("sorteerOpArtiest").value;

    alleData.sort((a, b) => {

        let naamA = (a.name_nl || "").toLowerCase();
        let naamB = (b.name_nl || "").toLowerCase();

        let artiestA = (a.artist_name || "").toLowerCase();
        let artiestB = (b.artist_name || "").toLowerCase();

        if (keuzeArtiest === "asc") return artiestA.localeCompare(artiestB);
        if (keuzeArtiest === "desc") return artiestB.localeCompare(artiestA);

        if (keuzeNaam === "asc") return naamA.localeCompare(naamB);
        if (keuzeNaam === "desc") return naamB.localeCompare(naamA);

        return 0;
    });

    toonData(alleData);
}







function vulFilters() {

    const postcodeSelect = document.getElementById("postcode");
    const jaarSelect = document.getElementById("jaar");

    let postcodes = [];
    let jaren = [];

    for (let item of alleData) {

        if (item.postalcode && !postcodes.includes(item.postalcode)) {
            postcodes.push(item.postalcode);
        }

        if (item.real_date) {
            let jaar = item.real_date.split("-")[0];
            if (!jaren.includes(jaar)) {
                jaren.push(jaar);
            }
        }
    }

    postcodes.forEach(pc => {
        let opt = document.createElement("option");
        opt.value = pc;
        opt.textContent = pc;
        postcodeSelect.appendChild(opt);
    });

    jaren.forEach(j => {
        let opt = document.createElement("option");
        opt.value = j;
        opt.textContent = j;
        jaarSelect.appendChild(opt);
    });
}








function filterData() {

    huidigeWeergave = "data";

    const pc = document.getElementById("postcode").value;
    const jaar = document.getElementById("jaar").value;

    const result = alleData.filter(item => {

        let postcode = item.postalcode || "";
        let j = item.real_date ? item.real_date.split("-")[0] : "";

        return (
            (pc === "" || postcode === pc) &&
            (jaar === "" || j === jaar)
        );
    });

    if (result.length === 0) {

    const container = document.getElementById("resultaten");

    container.innerHTML = `
        <div class="geen-resultaten">
            <h2>Sorry, geen resultaten...</h2>
            <p>Probeer een andere combinatie</p>
        </div>
    `;

    } else {
    toonData(result);
    }
}










window.onload = () => {

    haalDataOp();

    document.getElementById("favorieten").onclick = toonFavorieten;
    document.getElementById("zoekbalk").oninput = zoekNamenOp;
    document.getElementById("postcode").onchange = filterData;
    document.getElementById("jaar").onchange = filterData;
    document.getElementById("sorteerOpNaam").onchange = sorteerOpArtiestEnStreetart;
    document.getElementById("sorteerOpArtiest").onchange = sorteerOpArtiestEnStreetart;

    document.getElementById("filterknop").onclick = () => {
        document.getElementById("filtermenu").classList.toggle("actief");
    };

    document.getElementById("home").onclick = () => {
    huidigeWeergave = "data";
    toonData(alleData);
    };

    kaart.querySelector(".remove-btn").onclick = () => {
    verwijderFavoriet(index);
    };

    document.getElementById("theme").onclick = () => {
    document.body.classList.toggle("dark");
    };
    
    
};
