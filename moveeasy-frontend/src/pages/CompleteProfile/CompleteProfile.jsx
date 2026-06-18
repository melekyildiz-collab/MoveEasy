import { useState } from "react";
import api from "../../api/axios";
import Select from "react-select";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "./CompleteProfile.css";

const nationalites = [
  { value: "cm", label: "Camerounaise" },
  { value: "fr", label: "Française" },
  { value: "be", label: "Belge" },
];

const villes = [
  { value: "paris", label: "Paris" },
  { value: "lyon", label: "Lyon" },
];

const statuts = [
  { value: "etudiant", label: "Étudiant" },
  { value: "boursier", label: "Boursier" },
];

function CompleteProfile() {
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  const [nationalite, setNationalite] = useState(null);
  const [dateNaissance, setDateNaissance] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(null);
  const [ville, setVille] = useState(null);

  const totalSteps = 4;

  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    try {
      await api.put("/users/update-profile", {
        nationalite: nationalite?.value,
        ville: ville?.value,
        status: status?.value,
        dateNaissance,
        phone,
        estComplet: true,
      });

      setSuccess(true);
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Erreur update profile");
    }
  };

  if (success) {
    return (
      <div className="profile-success">
        <div className="profile-success-card">
          <h2>🎉 Félicitations !</h2>
          <p>Votre profil a été complété avec succès.</p>
          <a href="/dashboard">Accéder au tableau de bord</a>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Complétez votre profil</h2>
        <p>
          Étape {step} / {totalSteps}
        </p>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="step">
            <Select
              options={nationalites}
              placeholder="Nationalité"
              onChange={setNationalite}
            />

            <input
              type="date"
              onChange={(e) => setDateNaissance(e.target.value)}
            />

            <PhoneInput defaultCountry="fr" value={phone} onChange={setPhone} />
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="step">
            <Select
              options={statuts}
              placeholder="Statut"
              onChange={setStatus}
            />

            <Select options={villes} placeholder="Ville" onChange={setVille} />
          </div>
        )}

        {/* BUTTONS */}
        <div className="buttons">
          {step > 1 && (
            <button onClick={prev} className="btn secondary">
              Retour
            </button>
          )}

          {step < totalSteps ? (
            <button onClick={next} className="btn primary">
              Suivant
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn success">
              Enregistrer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompleteProfile;
