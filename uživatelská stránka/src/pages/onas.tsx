import Navbar from "./componenty/navbar"
import Footer from "./componenty/footer"


export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="relative bg-gray-600">
        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Kontakt</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Přečtěte si více o našem příběhu, hodnotách a službách, které nabízíme. Jsme tu, abychom vám pomohli
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 pb-16 pt-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Náš příběh</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Vítejte na našem webu! Jsem [Vaše jméno] a věnuji se podnikání již více než [X] let. Začal jsem jako
                [původní pozice/oblast] a postupně jsem si vybudoval zkušenosti v oblasti [vaše specializace].
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Během své kariéry jsem pomohl desítkám klientů dosáhnout jejich cílů a nyní chci své znalosti sdílet s
                širší komunitou prostřednictvím tohoto blogu a svých služeb.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Věřím, že úspěch přichází kombinací tvrdé práce, správných strategií a neustálého učení. Proto se snažím
                poskytovat praktické rady, které skutečně fungují v reálném světě.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Naše mise</h3>
              <p className="text-gray-700 leading-relaxed">
                Pomáháme podnikatelům a profesionálům dosáhnout jejich cílů prostřednictvím praktických rad, osvědčených
                strategií a osobního mentoringu.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Naše hodnoty</h3>
              <p className="text-gray-700 leading-relaxed">
                Transparentnost, praktičnost a dlouhodobé vztahy. Věříme v poskytování hodnoty a budování důvěry
                prostřednictvím kvalitních služeb a obsahu.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">Co nabízíme</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Konzultace</h3>
                <p className="text-gray-600">Individuální poradenství pro vaše podnikání a kariéru</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Workshopy</h3>
                <p className="text-gray-600">Praktické semináře a školení pro týmy i jednotlivce</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Mentoring</h3>
                <p className="text-gray-600">Dlouhodobé vedení a podpora při dosahování vašich cílů</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
