import { useState, useEffect } from "react";
import "./Checklist.css";

function Checklist() {
  const [openItem, setOpenItem] = useState(null);

  const initialDemarches = [
    {
      id: 1,
      titre: "CAF",
      description: "Aide au logement pour les étudiants.",
      documents: [
        "Contrat de location",
        "RIB",
        "Attestation de scolarité",
        "Pièce d'identité",
      ],
      source: "caf.fr",
      date: "15/06/2026",
      completed: false,
    },

    {
      id: 2,
      titre: "Titre de séjour",
      description: "Renouvellement du titre étudiant.",
      documents: [
        "Passeport",
        "Attestation de scolarité",
        "Justificatif de domicile",
        "Photo d'identité",
      ],
      source: "service-public.fr",
      date: "01/07/2026",
      completed: false,
    },

    {
      id: 3,
      titre: "Ameli",
      description: "Inscription à l'assurance maladie.",
      documents: [
        "Passeport",
        "Attestation de scolarité",
        "RIB",
      ],
      source: "ameli.fr",
      date: "10/06/2026",
      completed: false,
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

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

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

  return (
    <div className="checklist-container">

      <h1>📋 Mes démarches</h1>

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

      {demarches.map((item) => (
        <div
          key={item.id}
          className="demarche-card"
        >
          <div
            className="demarche-header"
            onClick={() => toggleItem(item.id)}
          >
            <h3>
              {openItem === item.id ? "▼" : "▶"}{" "}
              {item.titre}
            </h3>

            {item.completed && (
              <span>✅</span>
            )}
          </div>

          {openItem === item.id && (
            <div className="demarche-details">

              <p>
                <strong>Description :</strong>
              </p>

              <p>{item.description}</p>

              <br />

              <p>
                <strong>
                  Documents recommandés :
                </strong>
              </p>

              <ul>
                {item.documents.map(
                  (doc, index) => (
                    <li key={index}>
                      ✓ {doc}
                    </li>
                  )
                )}
              </ul>

              <br />

              <p>
                <strong>
                  Source officielle :
                </strong>{" "}
                {item.source}
              </p>

              <p>
                <strong>
                  Dernière mise à jour :
                </strong>{" "}
                {item.date}
              </p>

              <br />

              <label>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() =>
                    toggleCompleted(item.id)
                  }
                />{" "}
                Démarche terminée
              </label>

            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Checklist;