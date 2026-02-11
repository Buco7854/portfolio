import { redirect } from "next/navigation";
import { getLanguages } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function RootPage() {
  const languages = await getLanguages();
  const defaultLang = languages.find((l) => l.is_default)?.code ?? languages[0]?.code ?? "en";
  redirect(`/${defaultLang}`);
}
