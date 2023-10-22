<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router';

import AppNavbar from '@/components/AppNavbar.vue';
import { Skeletor } from 'vue-skeletor';
import { useAppStore } from '@/stores/app-store';

import type { ArtDetail } from '@/models/http-req-res.interface';


const dimensions = computed(() => {
    let dimension = ""
    artDetails.value?.artObject.dimensions.forEach(dim => {
        dimension += `${dim.type} ${dim.value} ${dim.unit} `
    })

    return dimension.trim()
})

const appStore = useAppStore()

const router = useRouter()

const artDetails = ref<ArtDetail>()

const getDetails = async () => {
    const id = router.currentRoute.value.params.id as string
    artDetails.value = await appStore.getArtDetails(id)
}

const makeASearch = async (searchValue: string) => {
    router.push('/?searchValue=' + searchValue)
}
onBeforeMount(async () => {
    getDetails()
})
</script>


<template>
    <div class="art-details-page">
        <AppNavbar class="mg-b-2" @brandLogoClick="() => $router.go(-1)" @search="makeASearch" />
        <main>
            <button class="text-razzmatazz btn-no-default art-details-page__go-back-button flex text-size-md mg-b-1 pointer"
                @click="$router.push('/')">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 16L10.707 11.707L15 7.414L13.586 6L7.879 11.707L13.586 17.414L15 16Z" fill="#E10856" />
                </svg>

                Back to the List</button>
            <figure>
                <Skeletor v-if="appStore.isMakingHttlRequest" width="100%" height="100%"></Skeletor>
                <img v-else-if="artDetails?.artObject.hasImage" :src="artDetails?.artObject.webImage.url"
                    :alt="artDetails?.artObject.title" />
                <img v-else src="../assets/images/Card.png" alt="">
                <figcaption>{{ artDetails?.artObject.title }}</figcaption>
            </figure>
            <summary class="art-details-page__detail-summary">
                <section>
                    <div class="text-size-sm">Title</div>
                    <div class="text-white">{{ artDetails?.artObject.title }}</div>
                </section>
                <section>
                    <div class="text-size-sm">Artist</div>
                    <div class="text-white">{{ artDetails?.artObject.principalOrFirstMaker }}</div>
                </section>
                <section>
                    <div class="text-size-sm">Object Type</div>
                    <div class="text-white">{{ artDetails?.artObject.objectTypes[0] }}</div>
                </section>
                <section>
                    <div class="text-size-sm">Measurements</div>
                    <div class="text-white">{{ dimensions }}</div>
                </section>
                <section>
                    <div class="text-size-sm">Description</div>
                    <div class="text-white">{{ artDetails?.artObject.description }}</div>
                </section>
            </summary>
        </main>
        <footer class="text-center bg-nero-02 pd-x-1_6 pd-y-2 text-gray-02-light  text-size-sm">Art API</footer>
    </div>
</template>

