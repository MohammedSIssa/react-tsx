import { loadLanguage } from "../variables/localStorage";
import { LanguageContext } from "./LanguageContext";
import { useState } from "react";

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState<string>(loadLanguage());

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
