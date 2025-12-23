"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "@/schemas";
import { CardWraper } from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: ""
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWraper
      headerLabel="Create an account"
      backButtonlabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Doe"
                      type="name"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john.doe@example.com"
                      type="email"
                      disabled={isPending}
                    />
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
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Create an account
          </Button>
        </form>
      </Form>
    </CardWraper>
  );
};

// "use client";

// import { useFormState } from "react-dom";
// import { register, RegisterState } from "@/actions/register";
// import { CardWraper } from "@/components/auth/card-wrapper";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { FormError } from "@/components/form-error";
// import { FormSuccess } from "@/components/form-success";

// const initialState: RegisterState = {
//   error: undefined,
//   success: undefined,
// };

// export const RegisterForm = () => {
//   const [state, formAction] = useFormState(register, initialState);

//   return (
//     <CardWraper
//       headerLabel="Create an account"
//       backButtonlabel="Already have an account?"
//       backButtonHref="/auth/login"
//       showSocial
//     >
//       <form action={formAction} className="space-y-6">
//         <label className="font-bold text-sm">Name</label>
//         <Input
//           name="name"
//           placeholder="John Doe"
//           required
//         />

//         <Input
//           name="email"
//           type="email"
//           placeholder="john.doe@example.com"
//           required
//         />

//         <Input
//           name="password"
//           type="password"
//           placeholder="******"
//           required
//         />

//         <FormError message={state?.error} />
//         <FormSuccess message={state?.success} />

//         <Button type="submit" className="w-full">
//           Create an account
//         </Button>
//       </form>
//     </CardWraper>
//   );
// };
