module.exports = function(Person) {
  Person.anniversary = function(cb) {
    Person.getDataSource().connector.connect(function(err, db) {
      var collection = db.collection('person');
      var now = new Date();
      var day = now.getDate();
      var month = now.getMonth() + 1;
      var year = now.getYear();
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
    http: { path: '/birthdays', verb: 'get' },
    returns: { arg: 'birthdays', type: 'array' }
  });

  Person.admissionAnniversary = function(cb) {
    Person.getDataSource().connector.connect(function(err, db) {
      var collection = db.collection('person');
      var now = new Date();
      var day = now.getDate();
      var month = now.getMonth() + 1;
      var year = now.getYear();
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
    http: { path: '/admission-anniversary', verb: 'get' },
    returns: { arg: 'admission-anniversary', type: 'array' }
  });
};
