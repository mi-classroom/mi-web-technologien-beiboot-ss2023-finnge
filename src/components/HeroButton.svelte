<script lang="ts">
  import Icon from "./Icon.svelte";

  export let type: "primary" | "secondary" | "tertiary" = "primary";

  export let icon: Icon["name"] | undefined = undefined;

  // bubble some Anchor attributes
  export let href: HTMLAnchorElement["href"] = "";
  export let target: "_self" | "_blank" | HTMLAnchorElement["target"] = "_self";
</script>

{#if href !== ""}
  <a {href} {target} data-type={type} on:click>
    {#if icon}
      <Icon name={icon} size="xxl" />
    {/if}
    <span class="text"><slot /></span>
  </a>
{:else}
  <button data-type={type} on:click>
    {#if icon}
      <Icon name={icon} size="xxl" />
    {/if}
    <span class="text"><slot /></span>
  </button>
{/if}

<style lang="scss">
  a,
  button {
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
    appearance: none;
    border: none;
  }

  [data-type="primary"] {
    background-color: var(--color-primary);

    &:hover,
    &:focus {
      background-color: var(--color-primary-dark);
    }
  }

  [data-type="secondary"] {
    background-color: var(--color-darkest);

    &:hover,
    &:focus {
      background-color: var(--color-darker);
    }
  }

  [data-type="tertiary"] {
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
