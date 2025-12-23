import useLanguage from "../hooks/useLanguage";
import { useState } from "react";
import { saveLanguage } from "../variables/localStorage";
import { FaSave } from "react-icons/fa";

export default function SettingsPage() {
  const { language, setLanguage } = useLanguage();
  const [selectedLang, setSelectedLang] = useState(language);
  const [feedback, setFeedback] = useState("");

  const saveSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLanguage(selectedLang);
    saveLanguage(selectedLang);
    setFeedback("تم الحفظ");
  };

  return (
    <div className="flex items-center justify-center">
      <form
        className="flex flex-col gap-2 [&_select]:bg-neutral-300 [&_select]:p-2"
        onSubmit={saveSettings}
      >
        {selectedLang === "english" ? (
          <label dir="ltr">Language</label>
        ) : (
          <label dir="rtl">اللغة</label>
        )}

        <select
          value={selectedLang}
          onChange={(e) => {
            setSelectedLang(e.target.value);
            setFeedback("");
          }}
        >
          <option value={"arabic"}>عربي</option>
          <option value={"english"}>English</option>
        </select>

        <button
          className="w-fit cursor-pointer rounded bg-blue-400 p-2 text-white"
          type="submit"
        >
          <FaSave />
        </button>
        <p>{feedback}</p>
      </form>
    </div>
  );
}
