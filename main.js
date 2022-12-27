const GLPIAPI = require('glpi-api');
const venom = require('venom-bot');
const location = require('./location.js');

// Crie uma instância da biblioteca GLPI API
const Glpi = require('glpi-api');
const glpi = new Glpi({
    apiurl     : 'http://10.10.1.6/glpi/apirest.php',
    user_token : '62dbUTlPkIqur3SWmboA4yj2Di0YL445EzQ9R9ud',
    app_token  : 'ZRm5npzySYtB3nDkHxIpGdfviVq6INypKmbwu4PE',
    debug      : true
  });

venom
  .create({
    session: 'session-name', // Nome da sessão
    multidevice: true // Para versões que não são multidevice, use false (padrão: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    if (message.body === 'Quero abrir um chamado no GLPI' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'por favor, envie o seu setor')
        .then((result) => {
            client.onMessage((message) => {
            const location = new Location();
            const locationId = location.getId(message.body.data);
            
            if (locationId) {
                client.sendText(message.from, 'Por favor, envie o seu problema');
            }
            else {
                client.sendText(message.from, 'Por favor, envie o seu setor novamente');
            }
            console.log('seu setor é ', locationId); //retorna um objeto de resultado

        })
        .catch((erro) =>
          console.error('Error when sending: ', erro)
        );
    }
  });
}

