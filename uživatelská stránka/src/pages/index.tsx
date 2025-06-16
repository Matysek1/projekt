import Link from "next/link";
import { NextPage } from "next";

import NavBar from './componenty/navbar'
import { Card } from "./componenty/card";
import AdvantageItem from "./componenty/advantageItem";
import TemplateCard  from "./componenty/tamplates";
import { useSession } from "next-auth/react";
import Footer from "./componenty/header";



const Home: NextPage = () => {

  const {data: session, status} = useSession();

  return (
<div>
<NavBar />
<div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://media.discordapp.net/attachments/857718530005925898/1286634538965143655/DALLE_2024-09-20_12.25.59_-_Create_a_realistic_image_for_the_background_of_a_website_offering_web_development_services._The_scene_should_depict_two_people_sitting_at_a_desk_work.webp?ex=684ff14a&is=684e9fca&hm=5c3463da88fc1f47fa4f281fb938fe467ad892cd78ae38e30a05d995ec97b3cf&=&format=webp&width=1956&height=1118')"
      }}
    >
      <div className="bg-white bg-opacity-60 min-h-screen">
        <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto mb-16 text-center">
            <h1 className="text-4xl md:text-5xl text-blue-600 mb-8 font-semibold leading-tight">
              Vytvořte si web jednoduše a rychle
            </h1>
            </div>
          
        </div>
        <div className="max-w-md  mx-auto">
            <Card 
              image="/placeholder.svg?height=200&width=300"
              title="Základní balíček"
              descriptions={[
                "3 šablony",
                "Responzivní design",
                "Hosting",
                "Vlastní doména",
                "SEO optimalizace"
              ]}
              price="Zdarma"
            />
          </div>
      </div>

      <div className="relative">
        <svg className="absolute bottom-0 w-full h-6 -mb-1 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" fillOpacity="1" d="M0,64L80,85.3C160,107,320,149,480,154.7C640,160,800,128,960,112C1120,96,1280,96,1360,96L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>

      <div className="bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <AdvantageItem title="Rychlost" />
              <AdvantageItem title="Jednoduchost" />
              <AdvantageItem title="Podpora" />
              <AdvantageItem title="Dostupnost" />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200"></div>
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Vyberte si z našich šablon</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TemplateCard 
              imageSrc="/a1-2.png?height=400&width=300"
              title="Moderní"
              description="minimalistický design pro moderní firmy"
            />
            <TemplateCard 
              imageSrc="/rubin6.png?height=400&width=300"
              title="Klasický"
              description="Vzhled vhodný pro zavedené podniky"
            />
            <TemplateCard 
              imageSrc="/sablony_apollo_hlavicka-paticka-temy-new.png?height=400&width=300"
              title="Kreativní"
              description="Unikátní design pro kreativní profesionály"
            />
          </div>
        </div>
      </div>
      <div className="relative">
        <svg className="absolute bottom-0 w-full h-6 -mb-1 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" fillOpacity="1" d="M0,64L80,85.3C160,107,320,149,480,154.7C640,160,800,128,960,112C1120,96,1280,96,1360,96L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>
    </div>
    <Footer />
    </div>

  );
}

export default Home;