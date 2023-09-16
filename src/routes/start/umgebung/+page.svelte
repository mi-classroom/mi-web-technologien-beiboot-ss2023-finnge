<script lang="ts">
  import TopBar from "@/components/TopBar.svelte";
  import {
    currentLocation,
    hasLiveLocation,
    startLocationWatch,
    stopLocationWatch,
  } from "@stores/location";
  import { base } from "$app/paths";

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
    <li>
      <a class="title" href="{base}/arlebnis/{datum.id}">{datum.title}</a>
      <span class="distance"
        >{$hasLiveLocation
          ? niceDistance(datum.geoLocation, $currentLocation)
          : "?? km"}</span
      >
    </li>
  {/each}
</ul>

<p class="m-t-xxl fs-xs">
  {#if $hasLiveLocation}
    Latitude: <span class="ff-mono">{$currentLocation.latitude}</span><br />
    Longitude: <span class="ff-mono">{$currentLocation.longitude}</span>
  {:else}
    Location not available
  {/if}
</p>

<style>
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: var(--spacing-md) var(--outer-margin);
    border-bottom: 1px solid var(--color-lighter);
    display: flex;
    justify-content: space-between;
  }

  li:last-child {
    border-bottom: none;
  }

  .title {
    font-weight: bold;
  }

  p {
    padding: var(--spacing-xxs) var(--outer-margin);
  }
</style>
