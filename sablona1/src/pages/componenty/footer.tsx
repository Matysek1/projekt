import React from 'react'

const Footer : React.FC = () => {
    return (
      <footer className="bg-gray-100 text-gray-600 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Moje Stránka. Všechna práva vyhrazena.</p>
          <div className="mt-4">
            <a href="#" className="text-gray-600 hover:text-gray-800 mx-2">
              Podmínky použití
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800 mx-2">
              Ochrana soukromí
            </a>
          </div>
        </div>
      </footer>
    )
}

export default Footer