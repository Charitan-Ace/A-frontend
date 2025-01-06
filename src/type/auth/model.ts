// import { type TLanguageCode } from '@/i18n';
export interface LoginResponse {
  auth: AuthModel;
  jwe: JWEKey;
}
export interface AuthModel {
  access_token: string;
  refreshToken?: string;
  api_token: string;
  jwe?: JWEKey;
}

export interface JWEKey {
  kty: string;
  n: string;
  e: string;
}

export interface BaseModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel {
  id: number;
  email: string;
  isVerified: boolean;
  auth?: AuthModel;
}

export interface DonorModel extends UserModel {
  firstName: string;
  lastName: string;
  address: string;
  avatar: string;
  donorStripeId: string;
}

export interface CharityModel extends UserModel {
  name: string;
  organizationType: OrganizationType;
  address: string;
  taxCode: string;
  description: string;
  image: string[];
  video: string[];
  logo: string;
  charityStripeId: string;
}

export enum OrganizationType {
  COMPANY = "COMPANY",
  INDIVIDUAL = "INDIVIDUAL",
  NON_PROFIT = "NON_PROFIT",
}

export interface Admin {
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface UserDto {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    profilePictureUrl?: string;
  }
  
