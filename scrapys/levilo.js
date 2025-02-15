class ScrapyLevilo {
    constructor() {
      this.scrapedData = [];
      this.titleRestaurant = ""
    }
  
    sleep(ms) {     return new Promise(resolve => setTimeout(resolve, ms)); }
  
    async checkRepetition(complementExpandable) { 
      let button = complementExpandable.querySelector(".sc-iGctRS.hAPdqJ");
      if (button) {
        return "com repeticao";
      } else {
        return "sem repeticao";
      }
  }
  
  
    async processTypeComplement(typeComplement, complementExpandable) {
      const complement = typeComplement.trim();
      let repetition = await this.checkRepetition(complementExpandable);
      let type = "";
      let minQtd = 0;
      let maxQtd = 0;
    
      if (complement.match(/^Escolha (\d+) itens/)) {
        const itemCount = parseInt(complement.match(/^Escolha (\d+) itens/)[1], 10);
          type = 'Mais de uma opcao ' + repetition;
          minQtd = itemCount;
          maxQtd = itemCount;
          console.log('minQtd:', minQtd, 'maxQtd:', maxQtd);
        
      }else if (complement.match(/^Escolha (\d+)./)) {
        const maxItems = parseInt(complement.match(/^Escolha (\d+)./)[1], 10);
        type = 'Mais de uma opcao ' + repetition;
        maxQtd = maxItems;
        console.log('minQtd:', minQtd, 'maxQtd:', maxQtd);
      }else if (complement.match(/^Escolha até (\d+) item/)) {
        type = 'Apenas uma opcao ';
        maxQtd = 1;
        console.log('minQtd:', minQtd, 'maxQtd:', maxQtd);
      }else if (complement.match(/^Escolha pelo mesno \d+, no máximo \d+./)) {
        const minMaxItems = complement.match(/\d+/g);
        const minItems = parseInt(minMaxItems[0], 10);
        const maxItems = parseInt(minMaxItems[1], 10);
        type = 'Mais de uma opcao ' + repetition;
        minQtd = minItems;
        maxQtd = maxItems;
        console.log('minQtd:', minQtd, 'maxQtd:', maxQtd);
      }else if (complement == "Escolha 1.") {
        type = 'Apenas uma opcao';
        maxQtd = 0;
        minQtd = 1;
        console.log('minQtd:', minQtd, 'maxQtd:', maxQtd);
      } else if (complement == "") {
        type = 'Mais de uma opcao com repeticaco';
        maxQtd = 50;
        minQtd = 0;
        console.log('minQtd:', minQtd, 'maxQtd:', maxQtd);
      }
      return [type, minQtd, maxQtd];
    }
  
    async clickProductCards() {
      console.log("executando..");
      await this.sleep(1000);
      let categoryDivs = document.querySelectorAll('.sc-dpQcLm.kyGNgE');
  
      for await (const categoryIndex of [...Array(categoryDivs.length).keys()]) {
          let categoryDivs = document.querySelectorAll('.sc-dpQcLm.kyGNgE');
          let categoryDiv = categoryDivs[categoryIndex];
          let categoryNameElement = categoryDiv.querySelector('h3');
          let categoryName = categoryNameElement ? categoryNameElement.textContent : "";
          console.log(categoryName);
          let productCards = categoryDiv.querySelectorAll(".sc-bQVmPH.dvDPNr");
  
          let productData = [];
          let complementsDict;
          for await (const productIndex of [...Array(productCards.length).keys()]) {
            await this.sleep(1000);
              let categoryDivs = document.querySelectorAll('.sc-dpQcLm.kyGNgE');
              let categoryDiv = categoryDivs[categoryIndex];
              let productCards = categoryDiv.querySelectorAll(".sc-bQVmPH.dvDPNr");
              let productCard = productCards[productIndex];
              await this.sleep(500);
              productCard.click();
              await this.sleep(2000);
  
              let productContainer = document.querySelector('.sc-fashhx.bWQBFg');
              let titleElement = productContainer.querySelector('.title');
              let priceElement = productContainer.querySelector('.price');
              let imgElement = productContainer.querySelector('img');
              let descricaoElement = productContainer.querySelector('.descrciption');
              let productTitle = titleElement ? titleElement.textContent : "";
              let priceText = priceElement ? priceElement.textContent : "";
              let productPrice = priceText.replace(/[^\d,.]/g, '').replace('.', ',');
              let imgSrc = imgElement ? imgElement.src : "";
              let productDescricao = descricaoElement ? descricaoElement.textContent : "";
  
              complementsDict = [];
            await this.sleep(1000)
            let complementExpandables = document.querySelectorAll('[id^="extraCategories-"]');
            
            for await (const complementExpandable of complementExpandables) {
              let complementElements = complementExpandable.querySelectorAll('.sc-jLiVlK.jgDXBK');
              
              
              let optionsComplement = [];
    
              // Pegar o nome de cada complemento
              for await (const complementElement of complementElements) {
                let typeComplementElement = complementElement.querySelector('p');
                let complementNameElement = complementElement.querySelector('h2');
                let requiredElement = complementElement.querySelector('.badge');
                let typeComplementText = typeComplementElement ? typeComplementElement.textContent : "";
  
                let [typeComplement, minQtd, maxQtd] = await this.processTypeComplement(typeComplementText, complementExpandable)
                let required = requiredElement ? requiredElement.textContent : "";
                let complementName = complementNameElement ? complementNameElement.textContent : "";
                // Pegar nome de cada opção do complemento da iteração
                
  
                let optionsElement = complementExpandable.querySelectorAll('.sc-cHjxUU.gkhkjs');
                
                for await (const optionElement of optionsElement) {
                  let optionTitleElement = optionElement.querySelector('.sc-bUrJUP.ftSKDG');
                  let optionPriceElement = optionElement.querySelector('.sc-dRPiIx.esbyIi');
                  let optionDescriptionElement = ''
                  let optionImgELement = ''
                  //let optionQtdElement = optionElement.querySelector('span.text-grey-3');
    
                  let optionTitle = optionTitleElement ? optionTitleElement.textContent : "";
                  let optionDescription = optionDescriptionElement ? optionDescriptionElement.textContent : "";
                  let optionPriceText = optionPriceElement ? optionPriceElement.textContent : "0";
                  let optionPrice = optionPriceText.replace(/[^\d,.]/g, '').replace('.', ',');
                  let optionImg = optionImgELement ? optionImgELement.src : "";
                  //let optionQtd = optionQtdElement ? optionQtdElement.textContent : "";
                  
    
    
                  optionsComplement.push({
                    optionTitle: optionTitle,
                    optionPrice: optionPrice,
                    optionDescription: optionDescription,
                    optionImg: optionImg
                  });
                }
    
                complementsDict.push({
                  nameComplement: complementName,
                  typeComplement: typeComplement,
                  minQtd: minQtd,
                  maxQtd: maxQtd,
                  required: required,
                  options: optionsComplement
                })
                console.log("- - - - - - - - - - - - - - - - - ")
                console.log("NOME DO COMPLEMENTO: ",complementName)
                console.log("TEXTO DO TIPO DO COMPLEMENTO: ",typeComplementText.trim())
                console.log("TIPO DO COMPLEMENT: ",typeComplement)
                console.log("QUANTIDADE MIN: ",minQtd)
                console.log("QUANTIDADE MAX: ",maxQtd)
                console.log("REQUERED: ",required)
                console.log("OPÇOES: ",optionsComplement)
                console.log("- - - - - - - - - - - - - - - - - ")
                console.log("                                  ")
              }
            }
            
            productData.push({
              title: productTitle,
              price: productPrice,
              imgSrc: imgSrc,
              descricao: productDescricao,
              complementsDict: complementsDict
            });
            console.log("- - - - - - - - - - - - - - - - - ")
            console.log("NOME PRODUTO: ", productTitle)
            console.log("PREÇO PRODUTO: ", productPrice)
            console.log("IMAGEM: ", imgSrc)
            console.log("DESCRIÇAO: ", productDescricao)
            console.log("- - - - - - - - - - - - - - - - - ")
            console.log("                                  ")
            await this.sleep(1000)
            await this.backPage();
            await this.sleep(500)
            
        }
        this.scrapedData.push({
          categoryName: categoryName,
          productsCategory: productData
        });
        //await this.backPage(); 
      }
      //alert("Finalizado!")
  }
  
  
  async backPage() {
    console.log("Voltou!")
    await this.sleep(500);
    let back = document.querySelector('.sc-cvJHqN.cktZhQ');
    if (back) {
      back.click()
  }
    await this.sleep(1000);
  }
}