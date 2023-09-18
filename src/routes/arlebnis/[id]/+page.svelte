<script lang="ts">
  import { onMount } from "svelte";
  import eruda from "eruda";
  import type { WebGLRenderer } from "three";

  import type { PageData } from "./$types";

  import TopBar from "@/components/TopBar.svelte";
  import {
    currentLocation,
    hasLiveLocation,
    startLocationWatch,
    stopLocationWatch,
  } from "@stores/location";
  import { niceDistance } from "@/utils/geoCoords";

  export let data: PageData;

  let renderer: WebGLRenderer;
  let canvasElement: HTMLCanvasElement;

  onMount(() => {
    // Debug
    eruda.init();

    // Location
    startLocationWatch();

    return () => {
      stopLocationWatch();
    };
  });
</script>

<div class="wrapper">
  <TopBar
    title={(data.title ?? "ARlebnis") +
      ($hasLiveLocation && data.geoLocation
        ? " (" + niceDistance(data.geoLocation, $currentLocation) + " entfernt)"
        : "")}
  />

  <svelte:component
    this={data.sceneComponent}
    bind:renderer
    bind:canvasElement
  />

  {#if data.sceneComponent === undefined}
    <div class="centered">
      <p>Keine AR-Ansicht verfügbar.</p>
    </div>
  {/if}
</div>

<style>
  .wrapper {
    background-color: var(--color-darkest);
    color: var(--color-lighter);
  }
</style>
