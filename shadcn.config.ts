// shadcn.config.ts
export default {
  $schema: 'https://ui.shadcn.dev/schema.json',
  project: {
    name: 'jiahaus3',
    type: 'app',
    baseColor: 'zinc',
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
}
