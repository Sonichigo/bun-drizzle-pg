//user.service.ts
import db from "../db";
import { eq } from 'drizzle-orm';
import { NewUser, users } from "../schemas/schema.model"
import { signUserToken } from "./auth.service";

export const createNewUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const newUser: NewUser = await data
    //Hash the password using the Bun package and bcrypt algorithm
    const hashPassword = await Bun.password.hash(newUser.password, {
      algorithm: "bcrypt",
    });
    //Create the user
    const user = await db.insert(users).values({
      ...newUser,
      password: hashPassword,
    }).returning({
        id: users.id,
        name: users.name,
        email: users.email,
        password: users.password,
        createdAt: users.createdAt,
        updatedAt:users.updatedAt,
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const { email, password } = data;

    //Find the user
    const user = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      throw new Error("User not found");
    }

    //Verify the password
    if (!user || user.length === 0) {
      throw new Error("User not found");
    }

    // Check if user password is defined before verifying
    if (!user[0].password) {
      throw new Error("User password not found");
    }
    const valid = await Bun.password.verify(password, user[0].password);

    if (!valid) {
      throw new Error("Invalid credentials");
    }

    // //Sign the JWT token
    const token = signUserToken({
      id: user[0].id,
      email: user[0].email,
    });
   // console.log(token, user[0].id)

    return {
      message: "User logged in successfully",
      token,
    };
  } catch (error) {
    throw error;
  }
};