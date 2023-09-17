import type { PageLoad } from "./$types";

import { data as arExperienceData } from "@data/arExperiences";

export const load = (async ({ params }) => {
  const currentArExperience = arExperienceData.find(
    (arExperience) => arExperience.id === params.id,
  );

  return currentArExperience;
}) satisfies PageLoad;
