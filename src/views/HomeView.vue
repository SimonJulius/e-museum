<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';

import AppNavbar from '@/components/AppNavbar.vue';
import AppGallery from '@/components/AppGallery.vue';
import { useAppStore } from '@/stores/app-store';
import { useRouter } from 'vue-router';

const appStore = useAppStore()
const router = useRouter()

const collections = ref()

const pageCount = ref(0)


const queryStringValue = ref('')
const totalNumberOfArt = ref(0)

const backToDefault = async () => {
  appStore.setCollectionQueryProperties({ p: 0, ps: 9, q: router.currentRoute.value.query.searchValue as string || '', type: '', imgonly: false })
  const data = await appStore.getArts()
  totalNumberOfArt.value = data?.countFacets.ondisplay as number
  pageCount.value = data && Math.ceil(totalNumberOfArt.value / 9) || 0
  appStore.setTotalNumberOfPages(pageCount.value)
  collections.value = data?.artObjects
}
onBeforeMount(async () => {
  await backToDefault()
})


const makeASearch = async (queryString: string) => {
  queryStringValue.value = queryString
  appStore.setCollectionQueryProperties({ p: 0, ps: 9, q: queryString, type: '', imgonly: false })
  const data = await appStore.getArts()
  totalNumberOfArt.value = data?.countFacets.ondisplay as number
  pageCount.value = data && Math.ceil(totalNumberOfArt.value / 9) || 0
  appStore.setTotalNumberOfPages(pageCount.value)
  collections.value = data?.artObjects
}

const goToPage = async (currentPage: number) => {
  appStore.setCollectionQueryProperties({ p: currentPage, ps: 9, q: queryStringValue.value, type: '', imgonly: false })
  const data = await appStore.getArts()
  collections.value = data?.artObjects
}



</script>

<template>
  <main>
    <div class="home-view">
      <AppNavbar @search="makeASearch" @brand-logo-click="backToDefault" />
      <div class="home-view__gallery">
        <AppGallery :collections="collections" :total-pages="appStore.pageTrackers.totalNumberOfPages"
          :total-number-of-art="totalNumberOfArt" @get-page="goToPage" />
      </div>
    </div>
  </main>
</template>
