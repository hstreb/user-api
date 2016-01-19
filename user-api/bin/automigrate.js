var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.personDS;
ds.automigrate('person', function(err) {
  if (err) throw err;

  var people = [
    {
      id: 1,
      name: 'Foolano Bar',
      userLdap: 'foo.bar',
      userSlack: 'foo.bar',
      description: 'fooooooo',
      photo: '',
      birthday: new Date(631182600),
      admission: new Date(1453192200),
      shutdown: null,
      active: true
    },
    {
      id: 2,
      name: 'Humberto Streb',
      userLdap: 'humberto.streb',
      userSlack: 'humberto.streb',
      description: '2berto',
      photo: '',
      birthday: new Date(428594400),
      admission: new Date(1380011400),
      shutdown: null,
      active: true
    }
  ];
  var count = people.length;
  people.forEach(function(person) {
    app.models.person.create(person, function(err, model) {
      if (err) throw err;

      console.log('Created:', model);

      count--;
      if (count === 0)
        ds.disconnect();
    });
  });
});
