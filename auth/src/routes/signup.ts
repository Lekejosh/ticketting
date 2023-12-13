import express, { Request, Response } from "express";
import { body } from "express-validator";
const router = express.Router();
import { User } from "../models/users";
import { BadRequestError, validateRequest } from "@lekesktickets/common";
import jwt from "jsonwebtoken";
router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid."),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 charaters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email is already in use ");
    }

    const user = User.build({ email, password });
    await user.save();

    const userJWT = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJWT,
    };
    res.status(201).send(user);
  }
);

export { router as signUpUserRouter };
