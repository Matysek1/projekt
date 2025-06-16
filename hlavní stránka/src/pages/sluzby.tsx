import { NextPage } from "next"
import Image from "next/image"
import Navbar from './componenty/navbar'
import podpora from "../../public/podpora.jpg"
import borecstranka from "../../public/borecstranka.jpg"
import Header from './componenty/header'
import ServiceCard from './componenty/serviceCard'
import {StaticImageData} from "next/image";

const OurServices : NextPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
        <Navbar/>
      <main className="pt-20">
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Naše služby</h1>
            <p className="text-xl text-center max-w-3xl mx-auto">
              Nabízíme komplexní řešení pro vytvoření a správu vašich webových stránek.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ServiceCard
                title="Tvorba webových stránek"
                description="Vytvoříme pro vás moderní a responzivní webové stránky, které zaujmou vaše návštěvníky."
                icon="🌐"
              />
              <ServiceCard
                title="Pomoc v podnikání"
                description="Přilákejte co nejvíce nových zájemců."
                icon="🛒"
              />
              <ServiceCard
                title="SEO optimalizace"
                description="Zlepšíme viditelnost vašeho webu ve vyhledávačích a přivedeme více relevantních návštěvníků."
                icon="🔍"
              />
            </div>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-12 text-center">Proč zrovna my</h2>
            <div className="space-y-16">
              <FeatureRow
                title="Rychlost a efektivita"
                description="Naše pokročilé nástroje a zkušený tým vám umožní vytvořit profesionální web v rekordním čase. Ušetříte tak čas i peníze, které můžete investovat do rozvoje vašeho podnikání."
                imageSrc={borecstranka}
                imageAlt="Rychlost a efektivita"
                imageLeft={false}/>
                    <div className="border-t border-gray-200"></div>
              <FeatureRow
                title="Podpora 24/7"
                description="Náš tým podpory je vám k dispozici nepřetržitě. Ať už máte jakýkoliv problém nebo dotaz, jsme tu pro vás v kteroukoliv denní či noční hodinu."
                imageSrc={podpora}
                imageAlt="Podpora 24/7"
                imageLeft={true}/>
            </div>
          </div>
        </section>
      </main>

      <section className="py-16 bg-gray-100 text-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-8 text-center">Začněte ještě dnes</h2>
            <p className="text-xl text-center max-w-3xl mx-auto mb-8">
              Neváhejte a začněte s tvorbou vašeho vysněného webu ještě dnes. S našimi nástroji a podporou to zvládnete snadno a rychle.
            </p>
            <div className="flex justify-center">
              <button className="bg-blue-600 text-white hover:bg-blue-100 font-bold py-3 px-8 rounded-full text-lg transition duration-300">
                Začít
              </button>
            </div>
          </div>
        </section>

      <Header/>
    </div>
  )
}

function FeatureRow({ title, description, imageSrc, imageAlt, imageLeft } : { title: string, description: string, imageSrc: StaticImageData, imageAlt: string, imageLeft: boolean }) {
  const imageContent = (
    <div className={` md:w-1/2 ${imageLeft ? 'md:order-first' : 'md:order-last'}`}>
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={imageAlt}
        width={400}
        height={300}
        className="rounded-lg shadow-lg"
      />
    </div>
  )

  const textContent = (
    <div className="md:w-1/2">
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )

  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      {imageLeft ? imageContent : textContent}
      {imageLeft ? textContent : imageContent}
    </div>
  )
}

export default OurServices;