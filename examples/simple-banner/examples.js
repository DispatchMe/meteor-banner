if (Meteor.isClient) {
  Template.example1.helpers({
    isOpen: function () {
      return Template.banner.isVisible('example1') ? 'Open' : 'Closed';
    }
  });

  Template.example1.events({
    'click .show': function () {
      Template.banner.show('example1');
    },
    'click .hide': function () {
      Template.banner.hide('example1');
    }
  });

  Template.example2.helpers({
    isOpen: function () {
      return Template.banner.isVisible('example2') ? 'Open' : 'Closed';
    }
  });

  Template.example2.events({
    'click .show': function () {
      Template.banner.show('example2');
    },
    'click .hide': function () {
      Template.banner.hide('example2');
    }
  });
}
