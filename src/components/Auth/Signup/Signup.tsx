// React
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// UI
import { Button } from "@heroui/button";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

import { avatars } from "../avatar";
import { type FormDataProp } from "../../../types/auth.type";

import { useAuth } from "../../../firebase/auth";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/features/user";
import { useTypedSelector } from "../../../redux/redux.type";


const defaultFormData: FormDataProp = {
  email: "",
  password: "",
  passwordConfirmation: "",
  avatar: null,
}

function Signup() {

  const navigate = useNavigate();
  const { signup } = useAuth();
  
  // Gestion d'erreur
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Formulaire
  const [formData, setFormData] = useState<FormDataProp>(defaultFormData);

  // Redux
  const dispatch = useDispatch();
  const user = useTypedSelector((state) => state.user);


  // Change le titre de la page, reset la form
  useEffect(() => {
    if (user.logged) navigate("/");
    document.title = `Connection | Classic Movies`;
    setFormData(defaultFormData);
    setIsSubmitting(false);
  }, [])

  // Changement du form
  function handleChange(e: any) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  // Changement d'avatar
  function handleAvatarClick(e: any) {
    setFormData({
      ...formData,
      avatar: Number(e.currentTarget.id)
    });
  }

  // Submit
  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError(null);

    // Gestion d'erreurs
    if (formData.email === '')
      setAuthError('You did not write an email!');
    if (formData.password.length < 8 || formData.password === '')
      setAuthError('Password must be 8 characters long.');
    if (formData.password !== formData.passwordConfirmation)
      setAuthError('Both passwords must be the same.');
    if (formData.avatar === null)
      setAuthError('You did not choose an avatar!');

    if (authError) {
      setIsSubmitting(false);
      return;
    }

    console.log(formData);

    try {
      const result = await signup(formData.email, formData.password);
      if (result.user) {
        dispatch(updateUser({
          email: result.user.email,
          token: result.user.getIdToken,
        }));
        setIsSubmitting(false);
        navigate("/");
      }
      
    } catch (error: any) {
      setAuthError(error.errors?.[0]?.message || "An error occured.")
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-12 w-3/4 mx-auto">

      <h2 className="text-4xl mt-10 mb-10 text-center font-semibold uppercase">
        Create your profile
      </h2>

      <form onSubmit={handleSubmit}>
        <div className='flex flex-col mx-auto w-1/3'>

          {authError && (
            <div className="mx-auto bg-danger-50 text-danger-700 p-4 roundeg-lg mb-12 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p>{authError}</p>
            </div>
          )}

          <input
            name="email"
            type="email"
            className='bg-black py-3 px-6 mb-4 rounded-xl border focus:outline-none'
            placeholder='Your email...'
            onChange={handleChange}
          />

          <input
            name="password"
            type={showPassword ? "text" : "password"}
            className='bg-black py-3 px-6 mb-4 rounded-xl border focus:outline-none'
            placeholder='Your password...'
            onChange={handleChange}
          />

          <input
            name="passwordConfirmation"
            type={showPassword ? "text" : "password"}
            className='bg-black py-3 px-6 mb-4 rounded-xl border focus:outline-none'
            placeholder='Confirm your password...'
            onChange={handleChange}
          />

          <Button
            className="flex justify-end"
            isIconOnly
            variant="light"
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-default-500" />
            ) : (
              <Eye className="h-4 w-4 text-default-500" />
            )}
          </Button>

          <Button
            type='submit'
            isLoading={isSubmitting}
            className='mt-4 rounded-xl px-6 py-3 bg-teal-900 text-white hover:bg-teal-700 transition-all'
          >
            {isSubmitting ? "Signing up" : "Roll'em!"}
          </Button>

        </div>

        <div className="flex flex-row">
          {avatars.map((avatar) => (
            <div
              id={avatar.id.toString()}
              key={avatar.id}
              onClick={handleAvatarClick}
              className={`m-4 p-2 hover:border-primary hover:border-1 ${formData.avatar === avatar.id ? 'border-primary border-2' : ''}`}
            >
              <img
                className="w-[250px] h-[120px]"
                src={avatar.get_image}
                alt="avatar"
              />
            </div>
          ))}
        </div>

      </form>

      <div className="text-gray-500 text-center mt-10">
        Already have an account?
        <span className="underline text-white ml-4">
          <Link to="/login">Log in</Link>
        </span>
      </div>
    </div>
  )
}

export default Signup