// Central place for real contact details — edit here and it updates everywhere.
export const WHATSAPP_NUMBER = "919244335428"; // country code + number, no symbols
export const TOPMATE_URL = "https://topmate.io/RISHI777777/1820500";

export const SOCIALS = [
  { name: "LeetCode", href: "https://leetcode.com/u/its_Gurjar/" },
  { name: "GitHub", href: "https://github.com/rishigurjar248" },
  { name: "LinkedIn", href: "https://linkedin.com/in/rishi-gurjar-536634377" },
  { name: "Instagram", href: "https://instagram.com/itsrishiigurjar" },
];

export function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
