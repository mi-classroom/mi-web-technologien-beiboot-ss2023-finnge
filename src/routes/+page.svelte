<script lang="ts">
  import type { PageData } from './$types';

  import HeroButton from '../components/HeroButton.svelte';

  export let data: PageData;
</script>

<section>
  <h1>ARlebnispfade Oberberg</h1>
  <h2>Oberbergischer Kreis</h2>

  <video></video>
</section>

<section>

  <HeroButton type="primary" href="/pfad">
    <span class="fs-md">Ich will nur ein bisschen</span><br>
    stöbern
  </HeroButton>
  <HeroButton type="secondary" href="/start">
    <span class="fs-md">Ich will die ARlebnisse</span><br>
    nutzen
  </HeroButton>

</section>

