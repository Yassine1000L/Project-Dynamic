# FindInBrussels
Dit project hoort bij het vak "Dynamic Web". De bestanden die in dit project terug te vinden zijn, zijn de volgende: een html-bestand, een css-bestand en een js-bestand.
Het onderwerp van de website is het weergeven van publieke streetarts, die in Brussel gevestigd zijn.

# Functionaliteiten
- Het zoeken van een streetart in Brussel.
- Het zoeken van de auteur van een streetart.
- Het weergeven van alle streetarts op basis van streetcards op de webpagina.
- Het sorteren van alle streetarts en alle artiesten op naam: aflabatisch en omgekeerd alfabetisch.
- Het filtreren van alle streetarts op basis van volgende kenmerken
  - Postcode
  - Datum
- Het wisselen van thema op de website
  - Donkerthema
  - Lichtthema
- Het functioneren van de website op kleinere devices, de layout is visueel mooi.
- Het weergeven van meldingen in het geval iets niet te vinden is of opgeslagen is.
- Het tonen van animaties bij het scrollen.
- Het ophalen van data dankzij API.
- Het toevoegen van streetarts aan de favorieten.
- Het verwijderen van streetarts van de favorieten.
- Het toevoegen van notities aan de favorieten.

# Gebruikte API
Data van De Stad Brussel: https://opendata.brussels.be/pages/home/
24 streetarts in Brussel: https://opendata.brussels.be/api/explore/v2.1/catalog/datasets/parcours_street_art/records?limit=24

# Technische Vereiste
- DOM Manipulatie:
  - Elementen selecteren  R48 en R65
  - Elementen manipuleren  R52, R55, R69
  - Events aan elementen koppelen  R65, R361, R364
- Modern Javascript:
  - Gebruik van constanten  R3, R11, R372-391
  - Template literals  R55-R64, R136-R147
  - Iteratie over Arrays   R51, R273
  - Array Methodes  R92, R201, R215, R227, R287
  - Arrow Functions  R17, R153, R333
  - Conditional operator  R58, R139
  - Callback Functions  R176
  - Promises  R31-R33
  - Async & Await  R31-R34
  - Observer API  R17-R26
- Data & API:
  - Fetch om data op te halen  R33
  - JSON manipuleren en weergeven   R33, R82 en R93 
- Opslag & validatie:
  - Formulier validatie  R164-R167
  - Gebruik van LocalStorage  R82, R93, R338 en R345
- Styling & Layout:
  - Basis HTML-layout
  - Basis CSS
  - Gebruiksvriendelijke elementen
 
# Installatiehandleiding
- Download Visual Studio Code, in het geval dit nog niet gedaan is.
- Aan de linkerkant van het scherm op Visual Studio Code, bevindt zich een vierkant gevuld met vier blokjes:
  - Klik op dat vierkant.
- Voeg de volgende extensies toe op Visual Studio Code om eventuele problemen te vermijden:
  - HTML CSS Support
  - Live Server 
- Download de folder: "Project_Dynamic"
- Sla de folder op een gemakkelijk bereikbaar plaats op de computer.
- Open Visual Studio Code.
- Helemaal bovenaan links, staat er een reeks woorden na elkaar.
  - Klik op "File"
  - Klik daarna op "Open Folder"
  - Blader in uw bestanden om de gedownloade folder terug te vinden en te selecteren.
- In de folder zijn drie bestanden terug te vinden.
- Open Project.html.
- Helemaal onderaan rechts, verschijnt er een icoontje "Go Live"
  - Klik hierop.
    - Deze zorgt ervoor dat een lokaal server gaat draaien om de webapplicatie te kunnen gebruiken.    
- Nu is het mogelijk om de functionaliteiten van de website te gebruiken.


# Screenshots van de applicatie
<img width="1920" height="3461" alt="image" src="https://github.com/user-attachments/assets/09b9832e-a8ee-46e1-b1f0-c2982fec2780" />



# Bronnen
- Cursus "Dynamic Web"; raadpleegbaar via canvas.ehb.be
- AI-tool: Google Gemini:
  - https://gemini.google.com/share/576ceabc5f65
  - https://gemini.google.com/share/4863e9d5fd2f
  - https://gemini.google.com/share/d492b64db2e8
  - https://gemini.google.com/share/ab802588ad5b 


# Taakverdeling
- Userstories: Yassine
- Product Backlog: Hisham
- HTML-pagina:
  - Organisatie en leesbaarheid: Hisham
  - Knoppen bovenrij: Hisham
  - Structuur: Yassine
  - Filtermenu en filterknoppen: Yassine
  - Correcte tags- en labelgebruik: Hisham

- JavaScript-pagina:
  - Link met API: Hisham
  - Functies toonData, haalDataOp, voegToeAanFavorieten, vulFilters, filterData, window.onload: Yassine
  - Functies toonFavorieten, VerwijderUitFavorieten, zoekNamenOp, sorteerOpArtiestEnStreetart: Hisham

- CSS-pagina:
  - Header en body: Yassine
  - Knoppen bovenrij: Yassine
  - Filters: Yassine
  - Kaarten: Yassine
  - Darkmode: Yassine
  - Responsive Web Design: Hisham
  - Favorietknoppen: Hisham
  - Correcte properties- en selectorengebruik: Hisham

- README-document: Hisham



# Sterk Aangeraden Materiaal
- Visual Studio Code
- Extensies op Visual Studio Code:
    - HTML CSS Support
    - Live Server
