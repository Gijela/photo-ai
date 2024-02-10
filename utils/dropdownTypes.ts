export type themeType =
  | "Modern"
  | "Vintage"
  | "Minimalist"
  | "Professional"
  | "Tropical";

export type roomType =
  | "Living Room"
  | "Dining Room"
  | "Bedroom"
  | "Bathroom"
  | "Office"
  | "Gaming Room";

export const themes: themeType[] = [
  "Modern",
  "Minimalist",
  "Professional",
  "Tropical",
  "Vintage",
];
export const rooms: roomType[] = [
  "Living Room",
  "Dining Room",
  "Office",
  "Bedroom",
  "Bathroom",
  "Gaming Room",
];

export const optionsMap = {
  Modern: "现代的",
  Minimalist: "艺术的",
  Professional: "专业的",
  Tropical: "热情的",
  Vintage: "复古的",
  "Living Room": "客厅",
  "Dining Room": "餐厅",
  Office: "办公室",
  Bedroom: "卧室",
  Bathroom: "浴室",
  "Gaming Room": "电玩室",
};
