import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      mocks: {
        'vue-screen': {
          screen: {
            width: 1023,
          },
        },
      },
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    }
  })
)
