import Backend from '@/plugins/services/Backend';

export default {
  install(app, options = {}) {
    const backend = new Backend(options.storageKey);

    app.config.globalProperties.$backend = backend;

    app.provide('backend', backend);
  }
};
