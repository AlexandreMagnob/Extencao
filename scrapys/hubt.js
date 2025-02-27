//Feito por Alexandre

class scrapyHubt {
    constructor() {
      this.scrapedData = [];
      this.titleRestaurant = ""
    }
  
  sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms)); }
  
  async checkRepetition(complementExpandable) {
    let button = complementExpandable.querySelector(".complementAmount");
    if (button) {
      return "com repeticao";
    } else {
      return "sem repeticao";
    }
}

        async processTypeComplement(typeComplement,complementExpandable,required) {
          const complement = typeComplement.trim();
          let repetition = await this.checkRepetition(complementExpandable);
          let type = "";
          let minQtd = required === "Obrigatorio" ? 1 : 0;
          let maxQtd = 0;
        
          if (complement.match(/^No mínimo (\d+) e no máximo (\d+)\.$/)) {
            const itemCount = parseInt(complement.match(/^No mínimo (\d+) e no máximo (\d+)\.$/)[1], 10);
            type = "Mais de uma opcao " + repetition;
            maxQtd = itemCount;
          } else if (complement.match(/^No máximo (\d+)\.$/)) {
            const maxItems = parseInt(complement.match(/^No máximo (\d+)\.$/)[1], 10);
            type = 'Mais de uma opcao ' + repetition;
            maxQtd = maxItems;
          }
        
          console.log('type:', type, 'minQtd:', minQtd, 'maxQtd:', maxQtd);
          return [type, minQtd, maxQtd];
        }

    async clickProductCards() {
      console.log("executando..")

      let titleElement = document.title || '';
      let titleSplit = titleElement.split('-');
      this.titleRestaurant = titleSplit[0].trim() || '';

      await this.sleep(1000)
      let categoryDivs = document.querySelectorAll('.cardapio-module');
    
      for await (const categoryIndex of [...Array(categoryDivs.length).keys()]) {
        await this.sleep(500)
        let categoryDivs = document.querySelectorAll('.cardapio-module');
        let categoryDiv = categoryDivs[categoryIndex];
        let categoryNameElement = categoryDiv.querySelector('.module-title');
        let categoryName = categoryNameElement ? categoryNameElement.textContent : "";
        console.log("NOME DA CATEGORIA: ", categoryName)
        let productCards = categoryDiv.querySelectorAll(".ProductModule__ItemContainer-sc-1kmcc3y-0");
    
        let productData = [];
        for await (const productIndex of [...Array(productCards.length).keys()]) {
          await this.sleep(1000)
          let categoryDivs = document.querySelectorAll('.cardapio-module');
          let categoryDiv = categoryDivs[categoryIndex];
          let productCards = categoryDiv.querySelectorAll((".ProductModule__ItemContainer-sc-1kmcc3y-0"));
          let productCard = productCards[productIndex];
          
  
            await this.sleep(500);
            productCard.scrollIntoView();
            productCard.click();
            await this.sleep(1000);

            let productModal = document.querySelector('.sc-dLMFU.sc-hIUJlX.jGYSNW.hJZGkQ.hubt-item-dialog.view-product-dialog.newItem.withImage.JS-has-wc JS-dialog');
            // let complementElement = document.querySelector('.ProductItemDialog__PriceList-j5dr03-5.hLOrDr');
            // let notComplementElement = document.querySelector('.price-Único');
            let titleElement = productModal.querySelector('.ProductItemDialog__DialogProductTitle-sc-j5dr03-0.ProductItemDialog___StyledDialogProductTitle-sc-j5dr03-1.SMMVa.dOjlMu');
            let priceElement = productModal.querySelector('.ProductItemDialog__ProductPriceStyled-sc-j5dr03-7.kUNwky');
            let imgElement = document.querySelector('.MultiImagesEditor__ProductHeaderImage-awskso-4');
            let imageUrl = imgElement ? window.getComputedStyle(imgElement).backgroundImage.replace(/^url\(["'](.+)["']\)$/, '$1') : null;
            let descricaoElement = productModal.querySelector('.ProductItemDialog__ProductDescription-j5dr03-2.bxZGzY');
            let productTitle = titleElement ? titleElement.textContent : "";
            let imgSrc = imageUrl ? imageUrl : "";
            let productDescricao = descricaoElement ? descricaoElement.innerHTML.replace(/<br\s*\/?>/gi, '\n\n') : "";
            let priceText = priceElement ? priceElement.textContent : "";
            let productPrice = priceText.replace(/[^\d,.]/g, '').replace('.', ',')

            await this.sleep(1000);
            let complementButtonElement = productModal.querySelector('.ProdProductItemDialog__ComplementsInfo-sc-j5dr03-17.bDJgNx');
            if(complementButtonElement){
              complementButtonElement.click();
            }
            // let notComplement = "";

          //   if(notComplementElement){
          //   notComplement = notComplementElement.textContent
            
          //   let priceElement = "";

          //   if(complementElement){
          //   priceElement = productModal.querySelector('.ProductItemDialog__ProductPriceStyled-sc-j5dr03-7.kUNwky');
          //   }

            
          //   let priceText = priceElement ? priceElement.textContent : "";
          //   productPrice = priceText.replace(/[^\d,.]/g, '').replace('.', ',')
          // }

            let complementsDict = []
            
            let complementExpandables = document.querySelectorAll('.ProductItemDialog__ProductFieldHeader-sc-j5dr03-16.cPXQZj');

            for await (const complementExpandable of complementExpandables) {

              let optionsComplement = [];
              let complementNameElement = complementExpandable.querySelector('label');
              let complementName = complementNameElement ? complementNameElement.textContent : "";
              let requiredElement = complementExpandable.querySelector  ('.ProductItemDialog__RequiredLabel-sc-j5dr03-12.llQhSS');
              let required = requiredElement ? requiredElement.textContent : "";
              let typecomplementElement = complementExpandable.querySelector('.ProductItemDialog__Rules-sc-j5dr03-14.ceeHtF');
              let typeComplementText = typecomplementElement ? typecomplementElement.textContent : "";


              let [typeComplement, minQtd, maxQtd] = await this.processTypeComplement(typeComplementText, complementExpandable,required)
                


                let optionsElement = complementExpandable.querySelectorAll('..ComplementSelectionInput-sc-2g58ea-5.hmhEpV.ComplementSelectionInput__ComplementSelectionInputStyle-sc-2g58ea-0.zUUnn');
                for await (const optionElement of optionsElement) {
                  let optionTitleElement = optionElement.querySelector('.title');
                  let optionPriceElement = optionElement.querySelector('.price');
                  // let optionDescriptionElement = optionElement.querySelector('.chooser-info__description.text-grey-2.text-left.font-1.mb-1, .description');
                  // let optionImgELement = optionElement.querySelector('img');
                  //let optionQtdElement = optionElement.querySelector('span.text-grey-3');
    
                  let optionTitle = optionTitleElement ? optionTitleElement.textContent : "";
                  let optionDescription = ""; //optionDescriptionElement ? optionDescriptionElement.textContent : "";
                  let optionPriceText = optionPriceElement ? optionPriceElement.textContent : "0";
                  let optionPrice = optionPriceText.replace(/[^\d,.]/g, '').replace('.', ',');
                  let optionImg = "";//optionImgELement ? optionImgELement.src : "";






                  
                  optionsComplement.push({
                    optionTitle: optionTitle,
                    optionPrice: optionPrice,
                    optionDescription: optionDescription
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
          
        }
        this.scrapedData.push({
          categoryName: categoryName,
          productsCategory: productData
        });
        
        await this.backPage();
      }
      //alert("Finalizado!")
  }
  
  
  async backPage() {
    await this.sleep(1000);
    let back = document.querySelector('.sc-AxirZ.sc-fzokOt.DAMdR')
    if (back) {
      back.click()
  }}
  }
  