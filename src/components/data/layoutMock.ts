export type Mode = "CCA" | "OTA";

export type Division =
  | "JURY"
  | "SPEAR"
  | "RAZOR"
  | "ACADEMY"
  | "ECHO"
  | "DAGGER"
  | "RANGER"
  | "KING"
  | "PHANTOM";

export type CCARank = "D5" | "D4" | "D3" | "D2" | "D1";
export type OTARank =
  | "Tier 3"
  | "Tier 2"
  | "Tier 1"
  | "Overwatch Leader"
  | "Overwatch Officer"
  | "Overwatch Captain"
  | "Overwatch Commander";

export type AcademyRank =
  | "Instructor"
  | "Senior Instructor"
  | "Deputy Instructor"
  | "Head Instructor";

export type Rank = CCARank | OTARank | AcademyRank;

export type MockData = {
  typeID: Mode;
  RobloxUserId: number;
  username: string;
  division: Division;
  rank: Rank;
};

// Твои order-ы (как ты прислал)
export const DIV_ORDER: Record<Mode, Division[]> = {
  CCA: ["JURY", "SPEAR", "RAZOR", "ACADEMY"],
  OTA: ["ECHO", "DAGGER", "RANGER", "KING", "PHANTOM"],
};

export const RANK_ORDER: Record<Mode, string[]> = {
  CCA: ["D5", "D4", "D3", "D2", "D1"],
  OTA: [
    "Tier 3",
    "Tier 2",
    "Tier 1",
    "Overwatch Leader",
    "Overwatch Officer",
    "Overwatch Captain",
    "Overwatch Commander",
  ],
};

export const ACADEMY_RANK_ORDER: AcademyRank[] = [
  "Instructor",
  "Senior Instructor",
  "Deputy Instructor",
  "Head Instructor",
];

