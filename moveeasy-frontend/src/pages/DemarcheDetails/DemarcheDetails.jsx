import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./DemarcheDetails.css";
import { useState, useEffect } from "react";

function DemarcheDetails() {
  const { id } = useParams();

  const [steps, setSteps] = useState(() => {

  const savedSteps =
    localStorage.getItem(
      `steps-${id}`
    );

  return savedSteps
    ? JSON.parse(savedSteps)
    : [false, false, false, false];

});

  const demarches =
    JSON.parse(
      localStorage.getItem("demarches")
    ) || [];

  const demarche = demarches.find(
    (item) => item.id === Number(id)
  );

  if (!demarche) {
    return (
      <div className="details-layout">
        <Navbar />

        <div className="details-content">
          <h1>Démarche introuvable</h1>

          <Link
            to="/checklist"
            className="back-btn"
          >
            Retour aux démarches
          </Link>
        </div>
      </div>
    );
  }
const totalDocuments = demarche.documents.length;

const documentsCompletes =
  demarche.documents.filter(
    (doc) => doc.checked
  ).length;
const completedSteps =
  steps.filter(Boolean).length;
const progress =
  (completedSteps / 4) * 100;
const status =
  completedSteps === 4
    ? "Terminée"
    : completedSteps > 0
    ? "En cours"
    : "À faire";
   useEffect(() => {

  localStorage.setItem(
    `steps-${id}`,
    JSON.stringify(steps)
  );

  const updatedDemarches =
    demarches.map((item) =>
      item.id === Number(id)
        ? {
            ...item,
            completed: completedSteps === 4,
          }
        : item
    );

  localStorage.setItem(
    "demarches",
    JSON.stringify(updatedDemarches)
  );

}, [steps]);
const myDocuments =
  JSON.parse(
    localStorage.getItem("documents")
  ) || [];
  return (
  <div className="details-layout">

    <Navbar />

    <div className="details-content">

      <Link
        to="/checklist"
        className="back-btn"
      >
        ← Retour aux démarches
      </Link>

      <div className="details-header">

        <div>

          <h1>{demarche.titre}</h1>

          <p>{demarche.description}</p>
<div className="progress-section">

  <div className="progress-text">

    <span>Progression</span>

    <span>
      {completedSteps}/4 étapes
    </span>

  </div>

  <div className="progress-bar">

    <div
      className="progress-fill"
      style={{
        width: `${progress}%`,
      }}
    />

  </div>

</div>

<div className="progress-stats">

  <div className="progress-card-small">

    <h4>Terminées</h4>

    <p>{completedSteps}</p>

  </div>

  <div className="progress-card-small">

    <h4>Restantes</h4>

    <p>{4 - completedSteps}</p>

  </div>

</div>
        </div>

       <span
  className={
    status === "Terminée"
      ? "status completed"
      : status === "En cours"
      ? "status progress"
      : "status pending"
  }
>
  {status}
</span>

      </div>

      <div className="details-grid">

        <div className="info-card">
          <h4>Durée estimée</h4>
          <p>{demarche.duree}</p>
        </div>

        <div className="info-card">
          <h4>Nombre d'étapes</h4>
          <p>{demarche.etapes}</p>
        </div>

        <div className="info-card">
          <h4>Mise à jour</h4>
          <p>{demarche.date}</p>
        </div>

      </div>

      <div className="section-card">

        <h3>Checklist des documents</h3>

        
{demarche.documents.map((doc, index) => (

  <label
    key={index}
    className="document-item"
  >

    <input
  type="checkbox"
  checked={
    myDocuments.some(
      (myDoc) =>
        myDoc.nom.toLowerCase() ===
        doc.nom.toLowerCase()
    )
  }
  readOnly
/>

    <span>
      {doc.nom}
    </span>

  </label>

))}
      </div>

      <div className="section-card">

        <h3>Étapes à suivre</h3>

        <label className="step-item">
  <input
    type="checkbox"
    checked={steps[0]}
    onChange={() => {
      const updated = [...steps];
      updated[0] = !updated[0];
      setSteps(updated);
    }}
  />
  <span>Préparer les documents</span>
</label>

<label className="step-item">
  <input
    type="checkbox"
    checked={steps[1]}
    onChange={() => {
      const updated = [...steps];
      updated[1] = !updated[1];
      setSteps(updated);
    }}
  />
  <span>Vérifier les informations</span>
</label>

<label className="step-item">
  <input
    type="checkbox"
    checked={steps[2]}
    onChange={() => {
      const updated = [...steps];
      updated[2] = !updated[2];
      setSteps(updated);
    }}
  />
  <span>Déposer le dossier</span>
</label>

<label className="step-item">
  <input
    type="checkbox"
    checked={steps[3]}
    onChange={() => {
      const updated = [...steps];
      updated[3] = !updated[3];
      setSteps(updated);
    }}
  />
  <span>Attendre la validation</span>
</label>
      </div>

      <div className="section-card advice-card">

        <h3>Conseil MoveEasy</h3>

        <p>
          Préparez tous vos documents
          avant de commencer la procédure.
          Cela réduit fortement les retards
          administratifs.
        </p>

      </div>

      <div className="actions">

        <a
          href={`https://${demarche.source}`}
          target="_blank"
          rel="noreferrer"
          className="official-btn"
        >
          Site officiel
        </a>

        <Link
          to="/mydocuments"
          className="documents-btn"
        >
          Mes documents
        </Link>

      </div>

    </div>

  </div>
);
}

export default DemarcheDetails;