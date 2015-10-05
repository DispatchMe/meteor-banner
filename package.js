Package.describe({
  name: 'dispatch:banner',
  version: '1.0.3',
  summary: 'Banner component for mobile'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2');

  api.use([
    //core
    'jquery',
    'templating',
    'tracker',

    // atmosphere
    'percolate:velocityjs@1.2.1',
    'raix:eventemitter@0.1.3'
  ], 'web');

  api.addFiles([
    'banner.html',
    'banner.css',
    'banner.js'
  ], 'web');
});
