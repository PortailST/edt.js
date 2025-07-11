const scheduleData = {
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
  },

  // ... Ajoute ici les données des groupes ST2 à ST12 dans la même structure
};

// Fonction d’affichage
function displayScheduleForDay(group, date) {
  const contentEl = document.getElementById("day-content");
  const groupData = scheduleData[group];
  const day = groupData ? groupData[date] : null;

  if (!day || !Array.isArray(day)) {
    contentEl.innerHTML = '<p style="text-align:center; font-weight:bold; color:#555;">Aucun événement ce jour-là.</p>';
    return;
  }

  contentEl.innerHTML = day
    .map(event => {
      let bgColor = "#0095c8";
      if (/atelier de rentrée/i.test(event.title)) bgColor = "#ff008c";
      if (/évaluation/i.test(event.title)) bgColor = "#eb1a1a";

      const textColor = bgColor === "#eb1a1a" ? "#fff" : "#fff";

      return `
        <div style="background:${bgColor}; color:${textColor}; font-weight:bold; margin:10px 0; padding:10px 15px; border-radius:10px;">
          ${event.time} : ${event.title}<br>
          <img src="https://univ-cotedazur.fr/medias/photo/position_1689063333149-png?ID_FICHE=1202336" style="width:20px;height:20px;vertical-align:middle;margin-right:5px;filter:brightness(0) invert(1);" />
          ${event.location}
        </div>`;
    })
    .join("");
}

// Navigation
let currentGroup = "Groupe ST1";
let currentDateIndex = 0;
let currentDates = Object.keys(scheduleData[currentGroup]);

function updateCurrentDate() {
  document.getElementById("current-date").textContent = currentDates[currentDateIndex];
  displayScheduleForDay(currentGroup, currentDates[currentDateIndex]);
}

function prevDay() {
  if (currentDateIndex > 0) {
    currentDateIndex--;
    updateCurrentDate();
  }
}

function nextDay() {
  if (currentDateIndex < currentDates.length - 1) {
    currentDateIndex++;
    updateCurrentDate();
  }
}

document.getElementById("group-select").addEventListener("change", function () {
  currentGroup = this.value;
  currentDates = Object.keys(scheduleData[currentGroup]);
  currentDateIndex = 0;
  updateCurrentDate();
});

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("group-select");
  Object.keys(scheduleData).forEach(group => {
    const option = document.createElement("option");
    option.value = group;
    option.textContent = group;
    select.appendChild(option);
  });
  updateCurrentDate();
});
