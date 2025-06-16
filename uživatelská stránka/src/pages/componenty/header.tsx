import React, { useState } from 'react';
import Link from 'next/link';
import {api} from "../../utils/api";
import * as yup from 'yup';


const Footer: React.FC = () => {

  const [email, setEmail] = useState('');
  const {mutateAsync, } = api.user.updateUserNewsletter.useMutation();


    const emailValidate = yup.string()
    .email("Email musí být ve správném formátu")
    .required("Email nesmí být prázdný")

  const novyNewsletter = async () => {
    const response = await mutateAsync({
      email: email,


  });
if(!response){
      alert("Stranka nebyla vytvorena")
    return;
}


  }

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if(!emailValidate.isValidSync(email)){
      return
    }
    e.preventDefault();
    novyNewsletter();
    console.log('Přihlášeno k newsletteru:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-500 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Navigace</h3>
            <ul className="space-y-2">
              {['Domů', 'O nás', 'Služby', 'Kontakt'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Domů' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className="hover:text-blue-400 transition duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <p>Email: ahoj@webyhned.cz</p>
            <p>Telefon: +420 123 456 789</p>
            <p>Adresa: Hlavní 123, 110 00 Praha 1</p>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Přihlaste se k odběru novinek</h3>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Váš e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 text-white px-4 py-2 rounded-md sm:rounded-r-none mb-2 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md sm:rounded-l-none hover:bg-blue-700 transition duration-300"
              >
                Přihlásit se
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2025 WebyHned.cz. | Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;