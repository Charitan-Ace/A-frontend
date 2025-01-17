// import { type TLanguageCode } from '@/i18n';
export interface LoginResponse {
  auth?: AuthModel;
  jwe?: JWEKey;
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
  email: string;
  roleId: string;
  active: boolean;
}

export interface UserModel {
  id?: number;
  email?: string;
  isVerified?: boolean;
  auth?: AuthModel;
  roleId?: string;
  active?: boolean;
}

export interface DonorModel extends UserModel {
  firstName?: string;
  lastName?: string;
  address?: string;
  avatar?: string;
  donorStripeId?: string;
  userId?: number;
}

export interface CharityModel extends UserModel {
  companyName?: string;
  organizationType?: OrganizationType;
  address?: string;
  taxCode?: string;
  description?: string;
  image?: string[];
  video?: string[];
  logo?: string;
  charityStripeId?: string;
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

export interface CharityProfileData {
  userId: string;
  companyName: string;
  address: string;
  taxCode: string;
  organizationType: string;
  assetsKey: string;
  video: string;
}

export enum ProjectStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  DELETED = "DELETED",
  COMPLETED = "COMPLETED",
}
