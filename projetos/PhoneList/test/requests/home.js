var app = require('../../app');
var request = require('supertest')(app);

describe('No controller home', function() {
  it('Deve retornar status 200 ao fazer GET /', function(done) {
    request.get('/')
      .end(function(err, res) {
        res.status.should.eql(200);
        done();
      });
  });
  
  it('Deve ir para rota / ao fazer GET /sair', function(done) {
    request.get('/sair')
      .end(function(err, res) {
        res.headers.location.should.eql('/');
        done();
      });
  });

  it('Deve ir para rota /contatos ao fazer POST /entrar', function(done) {
    var login = {
      usuario: {
        nome: 'Teste',
        telefone: '00000000'
      }
    };
    request.post('/entrar')
      .send(login)
      .end(function(err, res) {
        res.headers.location.should.eql('/contatos');
        done();
      });
  });

  it('Deve ir para rota / ao fazer POST /entrar', function(done) {
    var login = {
      usuario: {
        nome: '',
        telefone: ''
      }
    };
    request.post('/entrar')
      .send(login)
      .end(function(err, res) {
        res.headers.location.should.eql('/');
        done();
      });
  });
});