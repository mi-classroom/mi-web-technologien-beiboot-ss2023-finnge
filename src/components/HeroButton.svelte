<script lang="ts">
  export let type: "primary" | "secondary" | "tertiary" = "primary";

  export let icon: string = "";

  // bubble some Anchor attributes
  export let href: HTMLAnchorElement["href"] = "";
  export let target: "_self" | "_blank" | HTMLAnchorElement["target"] = "";
</script>

<a {href} {target} data-type={type}>
  {#if icon}
    <span class="icon">{icon}</span>
  {/if}
  <slot />
</a>

<style lang="scss">
  a {
    display: inline-block;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius-sm);
    text-decoration: none;
    color: var(--color-lightest);
    font-size: var(--fs-xl);
    line-height: var(--lh-xs);
    text-align: center;
  }

  a[data-type="primary"] {
    background-color: var(--color-primary);

    &:hover,
    &:focus {
      background-color: var(--color-primary-dark);
    }
  }

  a[data-type="secondary"] {
    background-color: var(--color-darkest);

    &:hover,
    &:focus {
      background-color: var(--color-darker);
    }
  }

  a[data-type="tertiary"] {
    background-color: var(--color-light);
    color: var(--color-darkest);

    &:hover,
    &:focus {
      background-color: var(--color-lighter);
    }
  }
</style>
