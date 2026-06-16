import "./Aides.css";
import { useNavigate } from "react-router-dom";

function Aides() {
  const navigate = useNavigate();
  const documents =
  JSON.parse(
    localStorage.getItem("documents")
  ) || [];

  const aides = [
  {
    nom: "APL",
    description:
      "Aide au logement pour les étudiants.",
    lien: "caf.fr",
    demarcheId: 1,
    documentsRequis: [
      "RIB",
      "Contrat de location",
    ],
  },

  {
    nom: "Bourse CROUS",
    description:
      "Aide financière pour les étudiants éligibles.",
    lien: "crous.fr",
    documentsRequis: [
      "Attestation de scolarité",
    ],
  },

  {
    nom: "Prime d'activité",
    description:
      "Aide destinée aux étudiants en alternance ou salariés.",
    lien: "caf.fr",
    documentsRequis: [
      "RIB",
    ],
  },

  {
    nom: "Aide Transport",
    description:
      "Réduction sur les abonnements de transport.",
    lien: "iledefrance-mobilites.fr",
    documentsRequis: [
      "Titre de séjour",
    ],
  },
];

return (
  <div className="aides-container">

    <div className="aides-header">

      <h1>Aides Financières</h1>

      <p>
        Découvrez les aides disponibles pour les étudiants internationaux.
      </p>

    </div>

    <div className="aides-stats">

      <div className="stat-card">
        <h3>Aides disponibles</h3>
        <p>{aides.length}</p>
      </div>

      <div className="stat-card">
        <h3>À vérifier</h3>
        <p>{aides.length}</p>
      </div>

    </div>

    <div className="aides-grid">

      {aides.map((aide, index) => (

        <div
          key={index}
          className="aide-card"
        >

          <div className="aide-top">

            <h3>{aide.nom}</h3>

            <span className="status-aide">

  {aide.documentsRequis.every(
    (requiredDoc) =>
      documents.some(
        (doc) =>
          doc.nom.toLowerCase() ===
          requiredDoc.toLowerCase()
      )
  )
    ? "✅ Prêt"
    : "⏳ Incomplet"}

</span>
          </div>

          <p className="aide-description">
            {aide.description}
          </p>
{
  !aide.documentsRequis.every(
    (requiredDoc) =>
      documents.some(
        (doc) =>
          doc.nom.toLowerCase() ===
          requiredDoc.toLowerCase()
      )
  ) && (

    <div className="missing-docs-aide">

      <p>
        Documents manquants :
      </p>

      {aide.documentsRequis
        .filter(
          (requiredDoc) =>
            !documents.some(
              (doc) =>
                doc.nom.toLowerCase() ===
                requiredDoc.toLowerCase()
            )
        )
        .map((doc, index) => (

          <span key={index}>
            • {doc}
          </span>

        ))}

    </div>

  )
}
          <button
  className="aide-btn"
  onClick={() => {
    if (aide.demarcheId) {
      navigate(
        `/demarche/${aide.demarcheId}`
      );
    } else {
      window.open(
        `https://${aide.lien}`,
        "_blank"
      );
    }
  }}
>
  Commencer →
</button>
        </div>

      ))}

    </div>

  </div>
);
}

export default Aides;