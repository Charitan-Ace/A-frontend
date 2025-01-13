export interface IRegion {
  id: number;
  name: string;
}

export interface ICountry {
  id: number;
  name: string;
  code: string;
  region: string;
}

// Regions Data
export const REGIONS: IRegion[] = [
  { id: 1, name: "Africa" },
  { id: 2, name: "Asia" },
  { id: 3, name: "Europe" },
  { id: 4, name: "North America" },
  { id: 5, name: "South America" },
  { id: 6, name: "Oceania" },
  { id: 7, name: "Antarctica" },
];

// Countries Data
export const COUNTRIES: ICountry[] = [
  // Africa
  { id: 1, name: "Nigeria", code: "NG", region: "Africa" },
  { id: 2, name: "South Africa", code: "ZA", region: "Africa" },
  { id: 3, name: "Kenya", code: "KE", region: "Africa" },
  { id: 4, name: "Egypt", code: "EG", region: "Africa" },
  { id: 5, name: "Morocco", code: "MA", region: "Africa" },
  { id: 6, name: "Ethiopia", code: "ET", region: "Africa" },
  { id: 7, name: "Ghana", code: "GH", region: "Africa" },
  { id: 8, name: "Uganda", code: "UG", region: "Africa" },
  { id: 9, name: "Algeria", code: "DZ", region: "Africa" },
  { id: 10, name: "Angola", code: "AO", region: "Africa" },

  // Asia
  { id: 11, name: "Afghanistan", code: "AF", region: "Asia" },
  { id: 12, name: "Armenia", code: "AM", region: "Asia" },
  { id: 13, name: "Azerbaijan", code: "AZ", region: "Asia" },
  { id: 14, name: "Bahrain", code: "BH", region: "Asia" },
  { id: 15, name: "Bangladesh", code: "BD", region: "Asia" },
  { id: 16, name: "Bhutan", code: "BT", region: "Asia" },
  { id: 17, name: "Brunei", code: "BN", region: "Asia" },
  { id: 18, name: "Cambodia", code: "KH", region: "Asia" },
  { id: 19, name: "China", code: "CN", region: "Asia" },
  { id: 20, name: "India", code: "IN", region: "Asia" },

  // Europe
  { id: 21, name: "Germany", code: "DE", region: "Europe" },
  { id: 22, name: "France", code: "FR", region: "Europe" },
  { id: 23, name: "United Kingdom", code: "GB", region: "Europe" },
  { id: 24, name: "Italy", code: "IT", region: "Europe" },
  { id: 25, name: "Spain", code: "ES", region: "Europe" },
  { id: 26, name: "Netherlands", code: "NL", region: "Europe" },
  { id: 27, name: "Poland", code: "PL", region: "Europe" },
  { id: 28, name: "Greece", code: "GR", region: "Europe" },
  { id: 29, name: "Belgium", code: "BE", region: "Europe" },
  { id: 30, name: "Sweden", code: "SE", region: "Europe" },

  // North America
  { id: 31, name: "United States", code: "US", region: "North America" },
  { id: 32, name: "Canada", code: "CA", region: "North America" },
  { id: 33, name: "Mexico", code: "MX", region: "North America" },
  { id: 34, name: "Guatemala", code: "GT", region: "North America" },
  { id: 35, name: "Cuba", code: "CU", region: "North America" },
  { id: 36, name: "Honduras", code: "HN", region: "North America" },
  { id: 37, name: "El Salvador", code: "SV", region: "North America" },
  { id: 38, name: "Panama", code: "PA", region: "North America" },
  { id: 39, name: "Costa Rica", code: "CR", region: "North America" },
  { id: 40, name: "Belize", code: "BZ", region: "North America" },

  // South America
  { id: 41, name: "Brazil", code: "BR", region: "South America" },
  { id: 42, name: "Argentina", code: "AR", region: "South America" },
  { id: 43, name: "Colombia", code: "CO", region: "South America" },
  { id: 44, name: "Chile", code: "CL", region: "South America" },
  { id: 45, name: "Peru", code: "PE", region: "South America" },
  { id: 46, name: "Venezuela", code: "VE", region: "South America" },
  { id: 47, name: "Ecuador", code: "EC", region: "South America" },
  { id: 48, name: "Bolivia", code: "BO", region: "South America" },
  { id: 49, name: "Paraguay", code: "PY", region: "South America" },
  { id: 50, name: "Uruguay", code: "UY", region: "South America" },

  // Oceania
  { id: 51, name: "Australia", code: "AU", region: "Oceania" },
  { id: 52, name: "New Zealand", code: "NZ", region: "Oceania" },
  { id: 53, name: "Papua New Guinea", code: "PG", region: "Oceania" },
  { id: 54, name: "Fiji", code: "FJ", region: "Oceania" },
  { id: 55, name: "Solomon Islands", code: "SB", region: "Oceania" },
  { id: 56, name: "Vanuatu", code: "VU", region: "Oceania" },
  { id: 57, name: "Samoa", code: "WS", region: "Oceania" },
  { id: 58, name: "Tonga", code: "TO", region: "Oceania" },
  { id: 59, name: "Tuvalu", code: "TV", region: "Oceania" },
  { id: 60, name: "Kiribati", code: "KI", region: "Oceania" },

  // Antarctica
  { id: 61, name: "Antarctica", code: "AQ", region: "Antarctica" },
];
