"use client"
import { NextPage } from 'next'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import {api} from "../utils/api";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSession } from "next-auth/react";
import { stat } from 'fs'
import Router from 'next/router'


interface Template {
  id: string;
  name: string;
  image: string;
  demoLink: string;
}

const templates: Template[] = [
  {
    id: "1",
    name: "Šablona 1",
    image: "/a1-2.png?height=400&width=300",
    demoLink: "/demo-template1"
  },
  {
    id: "2",
    name: "Šablona 2",
    image: "/sablony_apollo_hlavicka-paticka-temy-new.png?height=400&width=300",
    demoLink: "/demo-template2"
  }
]

const  NovaStranka : NextPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [pageName, setPageName] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const {data: session, status} = useSession();
  const {mutateAsync, isPending} = api.stranka.poststranka.useMutation();
  const createUserOnWeb = api.userOnWeb.createRemoteUser.useMutation();

  const [loading, setLoading] = useState(false);
      


  const stripePromise = loadStripe('pk_test_51QOmAWR4bFMmnwDEesm4r9tkcS2xO6pAaCYDF1IZ4iSiwngme94AqgNZKA8oF6iDByuyBhqAtIUQVjas751TDDVS002DNrDSw6'); 


  const handleSubmitCreate = async () => {
    handleCheckout();
    createPage();

  };

  const handleCheckout = async () => {
    setLoading(true);
    const response = await fetch('../api/create-checkout-session', {
        method: 'POST',
    });
    const { id } = await response.json();
    const stripe = await import('@stripe/stripe-js');
    const stripeInstance = await stripe.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
    if (stripeInstance) {
        await stripeInstance.redirectToCheckout({ sessionId: id });
    }
    setLoading(false);
};

  if(loading){
    return <div>Loading...</div>
  }
  

  if (status === "loading") {
    return <div>Loading...</div>
  }
  if(status === "unauthenticated"){
    Router.push("/pleaseSignin")
    return <div>Not authenticated</div>

  }



  const handleNext = () => {
    if (currentSlide === 0 && pageName) {
      setCurrentSlide(1)
    }
  }

  const handlePrevious = () => {
    if (currentSlide === 1) {
      setCurrentSlide(0)
    }
  }

  const createPage = async () => {
    console.log("Creating page...");
    if (!pageName || !selectedTemplate) {
      alert("Prosím vyplňte všechny povinné údaje.");
      return;
    }
    if (!session?.user?.id) {
      alert("Nejste přihlášen.");
      return;
    }
    if(!session?.user?.name){
      alert("Nejste přihlášen.");
      return;
    }
    if(!session?.user?.email){
      alert("Nejste přihlášen.");
      return;
    }

    
    const response = await mutateAsync({
      name: pageName,
      userId: session?.user?.id as string,
      idtemplate: selectedTemplate as number,


      


    });
    try {
      const result = await createUserOnWeb.mutateAsync({ 
        name: session?.user?.name as string, 
        email: session?.user?.email as string 
      });
      alert(`Uživatel vytvořen, heslo: ${result.plainPassword}`);
    } catch (error) {
      alert('Chyba při vytváření uživatele');
      console.error(error);
    }

        

if(!response){
      alert("Stranka nebyla vytvorena")
    return;
}


  }

  

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-100 shadow-sm rounded-lg overflow-hidden mt-10">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-blue-600">Vytvořit novou stránku</h2>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmitCreate}>

          {currentSlide === 0 ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="page-name" className="block text-sm font-medium text-blue-600 mb-1">
                  Název stránky
                </label>
                <input 
                  id="page-name" 
                  type="text"
                  value={pageName} 
                  onChange={(e) => setPageName(e.target.value)} 
                  placeholder="Zadejte název stránky"
                  required
                  className="w-full px-3 py-2 border border-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-blue-600 mb-2">Vyberte šablonu</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <div key={template.id} className="relative">
                    <input 
                      type="radio"
                      id={template.id}
                      name="template"
                      value={template.id}
                      checked={selectedTemplate === Number(template.id)}
                      onChange={() => setSelectedTemplate(Number(template.id))}
                      className="sr-only peer"
                    />
                    <label 
                      htmlFor={template.id}
                      className="flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all peer-checked:border-blue-600"
                    >
                      <Image 
                        src={template.image} 
                        alt={template.name} 
                        width={300} 
                        height={200} 
                        className="mb-2 rounded"
                      />
                      <span className="text-blue-600">{template.name}</span>
                    </label>
                    <Link 
                      href={template.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <ExternalLink size={16} className="text-blue-600" />
                      <span className="sr-only">Otevřít ukázku</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
      </div>
      <div className="p-6 border-t border-gray-200 flex justify-between items-center">
        <div className="flex space-x-2">
          {[0, 1].map((slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => setCurrentSlide(slideIndex)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === slideIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Přejít na slide ${slideIndex + 1}`}
            />
          ))}
        </div>
        <div className="flex space-x-2">
          {currentSlide === 1 && (
            <button
              onClick={handlePrevious}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              <ChevronLeft className="inline-block mr-2 h-4 w-4" /> Zpět
            </button>
          )}
          {currentSlide === 0 ? (
            <button
              onClick={handleNext}
              disabled={!pageName}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Další <ChevronRight className="inline-block ml-2 h-4 w-4" />
            </button>
          ) : (
            
            <button
              type="submit"
              onClick={handleSubmitCreate}
              disabled={!selectedTemplate || !pageName}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Vytvořit stránku
            </button>
          )}
        </div>
      </div>
    </div>
  )
}


export default NovaStranka;