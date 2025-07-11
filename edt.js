
const timetableData = {
  "Groupe ST1": {
    "Lundi 1 septembre": [
      { time: "11h15-12h15", title: "Réunion de Pré-Rentrée Portail ST - OUI SI", location: "AMPHI PHYSIQUE" },
      { time: "13h00-15h00", title: "Réunion de Pré-Rentrée Portail ST - Noms de A à L inclus", location: "AMPHI PV" },
      { time: "15h15-17h15", title: "Réunion de Pré-Rentrée Portail ST - Noms de M à Z inclus", location: "AMPHI PV" }
    ],
    "Mardi 2 septembre": [
      { time: "8h00-10h00", title: "TD Maths0", location: "Salle M 1.1 (Bât M)" },
      { time: "13h00-15h00", title: "Présentation Licence Physique", location: "AMPHI PV" },
      { time: "15h15-17h15", title: "Présentation Licence Chimie", location: "AMPHI PV" }
    ],
    "Mercredi 3 septembre": [
      { time: "9h30-13h30", title: "FORUM D'ACCUEIL - Nouveaux entrants", location: "Bibliothèque" },
      { time: "14h00-15h00", title: "Atelier de rentrée - OBLIGATOIRE", location: "Salle Coworking (Bât M)" },
      { time: "15h15-17h15", title: "TD Maths0", location: "Salle M 1.1 (Bât M)" }
    ],
    "Jeudi 4 septembre": [
      { time: "8h00-10h00", title: "TD Maths0", location: "Salle M 1.1 (Bât M)" },
      { time: "10h15-12h15", title: "Présentation Licence Mathématiques & MIASHS", location: "AMPHI PV" },
      { time: "13h00-15h00", title: "Présentation Licence Informatique", location: "AMPHI PV" },
      { time: "15h15-17h15", title: "Présentation Licence Electronique & IA", location: "AMPHI PV" }
    ],
    "Vendredi 5 septembre": [
      { time: "10h15-12h15", title: "TD Maths0", location: "Salle M 1.1 (Bât M)" },
      { time: "13h00-15h00", title: "Présentation Licence Sciences de la Terre", location: "AMPHI Sc. Naturelles" }
    ],
    "Lundi 8 septembre": [
      { time: "8h00-10h00", title: "TD Maths0", location: "Salle M 1.1 (Bât M)" },
      { time: "13h00-15h00", title: "Innovation (Fablab & Invent)", location: "AMPHI PV" }
    ],
    "Mardi 9 septembre": [
      { time: "10h15-12h15", title: "TD Maths0", location: "Salle M 1.1 (Bât M)" }
    ],
    "Mercredi 10 septembre": [
      { time: "10h15-12h15", title: "TD Maths0", location: "Salle M 1.1 (Bât M)" }
    ],
    "Jeudi 11 septembre": [
      { time: "8h00-10h00", title: "TD Maths0", location: "Salle M 1.1 (Bât M)" }
    ],
    "Vendredi 12 septembre": [
      { time: "(HORAIRE SUR MOODLE)", title: "ÉVALUATION MATHS0", location: "AMPHI PV" }
    ]
  }
};

const groupSelect = document.getElementById("group-select");
const dayContent = document.getElementById("day-content");
const currentDateLabel = document.getElementById("current-date");

let currentGroup = "Groupe ST1";
let currentDateIndex = 0;

function updateGroupOptions() {
  for (let group in timetableData) {
    const option = document.createElement("option");
    option.value = group;
    option.textContent = group;
    groupSelect.appendChild(option);
  }
}

function renderDay() {
  const days = Object.keys(timetableData[currentGroup]);
  const date = days[currentDateIndex];
  currentDateLabel.textContent = date;
  const events = timetableData[currentGroup][date];

  const html = events
    .map(event => {
      let bgColor = "#007ba3";
      let color = "white";
      if (event.title.toLowerCase().includes("atelier")) bgColor = "#ff008c";
      if (event.title.toLowerCase().includes("évaluation")) bgColor = "#eb1a1a";
      if (event.title.toLowerCase().includes("innovation")) bgColor = "#f08c00";
      if (event.title.toLowerCase().includes("présentation")) bgColor = "#8a6cff";

      return \`
        <div style="background:\${bgColor};color:\${color};padding:10px 16px;margin:8px 0;border-radius:10px;font-weight:bold;">
          \${event.time} : \${event.title}<br/>
          <img src="https://univ-cotedazur.fr/medias/photo/position_1689063333149-png?ID_FICHE=1202336" style="width:20px;height:20px;vertical-align:middle;margin-right:8px;filter:brightness(0) invert(1);"> \${event.location}
        </div>
      \`;
    })
    .join("");

  dayContent.innerHTML = html;
}

function prevDay() {
  const days = Object.keys(timetableData[currentGroup]);
  currentDateIndex = (currentDateIndex - 1 + days.length) % days.length;
  renderDay();
}

function nextDay() {
  const days = Object.keys(timetableData[currentGroup]);
  currentDateIndex = (currentDateIndex + 1) % days.length;
  renderDay();
}

groupSelect.addEventListener("change", function () {
  currentGroup = this.value;
  currentDateIndex = 0;
  renderDay();
});

updateGroupOptions();
renderDay();
