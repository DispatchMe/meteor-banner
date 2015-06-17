var banners = {};

Template.banner.helpers({
  isVisible: function () {
    var banner = banners[this.id];
    return banner && banner.isVisible;
  }
});

Template.banner.onCreated(function () {
  // Add the banner to the hash of banners by id if it does not exist
  if (banners[this.data.id]) return;

  banners[this.data.id] = {
    isVisible: false,
    isVisibleDep: new Tracker.Dependency()
  };
});

Template.banner.onRendered(function () {
  var banner = banners[this.data.id];
  if (!banner) return;

  banner.bannerEl = this.find('.banner');
  banner.conentEl = this.find('.banner-content');
  banner.height = $(banner.bannerEl).outerHeight();
});

/**
 * Show all instances of the banner.
 * The first time show is called the banner will animate in.
 * @param {String} id The id given to the banner.
 * @param {Object} [options]
 *        {Number}   [options.duration] The duration of the animation.
 *        {Number}   [options.delay] The amount to delay the animation by.
 *        {String}   [options.easing] The type of easing to apply to the animation.
 *        {Function} [options.begin] A function to run before the animation.
 *        {Function} [options.complete] A function to run after the animation.
 */
Template.banner.show = function (id, options) {
  var banner = banners[id];
  if (!banner) return;

  options = options || {};

  $(banner.conentEl).velocity({ top: banner.height }, {
    duration: options.duration || 600,
    delay: options.delay || 0,
    easing:  options.easing || "easeInOutExpo",
    begin: function () {
      options.begin && options.begin();
    },
    complete: function () {
      banner.isVisible = true;
      banner.isVisibleDep.changed();

      options.complete && options.complete();
    }
  });
};

/**
 * Hide all instances of the banner.
 * The first time hide is called the banner will animate out.
 * @param {String} id The id given to the banner.
 * @param {Object} [options]
 *        {Number}   [options.duration] The duration of the animation.
 *        {Number}   [options.delay] The amount to delay the animation by.
 *        {String}   [options.easing] The type of easing to apply to the animation.
 *        {Function} [options.begin] A function to run before the animation.
 *        {Function} [options.complete] A function to run after the animation.
 */
Template.banner.hide = function (id, options) {
  var banner = banners[id];
  if (!banner) return;

  options = options || {};

  $(banner.conentEl).velocity({ top: 0 }, {
    duration: options.duration || 600,
    delay: options.delay || 0,
    easing: options.easing || "easeInOutExpo",
    begin: function () {
      options.begin && options.begin();
    },
    complete: function () {
      banner.isVisible = false;
      banner.isVisibleDep.changed();

      options.complete && options.complete();
    }
  });
};

/**
 * Reactively returns whether the banner is visible or not.
 * @param  {String} id The id given to the banner.
 * @return {Boolean}
 */
Template.banner.isVisible = function (id) {
  var banner = banners[id];
  if (!banner) return;

  banner.isVisibleDep.depend();

  return banner.isVisible;
};
