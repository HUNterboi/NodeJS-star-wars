var expect = require('chai').expect;
var getJediRecordMW = require('../../../../middleware/jedi/getJediRecordMW');

describe('getJediRecordMW middleware ', function () {
  //test1
  it('should set res.locals.jedi_record with a jedi_record object from db', function (done) {
    const mw = getJediRecordMW({
      JediModel: {
        findOne: (p1, cb) => {
          expect(p1).to.be.eql({ _id: '420' })
          cb(null, 'mockJedi')
        }
      }
    });

    const resMock = {
      locals: {}
    };

    mw({
      params:{
        jedi_id: '420'
      }
    },
    resMock,
    (err) => {
        expect(err).to.be.eql(undefined);
        expect(resMock.locals).to.be.eql({ jedi_record: 'mockJedi' });
        done();
    })
  });

//test2
  it('should call next with error when there is a db problem', function (done) {
    const mw = getJediRecordMW({
      JediModel: {
        findOne: (p1, cb) => {
          expect(p1).to.be.eql({ _id: '420' })
          cb('adatbazishiba', null)
        }
      }
    });

    const resMock = {
      locals: {}
    };

    mw({
      params:{
        jedi_id: '420'
      }
    },
    resMock,
    (err) => {
        expect(err).to.be.eql('adatbazishiba')
        done();
    })
  });

  //test3
  it('should call next when no jedi_record was found in the db', function (done) {
    const mw = getJediRecordMW({
      JediModel: {
        findOne: (p1, cb) => {
          expect(p1).to.be.eql({ _id: '420' })
          cb(undefined, null)
        }
      }
    });

    const resMock = {
      locals: {}
    };

    mw({
      params:{
        jedi_id: '420'
      }
    },
    resMock,
    (err) => {
        expect(err).to.be.eql(undefined);
        expect(resMock.locals).to.be.eql({});
        done();
    })
  });

});