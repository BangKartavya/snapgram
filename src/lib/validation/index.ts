import {z} from "zod";

export const SignupValidation = z.object({
    name: z.string().min(2, {message: "Too Short"}),
    username: z.string().min(2, {message: "Too Short"}),
    email: z.string().email(),
    password: z.string().min(8, {message: "Too Short"})
});

export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: "Too Short"})
});

export const PostValidation = z.object({
    caption: z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    location: z.string(),
    tags: z.string()
});

export const UpdateProfileValidation = z.object({
    file: z.custom<File[]>(),
    name: z.string().min(2, {message: "Too Short"}),
    username: z.string().min(2, {message: "Too Short"}),
    email: z.string().email(),
    bio: z.string().min(5, {message: "Too Short"})
});

