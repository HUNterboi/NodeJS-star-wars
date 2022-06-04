var expect = require('chai').expect;
var getJediMW = require('../../../../middleware/jedi/getJediMW');

describe('getJediMW middleware ', function () {
  //test1
  it('should set res.locals.jedi with an array of jedi from db', function (done) {
    const mw = getJediMW({
      JediModel: {
        find: (p1, cb) => {
          cb(null, ['Anakin', 'Obi-Wan'])
        }
      }
    });

    const resMock = {
      locals: {}
    };

    mw({},
    resMock,
    (err) => {
        expect(err).to.be.eql(undefined);
        expect(resMock.locals).to.be.eql({ jedi: ['Anakin', 'Obi-Wan'] });
        done();
    })
  });

  //test2
  it('should call next with error when there is a db problem', function (done) {
    const mw = getJediMW({
      JediModel: {
        find: (p1, cb) => {
          cb('adatbazishiba', null)
        }
      }
    });

    mw({},
    {},
    (err) => {
        expect(err).to.be.eql('adatbazishiba');
        done();
    })
  });
});