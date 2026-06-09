import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./AssistantIA.css";

function AssistantIA() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Bonjour 👋 Je suis l'Assistant IA MoveEasy. Comment puis-je vous aider ?",
    },
  ]);

  const handleSend = () => {
    if (!question.trim()) return;

    let response =
      "Je n'ai pas encore cette information.";

    if (
      question
        .toLowerCase()
        .includes("caf")
    ) {
      response = `
Documents recommandés :

✓ Contrat de location
✓ RIB
✓ Attestation de scolarité
✓ Pièce d'identité

Source officielle :
caf.fr
      `;
    }

    if (
      question
        .toLowerCase()
        .includes("titre")
    ) {
      response = `
Documents recommandés :

✓ Passeport
✓ Attestation de scolarité
✓ Justificatif de domicile
✓ Photo d'identité

Source officielle :
service-public.fr
      `;
    }

    if (
      question
        .toLowerCase()
        .includes("ameli")
    ) {
      response = `
Documents recommandés :

✓ Passeport
✓ Attestation de scolarité
✓ RIB

Source officielle :
ameli.fr
      `;
    }

    setMessages([
      ...messages,
      {
        type: "user",
        text: question,
      },
      {
        type: "ai",
        text: response,
      },
    ]);

    setQuestion("");
  };

  return (
    <div className="dashboard-layout">

      <Navbar />

      <div className="ai-container">

        <h1>
          🤖 Assistant IA MoveEasy
        </h1>

        <p className="subtitle">
          Posez vos questions sur les démarches administratives.
        </p>

        <div className="chat-box">

          {messages.map(
            (message, index) => (
              <div
                key={index}
                className={
                  message.type ===
                  "user"
                    ? "user-message"
                    : "ai-message"
                }
              >
                {message.text}
              </div>
            )
          )}

        </div>

        <div className="input-area">

          <input
            type="text"
            placeholder="Posez votre question..."
            value={question}
            onChange={(e) =>
              setQuestion(
                e.target.value
              )
            }
          />

          <button
            onClick={handleSend}
          >
            Envoyer
          </button>

        </div>

      </div>

    </div>
  );
}

export default AssistantIA;