-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('etudiant', 'alternant', 'boursier');

-- CreateEnum
CREATE TYPE "DocStatus" AS ENUM ('valide', 'expire', 'manquant');

-- CreateEnum
CREATE TYPE "DemarcheStatus" AS ENUM ('todo', 'enCours', 'done');

-- CreateEnum
CREATE TYPE "EtapeStatus" AS ENUM ('todo', 'done');

-- CreateEnum
CREATE TYPE "AideStatus" AS ENUM ('eligible', 'demandee', 'obtenue', 'refusee');

-- CreateEnum
CREATE TYPE "NotifType" AS ENUM ('info', 'rappel', 'alerte');

-- CreateTable
CREATE TABLE "utilisateurs" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "nom" TEXT,
    "prenom" TEXT,
    "date_naissance" TIMESTAMP(3),
    "nationalite" TEXT,
    "date_arrivee" TIMESTAMP(3),
    "ville" TEXT,
    "niveau_etudes" TEXT,
    "est_complet" BOOLEAN NOT NULL DEFAULT false,
    "status" "UserStatus" NOT NULL DEFAULT 'etudiant',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "utilisateurs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "demarches" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "categorie" TEXT,
    "duree_estime_jours" INTEGER,
    "lien_officiel" TEXT,
    "obligatoire" BOOLEAN NOT NULL DEFAULT true,
    "ordre" INTEGER,
    "priorite" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "demarches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "etapes" (
    "id" SERIAL NOT NULL,
    "demarche_id" INTEGER NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "conseil" TEXT,
    "ordre" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "etapes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents_requis" (
    "id" SERIAL NOT NULL,
    "demarche_id" INTEGER NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "obligatoire" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "documents_requis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents_utilisateur" (
    "id" SERIAL NOT NULL,
    "utilisateur_id" INTEGER NOT NULL,
    "document_requis_id" INTEGER,
    "nom_document" TEXT NOT NULL,
    "date_expiration" TIMESTAMP(3),
    "statut" "DocStatus" NOT NULL DEFAULT 'valide',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documents_utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "utilisateur_demarches" (
    "id" SERIAL NOT NULL,
    "utilisateur_id" INTEGER NOT NULL,
    "demarche_id" INTEGER NOT NULL,
    "statut" "DemarcheStatus" NOT NULL DEFAULT 'todo',
    "etape_actuelle" INTEGER NOT NULL DEFAULT 1,
    "date_debut" TIMESTAMP(3),
    "date_fin" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "utilisateur_demarches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "utilisateur_etapes" (
    "id" SERIAL NOT NULL,
    "utilisateur_demarche_id" INTEGER NOT NULL,
    "etape_id" INTEGER NOT NULL,
    "statut" "EtapeStatus" NOT NULL DEFAULT 'todo',
    "date_fait" TIMESTAMP(3),

    CONSTRAINT "utilisateur_etapes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aides" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "montant_min" DECIMAL(65,30),
    "montant_max" DECIMAL(65,30),
    "periodicite" TEXT,
    "lien_officiel" TEXT,
    "conditions" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "utilisateur_aides" (
    "id" SERIAL NOT NULL,
    "utilisateur_id" INTEGER NOT NULL,
    "aide_id" INTEGER NOT NULL,
    "statut" "AideStatus" NOT NULL DEFAULT 'eligible',
    "date_demande" TIMESTAMP(3),
    "montant_obtenu" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "utilisateur_aides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "utilisateur_id" INTEGER NOT NULL,
    "demarche_id" INTEGER,
    "document_utilisateur_id" INTEGER,
    "type" "NotifType" NOT NULL DEFAULT 'info',
    "title" TEXT,
    "message" TEXT NOT NULL,
    "est_lu" BOOLEAN NOT NULL DEFAULT false,
    "date_echeance" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "utilisateurs_email_key" ON "utilisateurs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "utilisateur_demarches_utilisateur_id_demarche_id_key" ON "utilisateur_demarches"("utilisateur_id", "demarche_id");

-- CreateIndex
CREATE UNIQUE INDEX "utilisateur_etapes_utilisateur_demarche_id_etape_id_key" ON "utilisateur_etapes"("utilisateur_demarche_id", "etape_id");

-- CreateIndex
CREATE UNIQUE INDEX "utilisateur_aides_utilisateur_id_aide_id_key" ON "utilisateur_aides"("utilisateur_id", "aide_id");

-- AddForeignKey
ALTER TABLE "etapes" ADD CONSTRAINT "etapes_demarche_id_fkey" FOREIGN KEY ("demarche_id") REFERENCES "demarches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents_requis" ADD CONSTRAINT "documents_requis_demarche_id_fkey" FOREIGN KEY ("demarche_id") REFERENCES "demarches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents_utilisateur" ADD CONSTRAINT "documents_utilisateur_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "utilisateurs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents_utilisateur" ADD CONSTRAINT "documents_utilisateur_document_requis_id_fkey" FOREIGN KEY ("document_requis_id") REFERENCES "documents_requis"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "utilisateur_demarches" ADD CONSTRAINT "utilisateur_demarches_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "utilisateurs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "utilisateur_demarches" ADD CONSTRAINT "utilisateur_demarches_demarche_id_fkey" FOREIGN KEY ("demarche_id") REFERENCES "demarches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "utilisateur_etapes" ADD CONSTRAINT "utilisateur_etapes_utilisateur_demarche_id_fkey" FOREIGN KEY ("utilisateur_demarche_id") REFERENCES "utilisateur_demarches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "utilisateur_etapes" ADD CONSTRAINT "utilisateur_etapes_etape_id_fkey" FOREIGN KEY ("etape_id") REFERENCES "etapes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "utilisateur_aides" ADD CONSTRAINT "utilisateur_aides_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "utilisateurs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "utilisateur_aides" ADD CONSTRAINT "utilisateur_aides_aide_id_fkey" FOREIGN KEY ("aide_id") REFERENCES "aides"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "utilisateurs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_demarche_id_fkey" FOREIGN KEY ("demarche_id") REFERENCES "demarches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_document_utilisateur_id_fkey" FOREIGN KEY ("document_utilisateur_id") REFERENCES "documents_utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;
