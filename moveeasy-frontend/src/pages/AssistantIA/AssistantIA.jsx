import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./AssistantIA.css";

const FAQ_DATA = [
  {
    id: "caf",
    question: "Quels documents pour la CAF ?",
    reponse: {
      documents: [
        "Contrat de location",
        "RIB",
        "Attestation de scolarité",
        "Pièce d'identité",
      ],
      source: { label: "caf.fr", url: "https://www.caf.fr" },
    },
  },
  {
    id: "titre-sejour",
    question: "Comment renouveler mon titre de séjour ?",
    reponse: {
      documents: [
        "Passeport",
        "Attestation de scolarité",
        "Justificatif de domicile",
        "Photo d'identité",
      ],
      source: { label: "service-public.fr", url: "https://www.service-public.fr" },
    },
  },
  {
    id: "ameli",
    question: "Documents pour Ameli",
    reponse: {
      documents: ["Passeport", "Attestation de scolarité", "RIB"],
      source: { label: "ameli.fr", url: "https://www.ameli.fr" },
    },
  },
  {
    id: "banque",
    question: "Quels documents pour ouvrir un compte bancaire ?",
    reponse: {
      documents: [
        "Passeport ou titre de séjour",
        "Justificatif de domicile",
        "Attestation de scolarité",
        "Photo d'identité (selon banque)",
      ],
      source: { label: "service-public.fr", url: "https://www.service-public.fr" },
    },
  },
  {
    id: "cvec",
    question: "Comment payer la CVEC ?",
    reponse: {
      documents: ["Numéro INE étudiant", "Carte bancaire"],
      source: { label: "cvec.etudiant.gouv.fr", url: "https://cvec.etudiant.gouv.fr" },
    },
  },
  {
    id: "navigo",
    question: "Comment obtenir la carte Navigo étudiant ?",
    reponse: {
      documents: [
        "Attestation de scolarité",
        "Photo d'identité récente",
      ],
      source: { label: "navigo.fr", url: "https://www.navigo.fr" },
    },
  },
];

function AssistantIA() {
  const [selectedId, setSelectedId] = useState(null);

  const selected = FAQ_DATA.find((item) => item.id === selectedId);

  return (
    <div className="dashboard-layout">
      <Navbar />

      <div className="ai-container">
        <div className="ai-header">
          <h1>Questions fréquentes</h1>
          <p>Trouvez rapidement les documents et infos pour vos démarches.</p>
        </div>

        <div className="faq-layout">
          <div className="faq-list">
            {FAQ_DATA.map((item) => (
              <button
                key={item.id}
                className={
                  "faq-item" + (selectedId === item.id ? " faq-item-active" : "")
                }
                onClick={() => setSelectedId(item.id)}
              >
                <span>{item.question}</span>
                <span className="faq-chevron">›</span>
              </button>
            ))}
          </div>

          <div className="faq-answer">
            {!selected && (
              <div className="faq-empty">
                <p>👈 Sélectionnez une question pour voir la réponse.</p>
              </div>
            )}

            {selected && (
              <div className="faq-answer-content">
                <h2>{selected.question}</h2>

                <p className="faq-answer-label">Documents recommandés :</p>
                <ul className="faq-doc-list">
                  {selected.reponse.documents.map((doc, i) => (
                    <li key={i}>
                      <span className="faq-check">✓</span> {doc}
                    </li>
                  ))}
                </ul>

                <p className="faq-source">
                  Source officielle :{" "}
                  <a
                    href={selected.reponse.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selected.reponse.source.label}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssistantIA;