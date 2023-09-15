import type { EntryGenerator } from "./$types";

import { data as arExperienceData } from "@data/arExperiences";

export const entries = (() => {
  return arExperienceData.map((arExperience) => ({
    id: arExperience.id,
    data: arExperience,
  }));
}) satisfies EntryGenerator;
