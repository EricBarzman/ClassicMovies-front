// React
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";

import { useAuth } from "../../../firebase/auth";

// Zod
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../schemas/login.schema";

// UI
import { Button } from "@heroui/button";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useTypedSelector } from "../../../redux/redux.type";
import { updateUser } from "../../../redux/features/user";
import { useUsersCollection } from "../../../firebase/users/userHook";
import { GoArrowLeft } from "react-icons/go";


const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuth();
  const { getUserByFirebaseId } = useUsersCollection();
  const user = useTypedSelector(state => state.user);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    }
  });

  useEffect(() => {
    if (user.logged || user.token) navigate('/');
    else document.title = `Connection | Classic Movies`;
  }, [])


  async function onSubmit(data: z.infer<typeof loginSchema>) {
    setIsSubmitting(true);
    setAuthError(null);

    try {
      const result = await login(data.identifier, data.password);

      if (!result.user) {
        console.error("Echec à se connecter : ", result);
        setAuthError("Une erreur s'est produite, merci de réesayer.");
      }

      const firebaseId = result.user.uid;
      const userInfo = await getUserByFirebaseId(firebaseId);

      dispatch(updateUser({
        email: result.user.email,
        username: userInfo?.username,
        avatar: userInfo?.avatar.get_image,
        token: await result.user.getIdToken(),
        userId: firebaseId,
      }));
      dispatch({ type: 'FETCH_FAVORITES' });
      navigate("/");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setAuthError(error.errors?.[0]?.message || "Une erreur s'est produite.")
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-12 md:w-3/4 mx-auto flex flex-col items-center">
      
      <h2 className="md:text-4xl text-2xl mt-10 mb-10 text-center font-semibold uppercase">SE RECONNECTER</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className='flex flex-col'>

          {authError && (
            <div className="mx-auto bg-danger-50 text-danger-700 p-4 roundeg-lg mb-12 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p>{authError}</p>
            </div>
          )}

          <input
            id="identifier"
            type="text"
            className='bg-black py-3 px-6 mb-4 rounded-xl border focus:outline-none'
            placeholder='Votre email...'
            {...register("identifier")}
          />
          {errors.identifier ? <p className="mb-4">{errors.identifier?.message}</p> : ""}

          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className='bg-black py-3 px-6 mb-4 rounded-xl border focus:outline-none'
            placeholder='Votre mot de passe...'
            {...register("password")}
          />
          {errors.password ? <p className="mb-4">{errors.password?.message}</p> : ""}

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
            {isSubmitting ? "Connexion en cours" : "Se connecter"}
          </Button>
        </div>
      </form>

      <div className="text-gray-500 text-center mt-10">
        Pas de compte ? <span className="underline text-white ml-4"><Link to="/enregistrement">Créer un compte</Link></span>
      </div>

      <div className="mt-16 inline-block">
        <Link className="text-lg flex items-center hover:underline hover:text-gray-300" to="/">
          <span>
            <GoArrowLeft className="text-xl mr-2" />
          </span>
          Retour accueil
        </Link>
      </div>
    </div>
  )
}

export default Login