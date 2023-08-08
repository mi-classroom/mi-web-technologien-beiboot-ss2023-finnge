<script lang="ts">
  import Icon from "./Icon.svelte";

  export let type: "primary" | "secondary" | "tertiary" = "primary";

  export let icon: Icon["name"] | undefined;

  // bubble some Anchor attributes
  export let href: HTMLAnchorElement["href"] = "";
  export let target: "_self" | "_blank" | HTMLAnchorElement["target"] = "_self";
</script>

<a {href} {target} data-type={type}>
  {#if icon}
    <Icon name={icon} size="xxl" />
  {/if}
  <span class="text"><slot /></span>
</a>

<style lang="scss">
  a {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-xs);
    justify-items: center;
    padding: var(--spacing-xl) var(--spacing-md);
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

  .text {
    text-wrap: balance;
  }
</style>
