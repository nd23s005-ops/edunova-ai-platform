// Shared syllabus catalog used by the Student Dashboard My Syllabus surface.
// Mirrors the same board / stage / stream / subject data shown on the Explore page.

export const SYLLABUS_BOARDS = ["CBSE", "State Board", "ICSE"] as const;
export type SyllabusBoard = (typeof SYLLABUS_BOARDS)[number];

export type SyllabusStage = {
  id: "primary" | "middle" | "high" | "higher";
  label: string;
  grades: string;
  classes: number[];
  desc: string;
  subjects: string[];
};

export const SYLLABUS_STAGES: SyllabusStage[] = [
  {
    id: "primary",
    label: "Primary School",
    grades: "Classes 1–5",
    classes: [1, 2, 3, 4, 5],
    desc: "Foundational learning across languages, numbers, and the world around us.",
    subjects: [
      "English",
      "Mathematics",
      "Environmental Science (EVS)",
      "General Knowledge",
      "Computer Basics",
    ],
  },
  {
    id: "middle",
    label: "Middle School",
    grades: "Classes 6–8",
    classes: [6, 7, 8],
    desc: "Core subjects deepen — algebra, life sciences, civics, and computer fundamentals.",
    subjects: [
      "English",
      "Mathematics",
      "Science",
      "Social Science",
      "Computer Science",
      "History",
      "Geography",
      "Political Science",
    ],
  },
  {
    id: "high",
    label: "High School",
    grades: "Classes 9–10",
    classes: [9, 10],
    desc: "Board-prep foundation across sciences, math, social science, and IT.",
    subjects: [
      "English",
      "Mathematics",
      "Science",
      "Social Science",
      "Computer Science",
      "History",
      "Geography",
      "Political Science",
      "Economics",
    ],
  },
  {
    id: "higher",
    label: "Higher Secondary",
    grades: "Classes 11–12",
    classes: [11, 12],
    desc: "Stream-based mastery in Science, Commerce, or Arts & Humanities.",
    subjects: [
      "English",
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "Botany",
      "Zoology",
      "Computer Science",
      "Accountancy",
      "Business Studies",
      "Economics",
      "Commerce",
      "History",
      "Geography",
      "Political Science",
    ],
  },
];

// Subjects eligible for AI Weekly Assessments (Tamil excluded by design).
export const ASSESSMENT_SUBJECTS = [
  "English",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Botany",
  "Zoology",
  "Computer Science",
  "Commerce",
  "Economics",
  "Accountancy",
  "Business Studies",
  "History",
  "Geography",
  "Political Science",
] as const;

export function stageForClass(cls: number | null | undefined): SyllabusStage | null {
  if (!cls) return null;
  return SYLLABUS_STAGES.find((s) => s.classes.includes(cls)) ?? null;
}

export function subjectsForClass(cls: number | null | undefined): string[] {
  return stageForClass(cls)?.subjects ?? [];
}

export function boardLabel(board: string | null | undefined): string {
  if (!board) return "";
  const map: Record<string, string> = {
    cbse: "CBSE",
    state_board: "State Board",
    icse: "ICSE",
    ib: "IB",
    cambridge: "Cambridge",
    nios: "NIOS",
    other: "Other",
  };
  return map[board] ?? board;
}
