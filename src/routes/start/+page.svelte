<script lang="ts">
  import type { PageData } from "./$types";
  import { base } from "$app/paths";

  import HeroButton from "../../components/HeroButton.svelte";
  import TopBar from "../../components/TopBar.svelte";

  export let data: PageData;
</script>

<TopBar title="Wie wollen Sie starten?" />

<div>
  <HeroButton type="secondary" href="{data.pathname}/umgebung" icon="radar">
    ARlebnisse in der Umgebung anzeigen
  </HeroButton>

  <HeroButton type="primary" href="{base}/arlebnis" icon="scanner">
    ARlebnis via QR Code Scan starten
  </HeroButton>

  <HeroButton type="tertiary" icon="help">Ich hab keine Ahnung</HeroButton>
</div>

<style>
  div {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
    padding: var(--spacing-lg);
  }
</style>
