<script lang="ts">
  import { base } from "$app/paths";
  import { onMount, tick } from "svelte";

  import * as cookie from "../utils/cookie";

  import HeroButton from "../components/HeroButton.svelte";
  import Icon from "../components/Icon.svelte";

  let video: HTMLVideoElement;

  function scrollTo(id: string) {
    const el = document.getElementById(id);

    if (!el) {
      return;
    }

    el.scrollIntoView(true);
  }

  function startVideo() {
    cookie.set("has-seen-video", "true");
    video.play();
  }

  onMount(async () => {
    console.log("onMount");
    const hasSeenVideo = cookie.check("has-seen-video");

    await tick();

    if (hasSeenVideo) {
      scrollTo("navigation");
    }
  });
</script>

<section>
  <h1><span class="color-primary">AR</span>lebnispfade Oberberg</h1>
  <h2>Oberbergischer Kreis</h2>

  <div class="vertical-center horizontal-center height-full">
    <HeroButton
      type="primary"
      on:click={() => {
        scrollTo("video-tutorial");
        startVideo();
      }}
    >
      Einführung beginnen...
    </HeroButton>
  </div>
</section>

<section id="video-tutorial">
  <video bind:this={video}>
    <source src="{base}/media/intro-video.mp4" type="video/mp4" />
    <track
      src="{base}/media/intro-video.vtt"
      kind="captions"
      srclang="de"
      label="Deutsch"
      default
    />
  </video>
  <div class="bottom">
    <button
      on:click={() => {
        scrollTo("navigation");
      }}
    >
      <Icon name="expand-more" size="xxl" />
    </button>
  </div>
</section>

<section id="navigation">
  <HeroButton type="primary" href="{base}/pfad">
    <span class="fs-md">Ich will nur ein bisschen</span><br />
    stöbern
  </HeroButton>
  <HeroButton type="secondary" href="{base}/start">
    <span class="fs-md">Ich will die ARlebnisse</span><br />
    nutzen
  </HeroButton>
</section>

<style>
  :global(body) {
    scroll-snap-type: y mandatory;
  }

  h1 {
    font-size: var(--fs-xxl);
  }

  h2 {
    font-size: var(--fs-xl);
    font-weight: var(--fw-light);
  }
  section {
    scroll-snap-align: start;
    padding: var(--outer-margin);
    height: 100vh;
    position: relative;
  }
  #navigation {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-lg);
    background-image: url("images/aggertalsperre.jpg_667295446.jpg");
    background-size: cover;
    background-position: center;
  }

  #video-tutorial {
    /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; */
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  .bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-lg);
  }

  video {
    /* position: absolute;
    top: 0;
    left: 0; */
    width: 100% !important;
    height: 80vh !important;
    object-fit: contain;
    object-position: bottom center;
    /* z-index: -1; */
  }

  button {
    appearance: none;
    background: none;
    border: none;
    cursor: pointer;
  }
</style>
