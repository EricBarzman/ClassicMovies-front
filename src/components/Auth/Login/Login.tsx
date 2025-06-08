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
        console.error("Sign in incomplete: ", result);
        setAuthError("There was an error. Please try again.");
      }

      const firebaseId = result.user.uid;
      const userInfo = await getUserByFirebaseId(firebaseId);

      dispatch(updateUser({
        email: result.user.email,
        username: userInfo?.username,
        avatar: userInfo?.avatar.get_image,
        token: await result.user.getIdToken(),
      }));
      navigate("/browse");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setAuthError(error.errors?.[0]?.message || "An error occured.")
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-12 w-3/4 mx-auto">
      <h2 className="text-4xl mt-10 mb-10 text-center font-semibold uppercase">LOG BACK IN</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className='flex flex-col mx-auto w-1/3'>

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
            placeholder='Your email...'
            {...register("identifier")}
          />
          {errors.identifier ? <p className="mb-4">{errors.identifier?.message}</p> : ""}

          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className='bg-black py-3 px-6 mb-4 rounded-xl border focus:outline-none'
            placeholder='Your password...'
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
            {isSubmitting ? "Signing in" : "Log in"}
          </Button>
        </div>
      </form>

      <div className="text-gray-500 text-center mt-10">
        No account yet? <span className="underline text-white ml-4"><Link to="/signup">Sign up</Link></span>
      </div>
    </div>
  )
}

export default Login