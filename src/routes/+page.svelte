<script lang="ts">
  import type { PageData } from './$types';

  import HeroButton from '../components/HeroButton.svelte';

  export let data: PageData;
</script>

<section>
  <div class="foreground">
    <h1><span class="color-primary">AR</span>lebnispfade Oberberg</h1>
    <h2>Oberbergischer Kreis</h2>
  </div>


  <video class="background">
    <source src="/videos/intro-video.mp4" type="video/mp4" />
    <track src="/videos/intro-video.vtt" kind="captions" srclang="de" label="Deutsch" />
  </video>
</section>

<section id="image">

  <HeroButton type="primary" href="/pfad">
    <span class="fs-md">Ich will nur ein bisschen</span><br>
    stöbern
  </HeroButton>
  <HeroButton type="secondary" href="/start">
    <span class="fs-md">Ich will die ARlebnisse</span><br>
    nutzen
  </HeroButton>

</section>

<style>

  section {
    padding: var(--outer-margin);
    height: 100vh;
    position: relative;
  }
  #image {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-lg);
    background-image: url('/images/aggertalsperre.jpg_667295446.jpg');
    background-size: cover;
    background-position: center;
  }

  video.background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: fit;
    object-position: bottom center;
  }

  .foreground {
    z-index: 1;
  }
</style>
