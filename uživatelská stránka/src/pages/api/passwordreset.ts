import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../server/db';
import bcrypt from "bcrypt"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const tokenver  = req.query.token;
  const password = req.query.newpassword as string;
  const seed = await bcrypt.genSalt(10);
  const hasedpassword = await bcrypt.hash(password, seed);
    


  try {
    const user = await db.verificationToken.findFirst({
      where: { token: tokenver as string, type: 'passwordreset' },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    await db.user.update({
      where: { id: user.userId },
      data: { password: hasedpassword },
    });


    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
