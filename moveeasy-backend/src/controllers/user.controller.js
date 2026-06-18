import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        nom: true,
        prenom: true,
        nationalite: true,
        ville: true,
        status: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const {
      email,
      nom,
      prenom,
      password,
      nationalite,
      ville,
      dateNaissance,
      status,
      niveauEtudes,
      estComplet,
    } = req.body;

    let hashedPassword;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        email,
        nom,
        prenom,
        nationalite,
        ville,
        dateNaissance: dateNaissance ? new Date(dateNaissance) : null,
        status,
        niveauEtudes,
        estComplet: estComplet ?? true,
        ...(hashedPassword && { passwordHash: hashedPassword }),
      },
    });

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default {
  getMe,
  updateProfile,
};