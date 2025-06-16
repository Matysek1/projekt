import { useRouter } from 'next/router';
import {  useState } from 'react';
import { NextPage } from 'next';

const VerifyEmailPage : NextPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState<string>('');

    const verifyToken = async () => {
      try {
        console.log("došel")
        const response = await fetch(`/api/verify?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setMessage('Email byl úspěšně ověřen.');
            setTimeout(() => {
              router.push('/');
            }, 2000);

        } else {
          setMessage(data.message || 'Verifikace selhala');
        }
      } catch (error) {
        setMessage('Mas problem zmrde.');
      }
    };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">Ověření emailu</h1>
        <p className="mb-6 text-gray-600">
          Klikněte na tlačítko níže pro ověření vaší emailové adresy
        </p>
        <button
          onClick={()=> verifyToken()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Ověřit
        </button>
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;