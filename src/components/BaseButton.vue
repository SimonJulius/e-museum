<script lang="ts" setup>
defineProps<{
  buttonClass: string
  type: 'submit' | 'button'
}>()
</script>

<template>
  <div class="base-button">
    <button :class="buttonClass + ' pointer'" :type="type">
      <slot />
    </button>
  </div>
</template>

