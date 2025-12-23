export const saveLanguage = (lang: string) =>
  localStorage.setItem("language", JSON.stringify(lang));

export const loadLanguage = () => {
  const item = localStorage.getItem("language");
  return item ? JSON.parse(item) : "arabic";
};
