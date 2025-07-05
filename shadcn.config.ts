// shadcn.config.ts
import { defineConfig } from 'shadcn-ui/config'

export default defineConfig({
  $schema: 'https://ui.shadcn.dev/schema.json',
  project: {
    name: 'jiahaus3',
    type: 'app',
    baseColor: 'zinc',
    // Optional: change to 'light' or 'dark' if needed
    cssVariables: true,
  },
  paths: {
    components: 'components/ui',
    utils: 'lib/utils.ts',
  },
  tailwind: {
    config: 'tailwind.config.js',
    css: 'app/globals.css',
    baseColor: 'zinc',
  },
})
