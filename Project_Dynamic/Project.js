'use strict';

const URL = "https://opendata.brussels.be/api/explore/v2.1/catalog/datasets/parcours_street_art/records?limit=24";

let alleData = [];
let huidigeWeergave = "data";
<<<<<<< HEAD
=======

//test yassine


>>>>>>> f0a381e9bd6938b11c68fd19701fe177facf6f80

async function haalDataOp() {
    const response = await fetch(URL);
    const data = await response.json();

<<<<<<< HEAD
        alleData = data.results;

        vulFilters();
        toonData(alleData);
    } catch (fout) {
        console.error("Fout bij ophalen:", fout);
    }
=======
    alleData = data.results;

    vulFilters();
    toonData(alleData);
>>>>>>> f0a381e9bd6938b11c68fd19701fe177facf6f80
}





function toonData(items) {
<<<<<<< HEAD
=======

>>>>>>> f0a381e9bd6938b11c68fd19701fe177facf6f80
    if (huidigeWeergave === "favorieten") return;

    const container = document.getElementById("resultaten");
    container.innerHTML = "";

    for (let item of items) {

        const kaart = document.createElement("div");
        kaart.classList.add("card");

<<<<<<< HEAD
        kaart.innerHTML = `
            <h3>${item.name_nl || "Geen naam"}</h3>
            <p><strong>Artiest:</strong> ${item.artist_name || "Onbekend"}</p>
            <p><strong>Jaar:</strong> ${item.real_date ? item.real_date.split("-")[0] : "Onbekend"}</p>
            <p><strong>Postcode:</strong> ${item.postalcode || "Onbekend"}</p>
            <p><strong>Beschrijving:</strong> ${item.description_nl || "Geen beschrijving"}</p>
            <button class="fav">⭐ Voeg toe</button>
        `;
=======
       kaart.innerHTML = `
    <h3>${item.name_nl || "Geen naam"}</h3>

    <p><strong>Artiest:</strong> ${item.artist_name || "Onbekend"}</p>

    <p><strong>Jaar:</strong> ${item.real_date ? item.real_date.split("-")[0] : "Onbekend"}</p>

    <p><strong>Postcode:</strong> ${item.postalcode || "Onbekend"}</p>

    <p><strong>Beschrijving:</strong> ${item.description_nl || "Geen beschrijving"}</p>

    <button class="fav">⭐</button>
`;

>>>>>>> f0a381e9bd6938b11c68fd19701fe177facf6f80

        kaart.querySelector(".fav").onclick = () => {
            voegToeAanFavorieten(item);
        };
<<<<<<< HEAD

        container.appendChild(kaart);
    }
}

function voegToeAanFavorieten(item) {
    let fav = JSON.parse(localStorage.getItem("fav")) || [];

    let bestaatAl = false;
    for (let opgeslagenItem of fav) {
        // DE NIEUWE CHECK:
        if (opgeslagenItem.name_nl === item.name_nl) { 
            bestaatAl = true;
        }
    }

    if (!bestaatAl) {
        fav.push(item);
        localStorage.setItem("fav", JSON.stringify(fav));
        alert("Toegevoegd aan je favorieten!");
    } else {
        alert("Deze stond al in je favorieten!");
    }
}

function toonFavorieten() {
    huidigeWeergave = "favorieten";

    const container = document.getElementById("resultaten");
    container.innerHTML = "";

    let fav = JSON.parse(localStorage.getItem("fav")) || [];

    if (fav.length === 0) {
        container.innerHTML = `
            <div class="geen-resultaten">
                <h2>Nog geen favorieten</h2>
                <p>Klik op het icoontje bij een streetart om deze hier te bewaren!</p>
            </div>
        `;
        return;
    }

    for (let item of fav) {
        const kaart = document.createElement("div");
        kaart.classList.add("card");

        kaart.innerHTML = `
            <h3>${item.name_nl || "Geen naam"}</h3>
            <p><strong>Artiest:</strong> ${item.artist_name || "Onbekend"}</p>
            <p><strong>Jaar:</strong> ${item.real_date ? item.real_date.split("-")[0] : "Onbekend"}</p>
            <p><strong>Postcode:</strong> ${item.postalcode || "Onbekend"}</p>
            <p><strong>Beschrijving:</strong> ${item.description_nl || "Geen beschrijving"}</p>
        `;
=======
>>>>>>> f0a381e9bd6938b11c68fd19701fe177facf6f80

        container.appendChild(kaart);
    }
}

