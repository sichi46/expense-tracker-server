import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { prisma } from "../config/db";
import generateToken from "../utils/generate-token";

class AuthController {
  // Creating a controller method to register a user
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // Destructuring the request body
      const { username, fullName, password, confirmPassword, email, gender } =
        req.body;

      // Validating the request body
      if (
        !username ||
        !fullName ||
        !password ||
        !confirmPassword ||
        !email ||
        !gender
      ) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: "All fields are required" });
      }

      // Checking if the password and confirmed password match
      if (password !== confirmPassword) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: "Passwords do not match" });
      }

      // checking if the user already exists and returning an error if they do
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (user) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: "A user with that email already exists" });
      }

      // Hashing the password so it is not stored in plain text in the database
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

      const newUser = await prisma.user.create({
        data: {
          username,
          fullName,
          email,
          gender,
          password: hashedPassword,
          profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        },
      });

      if (newUser) {
        // generate new token in a sec
        generateToken(newUser.id, res);

        return res.status(httpStatus.CREATED).json({
          id: newUser.id,
          username: newUser.username,
          fullName: newUser.fullName,
          email: newUser.email,
          gender: newUser.gender,
          profilePic: newUser.profilePic,
        });
      } else {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: "Invalid User Data" });
      }
    } catch (error: any) {
      console.log("Error in register", error.message);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal server error" });
    }
  }

  // Creating a controller method to login a user

  async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({
        where: { email },
      });

      // checking if the user exists in the DB and returning n error if not
      if (!user) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ error: "Invalid user credentials" });
      }

      const isPasswordMatch = await bcrypt.compare(password, user?.password);
      if (!isPasswordMatch) {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ error: "Invalid user credentials" });
      }

      generateToken(user.id, res);

      return res.status(httpStatus.OK).json({
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
      });
    } catch (error: any) {
      console.log("Error in  the login controller", error.message);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  }
}
export const authController = new AuthController();
