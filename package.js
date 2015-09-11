Package.describe({
  name: 'dispatch:banner',
  version: '1.0.3',
  summary: 'Banner component for mobile'
});

Package.onUse(function (api) {
  api.use([
    //core
    'templating@1.1.1',
    'tracker@1.0.7',

    // atmosphere
    'percolate:velocityjs@1.2.1',
    'raix:eventemitter@0.1.2'
  ], 'web');

  api.addFiles([
    'banner.html',
    'banner.css',
    'banner.js'
  ], 'web');
});