<<<<<<< HEAD
function zoekNamenOp() {
    huidigeWeergave = "data";
=======
>>>>>>> f0a381e9bd6938b11c68fd19701fe177facf6f80


<<<<<<< HEAD
=======



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

>>>>>>> f0a381e9bd6938b11c68fd19701fe177facf6f80
    const resultaat = alleData.filter(item => {
        let naam = (item.name_nl || "").toLowerCase();
        let artiest = (item.artist_name || "").toLowerCase();
        return naam.includes(zoekTerm) || artiest.includes(zoekTerm);
    });

    toonData(resultaat);
}





<<<<<<< HEAD
=======

>>>>>>> f0a381e9bd6938b11c68fd19701fe177facf6f80
function sorteerOpArtiestEnStreetart() {

    huidigeWeergave = "data";

    const keuzeNaam = document.getElementById("sorteerOpNaam").value;
    const keuzeArtiest = document.getElementById("sorteerOpArtiest").value;

    alleData.sort((a, b) => {

        let naamA = (a.name_nl || "").toLowerCase();
        let naamB = (b.name_nl || "").toLowerCase();

<<<<<<< HEAD
        if (keuzeNaam !== "keuze") {
            if (keuzeNaam === "dalend") { // A-Z
                if (naam1 < naam2) return -1;
                if (naam1 > naam2) return 1;
            } else {
                if (naam1 > naam2) return -1;
                if (naam1 < naam2) return 1;
            }
        }
=======
        let artiestA = (a.artist_name || "").toLowerCase();
        let artiestB = (b.artist_name || "").toLowerCase();
>>>>>>> f0a381e9bd6938b11c68fd19701fe177facf6f80

        if (keuzeArtiest === "asc") return artiestA.localeCompare(artiestB);
        if (keuzeArtiest === "desc") return artiestB.localeCompare(artiestA);

        if (keuzeNaam === "asc") return naamA.localeCompare(naamB);
        if (keuzeNaam === "desc") return naamB.localeCompare(naamA);

        return 0;
    });

    toonData(alleData);
}

<<<<<<< HEAD
function vulFilters() {
    const postcodeSelect = document.getElementById("postcode");
    const jaarSelect = document.getElementById("jaar");

=======






function vulFilters() {

    const postcodeSelect = document.getElementById("postcode");
    const jaarSelect = document.getElementById("jaar");

>>>>>>> f0a381e9bd6938b11c68fd19701fe177facf6f80
    let postcodes = [];
    let jaren = [];

    for (let item of alleData) {
<<<<<<< HEAD
=======

>>>>>>> f0a381e9bd6938b11c68fd19701fe177facf6f80
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

<<<<<<< HEAD
    postcodes.sort().forEach(pc => {
=======
    postcodes.forEach(pc => {
>>>>>>> f0a381e9bd6938b11c68fd19701fe177facf6f80
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







<<<<<<< HEAD
=======



>>>>>>> f0a381e9bd6938b11c68fd19701fe177facf6f80
window.onload = () => {

    haalDataOp();

<<<<<<< HEAD
    const favKnop = document.getElementById("favorieten");
    if (favKnop) favKnop.onclick = toonFavorieten;

    const zoekbalk = document.getElementById("zoekbalk");
    if (zoekbalk) zoekbalk.oninput = zoekNamenOp;

    const postcodeSelect = document.getElementById("postcode");
    if (postcodeSelect) postcodeSelect.onchange = filterData;

    const jaarSelect = document.getElementById("jaar");
    if (jaarSelect) jaarSelect.onchange = filterData;

    const sortNaam = document.getElementById("sorteerOpNaam");
    if (sortNaam) sortNaam.onchange = sorteerOpArtiestEnStreetart;

    const sortArtiest = document.getElementById("sorteerOpArtiest");
    if (sortArtiest) sortArtiest.onchange = sorteerOpArtiestEnStreetart;

    const filterKnop = document.getElementById("filterknop");
    const filterMenu = document.getElementById("filtermenu");
    if (filterKnop && filterMenu) {
        filterKnop.onclick = () => {
            filterMenu.classList.toggle("actief");
        };
    }

    const homeKnop = document.getElementById("home");
    if (homeKnop) {
        homeKnop.onclick = () => {
            huidigeWeergave = "data";
            toonData(alleData);
        };
    }
};
=======
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
>>>>>>> f0a381e9bd6938b11c68fd19701fe177facf6f80
