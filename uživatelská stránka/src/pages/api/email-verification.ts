import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';
import  sendEmail  from '../../server/mail';
import crypto from 'crypto';

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    const token = crypto.randomBytes(32).toString('hex');

  if (req.method === 'POST') {
    const { email } = req.body;
    const user = await db.user.findUnique({ where: { email } });
    const id = user?.id;

    console.log("id je", id);

      if (id !== undefined) {
        if(req.body.type == "emailverification"){
        await db.verificationToken.create({
          data: {
              token,
              type: req.body.type,
              userId: id,
              expires: new Date(Date.now() + 60 * 60 * 1000),
              used: false,
          },
        });
        }
        if(req.body.type == "passwordreset"){
          await db.verificationToken.create({
            data: {
                token,
                type: req.body.type,
                userId: id,
                expires: new Date(Date.now() + 60 * 60 * 1000),
                used: false,
            },
          });
          }
      } else {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
      

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    if(req.body.type === "emailverification"){
        const verificationUrlemail = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;
    await sendEmail({
      to: email,
      subject: req.body.subject, 
      text: `Pro ověření účtu klikněte na následující odkaz: ${verificationUrlemail}`,
    });
    }
    if(req.body.type === "passwordreset"){
        const verificationUrlpass = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
      await sendEmail({
        to: email,
        subject: req.body.subject, 
        text: `Pro resetovní hesla klikněte na následující odkaz: ${verificationUrlpass}`,
      });
      }

    res.status(200).json({ message: 'Email sent' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
