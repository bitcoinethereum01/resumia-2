import { User as NextUser } from "next-auth";

export interface User extends ResumiaUser {
  password: string
}

export interface Credentials {
  email: string,
  password: string
}

export interface CurrentUser extends NextUser {
  fullName?: string
  file?: File | null
}

export interface ResumiaUser {
  id?: string | null
  name?: string | null;
  email?: string | null;
  image?: string | null;
  fullName?: string | null;
}

export interface UserEditPayload {
  userId?: string
  user: ResumiaUser
}

export interface UserType extends NextUser {
  fullName: string
  id: string
}
export interface SessionType {
  data: {
    user: UserType,
    expires: string
    jwt: string
  },
  status: "loading" | "authenticated" | "unauthenticated"
}