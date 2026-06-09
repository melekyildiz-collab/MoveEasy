import { useState, useEffect } from "react";
import "./MyDocuments.css";

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
    <div className="documents-container">

      <h1>📁 Mes Documents</h1>

      <div className="form-document">

        <input
          type="text"
          placeholder="Nom du document"
          value={nom}
          onChange={(e) =>
            setNom(e.target.value)
          }
        />

        <input
          type="date"
          value={expiration}
          onChange={(e) =>
            setExpiration(e.target.value)
          }
        />

        <button
          onClick={ajouterDocument}
        >
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

              <p>
                Expire le :
                {" "}
                {doc.expiration}
              </p>

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
  );
}

export default MyDocuments;