import { Building2, Headset, ReceiptText, ShoppingCart } from "lucide-react";
import type { SolutionSlug } from "@/data/solutions";

/** One icon per service, shared by every place a service is shown. */
export const serviceIcons: Record<SolutionSlug, typeof Building2> = {
  "real-estate": Building2,
  "call-center": Headset,
  ecommerce: ShoppingCart,
  billing: ReceiptText,
};
