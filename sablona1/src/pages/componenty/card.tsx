import { useRouter } from "next/router";

interface CardProps {
  image: string;
  title: string;
  descriptions: string[];
  price: string | number;
}

export function Card({ image, title, descriptions, price }: CardProps) {
  const router = useRouter();
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">{title}</h3>
        <ul className="mb-4">
          {descriptions.map((description, index) => (
            <li key={index} className="flex items-center mb-2 justify-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              {description}
            </li>
          ))}
        </ul>
        <p className="text-4xl font-bold text-blue-600 text-center mb-4">{price}</p>
      </div>
      <div className="p-6 bg-gray-50">
        <button onClick={()=> router.push("../novaStranka")} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
          Začni hned
        </button>
      </div>
    </div>
    );
}
