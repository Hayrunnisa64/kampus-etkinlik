// "12-10-2026" → "12 Ekim 2026"
export function formatDate(date: string) {
  return new Date(date.split("-").reverse().join("-") + "T00:00").toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}