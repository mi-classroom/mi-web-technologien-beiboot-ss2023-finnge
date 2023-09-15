<script lang="ts">
  import TopBar from "../../components/TopBar.svelte";

  import { paths } from "@data/arExperiences";
</script>

<TopBar title="Bitte wählen Sie einen ARlebnispfad" />

<ul>
  {#each paths as path}
    <li style="--background-image: url({path.backgroundImagePath})">
      <span class="title">{path.title}</span>
    </li>
  {/each}
</ul>

<style>
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    border-bottom: 1px solid var(--color-lighter);
    display: flex;
    justify-content: space-between;
    background-image: var(--background-image);
    background-size: cover;
    background-position: center;
    color: white;
    padding-top: var(--spacing-xxl);
    position: relative;
    aspect-ratio: 21/9;
  }

  li::after {
    content: "";
    display: block;
    height: 60%;
    width: 100%;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 30%,      rgba(0, 0, 0, 0)
    );
    position: absolute;
    bottom: 0;
    left: 0;
  }

  li .title{
    font-size: var(--fs-xl);
    font-weight: var(--fw-normal);
    z-index: 1;
    position: absolute;
    bottom: var(--spacing-md);
    left: var(--outer-margin);
  }
</style>
