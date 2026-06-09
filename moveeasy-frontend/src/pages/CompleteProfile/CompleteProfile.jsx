import { useState } from 'react'
import Select from 'react-select'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'


const nationalites = [
  { value: 'cm', label: 'Camerounaise' },
  { value: 'fr', label: 'Française' },
  { value: 'be', label: 'Belge' },
  { value: 'ca', label: 'Canadienne' },
  { value: 'us', label: 'Américaine' },
  { value: 'gb', label: 'Britannique' },
  { value: 'it', label: 'Italienne' },
  { value: 'es', label: 'Espagnole' },
  { value: 'pt', label: 'Portugaise' },
  { value: 'ma', label: 'Marocaine' },
  { value: 'dz', label: 'Algérienne' },
  { value: 'tn', label: 'Tunisienne' },
  { value: 'sn', label: 'Sénégalaise' },
  { value: 'other', label: 'Autre' },
]

const villes = [
  { value: 'paris', label: 'Paris' },
  { value: 'lyon', label: 'Lyon' },
  { value: 'marseille', label: 'Marseille' },
  { value: 'toulouse', label: 'Toulouse' },
  { value: 'bordeaux', label: 'Bordeaux' },
  { value: 'lille', label: 'Lille' },
  { value: 'other', label: 'Autre' },
]

const statuts = [
  { value: 'etudiant', label: 'Étudiant' },
  { value: 'boursier', label: 'Boursier' },
  { value: 'alternant', label: 'Alternant' },
  { value: 'other', label: 'Autre' },
]

const niveaux = [
  { value: 'l1', label: 'Licence 1' },
  { value: 'l2', label: 'Licence 2' },
  { value: 'l3', label: 'Licence 3' },
  { value: 'm1', label: 'Master 1' },
  { value: 'm2', label: 'Master 2' },
  { value: 'doc', label: 'Doctorat' },
]

const selectStyles = {
  control: (base) => ({
    ...base,
    borderColor: '#e5e7eb',
    borderRadius: '0.5rem',
    padding: '2px 4px',
    fontSize: '0.875rem',
    boxShadow: 'none',
    '&:hover': { borderColor: '#3b82f6' },
  }),
  option: (base, { isFocused }) => ({
    ...base,
    fontSize: '0.875rem',
    backgroundColor: isFocused ? '#eff6ff' : 'white',
    color: '#374151',
  }),
}

function Toggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-colors duration-200 ${enabled ? 'bg-blue-600' : 'bg-gray-200'}`}
    >
      <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 mx-0.5 ${enabled ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  )
}

function CompleteProfile() {
  const [step, setStep] = useState(1)
  const [success, setSuccess] = useState(false)
  const [emailRappel, setEmailRappel] = useState(true)
  const [smsRappel, setSmsRappel] = useState(true)
  const totalSteps = 4

  const next = () => setStep(s => Math.min(s + 1, totalSteps))
  const prev = () => setStep(s => Math.max(s - 1, 1))

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-36 bg-blue-100 rounded-xl flex items-center justify-center">
                <div className="text-6xl">📋</div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-lg">✓</div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-2">Parcours généré avec succès !</h2>
          <p className="text-gray-400 text-sm mb-6">Votre parcours personnalisé a été créé en fonction de vos informations.</p>

          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-3">
            {['8 démarches identifiées', 'Documents requis listés', 'Rappels configurés'].map(item => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span className="text-sm font-medium text-gray-700">{item}</span>
              </div>
            ))}
          </div>

          <a href="/dashboard" className="block w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition">
            Accéder à mon dashboard
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">

        <h2 className="text-xl font-bold text-gray-800 mb-1">Complétez votre profil</h2>
        <p className="text-gray-400 text-sm mb-4">Étape {step} sur {totalSteps}</p>

        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-8">
          <div
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Étape 1 */}
        {step === 1 && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Informations personnelles</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nationalité</label>
              <Select options={nationalites} placeholder="Sélectionnez votre nationalité" styles={selectStyles} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
              <input type="date" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition text-gray-500" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <PhoneInput
                    defaultCountry="fr"
                    style={{
                        width: '100%',
                        fontSize: '0.875rem',
                    }}
                    />
                </div>
            </div>
         
        )}

        {/* Étape 2 */}
        {step === 2 && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Informations académiques</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <Select options={statuts} placeholder="Sélectionnez votre statut" styles={selectStyles} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Université / École</label>
              <input type="text" placeholder="Nom de votre université ou école" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ville d'étude</label>
              <Select options={villes} placeholder="Sélectionnez votre ville" styles={selectStyles} />
            </div>
          </div>
        )}

        {/* Étape 3 */}
        {step === 3 && (
          
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Type de visa / titre de séjour</label>
              <Select
                options={[
                  { value: 'visa_etudiant', label: 'Visa étudiant' },
                  { value: 'visa_long', label: 'Visa long séjour' },
                  { value: 'other', label: 'Autre' },
                ]}
                placeholder="Sélectionnez votre titre"
                styles={selectStyles}
              />
            </div>
            
        )}  

        {/* Étape 4 */}
        {step === 4 && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-6">Préférences et notifications</h3>
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm text-gray-700">Recevoir des rappels par email ?</span>
              <Toggle enabled={emailRappel} onToggle={() => setEmailRappel(!emailRappel)} />
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-gray-700">Recevoir des rappels par SMS ?</span>
              <Toggle enabled={smsRappel} onToggle={() => setSmsRappel(!smsRappel)} />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Langue de l'application</label>
              <Select
                options={[
                  { value: 'fr', label: 'Français' },
                  { value: 'en', label: 'English' },
                  { value: 'ar', label: 'العربية' },
                ]}
                defaultValue={{ value: 'fr', label: 'Français' }}
                styles={selectStyles}
              />
            </div>
            <div className="bg-blue-50 rounded-xl p-4 flex gap-3">
              <span className="text-blue-400 text-lg mt-0.5">ℹ️</span>
              <p className="text-sm text-gray-500">Ces informations nous permettent de générer un parcours personnalisé adapté à votre situation.</p>
            </div>
          </div>
        )}

        {/* Boutons */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <button onClick={prev} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition">
              Précédent
            </button>
          )}
          {step < totalSteps ? (
            <button onClick={next} className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition">
              Suivant
            </button>
          ) : (
            <button onClick={() => setSuccess(true)} className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition">
              Générer mon parcours
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

export default CompleteProfile