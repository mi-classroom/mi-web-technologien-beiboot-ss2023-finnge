<script lang="ts">
  import Icon from "./Icon.svelte";

  export let title: string;

  import { page } from '$app/stores';

  $: oneDirUp = (() => {
    // Remove trailing slash if it exists
    const currentURL = !$page.url.href.endsWith('/') ? $page.url.href + '/' : $page.url.href;

    // Generate the one page up URL
    return new URL('..', currentURL).href;}
  )();

</script>

<header>
  <a href="{oneDirUp}">
    <Icon name="arrow-back" size="xl" />
  </a>
  <h1>{title}</h1>
</header>

<style>
  header {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-lg) var(--outer-radius);
    background-color: var(--color-lightest);
  }

  h1 {
    font-size: var(--fs-xl);
    font-weight: var(--fw-normal);
  }

  a {
    display: block;
    line-height: 0;
  }

</style>
