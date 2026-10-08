export type Category = "all" | "rice" | "noodles" | "plant";
export type Dish = {
  id: string;
  name: string;
  english: string;
  shop: string;
  mall: string;
  floor: string;
  price: number;
  category: Category;
  spicy: boolean;
  note: string;
  ingredients: string[];
  color: string;
};
export const dishes: Dish[] = [
  {
    id: "bowl",
    name: "ข้าวไก่ย่างซอสขิง",
    english: "Ginger chicken bowl",
    shop: "ครัวอุ่นใจ",
    mall: "garden",
    floor: "ชั้น 2 · โซนสวน",
    price: 129,
    category: "rice",
    spicy: false,
    note: "ไก่ย่างหอม ๆ ข้าวนุ่ม และซอสขิงอ่อน ๆ จานเรียบง่ายที่กินได้เรื่อย ๆ",
    ingredients: ["ข้าว", "ไก่", "ขิง", "ผัก"],
    color: "#e4bb65",
  },
  {
    id: "noodle",
    name: "บะหมี่แห้งงาคั่ว",
    english: "Sesame noodles",
    shop: "เส้นวันดี",
    mall: "river",
    floor: "ชั้น 1 · โซนริมน้ำ",
    price: 99,
    category: "noodles",
    spicy: false,
    note: "เส้นเหนียวนุ่มคลุกซอสงาคั่ว เติมความกรุบด้วยผักตามฤดูกาล",
    ingredients: ["บะหมี่", "งา", "ผัก", "ไข่"],
    color: "#dba173",
  },
  {
    id: "green",
    name: "ข้าวเต้าหู้ผักย่าง",
    english: "Tofu garden bowl",
    shop: "ใบกับจาน",
    mall: "garden",
    floor: "ชั้น 2 · โซนสวน",
    price: 119,
    category: "plant",
    spicy: false,
    note: "เต้าหู้ย่าง ผักหลากสี และข้าวกล้อง ลองมื้อที่เบาขึ้นอีกนิด",
    ingredients: ["เต้าหู้", "ข้าวกล้อง", "ผัก", "ถั่วเหลือง"],
    color: "#9bac73",
  },
  {
    id: "chili",
    name: "ข้าวกะเพราเห็ด",
    english: "Basil mushroom rice",
    shop: "จานตรงใจ",
    mall: "river",
    floor: "ชั้น 3 · โซนครัว",
    price: 89,
    category: "plant",
    spicy: true,
    note: "กะเพราหอม พริกเผ็ดกำลังดี กับเห็ดชิ้นพอดีคำ",
    ingredients: ["เห็ด", "ข้าว", "พริก", "กะเพรา"],
    color: "#c47a54",
  },
  {
    id: "soup",
    name: "ก๋วยเตี๋ยวน้ำใส",
    english: "Clear broth noodles",
    shop: "เส้นวันดี",
    mall: "river",
    floor: "ชั้น 1 · โซนริมน้ำ",
    price: 79,
    category: "noodles",
    spicy: false,
    note: "น้ำซุปใสอุ่น ๆ เส้นเล็ก และผักกรอบ สำหรับวันเรียบง่าย",
    ingredients: ["เส้นเล็ก", "น้ำซุป", "ผัก", "ลูกชิ้นตัวอย่าง"],
    color: "#b9a27e",
  },
  {
    id: "fish",
    name: "ข้าวปลาย่างมะนาว",
    english: "Citrus fish rice",
    shop: "ครัวอุ่นใจ",
    mall: "garden",
    floor: "ชั้น 2 · โซนสวน",
    price: 169,
    category: "rice",
    spicy: false,
    note: "ปลาย่างกับกลิ่นมะนาวสด ชวนให้มื้อกลางวันรู้สึกสว่างขึ้น",
    ingredients: ["ปลา", "ข้าว", "มะนาว", "ผัก"],
    color: "#d6bd74",
  },
];
export const malls: Record<string, string> = {
  all: "ทุกศูนย์อาหารตัวอย่าง",
  garden: "สวนกลางวัน · สมมติ",
  river: "ริมธาร · สมมติ",
};
export function filterDishes(
  budget: number,
  mall: string,
  category: Category,
  mild: boolean,
): Dish[] {
  return dishes.filter(
    (d) =>
      d.price <= budget &&
      (mall === "all" || d.mall === mall) &&
      (category === "all" || d.category === category) &&
      (!mild || !d.spicy),
  );
}
export function favoriteIds(): string[] {
  try {
    const value: unknown = JSON.parse(
      window.localStorage.getItem("ginrai-demo-saved") || "[]",
    );
    return Array.isArray(value)
      ? value.filter(
          (id): id is string =>
            typeof id === "string" && dishes.some((d) => d.id === id),
        )
      : [];
  } catch {
    return [];
  }
}
export function toggleFavorite(ids: string[], id: string) {
  return ids.includes(id) ? ids.filter((v) => v !== id) : [...ids, id];
}
