module.exports = function(Person) {
  Person.birthdays = function(cb) {
    Person.getDataSource().connector.connect(function(err, db) {
      var collection = db.collection('person');
      var now = new Date();
      var day = now.getDate();
      var month = now.getMonth() + 1;
      collection.aggregate([
      {
        $project: {
          "name": 1,
          "userLdap": 1,
          "userSlack": 1,
          "month": {
            "$month": "$birthday"
          },
          "day": {
            "$dayOfMonth": "$birthday"
          },
          "year": {
            "$year": "$birthday"
          },
          "photo": 1,
          "active": 1
        }
      },
      {
        $match:{
          "month":month,
          "day":day,
          "active":true
        }
      }], cb);
    });
  };

  Person.remoteMethod('birthdays', {
    description: 'Lists the birthday people.',
    http: { path: '/birthdays', verb: 'get' },
    returns: { arg: 'birthdays', type: 'array' }
  });

  Person.admissionAnniversary = function(cb) {
    Person.getDataSource().connector.connect(function(err, db) {
      var collection = db.collection('person');
      var now = new Date();
      var day = now.getDate();
      var month = now.getMonth() + 1;
      collection.aggregate([
      {
        $project: {
          "name": 1,
          "userLdap": 1,
          "userSlack": 1,
          "month": {
            "$month": "$admission"
          },
          "day": {
            "$dayOfMonth": "$admission"
          },
          "year": {
            "$year": "$admission"
          },
          "photo": 1,
          "active": 1
        }
      },
      {
        $match:{
          "month":month,
          "day":day,
          "active":true
        }
      }], cb);
    });
  };

  Person.remoteMethod('admissionAnniversary', {
    description: 'Lists the admission anniversary people.',
    http: { path: '/admission-anniversary', verb: 'get' },
    returns: { arg: 'admission-anniversary', type: 'array' }
  });
};
