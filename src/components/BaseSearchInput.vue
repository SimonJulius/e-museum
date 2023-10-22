<script lang="ts" setup>
defineProps<{
  modelValue: string,
  placeholder?: string
}>()
defineEmits(['update:modelValue'])



</script>

<template>
  <div class="base-search-input">
    <input id="base-search-input" class="text-white" type="text" name="search-input" :value="modelValue"
      @input="$emit('update:modelValue', $event.target && ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder" />
  </div>
</template>