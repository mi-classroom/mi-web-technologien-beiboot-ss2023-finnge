<script lang="ts">
  import TopBar from "@/components/TopBar.svelte";
  import {
    currentLocation,
    hasLiveLocation,
    startLocationWatch,
    stopLocationWatch,
  } from "@stores/location";

  import { niceDistance } from "@/utils/geoCoords";

  import { data as arExperienceData } from "@data/arExperiences";
  import { onMount } from "svelte";

  onMount(() => {
    startLocationWatch();

    return () => {
      stopLocationWatch();
    };
  });
</script>

<TopBar title="ARlebnisse in der Nähe" />
<ul>
  {#each arExperienceData as datum}
    <li>{datum.title} ({$hasLiveLocation ? niceDistance(
      datum.geoLocation,
      $currentLocation
    ) : '?? km'})</li>
  {/each}
</ul>

{#if $hasLiveLocation}
  <p>Latitude: {$currentLocation.latitude}</p>
  <p>Longitude: {$currentLocation.longitude}</p>
{:else}
  <p>Location not available</p>
{/if}
