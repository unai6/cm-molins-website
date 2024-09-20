module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'standard',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'padded-blocks': ['warn', 'never', { allowSingleLineBlocks: true }],
    'import/no-unresolved': 'off',
    'no-undef': 'off',
    'vue/define-macros-order': ['error', {
      order: ['defineModel', 'defineProps', 'defineEmits'],
      defineExposeLast: true,
    }],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      registeredComponentsOnly: false,
    }],
    'vue/no-v-html': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: { max: 3 },
      multiline: { max: 1 },
    }],
    'import/order': ['error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'internal', 'parent', 'external'],
        pathGroups: [
          // Vue imports.
          { pattern: 'vue', group: 'builtin' },
          { pattern: 'pinia', group: 'builtin' },
          { pattern: 'vue-router', group: 'builtin' },
          { pattern: 'vue-i18n', group: 'builtin' },
          { pattern: '@vueuse/core', group: 'builtin' },
          // Components.
          { pattern: '@dogfy/components/**', group: 'internal' },
          { pattern: '@/components/**', group: 'internal' },
          // Dogfy libraries.
          { pattern: '@/config', group: 'parent' },
          { pattern: '@dogfy/lib/**', group: 'parent' },
          { pattern: '@dogfy/services/**', group: 'parent' },
          { pattern: '@/lib/**', group: 'parent' },
        ],
        pathGroupsExcludedImportTypes: ['builtin', 'internal', 'parent'],
      },
    ],
  },
}
