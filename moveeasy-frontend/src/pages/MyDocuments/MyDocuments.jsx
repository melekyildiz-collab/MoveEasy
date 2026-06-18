import { useState, useEffect } from "react";
import "./MyDocuments.css";
import Navbar from "../../components/Navbar/Navbar";

function MyDocuments() {
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem("documents");

    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            nom: "Passeport",
            expiration: "2028-09-15",
          },

          {
            id: 2,
            nom: "Titre de séjour",
            expiration: "2027-03-20",
          },
        ];
  });

  const [nom, setNom] = useState("");
  const [expiration, setExpiration] =
    useState("");

  useEffect(() => {
    localStorage.setItem(
      "documents",
      JSON.stringify(documents)
    );
  }, [documents]);

  const ajouterDocument = () => {
    if (!nom || !expiration) return;

    const nouveauDocument = {
      id: Date.now(),
      nom,
      expiration,
    };

    setDocuments([
      ...documents,
      nouveauDocument,
    ]);
const demarches =
  JSON.parse(
    localStorage.getItem("demarches")
  ) || [];
  const updatedDemarches =
  demarches.map((demarche) => ({
    ...demarche,

    documents: demarche.documents.map(
      (doc) =>
        doc.nom.toLowerCase() ===
        nom.toLowerCase()
          ? {
              ...doc,
              checked: true,
            }
          : doc
    ),
  }));
  localStorage.setItem(
  "demarches",
  JSON.stringify(updatedDemarches)
);
    setNom("");
    setExpiration("");
  };

  const supprimerDocument = (id) => {
    const updated = documents.filter(
      (doc) => doc.id !== id
    );

    setDocuments(updated);
  };

 return (
  <div className="dashboard-layout">
    
    <Navbar />

    <div className="dashboard-content">

      <div className="documents-container">

        <div className="documents-header">
          <h1>Mes Documents</h1>

          <p>
            Gérez et suivez tous vos documents administratifs.
          </p>
        </div>

        <div className="documents-stats">

          <div className="stat-card">
            <h3>Total</h3>
            <p>{documents.length}</p>
          </div>

          <div className="stat-card">
            <h3>Expirent bientôt</h3>

            <p>
              {
                documents.filter((doc) => {
                  const today = new Date();
                  const expiration = new Date(doc.expiration);

                  const diffDays = Math.ceil(
                    (expiration - today) /
                    (1000 * 60 * 60 * 24)
                  );

                  return diffDays <= 90;
                }).length
              }
            </p>

          </div>

        </div>

        <div className="form-document">

          <input
            type="text"
            placeholder="Nom du document"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />

          <input
            type="date"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
          />

          <button onClick={ajouterDocument}>
            Ajouter
          </button>

        </div>

        <div className="documents-list">

          {documents.map((doc) => (
            <div
              key={doc.id}
              className="document-card"
            >
              <div>

                <h3>{doc.nom}</h3>

                <span className="document-date">
                  Expire le : {doc.expiration}
                </span>

              </div>

              <button
                className="delete-btn"
                onClick={() =>
                  supprimerDocument(doc.id)
                }
              >
                🗑 Supprimer
              </button>

            </div>
          ))}

        </div>

      </div>

    </div>

  </div>
);
}

export default MyDocuments;