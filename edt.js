const timetableData = {
  "ST1": {
    "2024-09-01": [
      {
        "heure": "11h15-12h15",
        "titre": "R\u00e9union de Pr\u00e9-Rentr\u00e9e Portail ST - OUI SI",
        "lieu": "AMPHI PHYSIQUE"
      },
      {
        "heure": "13h00-15h00",
        "titre": "R\u00e9union de Pr\u00e9-Rentr\u00e9e Portail ST - A \u00e0 L",
        "lieu": "AMPHI PV"
      },
      {
        "heure": "15h15-17h15",
        "titre": "R\u00e9union de Pr\u00e9-Rentr\u00e9e Portail ST - M \u00e0 Z",
        "lieu": "AMPHI PV"
      }
    ],
    "2024-09-02": [
      {
        "heure": "08h00-10h00",
        "titre": "TD Maths0",
        "lieu": "Salle M 1.1 (B\u00e2t M)"
      },
      {
        "heure": "13h00-15h00",
        "titre": "Pr\u00e9sentation Licence Physique",
        "lieu": "AMPHI PV"
      },
      {
        "heure": "15h15-17h15",
        "titre": "Pr\u00e9sentation Licence Chimie",
        "lieu": "AMPHI PV"
      }
    ]
  },
  "ST2": {
    "2024-09-01": [
      {
        "heure": "11h15-12h15",
        "titre": "R\u00e9union de Pr\u00e9-Rentr\u00e9e Portail ST - OUI SI",
        "lieu": "AMPHI PHYSIQUE"
      },
      {
        "heure": "13h00-15h00",
        "titre": "R\u00e9union de Pr\u00e9-Rentr\u00e9e Portail ST - A \u00e0 L",
        "lieu": "AMPHI PV"
      },
      {
        "heure": "15h15-17h15",
        "titre": "R\u00e9union de Pr\u00e9-Rentr\u00e9e Portail ST - M \u00e0 Z",
        "lieu": "AMPHI PV"
      }
    ]
  },
  "ST3": {
    "2024-09-01": [
      {
        "heure": "11h15-12h15",
        "titre": "R\u00e9union de Pr\u00e9-Rentr\u00e9e Portail ST - OUI SI",
        "lieu": "AMPHI PHYSIQUE"
      }
    ]
  }
};

let currentGroup = "ST1";
let currentDateIndex = 0;

const dateOrder = [...new Set(Object.values(timetableData).flatMap(Object.keys))].sort();

function updateDateDisplay() {
  const date = dateOrder[currentDateIndex];
  document.getElementById("current-date").textContent = new Date(date).toLocaleDateString("fr-FR", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });
}

function renderDayContent() {
  const date = dateOrder[currentDateIndex];
  const events = timetableData[currentGroup][date] || [];
  const content = events.map(e => `
    <div style='margin-bottom:10px; background:#0095c8; border-radius:10px; padding:10px; color:white; font-weight:bold;'>
      <div>${e.heure}</div>
      <div>${e.titre}</div>
      <div style='margin-top:5px;'><img src='https://univ-cotedazur.fr/medias/photo/position_1689063333149-png?ID_FICHE=1202336' style='width:20px;height:20px;filter:brightness(0) invert(1);vertical-align:middle;margin-right:5px;'> ${e.lieu}</div>
    </div>
  `).join("");
  document.getElementById("day-content").innerHTML = content || "<i>Aucun événement prévu ce jour-là.</i>";
  updateDateDisplay();
}

function prevDay() {
  currentDateIndex = (currentDateIndex - 1 + dateOrder.length) % dateOrder.length;
  renderDayContent();
}

function nextDay() {
  currentDateIndex = (currentDateIndex + 1) % dateOrder.length;
  renderDayContent();
}

document.getElementById("group-select").innerHTML =
  Object.keys(timetableData).map(g => `<option value="${g}">${g}</option>`).join("");

document.getElementById("group-select").addEventListener("change", e => {
  currentGroup = e.target.value;
  currentDateIndex = 0;
  renderDayContent();
});

renderDayContent();