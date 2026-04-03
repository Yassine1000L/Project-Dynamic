'use strict';

const URL = "https://opendata.brussels.be/api/explore/v2.1/catalog/datasets/parcours_street_art/records?limit=24";

let alleData = [];
let huidigeWeergave = "data";




const observer = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const kaartObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add('zichtbaar');
            observer.unobserve(entry.target);
        }
    });
}, observer);




async function haalDataOp() {
    try {
        const response = await fetch(URL);
        const data = await response.json();

        alleData = data.results;

        vulFilters();
        toonData(alleData);
    } catch (fout) {
        console.error("Fout bij ophalen:", fout);
    }
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
            <p><strong>Adres:</strong> ${item.location_nl || "Onbekend"}</p>
            <p class="beschrijving"><strong>Beschrijving:</strong> ${item.description_nl || "Geen beschrijving"}</p>
            <button class="fav">Voeg toe</button>
        `;

        kaart.querySelector(".fav").onclick = () => {
            voegToeAanFavorieten(item);
        };

        container.appendChild(kaart);

        kaartObserver.observe(kaart);
    }
}







function voegToeAanFavorieten(item) {
    let fav = JSON.parse(localStorage.getItem("fav")) || [];

    let bestaatAl = false;
    for (let opgeslagenItem of fav) {
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

    for (let i = 0; i < fav.length; i++) {
        let item = fav[i];
        const kaart = document.createElement("div");
        kaart.classList.add("card");

        let huidigeNotitie = item.notitie || "";

        kaart.innerHTML = `
            <h3>${item.name_nl || "Geen naam"}</h3>
            <p><strong>Artiest:</strong> ${item.artist_name || "Onbekend"}</p>
            <p><strong>Jaar:</strong> ${item.real_date ? item.real_date.split("-")[0] : "Onbekend"}</p>
            <p><strong>Postcode:</strong> ${item.postalcode || "Onbekend"}</p>
            <p><strong>Adres:</strong> ${item.location_nl || "Onbekend"}</p>
            <p class="beschrijving"><strong>Beschrijving:</strong> ${item.description_nl || "Geen beschrijving"}</p>
            
            <div class="notitie">
                <input type="text" class="notitie-input" placeholder="Wat vind je hiervan?" value="${huidigeNotitie}">
                <p class="foutmelding" style="display: none; color: red; font-size: 12px; margin: 0;">Minimaal 2 karakters vereist.</p>
                <button class="notitie-opslaan">Opslaan</button>
            </div>

            <button class="verwijderen-fav">Verwijderen</button>
        `;

        kaart.querySelector(".verwijderen-fav").onclick = () => {
            verwijderUitFavorieten(item);
        };

        kaart.querySelector(".notitie-opslaan").onclick = () => {
            const inputVeld = kaart.querySelector(".notitie-input");
            const foutMelding = kaart.querySelector(".foutmelding");
            const opslaanKnop = kaart.querySelector(".notitie-opslaan");
            
            const getypteTekst = inputVeld.value.trim(); 

            if (getypteTekst.length > 0 && getypteTekst.length < 2) {
                foutMelding.style.display = "block";
                inputVeld.style.borderColor = "red";
            } else {
                foutMelding.style.display = "none";
                inputVeld.style.borderColor = "#ccc";
                
                item.notitie = getypteTekst;
                fav[i] = item;
                localStorage.setItem("fav", JSON.stringify(fav));

                opslaanKnop.textContent = "Opgeslagen!";
                setTimeout(() => opslaanKnop.textContent = "Opslaan", 2000);
            }
        };

        container.appendChild(kaart);

        kaartObserver.observe(kaart);
    }
}






function verwijderUitFavorieten(item) {
    let fav = JSON.parse(localStorage.getItem("fav")) || [];
    
    fav = fav.filter(opgeslagenItem => opgeslagenItem.name_nl !== item.name_nl);
    
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
    const keuzeNaam = document.getElementById("sorteerOpNaam").value;
    const keuzeArtiest = document.getElementById("sorteerOpArtiest").value;

    alleData.sort((a, b) => {
        let naam1 = (a.name_nl || "").toLowerCase();
        let naam2 = (b.name_nl || "").toLowerCase();
        let artiest1 = (a.artist_name || "").toLowerCase();
        let artiest2 = (b.artist_name || "").toLowerCase();

        if (keuzeNaam !== "keuze") {
            if (naam1 !== naam2) {
                if (keuzeNaam === "dalend") {
                    return naam1 < naam2 ? -1 : 1;
                } else {
                    return naam1 > naam2 ? -1 : 1;
                }
            }
        }

                if (keuzeArtiest !== "keuze") {
            if (artiest1 !== artiest2) {
                if (keuzeArtiest === "dalend") {
                    return artiest1 < artiest2 ? -1 : 1;
                } else {
                    return artiest1 > artiest2 ? -1 : 1;
                }
            }
        }

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

    postcodes.sort().forEach(pc => {
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

    const themeKnop = document.getElementById("theme"); 
    
    if (themeKnop) {
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark-mode");
        }

        themeKnop.onclick = () => {
            document.body.classList.toggle("dark-mode");
            
            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
        };
    }

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