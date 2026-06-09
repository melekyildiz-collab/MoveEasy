import "./Aides.css";

function Aides() {
  const aides = [
    {
      nom: "APL",
      description:
        "Aide au logement pour les étudiants.",
      lien: "caf.fr",
    },

    {
      nom: "Bourse CROUS",
      description:
        "Aide financière pour les étudiants éligibles.",
      lien: "crous.fr",
    },

    {
      nom: "Prime d'activité",
      description:
        "Aide destinée aux étudiants en alternance ou salariés.",
      lien: "caf.fr",
    },

    {
      nom: "Aide Transport",
      description:
        "Réduction sur les abonnements de transport.",
      lien: "iledefrance-mobilites.fr",
    },
  ];

  return (
    <div className="aides-container">

      <h1>💰 Aides Financières</h1>

      {aides.map((aide, index) => (
        <div key={index} className="aide-card">

          <h3>{aide.nom}</h3>

          <p>{aide.description}</p>

          <p>
            Source officielle : {aide.lien}
          </p>

        </div>
      ))}

    </div>
  );
}

export default Aides;