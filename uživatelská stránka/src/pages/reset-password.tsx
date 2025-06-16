import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import * as yup from 'yup';

const Passwordreset : NextPage = () => {
    const router = useRouter();
    const { token } = router.query;
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const passwordValidate = yup.string()
/*     .min(8, "Heslo musí mít alespoň 8 znaků")
    .required("Heslo nesmí být prázdné")
    .max(20, "Heslo může mít maximálně 20 znaků")
    .matches(/[a-z]/, "Heslo musí obsahovat alespoň jedno malé písmeno")
    .matches(/[A-Z]/, "Heslo musí obsahovat alespoň jedno velké písmeno")
    .matches(/[0-9]/, "Heslo musí obsahovat alespoň jedno číslo") */




    const submit = () => {
      
        if(newPassword !== confirmPassword){
            setError("Hesla se neschodují");
            return;
        }
        passwordValidate.validate(newPassword).catch((err) => {
            setError(err.errors[0]);
            return;
        });
        setIsSubmitted(true);
        fetch(`/api/passwordreset?token=${token}&newpassword=${newPassword}`);
        router.push('../signup/prihlaseni');
    }

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
              <h1 className="text-2xl font-bold mb-4 text-blue-600 text-center">Změna hesla</h1>
              


              {!isSubmitted ? (
                <>
                  <p className="mb-4 text-gray-600 text-center">
                    Zadejte své nové heslo a potvrďte ho.
                  </p>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="newPassword" className="block mb-1 text-sm font-medium text-gray-700">
                        Nové heslo
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Zadejte nové heslo"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-700">
                        Potvrzení hesla
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Potvrďte nové heslo"
                      />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        onClick={() => submit()}
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                      Změnit heslo
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <p className="text-green-600 font-semibold mb-2">Heslo úspěšně změněno!</p>
                  <p className="text-gray-600">
                    Vaše heslo bylo úspěšně aktualizováno. Můžete se nyní přihlásit s novým heslem.
                  </p>
                </div>
              )}
            </div>
          </div>
        )
}

export default Passwordreset;