const mockData: MockData[] = [
  // ===================== CCA — JURY =====================
  { typeID: "CCA", RobloxUserId: 100000001, username: "JURY_Axiom", division: "JURY", rank: "D5" },
  { typeID: "CCA", RobloxUserId: 100000002, username: "JURY_Rook", division: "JURY", rank: "D4" },
  { typeID: "CCA", RobloxUserId: 100000003, username: "JURY_Vanta", division: "JURY", rank: "D3" },
  { typeID: "CCA", RobloxUserId: 100000004, username: "JURY_Nova", division: "JURY", rank: "D2" },
  { typeID: "CCA", RobloxUserId: 100000005, username: "JURY_Quartz", division: "JURY", rank: "D1" },

  // ===================== CCA — SPEAR =====================
  { typeID: "CCA", RobloxUserId: 100000011, username: "SPEAR_Cinder", division: "SPEAR", rank: "D5" },
  { typeID: "CCA", RobloxUserId: 100000012, username: "SPEAR_Mako", division: "SPEAR", rank: "D4" },
  { typeID: "CCA", RobloxUserId: 100000013, username: "SPEAR_Cobalt", division: "SPEAR", rank: "D3" },
  { typeID: "CCA", RobloxUserId: 100000014, username: "SPEAR_Shard", division: "SPEAR", rank: "D2" },
  { typeID: "CCA", RobloxUserId: 100000015, username: "SPEAR_Arc", division: "SPEAR", rank: "D1" },

  // ===================== CCA — RAZOR =====================
  { typeID: "CCA", RobloxUserId: 100000021, username: "RAZOR_Bishop", division: "RAZOR", rank: "D5" },
  { typeID: "CCA", RobloxUserId: 100000022, username: "RAZOR_Ghost", division: "RAZOR", rank: "D4" },
  { typeID: "CCA", RobloxUserId: 100000023, username: "RAZOR_Orion", division: "RAZOR", rank: "D3" },
  { typeID: "CCA", RobloxUserId: 100000024, username: "RAZOR_Iris", division: "RAZOR", rank: "D2" },
  { typeID: "CCA", RobloxUserId: 100000025, username: "RAZOR_Sable", division: "RAZOR", rank: "D1" },

  // ===================== CCA — ACADEMY (спец ранги) =====================
  { typeID: "CCA", RobloxUserId: 100000031, username: "ACAD_Spark", division: "ACADEMY", rank: "Instructor" },
  { typeID: "CCA", RobloxUserId: 100000032, username: "ACAD_Sigma", division: "ACADEMY", rank: "Senior Instructor" },
  { typeID: "CCA", RobloxUserId: 100000033, username: "ACAD_Veil", division: "ACADEMY", rank: "Deputy Instructor" },
  { typeID: "CCA", RobloxUserId: 100000034, username: "ACAD_Atlas", division: "ACADEMY", rank: "Head Instructor" },
  // добавим ещё пару, чтобы скролл реально был
  { typeID: "CCA", RobloxUserId: 100000035, username: "ACAD_Lumen", division: "ACADEMY", rank: "Instructor" },
  { typeID: "CCA", RobloxUserId: 100000036, username: "ACAD_Halo", division: "ACADEMY", rank: "Senior Instructor" },

  // ===================== OTA — ECHO =====================
  { typeID: "OTA", RobloxUserId: 200000001, username: "ECHO_Kestrel", division: "ECHO", rank: "Tier 3" },
  { typeID: "OTA", RobloxUserId: 200000002, username: "ECHO_Raven", division: "ECHO", rank: "Tier 2" },
  { typeID: "OTA", RobloxUserId: 200000003, username: "ECHO_Mirror", division: "ECHO", rank: "Tier 1" },

  // ===================== OTA — DAGGER =====================
  { typeID: "OTA", RobloxUserId: 200000011, username: "DAGGER_Zero", division: "DAGGER", rank: "Tier 3" },
  { typeID: "OTA", RobloxUserId: 200000012, username: "DAGGER_Surge", division: "DAGGER", rank: "Tier 2" },
  { typeID: "OTA", RobloxUserId: 200000013, username: "DAGGER_Night", division: "DAGGER", rank: "Tier 1" },

  // ===================== OTA — RANGER =====================
  { typeID: "OTA", RobloxUserId: 200000021, username: "RANGER_Scout", division: "RANGER", rank: "Tier 3" },
  { typeID: "OTA", RobloxUserId: 200000022, username: "RANGER_Bolt", division: "RANGER", rank: "Tier 2" },
  { typeID: "OTA", RobloxUserId: 200000023, username: "RANGER_Apex", division: "RANGER", rank: "Tier 1" },

  // ===================== OTA — KING (Overwatch ranks) =====================
  { typeID: "OTA", RobloxUserId: 200000031, username: "KING_Leader", division: "KING", rank: "Overwatch Leader" },
  { typeID: "OTA", RobloxUserId: 200000032, username: "KING_Officer", division: "KING", rank: "Overwatch Officer" },
  { typeID: "OTA", RobloxUserId: 200000033, username: "KING_Captain", division: "KING", rank: "Overwatch Captain" },
  { typeID: "OTA", RobloxUserId: 200000034, username: "KING_Commander", division: "KING", rank: "Overwatch Commander" },

  // ===================== OTA — PHANTOM (смешаем tiers + overwatch) =====================
  { typeID: "OTA", RobloxUserId: 200000041, username: "PHANTOM_Void", division: "PHANTOM", rank: "Tier 3" },
  { typeID: "OTA", RobloxUserId: 200000042, username: "PHANTOM_Black", division: "PHANTOM", rank: "Tier 2" },
  { typeID: "OTA", RobloxUserId: 200000043, username: "PHANTOM_Wisp", division: "PHANTOM", rank: "Tier 1" },
  { typeID: "OTA", RobloxUserId: 200000044, username: "PHANTOM_Officer", division: "PHANTOM", rank: "Overwatch Officer" },
];

export default mockData;
