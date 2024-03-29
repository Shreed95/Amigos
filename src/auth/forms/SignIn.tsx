import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { SignInValidation } from "@/lib/validation";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SignIn = () => {

  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: signInAccount } = useSignInAccount();

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    if (!session) {
      return (toast({
        title: "Sign-Up Failed. Please try Again."
      }))
    }

    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate('/');
    }
    else {
      return toast({
        title: "Sign-Up Failed. Please try Again."
      })
    }
  }

  return (
    <Form {...form}>
      <div className="flex-center flex-col w-[70%]">
        <div className="flex-center flex-row mb-1">
          <img className="w-12" src="assets/images/logo.png" alt="logo" />
          <span className="pl-5 font-mono text-3xl">Amigos</span>
        </div>
        <h2 className="text-3xl md:text-2xl font-bold mt-16">Sign-In</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your Email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your Password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">{isUserLoading ? (<div>Loading...</div>) : (<div>Sign-In</div>)}</Button>
          <p className="text-small-regular text-light-2 text-center">Dont have an Account? <Link to="/signup" className="hover:underline text-[#EA1111] text-small-semibold ml-1">Sign-Up</Link></p>
        </form>
      </div>
    </Form>
  )
}

export default SignIn