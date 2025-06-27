import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export const RegisterSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export const AddressSchema = z.object({
    addressLine1: z.string().min(1, { message: "Address is required." }),
    city: z.string().min(1, { message: "City is required." }),
    state: z.string().min(1, { message: "Please select a state." }),
    pincode: z.string().length(6, { message: "Pincode must be 6 digits." }),
    experience: z.string().min(1, { message: "Please select your experience level." }),
    farmType: z.string().min(1, { message: "Please select your farm type." }),
});

export const AiOptimizerSchema = z.object({
  cropType: z.string().min(1, { message: "Crop type is required." }),
  temperature: z.coerce.number().min(-50).max(100, "Invalid temperature"),
  humidity: z.coerce.number().min(0).max(100, "Invalid humidity"),
  lightLevel: z.coerce.number().min(0, "Invalid light level"),
});

export const IdealConditionsSchema = z.object({
  cropName: z.string().min(1, { message: "Crop name is required." }),
});

export const CropRecommendationSchema = z.object({
    city: z.string(),
    state: z.string(),
    farmType: z.string(),
});

export const CityClimateSchema = z.object({
    city: z.string(),
    state: z.string(),
});
