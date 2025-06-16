import ChangeEmailAddress from "./ChangeEmailAddress";
import ChangeProfileName from "./ChangeProfileName";

function Profile() {

  return (
    <div>
      <h3 className='font-extrabold text-3xl'>Mon profil</h3>
      <ChangeProfileName />
      <ChangeEmailAddress />
    </div>
  )
}

export default Profile