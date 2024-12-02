class HandlerScrapy {
    constructor() {
      // Inicializa as instâncias dos scrapers
      this.scrapyDino = new scrapyDino();
      this.scrapyAnotai = new ScrapyAnotai();
      this.scrapyGoomer = new ScrapyGoomer();
      this.scrapyCoisaRuim = new ScrapyCoisaRuim();
      this.scrapyWhatsApp = new ScrapyWhatsApp();
      this.scrapySemola = new scrapySemola();
      this.scrapyOlaClick = new ScrapyOlaClick();
      this.scrapyInstaDelivery = new scrapyInstaDelivery();
      this.scrapyHubt = new scrapyHubt();
      this.scrapyJotaja = new scrapyJotaja();
      this.scrapyYooga = new scrapyYooga();
      this.scrapyCardapioDigital = new scrapyCardapioDigital();
      this.scrapySaipos = new scrapySaipos();
      this.scrapyNeemo = new scrapyNeemo();
      this.scrapyCardapioWeb = new scrapyCardapioWeb();
      this.scrapyDiggy = new scrapyDiggy();
    }
  
    async handleScrapyChoice(restaurante) {
      // Decide qual scraper usar com base no restaurante escolhido pelo usuário
      if (restaurante === 'Dino') {
        await alert("Iniciando...");
        await this.scrapyDino.clickProductCards();
        const scrapedData = this.scrapyDino.scrapedData
        await alert("Finalizado")
        const titleRestaurant = this.scrapyDino.titleRestaurant
        await createCSV(scrapedData, titleRestaurant)

      } else if (restaurante === 'Anotai') {
        await alert("Iniciando...");
        await this.scrapyAnotai.checkAndScrape();
        const scrapedData = this.scrapyAnotai.scrapedData
        await alert("Finalizado")
        const titleRestaurant = this.scrapyAnotai.titleRestaurant
        await createCSV(scrapedData, titleRestaurant)
      } 
      
      else if(restaurante == "Yooga"){
        await alert("Iniciando...");
        await this.scrapyYooga.clickProductCards()
        const scrapedData = this.scrapyYooga.scrapedData
        await alert("Finalizado")
        const titleRestaurant = this.scrapyYooga.titleRestaurant
        await createCSV(scrapedData, titleRestaurant)
      }
      else if(restaurante == "WhatsApp"){
        await alert("Iniciando...");
        await this.scrapyWhatsApp.clickProductCards()
        const scrapedData = this.scrapyWhatsApp.scrapedData
        await alert("Finalizado")
        const titleRestaurant = this.scrapyWhatsApp.titleRestaurant
        await createCSV(scrapedData, titleRestaurant)
      }
      else if(restaurante == "Semola"){
        await alert("Iniciando...");
        await this.scrapySemola.clickProductCards()
        const scrapedData = this.scrapySemola.scrapedData
        await alert("Finalizado")
        const titleRestaurant = this.scrapySemola.titleRestaurant
        await createCSV(scrapedData, titleRestaurant)
      }
      else if(restaurante == "Jotaja")
      {
        await alert("Iniciando...");
        await this.scrapyJotaja.clickProductCards()
        const scrapedData = this.scrapyJotaja.scrapedData
        await alert("Finalizado")
        const titleRestaurant = this.scrapyJotaja.titleRestaurant
        await createCSV(scrapedData, titleRestaurant)
      }
      else if(restaurante == "CardapioDigital")
      {
        await alert("Iniciando...");
        await this.scrapyCardapioDigital.clickProductCards()
        const scrapedData = this.scrapyCardapioDigital.scrapedData
        await alert("Finalizado")
        const titleRestaurant = this.scrapyCardapioDigital.titleRestaurant
        await createCSV(scrapedData, titleRestaurant)
      }
      else if(restaurante == "Hubt")
      {
        await alert("Iniciando...");
        await this.scrapyHubt.clickProductCards()
        const scrapedData = this.scrapyHubt.scrapedData
        await alert("Finalizado")
        const titleRestaurant = this.scrapyHubt.titleRestaurant
        await createCSV(scrapedData, titleRestaurant)
      }
      else if (restaurante == "Goomer"){
        await alert("Iniciando...");
        await this.scrapyGoomer.clickProductCards()
        const scrapedData = this.scrapyGoomer.scrapedData
        await alert("Finalizado")
        await createCSV(scrapedData)
      }
      else if (restaurante === 'OlaClick') {
        await alert("Iniciando...");
        await this.scrapyOlaClick.clickProductCards()
        const scrapedData = this.scrapyOlaClick.scrapedData
        await alert("Finalizado")
        const titleRestaurant = this.scrapyOlaClick.titleRestaurant
        await createCSV(scrapedData, titleRestaurant)
      }
      else if (restaurante === 'Saipos') {
        await alert("Iniciando...");
        await this.scrapySaipos.clickProductCards()
        const scrapedData = this.scrapySaipos.scrapedData
        await alert("Finalizado")
        const titleRestaurant = this.scrapySaipos.titleRestaurant
        await createCSV(scrapedData, titleRestaurant)
      }
      else if (restaurante === 'Neemo') {
        await alert("Iniciando...");
        await this.scrapyNeemo.clickProductCards()
        const scrapedData = this.scrapyNeemo.scrapedData
        await alert("Finalizado")
        const titleRestaurant = this.scrapyNeemo.titleRestaurant
        await createCSV(scrapedData, titleRestaurant)
      }
      else if (restaurante === 'Diggy') {
        await alert("Iniciando...");
        await this.scrapyDiggy.clickProductCards()
        const scrapedData = this.scrapyDiggy.scrapedData
        await alert("Finalizado")
        const titleRestaurant = this.scrapyDiggy.titleRestaurant
        await createCSV(scrapedData, titleRestaurant)
      }
      else if (restaurante === 'Coisa Ruim') {
        await alert("Iniciando...");
        await this.scrapyCoisaRuim.clickProductCards()
        const scrapedData = this.scrapyCoisaRuim.scrapedData
        await alert("Finalizado")
        const titleRestaurant = this.scrapyCoisaRuim.titleRestaurant
        await createCSV(scrapedData, titleRestaurant)
      }
      else if (restaurante === 'CardapioWeb') {
        await alert("Iniciando...");
        await this.scrapyCardapioWeb.clickProductCards()
        const scrapedData = this.scrapyCardapioWeb.scrapedData
        await alert("Finalizado")
        const titleRestaurant = this.scrapyCardapioWeb.titleRestaurant
        await createCSV(scrapedData, titleRestaurant)
      }
      else if (restaurante === 'InstaDelivery') {
        let verifyClosed = await this.scrapyInstaDelivery.verifyClosed()
        if(verifyClosed){
          alert("O estabelecimento está fechado. Tente quando ele estiver aberto.")
        }
        else{
          await alert("Iniciando...");
          await this.scrapyInstaDelivery.clickProductCards()
          const scrapedData = this.scrapyInstaDelivery.scrapedData
          await alert("Finalizado")
          const titleRestaurant = this.scrapyInstaDelivery.titleRestaurant
          await createCSV(scrapedData, titleRestaurant)
        }
      }
      else {
        await alert('Restaurante inválido');
      }
    }
  }
  
  // Exporta a classe HandlerScrapy
  window.HandlerScrapy = HandlerScrapy;
  
  // Escuta mensagens enviadas pelo popup.js
  chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    if (request.restaurante) {
        const handlerScrapy = new HandlerScrapy();
        await handlerScrapy.handleScrapyChoice(request.restaurante);
    }
  });
  