// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding...');

  // Nettoyer dans l'ordre des dépendances
  await prisma.notification.deleteMany();
  await prisma.utilisateurEtape.deleteMany();
  await prisma.utilisateurDemarche.deleteMany();
  await prisma.documentUtilisateur.deleteMany();
  await prisma.utilisateurAide.deleteMany();
  await prisma.documentRequis.deleteMany();
  await prisma.etape.deleteMany();
  await prisma.demarche.deleteMany();
  await prisma.aide.deleteMany();

  // ── DÉMARCHES ──────────────────────────────────────────────
  const demarches = await Promise.all([
    prisma.demarche.create({ data: {
      nom: 'Validation du visa OFII',
      description: 'Valider votre visa long séjour auprès de l\'OFII dans les 3 mois suivant votre arrivée.',
      categorie: 'Séjour', dureeEstimeJours: 7,
      lienOfficiel: 'https://www.ofii.fr', obligatoire: true, ordre: 1,
      etapes: { create: [
        { titre: 'Créer un compte sur ofii.fr', ordre: 1, conseil: 'Utilisez l\'email de votre visa.' },
        { titre: 'Télécharger le formulaire cerfa n°11433', ordre: 2 },
        { titre: 'Envoyer le dossier ou RDV en préfecture', ordre: 3 },
        { titre: 'Passer la visite médicale', ordre: 4, conseil: 'Amenez passeport + visa.' },
      ]},
      documentsRequis: { create: [
        { nom: 'Passeport avec visa long séjour', obligatoire: true },
        { nom: 'Formulaire OFII cerfa n°11433', obligatoire: true },
      ]},
    }}),

    prisma.demarche.create({ data: {
      nom: 'Inscription Ameli (sécurité sociale)',
      description: 'Obtenir un numéro de sécurité sociale pour accéder aux soins remboursés.',
      categorie: 'Santé', dureeEstimeJours: 21,
      lienOfficiel: 'https://etudiant-etranger.ameli.fr', obligatoire: true, ordre: 2,
      etapes: { create: [
        { titre: 'Créer un compte sur ameli.fr', ordre: 1 },
        { titre: 'Remplir le formulaire S1106', ordre: 2 },
        { titre: 'Envoyer les justificatifs', ordre: 3, conseil: 'Traitement en 2 à 6 semaines.' },
        { titre: 'Recevoir votre numéro SS', ordre: 4 },
      ]},
      documentsRequis: { create: [
        { nom: 'Passeport ou titre de séjour', obligatoire: true },
        { nom: 'Justificatif de domicile', obligatoire: true },
        { nom: 'Certificat de scolarité', obligatoire: true },
      ]},
    }}),

    prisma.demarche.create({ data: {
      nom: 'Ouvrir un compte bancaire',
      description: 'Ouvrir un compte bancaire français pour recevoir aides et bourses.',
      categorie: 'Finances', dureeEstimeJours: 7,
      lienOfficiel: 'https://www.service-public.fr', obligatoire: true, ordre: 4,
      etapes: { create: [
        { titre: 'Choisir sa banque', ordre: 1, conseil: 'Hello Bank est souvent la plus accessible.' },
        { titre: 'Préparer les documents', ordre: 2, conseil: 'Certificat de scolarité sur votre ENT.' },
        { titre: 'Soumettre le dossier', ordre: 3 },
        { titre: 'Recevoir carte et RIB', ordre: 4, conseil: 'RIB indispensable pour la CAF.' },
      ]},
      documentsRequis: { create: [
        { nom: 'Passeport ou titre de séjour', obligatoire: true },
        { nom: 'Justificatif de domicile', obligatoire: true },
        { nom: 'Certificat de scolarité', obligatoire: true },
        { nom: 'Photo d\'identité', obligatoire: false },
      ]},
    }}),

    prisma.demarche.create({ data: {
      nom: 'Payer la CVEC',
      description: 'Cotisation Vie Étudiante de 103€, obligatoire pour l\'inscription universitaire.',
      categorie: 'Études', dureeEstimeJours: 1,
      lienOfficiel: 'https://cvec.etudiant.gouv.fr', obligatoire: true, ordre: 5,
      etapes: { create: [
        { titre: 'Aller sur cvec.etudiant.gouv.fr', ordre: 1 },
        { titre: 'Payer les 103€ par carte', ordre: 2, conseil: 'Gardez l\'attestation pour l\'inscription.' },
        { titre: 'Télécharger l\'attestation', ordre: 3 },
      ]},
    }}),

    prisma.demarche.create({ data: {
      nom: 'Demande CAF / APL',
      description: 'Aide au logement entre 100€ et 300€/mois. Rétroactive sur 2 mois.',
      categorie: 'Finances', dureeEstimeJours: 42,
      lienOfficiel: 'https://www.caf.fr', obligatoire: false, ordre: 7,
      etapes: { create: [
        { titre: 'Créer un compte CAF', ordre: 1 },
        { titre: 'Remplir la demande d\'APL', ordre: 2, conseil: 'Déposez dès que vous avez un RIB.' },
        { titre: 'Envoyer les justificatifs', ordre: 3 },
        { titre: 'Attendre la validation (4-6 semaines)', ordre: 4 },
      ]},
      documentsRequis: { create: [
        { nom: 'RIB (IBAN français)', obligatoire: true },
        { nom: 'Contrat de bail', obligatoire: true },
        { nom: 'Attestation assurance habitation', obligatoire: true },
        { nom: 'Titre de séjour valide', obligatoire: true },
      ]},
    }}),

    prisma.demarche.create({ data: {
      nom: 'Renouvellement du titre de séjour',
      description: 'À faire 2 mois avant expiration. Délais préfecture jusqu\'à 4 semaines.',
      categorie: 'Séjour', dureeEstimeJours: 30,
      lienOfficiel: 'https://www.service-public.fr', obligatoire: true, ordre: 9,
      etapes: { create: [
        { titre: 'Vérifier la date d\'expiration', ordre: 1, conseil: 'Agir 2 mois avant expiration.' },
        { titre: 'Prendre RDV en préfecture', ordre: 2 },
        { titre: 'Rassembler les documents', ordre: 3 },
        { titre: 'Déposer le dossier', ordre: 4, conseil: 'Le récépissé remis vaut titre provisoire.' },
        { titre: 'Récupérer le nouveau titre', ordre: 5 },
      ]},
      documentsRequis: { create: [
        { nom: 'Titre de séjour actuel', obligatoire: true },
        { nom: 'Passeport valide', obligatoire: true },
        { nom: 'Certificat de scolarité', obligatoire: true },
        { nom: 'Justificatif de domicile', obligatoire: true },
        { nom: '3 photos d\'identité', obligatoire: true },
      ]},
    }}),
  ]);

  // ── AIDES ───────────────────────────────────────────────────
  await prisma.aide.createMany({ data: [
    {
      nom: 'APL — Aide Personnalisée au Logement',
      description: 'Aide versée par la CAF. Rétroactive sur 2 mois si demandée rapidement.',
      montantMin: 100, montantMax: 300, periodicite: 'mensuel',
      lienOfficiel: 'https://www.caf.fr',
      conditions: 'Être locataire · Titre de séjour valide · IBAN français',
    },
    {
      nom: 'Tarif réduit Navigo Étudiant',
      description: 'Réduction ~50% sur le pass Navigo annuel en Île-de-France.',
      montantMin: null, montantMax: null, periodicite: 'annuel',
      lienOfficiel: 'https://www.navigo.fr',
      conditions: 'Moins de 26 ans OU boursier · Certificat de scolarité',
    },
    {
      nom: 'CSS — Complémentaire Santé Solidaire',
      description: 'Mutuelle gratuite ou quasi-gratuite pour revenus modestes.',
      montantMin: 0, montantMax: 1, periodicite: 'mensuel',
      lienOfficiel: 'https://www.ameli.fr',
      conditions: 'Revenus < 9 600€/an · En France depuis +3 mois · Numéro SS',
    },
    {
      nom: 'Bourse sur critères sociaux (CROUS)',
      description: 'Bourse mensuelle selon revenus familiaux et niveau d\'études.',
      montantMin: 100, montantMax: 700, periodicite: 'mensuel',
      lienOfficiel: 'https://www.etudiant.gouv.fr',
      conditions: 'Inscrit dans l\'enseignement supérieur · Ressources plafonnées',
    },
    {
      nom: 'Aide d\'urgence CROUS',
      description: 'Aide ponctuelle en cas de difficulté financière imprévue.',
      montantMin: 50, montantMax: 500, periodicite: 'unique',
      lienOfficiel: 'https://www.etudiant.gouv.fr',
      conditions: 'Étudiant inscrit · Situation d\'urgence justifiée',
    },
    {
      nom: 'ALS — Allocation de Logement Sociale',
      description: 'Alternative à l\'APL pour les logements non conventionnés.',
      montantMin: 80, montantMax: 250, periodicite: 'mensuel',
      lienOfficiel: 'https://www.caf.fr',
      conditions: 'Locataire · Logement non conventionné · Titre de séjour',
    },
  ]});

  console.log('✅ Seed terminé !');
  console.log(`   ${demarches.length} démarches créées`);
  console.log('   6 aides créées');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());