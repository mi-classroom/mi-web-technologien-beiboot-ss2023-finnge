<script lang="ts">
  import type { PageData } from "./$types";

  import HeroButton from "../../components/HeroButton.svelte";
  import TopBar from "../../components/TopBar.svelte";

  export let data: PageData;
</script>

<TopBar title="Wie wollen Sie starten?" />

<HeroButton type="secondary" href="{data.pathname}/umgebung">
  ARlebnisse in der Umgebung anzeigen
</HeroButton>

<HeroButton type="primary" href="/arlebnis">
  ARlebnis via QR Code Scan starten
</HeroButton>

<HeroButton type="tertiary">Ich hab keine Ahnung</HeroButton>
