import { useState } from "react";
import api from "../../api/axios";
import Select from "react-select";
import { PhoneInput } from "react-international-phone";
import videoComplete from "../../assets/videoComplete.mp4";
import "react-international-phone/style.css";
import "./CompleteProfile.css";

const nationalites = [
  { value: "cm", label: "Camerounaise" },
  { value: "fr", label: "Marocaine" },
  { value: "ng", label: "Nigériane" },
  { value: "dz", label: "Algérienne" },
  { value: "tk", label: "Turque" },
  { value: "be", label: "Béninoise" },
  { value: "sn", label: "Sénégalaise" },
  { value: "ci", label: "Ivoirienne" },
];

const villes = [
  { value: "paris", label: "Paris" },
  { value: "lyon", label: "Lyon" },
  { value: "marseille", label: "Marseille" },
  { value: "toulouse", label: "Toulouse" },
  { value: "bordeaux", label: "Bordeaux" },
  { value: "lille", label: "Lille" },
  { value: "strasbourg", label: "Strasbourg" },
  { value: "nantes", label: "Nantes" },
  { value: "montpellier", label: "Montpellier" },
  { value: "rennes", label: "Rennes" },
  { value: "nice", label: "Nice" },
  { value: "grenoble", label: "Grenoble" },
  { value: "clermont-ferrand", label: "Clermont-Ferrand" },
  { value: "dijon", label: "Dijon" },
  { value: "reims", label: "Reims" },
  { value: "angers", label: "Angers" },
  { value: "tours", label: "Tours" },
  { value: "orleans", label: "Orléans" },
  { value: "amiens", label: "Amiens" },
  { value: "metz", label: "Metz" },
];

const statuts = [
  { value: "etudiant", label: "Étudiant" },
  { value: "boursier", label: "Boursier" },
  { value: "alternant", label: "Alternant" },
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
          <h2>🎉 Profil complété avec succès</h2>
          <p>Votre parcours personnalisé est prêt.</p>

          {/* VIDEO */}
          <div className="success-video-container">
            <video
              controls
              autoPlay
              muted
              playsInline
              className="success-video"
            >
              <source src={videoComplete} type="video/mp4" />
              Votre navigateur ne supporte pas la vidéo.
            </video>
          </div>

          {/* BUTTON DASHBOARD */}
          <a href="/dashboard" className="success-btn">
            Accéder au dashboard
          </a>
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
            <div className="field">
              <label>Nationalité</label>
              <Select
                options={nationalites}
                placeholder="Sélectionnez votre nationalité"
                onChange={setNationalite}
              />
            </div>

            <div className="field">
              <label>Date de naissance</label>
              <input
                type="date"
                value={dateNaissance}
                onChange={(e) => setDateNaissance(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Téléphone</label>
              <PhoneInput
                defaultCountry="fr"
                value={phone}
                onChange={setPhone}
              />
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="step">
            <div className="field">
              <label>Statut</label>
              <Select
                options={statuts}
                placeholder="Sélectionnez votre statut"
                onChange={setStatus}
              />
            </div>

            <div className="field">
              <label>Ville</label>
              <Select
                options={villes}
                placeholder="Sélectionnez votre ville"
                onChange={setVille}
              />
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="step">
            <div className="field">
              <label>Université / École</label>
              <input placeholder="Ex: Université de Paris" />
            </div>
          </div>
        )}
        {/* STEP 4 */}
        {step === 4 && (
          <div className="step">
            <p>Dernière vérification avant génération du parcours</p>
            <small>Vérifiez vos informations avant validation.</small>
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
              Générer mon parcours
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompleteProfile;
