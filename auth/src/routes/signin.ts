import express, { Request, Response } from "express";
import { body } from "express-validator";
const router = express.Router();
import { User } from "../models/users";
import { BadRequestError, validateRequest } from "@lekesktickets/common";
import jwt from "jsonwebtoken";
import { Password } from "../services/password";

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid."),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }
    const isValidPassword = await Password.compare(
      existingUser.password,
      password
    );

    if (!isValidPassword) {
      throw new BadRequestError("Invalid Credentials");
    }
    const userJWT = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJWT,
    };

    res.status(200).send({ user: existingUser });
  }
);

export { router as signInUserRouter };
