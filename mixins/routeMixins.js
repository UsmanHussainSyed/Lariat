export default {
  data() {
    return {
      productRoutes: [
        {
          route:
            'workspace_id-workspace-settings-lm-product-manage-product-list',
          matchRoutes: [
            'workspace_id-workspace-settings-lm-products-add',
            'workspace_id-workspace-settings-lm-products-id-edit',
            'workspace_id-workspace-settings-lm-product-manage-product-list',
          ],
          name: 'Products',
        },
        {
          route:
            'workspace_id-workspace-settings-lm-product-manage-product-variant',
          matchRoutes: [
            'workspace_id-workspace-settings-lm-product-manage-product-variant',
          ],
          name: 'Product Variants',
        },
        {
          route:
            'workspace_id-workspace-settings-lm-product-manage-category-setting',
          matchRoutes: [
            'workspace_id-workspace-settings-lm-product-manage-category-setting',
          ],
          name: 'Categories',
        },
      ],
      sharpSpringFormRoutes: [
        {
          route: 'workspace_id-workspace-settings-sharpspring-account',
          matchRoutes: ['workspace_id-workspace-settings-sharpspring-account'],
          name: 'SharpSpring Account',
        },
        {
          route: 'workspace_id-workspace-settings-sharpspring-external',
          matchRoutes: ['workspace_id-workspace-settings-sharpspring-external'],
          name: 'Contact Field Mapping for Sync',
        },
      ],
    }
  },
}
