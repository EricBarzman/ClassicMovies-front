// React
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// Clerk
import { useSignUp } from "@clerk/clerk-react";

// Zod
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../../schemas/signup.schema";

// HeroUI
import { Button } from "@heroui/button";

import { AlertCircle, Eye, EyeOff } from "lucide-react";



// const avatars = [
//   {
//     id: 1,
//     get_image: "./avatars/kubrick.jpg"
//   },
//   {
//     id: 2,
//     get_image: "./avatars/varda-agnes.jpg"
//   },
//   {
//     id: 3,
//     get_image: "./avatars/John-Ford.webp"
//   }
// ]



const Signup = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { signUp, isLoaded } = useSignUp();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    }
  });

  async function onSubmit(data: z.infer<typeof signupSchema>) {
    // if (!isLoaded) return;
    // setIsSubmitting(true);
    // setAuthError(null);
    console.log(data);
    

    // try {
    //   await signUp.create({
    //     emailAddress: data.email,
    //     password: data.password,
    //   });
    //   await signUp.prepareEmailAddressVerification({
    //     strategy: "email_code",
    //   });
    //   // navigate("/browse");
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // } catch (error: any) {
    //   setAuthError(error.errors?.[0]?.message || "An error occured.")
    //   setIsSubmitting(false);
    // }
  }

  return (
    <div className="p-12 w-3/4 mx-auto">
      <h2 className="text-4xl mt-10 mb-10 text-center font-semibold uppercase">
        Create your profile
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className='flex flex-col mx-auto w-1/3'>

          {authError && (
            <div className="mx-auto bg-danger-50 text-danger-700 p-4 roundeg-lg mb-12 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p>{authError}</p>
            </div>
          )}

          <input
            id="email"
            type="text"
            className='bg-black py-3 px-6 mb-4 rounded-xl border focus:outline-none'
            placeholder='Your email...'
            {...register("email")}
          />
          {errors.email ? <p className="mb-4">{errors.email?.message}</p> : ""}

          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className='bg-black py-3 px-6 mb-4 rounded-xl border focus:outline-none'
            placeholder='Your password...'
            {...register("password")}
          />
          {errors.password ? <p className="mb-4">{errors.password?.message}</p> : ""}

          <input
            id="passwordConfirmation"
            type={showPassword ? "text" : "password"}
            className='bg-black py-3 px-6 mb-4 rounded-xl border focus:outline-none'
            placeholder='Confirm your password...'
            {...register("passwordConfirmation")}
          />
          {errors.passwordConfirmation ? <p className="mb-4">{errors.passwordConfirmation?.message}</p> : ""}

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

        {/* <div {...register("avatar")} className='flex flex-row'>
        {avatars.map((avatar) => (
          <option
            value={avatar.id}
            key={avatar.id}
            className='m-4 hover:rounded-sm hover:border-primary hover:border-2 focus:border-primary focus:border-2'
          >
            {avatar.id}
            <img
              className="w-[250px] h-[120px]"
              src={avatar.get_image}
              alt="avatar"
            />
          </option>
        ))}
      </div> */}
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