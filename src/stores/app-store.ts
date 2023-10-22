import { http } from '@/http'
import { defineStore } from 'pinia'

import type { ArtCollection, ArtDetail } from '@/models/http-req-res.interface'

export const useAppStore = defineStore({
  id: 'app-store',
  state: () => ({
    isMakingHttlRequest: false,
    culture: 'en',
    collectionQueryProperties: {
      p: 0,
      ps: 9,
      q: '',
      type: '',
      imgonly: false
    },
    pageTrackers: {
      currentPage: 1,
      totalNumberOfPages: 1
    }
  }),

  actions: {
    setCollectionQueryProperties(queryParams: {
      p: number, ps: number, q: string, type: string
      imgonly: boolean
    }) {
      this.collectionQueryProperties = queryParams
    },
    setCurrentPage(currentPage: number) {
      this.pageTrackers.currentPage = currentPage
    },
    setTotalNumberOfPages(totalNumberOfPages: number) {
      this.pageTrackers.totalNumberOfPages = totalNumberOfPages
    },
    async getArts() {
      try {
        this.isMakingHttlRequest = true
        const requestParams = {
          path: `/${this.culture}/collection`
        }
        const params = { ...this.collectionQueryProperties }
        const data = await http.get<ArtCollection, null>(requestParams, { params })
        return data
      } catch (error) {
        console.error(error)
      } finally {
        this.isMakingHttlRequest = false
      }
    },
    async getArtDetails(objectId: string) {
      try {
        this.isMakingHttlRequest = true
        const requestParams = {
          path: `/${this.culture}/collection/${objectId}`
        }
        const data = await http.get<ArtDetail, null>(requestParams)
        return data
      } catch (error) {
        console.error(error)
      } finally {
        this.isMakingHttlRequest = false
      }
    }
  },
  persist: true,
})
