class Setores {
    constructor() {
      this.Setores = {
        '1': 'TI',
        '2': 'Engenharia Industrial',
        '3': 'Produção',
        '4': 'Engenharia de produto',
        '5': 'SQG',
        '6': 'Administração',
        '7': 'Compras',
        '8': 'PCP',
        '9': 'LEM',
        '10': 'RH',
        '11': 'PCBA',
        '12': 'Recepção',
        '13': 'Qualidade',
        '14': 'Almoxarifado',
        '15': 'PCM',
        '16': 'Estoque',
        '17': 'Injeção Plástica',
        '18': 'Comercial'
      }
    }
  
    getId(name) {
      // Converter o nome para minúsculas e remover os acentos
      name = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
      // Percorrer o dicionário de localizações e retornar o ID correspondente
      for (const id in this.locations) {
        if (this.locations[id].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === name) {
          return id;
        }
      }
  
      // Se não foi encontrado, retornar null
      return null;
    }
  }