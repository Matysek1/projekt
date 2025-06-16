
import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";

const ZapomenuteHeslo : NextPage = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const router = useRouter();

    const submit = () => {
        if(email === ""){
            alert("Email nesmí být prázdný");
            return;
        }
        setIsSubmitted(true);
        console.log("došel");
        setTimeout(() => {
            router.push('prihlaseni');
        }, 2000);
         fetch('../api/email-verification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'passwordreset',
              email: email,
              subject: 'Změna hesla',
            }),
          })

    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-blue-600 text-center">Obnovení hesla</h1>
        
        {!isSubmitted ? (
          <>
            <p className="mb-4 text-gray-600 text-center">
              Zadejte svůj email a my vám zašleme instrukce k obnovení hesla.
            </p>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="vas@email.cz"
                />
              </div>
              <button
              onClick={() => submit()}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Odeslat instrukce
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-semibold mb-2">Email odeslán!</p>
            <p className="text-gray-600">
              Pokyny k obnovení hesla byly odeslány na váš email. Zkontrolujte prosím svou emailovou schránku a postupujte podle instrukcí.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ZapomenuteHeslo;