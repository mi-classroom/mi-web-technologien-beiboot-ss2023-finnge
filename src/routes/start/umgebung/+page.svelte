<script lang="ts">
  import TopBar from "../../../components/TopBar.svelte";

import { data as arExperienceData } from "@data/arExperiences";
</script>

<TopBar title="ARlebnisse in der Nähe" />
<ul>
{#each arExperienceData as datum}

  <li>{datum.title}</li>

{/each}
</ul>
