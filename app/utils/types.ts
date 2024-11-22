import { MaterialCommunityIcons } from "@expo/vector-icons";
export type materialCommunity = keyof typeof MaterialCommunityIcons.glyphMap;
export type textContentType =
  | "none"
  | "URL"
  | "addressCity"
  | "addressCityAndState"
  | "addressState"
  | "countryName"
  | "creditCardNumber"
  | "creditCardExpiration"
  | "creditCardExpirationMonth"
  | "creditCardExpirationYear"
  | "creditCardSecurityCode"
  | "creditCardType"
  | "creditCardName"
  | "creditCardGivenName"
  | "creditCardMiddleName"
  | "creditCardFamilyName"
  | "emailAddress"
  | "familyName"
  | "fullStreetAddress"
  | "givenName"
  | "jobTitle"
  | "location"
  | "middleName"
  | "name"
  | "namePrefix"
  | "nameSuffix"
  | "nickname"
  | "organizationName"
  | "postalCode"
  | "streetAddressLine1"
  | "streetAddressLine2"
  | "sublocality"
  | "telephoneNumber"
  | "username"
  | "password"
  | "newPassword"
  | "oneTimeCode"
  | "birthdate"
  | "birthdateDay"
  | "birthdateMonth"
  | "birthdateYear";
export type project = {
  project_id: number;
  project_name: string;
  file_path: string;
  project_detail: string;
  project_time: string;
  likes: number;
  liked_by: string;
  user_id: number;
  error?: number;
};

export type base<T> = {
  success: boolean;
  data: T[];
};
export type projectForSearch = {
  name: string;
  description: string;
};
