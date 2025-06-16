import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../server/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('verify.ts');
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { tokenver } = req.query;


  try {
    const user = await db.verificationToken.findFirst({
      where: { token: tokenver as string, type: 'emailverification' },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    await db.user.update({
      where: { id: user.userId },
      data: { emailVerified: true },
    });


    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
