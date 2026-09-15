export const GRADE_OPTIONS = [
  "Nursery",
  "LKG",
  "UKG",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
] as const;

/** Zoho expects Class 1… not Grade 1…. Nursery / LKG / UKG stay as-is. */
export function toCrmGrade(grade: string): string {
  return grade.replace(/\bGrade\b/g, "Class");
}
