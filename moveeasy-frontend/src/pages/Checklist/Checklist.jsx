import { useState, useEffect } from "react";
import "./Checklist.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function Checklist() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
const [filter, setFilter] = useState("all");

  const initialDemarches = [
    {
  id: 0,
  titre: "Ouvrir un compte bancaire",
  description: "Création d'un compte bancaire français",
  duree: "1 semaine",
  etapes: "3 étapes",
  completed: false,

  documents: [
    {
      nom: "Passeport",
      checked: false,
    }
  ],

  source: "service-public.fr",
  date: "15/06/2026",
},
    {
  id: 1,
  titre: "Demander les aides CAF",
  dependsOn: [0],
  description: "Allocation logement étudiant",
  duree: "1-2 semaines",
  etapes: "4 étapes",
  completed: true,
      documents: [
        {

    nom: "Passeport",

    checked: false,

  },

  {

    nom: "Attestation de scolarité",

    checked: false,

  },

  {

    nom: "RIB",

    checked: false,

  },
      ],
      source: "caf.fr",
      date: "15/06/2026",
      completed: false,
    },

    {
  id: 2,
  titre: "Titre de séjour étudiant",
  description: "Renouvellement administratif",
  duree: "2-3 mois",
  etapes: "5 étapes",
  completed: false,
      documents: [
        {

    nom: "Passeport",

    checked: false,

  },

  {

    nom: "Attestation de scolarité",

    checked: false,

  },

  {

    nom: "Justificatif de domicile",

    checked: false,

  },

  {

    nom: "Photo d'identité",

    checked: false,

  },
      ],
      source: "service-public.fr",
      date: "01/07/2026",
      completed: false,
    },

    {
  id: 3,
  titre: "Sécurité sociale (Ameli)",
  description: "Assurance maladie française",
  duree: "2-4 semaines",
  etapes: "3 étapes",
  completed: false,
      documents: [
       {

      nom: "Passeport",

      checked: false,

    },

    {

      nom: "Attestation de scolarité",

      checked: false,

    },

    {

      nom: "RIB",

      checked: false,

    },

  ],

  source: "ameli.fr",

  date: "10/06/2026",

},
  ];

  const [demarches, setDemarches] = useState(() => {
    const saved = localStorage.getItem("demarches");
    return saved ? JSON.parse(saved) : initialDemarches;
  });

  useEffect(() => {
    localStorage.setItem(
      "demarches",
      JSON.stringify(demarches)
    );
  }, [demarches]);

 
  const toggleCompleted = (id) => {
    const updated = demarches.map((item) =>
      item.id === id
        ? {
            ...item,
            completed: !item.completed,
          }
        : item
    );

    setDemarches(updated);
  };

  const completedCount =
    demarches.filter((item) => item.completed).length;

  const remainingCount =
    demarches.length - completedCount;

    const filteredDemarches = demarches.filter((item) => {
  const matchSearch =
    item.titre
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchFilter =
    filter === "all" ||
    (filter === "pending" && !item.completed) ||
    (filter === "completed" && item.completed);

  return matchSearch && matchFilter;
});

  return (
    

<div className="dashboard-layout">

  <Navbar />

  <div className="dashboard-content">
    
    <div className="checklist-container">

     <div className="checklist-header">
  <h1>Mes démarches</h1>
  <p>
    {completedCount} sur {demarches.length} démarches complétées
  </p>
</div>

      <div className="stats-checklist">

        <div className="stat-box">
          <h3>Terminées</h3>
          <p>{completedCount}</p>
        </div>

        <div className="stat-box">
          <h3>Restantes</h3>
          <p>{remainingCount}</p>
        </div>

      </div>
<div className="progress-box">

  <div className="progress-header">

    <span>Progression globale</span>

    <span>
      {Math.round(
        (completedCount / demarches.length) * 100
      ) || 0}
      %
    </span>

  </div>

  <div className="progress-bar">

    <div
      className="progress-fill"
      style={{
        width: `${
          Math.round(
            (completedCount /
              demarches.length) *
              100
          ) || 0
        }%`,
      }}
    />

  </div>

</div>

<input
  type="text"
  placeholder="Rechercher une démarche..."
  className="search-input"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

<div className="filters">

  <button
    className={filter === "all" ? "active-filter" : ""}
    onClick={() => setFilter("all")}
  >
    Tout
  </button>

  <button
    className={filter === "pending" ? "active-filter" : ""}
    onClick={() => setFilter("pending")}
  >
    En cours
  </button>

  <button
    className={filter === "completed" ? "active-filter" : ""}
    onClick={() => setFilter("completed")}
  >
    Terminées
  </button>

</div>

{filteredDemarches.map((item) => (
        <div
          key={item.id}
          className="demarche-card"
        >
          <div
  className="demarche-header"
  onClick={() =>
    navigate(`/demarche/${item.id}`)
  }
>
  <div>

    <h3>{item.titre}</h3>

    <p className="demarche-subtitle">
      {item.description}
    </p>
<div className="demarche-meta">

  <span>
    {item.completed
      ? "Terminée"
      : "À faire"}
  </span>

  <span>•</span>

  <span>{item.duree}</span>

  <span>•</span>

  <span>{item.etapes}</span>

</div>
  </div>

  <span
    className={
      item.completed
        ? "status completed"
        : "status pending"
    }
  >
    {item.completed
      ? "Terminée"
      : "À faire"}
  </span>

</div>

        </div>
      ))}
    </div>
     </div>
      </div>
  );
}

export default Checklist;