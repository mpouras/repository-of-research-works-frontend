import router from '../router';

export function getRouteNames() {
  return router.getRoutes().map((route) => route.name).filter(Boolean);
}

export function setDocumentTitle(route) {
  const defaultTitle = 'Repository of Research Works';
  document.title = route.meta?.title || defaultTitle;
}

export function setupMeta() {
  router.afterEach((to) => {
    setDocumentTitle(to);
  });
}

