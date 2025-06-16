import { Link, useParams } from "react-router-dom"

import { accountOptions } from "../../constants/accountOptions";

import Profile from "../../components/Account/Profile/Profile";
import Avatar from "../../components/Account/Avatar/Avatar";


function MonCompte() {

  const { option } = useParams();

  return (
    <main className='bg-white text-black w-full'>
      <div className='min-h-screen'>
        <div className='p-12'>
          <h2 className='font-bold text-2xl'>Votre compte</h2>

          <div className='flex mt-10'>

            {/* Gauche */}
            <div className='w-1/3 p-6'>

              <ul className='text-lg'>
                {accountOptions.map(option => (
                  <Link to={`/mon-compte/${option.slug}`}>
                    <li key={option.label} className='mb-4 p-2 w-1/2 rounded-md hover:bg-gray-100' >
                      {option.label}
                    </li>
                  </Link>
                ))}
              </ul>

            </div>

            {/* Droite */}
            <div className='w-2/3'>
                {option === "profile" && <Profile />}
                {option === "avatar" && <Avatar />}
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}

export default MonCompte