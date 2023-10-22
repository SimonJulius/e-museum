import type { Plugin } from 'vue';
import { http } from '@/http';
import type { HttpClient } from '@/models/http-client.model'



declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $http: HttpClient;
    }
}

const httpBoot: Plugin = {
    install: (app) => {
        app.config.globalProperties.$http = http;
    },
};

export default httpBoot;