<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import type { CollectionObject } from '@/models/http-req-res.interface';
import { Skeletor } from 'vue-skeletor';
import { useAppStore } from '@/stores/app-store';
import BaseButton from './BaseButton.vue'

const router = useRouter()


const appStore = useAppStore()

// TODO: implement lazy loading for the images using IntersectionObserver

const viewDetail = (objectId: string) => {
  router.push('/art-detail/' + objectId)
}
const props = defineProps<{
  collections: CollectionObject[]
  totalPages: number
  totalNumberOfArt: number
}>()

const emits = defineEmits<{
  (event: 'getPage', currentPageValue: number): void
}>()

const buttons = computed(() => {
  const buttons = [];
  if (props.totalPages <= 4) {
    for (let page = 1; page <= props.totalPages; page++) {
      buttons.push({ page, label: page });
    }
  } else if (appStore.pageTrackers.currentPage <= 2) {
    buttons.push({ page: 1, label: 1 }, { page: 2, label: 2 }, { page: null, label: '...' }, { page: props.totalPages, label: props.totalPages });
  } else if (appStore.pageTrackers.currentPage >= props.totalPages - 1) {
    buttons.push({ page: 1, label: 1 }, { page: null, label: '...' });
    for (let page = props.totalPages - 1; page <= props.totalPages; page++) {
      buttons.push({ page, label: page });
    }
  } else {
    buttons.push({ page: 1, label: 1 }, { page: null, label: '...' }, { page: appStore.pageTrackers.currentPage, label: appStore.pageTrackers.currentPage }, { page: null, label: '...' }, { page: props.totalPages, label: props.totalPages });
  }
  return buttons;
})



const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    appStore.setCurrentPage(page)
  }
  emits('getPage', appStore.pageTrackers.currentPage)
}



</script>

<template>
  <div class="app-gallery">
    <header class="app-gallery__header text-medium">
      <span v-if="!appStore.collectionQueryProperties.q">All artwork</span>
      <span v-else>Found {{ totalNumberOfArt }} results for: <span class="text-white">{{
        appStore.collectionQueryProperties.q }}</span></span>
    </header>
    <main class="app-gallery__main">
      <div class="app-gallery__image-frame" v-for="(art) in collections" :key="art.id">
        <div class="app-gallery__image-frame--cta" v-if="!appStore.isMakingHttlRequest">
          <base-button class="app-gallery__image-frame--cta-btn pointer" button-class="btn-primary" type="submit"
            @click="viewDetail(art.objectNumber)">
            View Details
          </base-button>
        </div>
        <div class="app-gallery__image-maker text-teal text-size-xsm">{{ art.principalOrFirstMaker }}</div>
        <Skeletor v-if="appStore.isMakingHttlRequest" width="100%" height="30vh"></Skeletor>
        <img v-else-if="art.hasImage" :src="art.webImage.url" alt="">
        <img v-else src="../assets/images/Card.png" alt="">

        <div class="app-gallery__image-title" v-if="!appStore.isMakingHttlRequest">{{ art.title }}
        </div>
      </div>
    </main>

    <nav aria-label="Gallery Navigation" class="app-gallery__navigation">
      <button aria-label="Previous Page" class="app-gallery__navigation__menu-item text-size-md text-white bg-eerie"
        :disabled="appStore.pageTrackers.currentPage <= 1" @click="goToPage(appStore.pageTrackers.currentPage - 1)">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 16L10.707 11.707L15 7.414L13.586 6L7.879 11.707L13.586 17.414L15 16Z" fill="#C4C4C4" />
        </svg>
      </button>
      <button v-for="button in buttons" :key="button.page"
        :class="['app-gallery__navigation__menu-item', 'text-size-md', 'text-white', 'bg-eerie', { active: appStore.pageTrackers.currentPage === button.label }]"
        @click="goToPage(button.page)">{{ button.label }}</button>
      <button aria-label="Next Page" class="app-gallery__navigation__menu-item text-size-md text-white bg-eerie"
        :disabled="appStore.pageTrackers.currentPage >= totalPages"
        @click="goToPage(appStore.pageTrackers.currentPage + 1)">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 8L13.293 12.293L9 16.586L10.414 18L16.121 12.293L10.414 6.586L9 8Z" fill="#C4C4C4" />
        </svg>
      </button>
    </nav>
  </div>
</template>

