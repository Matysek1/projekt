import { NextPage } from "next";
import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { getServerSideProps } from 'next/dist/build/templates/pages'
import Router from 'next/router'
import {api} from "../utils/api";
import NavBar from './componenty/navbar'
import { useEffect } from "react";
import { signOut } from 'next-auth/react';
import { Island_Moments } from "next/font/google";
import { stat } from "fs";

interface Update {
  e : React.ChangeEvent<HTMLInputElement>;
  section : string;
  field : string;
}





const Myaccount: NextPage = () => {
  const {data: session, status} = useSession();

    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false)
    const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false)
    const [isBillingInfoOpen, setIsBillingInfoOpen] = useState(false)
    
    const id = session?.user?.id;
    const { data: stranka, isLoading } =  api.stranka.getStranky.useQuery({id: id || ""});
    const {data: userinfo, isLoading: userloading} = api.user.getUserInfo.useQuery({ id: id || "" });

    const updateUser = api.user.updateUser.useMutation({
      onSuccess: () => {
        console.log('Data byla úspěšně aktualizována');
      },
      onError: (error) => {
        console.log('Chyba při aktualizaci:', error);
      }
    });


  const [userr, setUserData] = useState({
    name: '',
    email: '',
    isEmailVerified: false,
    billing: {
      company: '',
      street: '',
      city: '',
      postalCode: '',
      ic: '',
      phone: '',
      dic: '',
      country: '',
    },
  });

  useEffect(() => {
    if (userinfo?.[0]) {
      const { name, email, emailVerified, firma, phone, ico, dic, mesto, psc, ulice, state } = userinfo[0];  
      setUserData({
        name: name || "",
        email: email || "",
        isEmailVerified: emailVerified ? true : false,
        billing: {
          company: firma || "",
          street: ulice || "",
          city: mesto || "",
          postalCode: psc || "",
          phone: phone || "",
          ic: String(ico) || "",
          dic: dic || "",
          country: state || "",
        },
      });
    }
  }, [userinfo]);

  if (status === 'loading') {
    return <div>Loading...</div>
  }
  if(status === 'unauthenticated'){
    Router.push('/prihlaseni')
  }




  const ulozTo = () => {
    updateUser.mutate({
      email: userr.email,
      name: userr.name,
      id: id || "",
      firma: userr.billing.company,
      phone: userr.billing.phone || "",
      ico: String(userr.billing.ic),
      dic: userr.billing.dic,
      mesto: userr.billing.city,
      psc: userr.billing.postalCode,
      ulice: userr.billing.street,
      state: userr.billing.country
    });
  };







  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, section: string, field: string) => {
    const value = e.target.value;
    setUserData((prevState) => {
      if (section === "user") {
        return { ...prevState, [field]: value };
      } else if (section === "billing") {
        return {
          ...prevState,
          billing: { ...prevState.billing, [field]: value },
        };
      }
      return prevState;
    });
  };

  const handleSubmit = (e: React.FormEvent, section: string) => {
  }

  const handleVerifyEmail = () => {

    }

  const handleChangePassword = (e: React.FormEvent) => {
  }

  const CollapsibleSection = ({ title, isOpen, setIsOpen, children }: { title: string, isOpen: boolean, setIsOpen: (isOpen: boolean) => void, children: React.ReactNode }) => (
    <div className="border-t border-gray-200">
      <button
        className="flex justify-between items-center w-full px-4 py-5 sm:px-6 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
      </button>
      {isOpen && <div className="px-4 py-5 sm:p-6">{children}</div>}
    </div>
  )

  const InputField = ({ label, id, value, onChange }: { label: string, id: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div className="flex items-center">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 w-1/4">
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>
  )
  

  return (
    <div>
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-bold text-gray-900">Správa účtu</h1>
          <div className="flex justify-end">
              <button onClick={() => signOut()} type="submit" className="inline-flex items-center  px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none  focus:ring-blue-500">
                Odhlásit se
              </button>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Moje stránky</h2>
          {stranka && stranka.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {stranka?.map((entry) => (
                <li key={entry.id} className="py-4 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{entry.name}</span>
                  <button className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Administrace
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Zatím nemáte žádné stránky.</p>
          )}
        </div>

        <CollapsibleSection title="Osobní údaje" isOpen={isPersonalInfoOpen} setIsOpen={setIsPersonalInfoOpen}>
          <form onSubmit={(e) => handleSubmit(e, 'user')} className="space-y-4">
            <InputField
              label="Jméno"
              id="name"
              value={userr.name}
              onChange={(e) => handleChange(e, 'user', 'name')}
            />
            <InputField
              label="E-mail"
              id="email"
              value={userr.email}
              onChange={(e) => handleChange(e, 'user', 'email')}
            />
          </form>
          {(!userr.isEmailVerified ? (
              <div>
              <p className="text-sm text-red-500 pt-8">E-mailová adresa není ověřena.</p>
            <button
              onClick={handleVerifyEmail}
              className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Odeslat e-mail k ověření
            </button>
            </div>
            ):(
              <p className="text-sm text-gray-500 mt-9">E-mailová adresa byla ověřena.</p>
            )

          )}
            <div className="flex justify-end">
              <button onClick={() => updateUser} type="submit" className="inline-flex items-center mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Uložit údaje
              </button>
            </div>
        </CollapsibleSection>

        <CollapsibleSection title="Změna hesla" isOpen={isPasswordChangeOpen} setIsOpen={setIsPasswordChangeOpen}>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="flex items-center">
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 w-1/4">
                Nové heslo
              </label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 w-1/4">
                Potvrzení hesla
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Změnit heslo
              </button>
            </div>
          </form>
        </CollapsibleSection>

        <CollapsibleSection title="Fakturační údaje" isOpen={isBillingInfoOpen} setIsOpen={setIsBillingInfoOpen}>
          <form onSubmit={(e) => handleSubmit(e, 'billing')} className="space-y-4">
            
            <InputField
              label="Společnost"
              id="billing-company"
              value={userr.billing.company}
              onChange={(e) => handleChange(e, 'billing', 'company')}
            />
            
            <InputField
              label="Ulice"
              id="billing-street"
              value={userr.billing.street}
              onChange={(e) => handleChange(e, 'billing', 'street')}
            />
            <InputField
              label="Město"
              id="billing-city"
              value={userr.billing.city}
              onChange={(e) => handleChange(e, 'billing', 'city')}
            />
            <InputField
              label="PSČ"
              id="billing-postalCode"
              value={userr.billing.postalCode}
              onChange={(e) => handleChange(e, 'billing', 'postalCode')}
            />
            <InputField
              label="IČ"
              id="billing-ic"
              value={String(userr.billing.ic)}
              onChange={(e) => handleChange(e, 'billing', 'ic')}
            />
            <InputField
              label="DIČ"
              id="billing-dic"
              value={userr.billing.dic as string}
              onChange={(e) => handleChange(e, 'billing', 'dic')}
            />
            <div className="flex items-center">
              <label htmlFor="billing-country" className="block text-sm font-medium text-gray-700 w-1/4">
                Země
              </label>
              <select
                id="billing-country"
                value={userr.billing.country}
                onChange={(e) => handleChange(e, 'billing', 'country')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="Česká republika">Česká republika</option>
                <option value="Slovensko">Slovensko</option>
              </select>
            </div>
          </form>
          <div className="flex justify-end">
              <button onClick={() => ulozTo} type="submit" className="inline-flex items-center mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Uložit údaje
              </button>
          </div>
        </CollapsibleSection>
      </div>
    </div>
    </div>
  )
}

export default Myaccount