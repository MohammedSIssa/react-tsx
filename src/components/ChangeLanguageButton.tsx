import useLanguage from "../hooks/useLanguage";
import { useState } from "react";
import { saveLanguage } from "../variables/localStorage";

import { MdGTranslate } from "react-icons/md";

export default function ChangeLanguageButton() {
  const { language, setLanguage } = useLanguage();
  const [selectedLang, setSelectedLang] = useState(language);

  return (
    <form className="flex flex-row-reverse items-center gap-2 [&_select]:p-2 [&_select]:focus:border [&_select]:focus:border-violet-400 [&_select]:focus:outline-0">
      <label htmlFor="lang">
        <MdGTranslate />
      </label>
      <select
        id="lang"
        value={selectedLang}
        onChange={(e) => {
          setSelectedLang(e.target.value);
          setLanguage(e.target.value);
          saveLanguage(e.target.value);
        }}
      >
        <option value={"arabic"}>عربي</option>
        <option value={"english"}>English</option>
      </select>
    </form>
  );
}
