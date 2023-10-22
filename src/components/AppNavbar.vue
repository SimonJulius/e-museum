<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useScreen } from 'vue-screen'

import AppLogo from './icons/AppLogo.vue';
import BaseButton from './BaseButton.vue';
import BaseSearchInput from './BaseSearchInput.vue'; import { useAppStore } from '@/stores/app-store';


const appStore = useAppStore()

const emits = defineEmits<{
  (e: 'search', val: string): void
  (e: 'brandLogoClick'): void
}>()

const isSearching = ref(false)

const searchValue = ref<string>('')

const handleSearchClick = () => {
  isSearching.value = true

  watch(appStore, () => {
    if (!appStore.isMakingHttlRequest) {
      isSearching.value = false
    }
  })
  emits('search', searchValue.value)
}

const screen = useScreen()



</script>

<template>
  <nav class="app-navbar">
    <div class="app-navbar__logo text-gray-02-light pointer" @click="() => emits('brandLogoClick')">
      <AppLogo />
      <div class="text-medium">Art API</div>
    </div>
    <form class="app-navbar__search" @submit.prevent="handleSearchClick">
      <BaseSearchInput class="flex-grow-1" v-model="searchValue" placeholder="Please type in your search" />
      <div v-if="screen.width > 600" class="app-navbar__search-button pointer">
        <base-button button-class="btn-primary" type="submit">
          <span v-if="!appStore.isMakingHttlRequest || !isSearching">Search</span>
          <svg v-else xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px"
            height="20px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#ffffff" stroke="none">
              <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1"
                values="0 50 51;360 50 51"></animateTransform>
            </path>
          </svg>
        </base-button>
      </div>
      <svg @click="handleSearchClick" v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px"
        height="30px" class="text-razzmatazz">
        <path
          d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"
          fill="currentColor" />
      </svg>
    </form>
  </nav>
</template>

