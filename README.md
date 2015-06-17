Meteor Banner
==============

A banner component for meteor.

##Usage
`meteor add dispatch:banner`

Wrap any content with the banner template to have a banner displayed at the top of the content when open.
You must specify an id for the banner.  If multiple banners have the same id, they will all open when one is opened.

```
{{#banner id='example'}}
  <h1>Welcome to Meteor Banner!</h1>
{{/banner}}
```

```
// Show the example banner
Template.banner.show('example');

// Hide the example banner
Template.banner.hide('example');

// Reactively returns true or false
Template.banner.isVisible('example');
```
