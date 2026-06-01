/* Foc Și Gust — website data (menu, fairs, nav) */

export const FG_MENU = [
  // COMBOURI (meniuri)
  { cat: "Combouri", name: "Combo Duo", desc: "6 mici + ceafă + piept pui + cartofi dublu + pâine + sos + murături. De împărțit.", price: "89 lei", seed: 1, tag: "De împărțit", tagTone: "paprika" },
  { cat: "Combouri", name: "Meniu Mixt Grătar", desc: "2 mici + ceafă + cârnăcior + cartofi + pâine + sos.", price: "46 lei", seed: 2, tag: "Popular", tagTone: "flame" },
  { cat: "Combouri", name: "Meniu Mici", desc: "4 mici + cartofi + pâine + sos.", price: "38 lei", seed: 0, tag: "Specialitate", tagTone: "paprika" },
  { cat: "Combouri", name: "Meniu Pui", desc: "Piept de pui + cartofi + pâine + murături + sos.", price: "30 lei", seed: 3 },
  // GRĂTAR
  { cat: "Grătar", name: "Mici", desc: "90g/buc · frământați manual, pe grătar.", price: "7 lei / buc", seed: 0, tag: "Specialitate", tagTone: "paprika" },
  { cat: "Grătar", name: "Ceafă de porc", desc: "150g · pe jar, suculentă.", price: "14 lei", seed: 2, tag: "Pe foc", tagTone: "flame" },
  { cat: "Grătar", name: "Piept de pui", desc: "150g · marinat, pe grătar.", price: "16 lei", seed: 3 },
  { cat: "Grătar", name: "Cârnăciori grill", desc: "65g/buc · de casă, pe foc.", price: "9 lei / buc", seed: 1, tag: "Pe foc", tagTone: "flame" },
  { cat: "Grătar", name: "Aripioare", desc: "3 buc · crocante, pe grătar.", price: "17 lei", seed: 4 },
  // GARNITURI
  { cat: "Garnituri", name: "Cartofi pai", desc: "200g · prăjiți, crocanți.", price: "10 lei", seed: 4 },
  { cat: "Garnituri", name: "Murături de casă", desc: "Asortate, alături de grătar.", price: "3 lei", seed: 0, tag: "Vegetarian", tagTone: "green" },
  { cat: "Garnituri", name: "Pâine", desc: "Proaspătă, lângă grătar.", price: "2 lei", seed: 2 },
  { cat: "Garnituri", name: "Sos ketchup", desc: "Porție.", price: "1 leu", seed: 3 },
  // BĂUTURI
  { cat: "Băuturi", name: "Apă Borsec", desc: "Minerală, 0.5L.", price: "7 lei", seed: 4 },
  { cat: "Băuturi", name: "Răcoritoare", desc: "Cola / Fanta / Sprite, 0.5L.", price: "10 lei", seed: 0 },
  { cat: "Băuturi", name: "Ciucaș", desc: "Bere, 0.33L.", price: "8 lei", seed: 2 },
  { cat: "Băuturi", name: "Timișoreana", desc: "Bere, 0.33L.", price: "9 lei", seed: 1 },
]

export const FG_FAIRS = [
  { place: "Târgul de Crăciun", city: "Cluj-Napoca · Piața Unirii", dates: "1–23 Dec", live: true },
  { place: "Festivalul Gustului", city: "Sibiu · Piața Mare", dates: "14–16 Iun", live: false },
  { place: "Târg de Sf. Maria", city: "Bistrița · Centru", dates: "13–15 Aug", live: false },
]

export const FG_NAV = [
  { id: "home", label: "Acasă" },
  { id: "meniu", label: "Meniu" },
  { id: "evenimente", label: "Evenimente" },
  { id: "despre", label: "Despre" },
]
