// Description: Arquivo principal do projeto

const venom = require('venom-bot');


// Crie uma instância da biblioteca GLPI API
const Glpi = require('glpi-api');
const glpi = new Glpi({
    apiurl     : 'http://10.10.1.6/glpi/apirest.php',
    user_token : '62dbUTlPkIqur3SWmboA4yj2Di0YL445EzQ9R9ud',
    app_token  : 'ZRm5npzySYtB3nDkHxIpGdfviVq6INypKmbwu4PE',
    debug      : true
  });

  
  var setores = [];
var users = [];
var user_id = '0';
var setor_id = '0';
var titulo = '';
var descricao = '';
glpi.initSession().then((session) => {
  console.log(session);

glpi.getItems('Location').then((tickets) => {
  //criar variavel para receber todos os setores
  setores = tickets;
  console.log(setores);
});
glpi.getItems('User').then((Users) => {
  users = Users;
  console.log(users);
});

let hasChamado = true;
let hasSetor = true;
let hasTitulo = true;
let hasUser = true;

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
  
  //loop para receber mensagens

  client.onMessage((message) => {
      if(message.body == 'Abrir Chamado' && message.isGroupMsg === false){
          hasChamado == false;
          client
          .sendText(message.from, 'Ok, vamos abrir um chamado, primeiro me informe o seu setor')
          .sendText(message.from, 'Digite o número do seu setor')
          for(var i = 0; i < setores.length; i++){
            client
            .sendText(message.from, setores[i].id + ' - ' + setores[i].name)
          }
          client
          .then((result) => {
            console.log('Result: ', result); //return object success
          }
          )
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          }
          );
          
      }
      else  {
        client
          .sendText(message.from, 'Olá, Bem vindo ao chatbot 🤖 da Wasion da Amazônia, se quiser abrir um chamado digite "Abrir Chamado"')
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
        
        }
  });

  while(hasSetor){
    client.onMessage((message) => {
    if((message.body == '1' || message.body == '2' || message.body == '3' || message.body == '4' || message.body == '5' || message.body == '6' || message.body == '7' || message.body == '8' || message.body == '9' || message.body == '10' || message.body == '11' || message.body == '12' || message.body == '13' || message.body == '14' || message.body == '15' || message.body == '16' || message.body == '17' || message.body == '18') && message.isGroupMsg === false){
      setor_id = message.body;
      hasSetor == false;
      client
      .sendText(message.from, 'Ok, agora me informe o seu nome')
      .then((result) => {
        console.log('Result: ', result); //return object success
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
    }
    else{
      client
      .sendText(message.from, 'Digite o número do seu setor')
      .then((result) => {
        console.log('Result: ', result); //return object success
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
    }
  });
  }
  while(hasUser){
  client.onMessage((message) => {
    for(let i = 0; i < users.length; i++){
      if(message.body == users[i].firstname && message.isGroupMsg === false){
        user_id = users[i].id;
        hasUser == false;
        client
        .sendText(message.from, 'Ok, agora me informe o titulo do chamado')
        .then((result) => {
          console.log('Result: ', result); //return object success
        }
        )
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        }
        );
      }
      else{
        client
        .sendText(message.from, 'Digite o seu nome')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
      }
    }
  });
  }
  while(hasTitulo){
  client.onMessage((message) => {
    if(message.body != '' && message.isGroupMsg === false){
      titulo = message.body;
      hasTitulo == false;
      client
      .sendText(message.from, 'Ok, agora me informe a descrição do chamado')
      .then((result) => {
        console.log('Result: ', result); //return object success
      }
      )
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      }
      );
    }
    else{
      client
      .sendText(message.from, 'Digite o titulo do chamado')
      .then((result) => {
        console.log('Result: ', result); //return object success
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
    }
  });
  }
  client.onMessage((message) => {
    if(message.body != '' && message.isGroupMsg === false){
      descricao = message.body;
      glpi.createItem('Ticket', {
        input: {
          name: titulo,
          content: descricao,
          users_id_recipient: user_id,
          locations_id: setor_id
        }
      }).then((result) => {
        client.sendText(message.from, 'Chamado criado com sucesso');
        console.log(result);
      }).catch((erro) => {
        client.sendText(message.from, 'Erro ao criar chamado');
        console.error('Error when sending: ', erro); //return object error
      }
      );
    }

  


  });


}});