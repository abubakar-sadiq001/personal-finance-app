import bcrypt from "bcrypt"
import { findUser } from "./data-services"

// Your auth-related functions that use bcrypt go here
export async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash)
}

export { findUser }
