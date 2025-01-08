class scrapyWolf {
    constructor() {
      this.scrapedData = [];
      this.titleRestaurant = ""
    }
  
    sleep(ms) {     return new Promise(resolve => setTimeout(resolve, ms)); }
  
   
    
  
    async checkRepetition(complementExpandable) { 
      let button = complementExpandable.querySelector(".react-numeric-input");
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
      if(complement == ""){
        type = 'Mais de uma opcao com repeticao';
        maxQtd = 50;
        minQtd = 0;
      }
      

       if (complement.match(/^Escolha até (\d+)/)) {
        const maxItems = parseInt(complement.match(/^Escolha até (\d+)/)[1], 10);
        type = 'Mais de uma opcao ' + repetition;
        maxQtd = maxItems;
        console.log('minQtd:', minQtd, 'maxQtd:', maxQtd);
      
      }else if (complement =="Escolha 1 opção") {
        type = 'Apenas uma opcao';
        maxQtd = 1;
        minQtd = 1;
        console.log('minQtd:', minQtd, 'maxQtd:', maxQtd);
      }else if (complement == "Escolha até 1 opção") {
        type = 'Apenas uma opcao ';
        maxQtd = 1;
        minQtd = 0;
        console.log('minQtd:', minQtd, 'maxQtd:', maxQtd);
      }else if (complement.match(/^Escolha \d+/)) {
        const minMaxItems = complement.match(/\d+/g);
        const minItems = parseInt(minMaxItems[0], 10);
        const maxItems = parseInt(minMaxItems[0], 10);
        type = 'Mais de uma opcao ' + repetition;
        minQtd = minItems;
        maxQtd = maxItems;
        console.log('minQtd:', minQtd, 'maxQtd:', maxQtd);
      }else if (complement.match(/^Escolha entre \d+ e \d+/)) {
        const minMaxItems = complement.match(/\d+/g);
        const minItems = parseInt(minMaxItems[0], 10);
        const maxItems = parseInt(minMaxItems[1], 10);
        type = 'Mais de uma opcao ' + repetition;
        minQtd = minItems;
        maxQtd = maxItems;
        console.log('minQtd:', minQtd, 'maxQtd:', maxQtd);
      }
      return [type, minQtd, maxQtd];
    }
  
    async clickProductCards() {
      console.log("executando..");
      await this.sleep(1000);
      let categoryDivs = document.querySelectorAll('.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12');
  
      for await (const categoryIndex of [...Array(categoryDivs.length).keys()]) {
          let categoryDivs = document.querySelectorAll('.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12');
          let categoryDiv = categoryDivs[categoryIndex];
          let categoryNameElement = categoryDiv.querySelector('.mb-1');
          let categoryDescElement = categoryDiv.querySelector('small');
          let categoryName = categoryNameElement ? categoryNameElement.textContent : "";
          let categoryDesc = categoryDescElement ? categoryDescElement.textContent : "";
          console.log(categoryName);
          console.log(categoryDesc);
          let productCards = categoryDiv.querySelectorAll('.MuiCardContent-root');
        console.log(productCards)
          let productData = [];
          let complementsDict;
          for await (const productIndex of [...Array(productCards.length).keys()]) {
              let categoryDivs = document.querySelectorAll('.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12');
              let categoryDiv = categoryDivs[categoryIndex];
              let productCards = categoryDiv.querySelectorAll('.MuiCardContent-root');
              let productCard = productCards[productIndex];

              productCard.scrollIntoView()
              await this.sleep(1000);
              productCard.click();
              await this.sleep(1000);
  
              let productContainer = document.querySelector('.MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-elevation24.MuiPaper-rounded');
              let titleElement = productContainer.querySelector('.MuiTypography-root.MuiTypography-h6');
              let priceElement = productContainer.querySelector('.MuiTypography-root.MuiTypography-body1.MuiTypography-colorSecondary');
              let imgElement = productContainer ? productContainer.querySelector('img') : null;
              let descricaoElement = productContainer.querySelector('p');
              let productTitle = titleElement ? titleElement.textContent : "";
              console.log(productTitle)
              let priceText = priceElement ? priceElement.textContent : "";
              let productPrice = priceText.replace(/[^\d,.]/g, '').replace('.', ',');
              let imgSrc = imgElement ? imgElement.src : "";
              let productDescricao = descricaoElement ? descricaoElement.textContent : "";
  
              complementsDict = [];
            await this.sleep(2000)
            let complementExpandables = document.querySelectorAll('.mb-3.variation');
            
            for await (const complementExpandable of complementExpandables) {
              let complementElements = complementExpandable.querySelectorAll('.MuiListSubheader-root.px-0.py-2.MuiListSubheader-sticky.MuiListSubheader-gutters, .MuiList-root.MuiList-dense.MuiList-padding');
              
              
              let optionsComplement = [];
    
              // Pegar o nome de cada complemento
              for await (const complementElement of complementElements) {
                let typeComplementElement = complementElement.querySelector('.d-block');
                let complementNameElement = complementElement.querySelector('strong');
                let requiredElement = ''
                let typeComplementText = typeComplementElement ? typeComplementElement.textContent : "";
  
                let [typeComplement, minQtd, maxQtd] = await this.processTypeComplement(typeComplementText, complementExpandable)
                let required = requiredElement ? requiredElement.textContent : "";
                let complementName = complementNameElement ? complementNameElement.textContent : "";
                // Pegar nome de cada opção do complemento da iteração
                
  
                let optionsElement = complementExpandable.querySelectorAll('.MuiListItem-root.px-0.justify-content-between.MuiListItem-dense.MuiListItem-gutters, .MuiFormControlLabel-root.mx-0  ');
                
                for await (const optionElement of optionsElement) {

                    let optionTitleElement = optionElement.querySelector('span.mr-2');
                    let optionPriceElement = optionElement.querySelector('.text-muted.mr-2');
                    let optionDescriptionElement = optionElement.querySelector('.d-block.text-muted');
                    let optionImgELement = optionElement.querySelector('img');
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
            await this.backPage();
            await this.sleep(1000)
            
        }
        this.scrapedData.push({
          categoryName: categoryName,
          categoryDesc: categoryDesc,
          productsCategory: productData
        });
        //await this.backPage(); 
      }
      //alert("Finalizado!")
  }
  
  
  async backPage() {
    await this.sleep(1000);
    let back = document.querySelector('.MuiIconButton-label')
    if (back) {
      console.log("Voltou")
      back.click()
  }
  }
  }
  
  function desativarAlerta() {
    const alertContainer = document.querySelector('[data-testid="alert-container"]');
    if (alertContainer) {
      alertContainer.remove();
    }
  }
  // Chame a função desativarAlerta antes de executar outras ações
  desativarAlerta();
  