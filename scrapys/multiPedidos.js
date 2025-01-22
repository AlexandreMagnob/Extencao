class scrapyMultiPedidos {
    constructor() {
      this.scrapedData = [];
      this.titleRestaurant = ""
    }
  
    sleep(ms) {     return new Promise(resolve => setTimeout(resolve, ms)); }
  
   
    
  
    async checkRepetition(complementExpandable) { 
      let button = complementExpandable.querySelector(".quantity-button.md.hydrated");
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
    
       if (complement =="Obrigatório") {
        type = 'Apenas uma opcao';
        maxQtd = 1;
        minQtd = 1;
        console.log('minQtd:', minQtd, 'maxQtd:', maxQtd);
      }else if (complement.match(/^Min: \d+ | Max: \d+/)) {
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
      let categoryDivs = document.querySelectorAll('.md.item-group-md.item.hydrated');
      console.log(categoryDivs)
      for await (const categoryIndex of [...Array(categoryDivs.length).keys()]) {
          let categoryDivs = document.querySelectorAll('.md.item-group-md.item.hydrated');
          let categoryDiv = categoryDivs[categoryIndex];
          let categoryNameElement = categoryDiv.querySelector('.category-name');
          let categoryName = categoryNameElement ? categoryNameElement.textContent : "";
          console.log(categoryName);
          let productCards = categoryDiv.querySelectorAll('.product-card.hover-anim.md.hydrated');
        console.log(productCards)
          let productData = [];
          let complementsDict;
          for await (const productIndex of [...Array(productCards.length).keys()]) {
              let categoryDivs = document.querySelectorAll('.md.item-group-md.item.hydrated');
              let categoryDiv = categoryDivs[categoryIndex];
              let productCards = categoryDiv.querySelectorAll('.product-card.hover-anim.md.hydrated');
              let productCard = productCards[productIndex];

              productCard.scrollIntoView();
              await this.sleep(500);
              productCard.click();
              await this.sleep(500);
  
              let productContainer = document.querySelector('.ion-page.can-go-back');
              let titleElement = productContainer.querySelector('.toolbar-title');
              let priceElement = productContainer.querySelector('.toolbar-titletoolbar-titletoolbar-titletoolbar-title');
              let promoPriceElement = ''
              let imgElement = productCard ? productCard.querySelector('img') : null;
              let descricaoElement = productCard.querySelector('p');
              let productTitle = titleElement ? titleElement.textContent : "";
              console.log(productTitle)
              let promoPriceText = promoPriceElement ? promoPriceElement.textContent : "";
              let priceText = priceElement ? priceElement.textContent : "";
              let productPrice = priceText.replace(/[^\d,.]/g, '').replace('.', ',');
              let imgSrc = imgElement ? imgElement.src : "";
              let productDescricao = descricaoElement ? descricaoElement.textContent : "";
  
              complementsDict = [];
            await this.sleep(2000)
            let complementExpandables = document.querySelectorAll('.md.list-md.hydrated');
            
            for await (const complementExpandable of complementExpandables) {
              let complementElements = complementExpandable.querySelectorAll('.ion-no-padding.ion-text-center.md.hydrated');
              
              
              let optionsComplement = [];
    
              // Pegar o nome de cada complemento
              for await (const complementElement of complementElements) {
                let typeComplementElement = complementElement.querySelector('.md hydrated');
                let complementNameElement = complementElement.querySelector('.h3');
                let requiredElement = ''
                let typeComplementText = typeComplementElement ? typeComplementElement.textContent : "";
  
                let [typeComplement, minQtd, maxQtd] = await this.processTypeComplement(typeComplementText, complementExpandable)
                let complementName = complementNameElement ? complementNameElement.textContent : "";
                // Pegar nome de cada opção do complemento da iteração
                
  
                let optionsElement = complementExpandable.querySelectorAll('.flex.items-center.justify-between ');
                
                for await (const optionElement of optionsElement) {
                  if (optionElement != complementExpandable.querySelector('.ion-activatable.item.md.item-lines-inset.in-list.ion-focusable.hydrated')){
                    
                  
                    let optionTitleElement = optionElement.querySelector('.text-wrap');
                    let optionPriceElement = optionElement.querySelector('.extra-price-label.sc-ion-label-md-h.sc-ion-label-md-s.md.hydrated');
                    let optionDescriptionElement = optionElement.querySelector('.small');
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
                }
    
                complementsDict.push({
                  nameComplement: complementName,
                  typeComplement: typeComplement,
                  minQtd: minQtd,
                  maxQtd: maxQtd,
                  options: optionsComplement
                })
                console.log("- - - - - - - - - - - - - - - - - ")
                console.log("NOME DO COMPLEMENTO: ",complementName)
                console.log("TEXTO DO TIPO DO COMPLEMENTO: ",typeComplementText.trim())
                console.log("TIPO DO COMPLEMENT: ",typeComplement)
                console.log("QUANTIDADE MIN: ",minQtd)
                console.log("QUANTIDADE MAX: ",maxQtd)
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
          productsCategory: productData
        });
        //await this.backPage(); 
      }
      //alert("Finalizado!")
  }
  
  
  async backPage() {
    await this.sleep(1000);
    window.history.back()
  //   let divBtn = document.querySelector('.md.header-md.header-collapse-none.hydrated')
  //   let back = divBtn.querySelector('.button-native')
  //   if (back) {
  //     console.log("Voltou")
  //     back.click()
  // }
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
  