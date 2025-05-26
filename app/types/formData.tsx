export const COUNTRIES = [
  { code: "ARG", name: "Argentina", flag: "🇦🇷" },
  { code: "ESP", name: "España", flag: "🇪🇸" },
  { code: "MEX", name: "México", flag: "🇲🇽" },
  { code: "CHL", name: "Chile", flag: "🇨🇱" },
  { code: "COL", name: "Colombia", flag: "🇨🇴" },
  { code: "PER", name: "Perú", flag: "🇵🇪" },
  { code: "URY", name: "Uruguay", flag: "🇺🇾" },
  { code: "ECU", name: "Ecuador", flag: "🇪🇨" },
  { code: "VEN", name: "Venezuela", flag: "🇻🇪" },
] as const;

export const PHONE_CODES = {
  ARG: "+54",
  ESP: "+34",
  MEX: "+52",
  CHL: "+56",
  COL: "+57",
  PER: "+51",
  URY: "+598",
  ECU: "+593",
  VEN: "+58",
};

export type CountryCode = (typeof COUNTRIES)[number]["code"];
export type CountryNames = (typeof COUNTRIES)[name]["code"];

export enum PlansTypes {
  VirtualGym = "plan-plus-gym-virtual",
  OnlinePlanification = "plan-plus-planificacion-online",
}

export interface FormDataType {
  plan: PlansTypes | string;
  pais: CountryCode | "";
  nombre: string;
  ciudad: string;
  emailLocalPart: string;
  celular: string;
  objetivos: string;
}

export type PlanType = {
  sku: string;
  name: string;
  duration: number;
  price: {
    usd: number;
    ars: number;
  };
};
