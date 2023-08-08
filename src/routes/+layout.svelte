<script>
  import '../app.scss';
</script>

<div class="container">
  <slot />
</div>

<style>
  .container {
    max-width: 700px;
    margin: var(--spacing-xl) auto;
  }
</style>
