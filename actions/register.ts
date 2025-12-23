"use server";

import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import { prisma } from "@/lib/prisma";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log(values);

  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({ 
    where: {
         email 
        } 
    });

    if(existingUser){
        return {error: "Email already in use"}
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    // todo: send verification token email
  return { success: "User created" };
};


// "use server";

// import bcrypt from "bcrypt";
// import { prisma } from "@/lib/prisma";
// import { RegisterSchema } from "@/schemas";

// export type RegisterState = {
//   error?: string;
//   success?: string;
// };

// export async function register(
//   prevState: RegisterState,
//   formData: FormData
// ): Promise<RegisterState> {
//   const values = {
//     name: formData.get("name"),
//     email: formData.get("email"),
//     password: formData.get("password"),
//   };

//   const validatedFields = RegisterSchema.safeParse(values);

//   if (!validatedFields.success) {
//     return { error: "Invalid fields" };
//   }

//   const { name, email, password } = validatedFields.data;

//   const existingUser = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (existingUser) {
//     return { error: "Email already in use" };
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   await prisma.user.create({
//     data: {
//       name,
//       email,
//       password: hashedPassword,
//     },
//   });

//   return { success: "Account created successfully" };
// }
