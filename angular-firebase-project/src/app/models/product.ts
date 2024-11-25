export interface Product {
  imageUrl: string | null;
  id?: string;
  name: string;
  price: number;
  manufacturer: string;
  category:
    | "szekek"
    | "fotelek"
    | "recepciosasztalok"
    | "barszekek"
    | "asztalok"
    | "taroloButorok";
  description: string;
  images: string;
}
