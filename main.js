const GLPIAPI = require('glpi-api');

const venom = require('venom-bot');

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
     //abre chamado no GLPI
      glpi.initSession()
        .then(() => {
          glpi.addItems('Ticket', {
              name: 'Chamado criado pelo API',
              content: 'Conteúdo do chamado, foi criado pelo wpp, magno o brabo',
              itilcategories_id: 1,
              status: 1,
              entities_id: 0})              
        
          // Envie uma mensagem de resposta com o ID do chamado
          client
            
            .sendText(message.from, `Seu chamado foi aberto com sucesso'`)
            .then((result) => {
              console.log('Resultado: ', result); // Retorna um objeto de sucesso
            })
            .catch((erro) => {
              console.error('Erro ao enviar: ', erro); // Retorna um objeto de erro
            });
        })
        .catch((erro) => {
          console.error('Erro ao abrir chamado: ', erro);
        });
    }
  });
}

