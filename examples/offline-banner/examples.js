if (Meteor.isClient) {
  var statusVar = new ReactiveVar();
  var lastOnline = null;

  var fuzzyTimeSince = function (date) {
    if (!date) return;

    var timeDifference = Math.floor((new Date() - date) / 1000 / 60);

    if (timeDifference === 0) return 'less than a minute';
    if (timeDifference === 1) return 'one minute';
    if (timeDifference < 60) return timeDifference + ' minutes';
    if (timeDifference >= 60 && timeDifference <= 120) return 'about an hour';

    return 'about ' + Math.floor(timeDifference / 60) + ' hours';
  };

  Template.offlineBanner.helpers({
    statusClass: function () {
      var status = statusVar.get();

      if (status === 'waiting') return 'banner--warning';
      if (status === 'connecting') return 'banner--loading';

      return 'banner--success';
    },
    offlineMessage: function () {
      // Update every minute to redisplay time
      TimeTracker.changeIn(60000);

      var status = statusVar.get();

      if (status === 'waiting') return 'Offline for ' + fuzzyTimeSince(lastOnline);
      if (status === 'connecting') return 'Attempting to connect';

      return 'Connected!';
    }
  });

  Tracker.autorun(function() {
    var status = Meteor.status().status;

    // If the status changes from connecting to waiting, wait before
    // updating the status bar in order to show the attempting to connect copy.
    var statusChangeShouldWait = statusVar.get() === 'connecting' && status === 'waiting';

    Meteor.setTimeout(function () {
      statusVar.set(status);
    }, statusChangeShouldWait ? 3000 : 0);

    if (status === 'connected') {
      // Reset last online time when network reconnects
      lastOnline = null;

      Template.banner.hide('offline', { delay: 2000 });
    } else {
      lastOnline = lastOnline || new Date();

      Template.banner.show('offline');
    }
  });
}
