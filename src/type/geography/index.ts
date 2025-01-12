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
