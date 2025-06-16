import { useState, useEffect } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import NavBar from './componenty/navbar'
import Member from './componenty/teamMember'
import ValueCard from './componenty/valueCard'
import Header from './componenty/header'
import matej from "../../public/matej.jpg"
import programator from "../../public/prog.jpg"
import { NextPage } from 'next'



  

const AboutUs : NextPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
        <NavBar/>
        <main className="pt-20">
        <section className="bg-blue-600 text-white py-20 ">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">O nás</h1>
            <p className="text-xl text-center max-w-3xl mx-auto">
              Jsme tým nadšenců, kteří věří, že vytvoření webových stránek by mělo být jednoduché a dostupné pro každého.
            </p>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-8 text-center">Náš příběh</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <Image
                  src={programator}
                  alt="Náš tým"
                  width={400}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-1/2">
                <p className="text-lg mb-4">
                  Webyhned vznikl z jednoduché myšlenky: každý by měl mít možnost vytvořit si profesionální webové stránky, bez ohledu na své technické dovednosti.
                
                  Naše cesta začala v roce 2020, kdy jsme si uvědomili, že mnoho malých podniků a jednotlivců stále bojuje s vytvořením online přítomnosti. Rozhodli jsme se to změnit.

                  Dnes jsme hrdí na to, že pomáháme tisícům uživatelů realizovat jejich online vize jednoduše a efektivně.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-12 text-center">Naše hodnoty</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ValueCard
                title="Jednoduchost"
                description="Věříme, že technologie by měla zjednodušovat život, ne ho komplikovat."
              />
              <ValueCard
                title="Inovace"
                description="Neustále hledáme nové způsoby, jak zlepšit naše služby a uživatelskou zkušenost."
              />
              <ValueCard
                title="Zákaznická podpora"
                description="Naši zákazníci jsou pro nás na prvním místě. Jsme tu pro vás 24/7."
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-12 text-center">Náš tým</h2>
            <div className="flex justify-center">
              <Member
                name="Matěj Zajíček"
                role="Zakladatel & CEO"
                imageSrc={matej}
              />
            </div>
          </div>
        </section>
      </main>

      <Header/>
    </div>
  )
}

export default AboutUs;