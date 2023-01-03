
class Data {
    constructor() {
      this.users = [];
      this.locations = [];
      
    }
    
      const   Glpi = require('glpi-api');
      const glpi = new Glpi({
        apiurl     : 'http://10.10.1.6/glpi/apirest.php',
        user_token : '62dbUTlPkIqur3SWmboA4yj2Di0YL445EzQ9R9ud',
        app_token  : 'ZRm5npzySYtB3nDkHxIpGdfviVq6INypKmbwu4PE',
        debug      : true
      });
    
    // Inicialize a sessão na API GLPI
    glpi.initSession() .then(() => { console.log('Sessão inicializada'); }).catch((error) => { console.error(error); });
  
      // Faça uma requisição para obter todos os usuários
      const users = await glpi.getItems('User');
      this.users = users;
  
      // Faça uma requisição para obter todas as localizações
      const locations = await glpi.getItems('Location');
      this.locations = locations;
    }
    
  



  module.exports = Data;
  