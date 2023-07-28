<script lang="ts">
  import { page } from '$app/stores';

  $: console.log($page.data)
</script>

<header>
  <a href="../">Zurück</a>
  <h1><slot
  </h1>
</header>

<slot />