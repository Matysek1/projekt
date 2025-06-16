import { NextPage } from 'next'
import { useRouter } from 'next/router'

const PleaseSignin : NextPage = () => {

    const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">
          Pro přístup k této části aplikace se přihlašte
        </h1>
        <button 
            onClick={() => router.push('./signup/prihlaseni')}
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        
          >Přihlásit se</button>
      </div>
    </div>
  )
}

export default PleaseSignin;