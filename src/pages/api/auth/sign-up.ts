import { prisma } from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password, fullName } = req.body;

    if (!email || !password || !fullName ) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'Ya existe un usuario con ese correo electrónico.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        fullName,
        email,
        password: hashedPassword,
        isActive: true,
      },
    });

    res.status(201).json({
      status: 201,
      message: "Account created successfully",
      result: user.email,
    });
  } else {
    res.status(405).json({ error: 'Método no permitido.' });
  }
}