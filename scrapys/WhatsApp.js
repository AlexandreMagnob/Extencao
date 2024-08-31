class ScrapyWhatsApp {
    constructor() {
      this.scrapedData = [];
      this.titleRestaurant = ""
    }
  
    sleep(ms) {     return new Promise(resolve => setTimeout(resolve, ms)); }
  
 
   
  
    async clickProductCards() {
      console.log("executando..");
      await this.sleep(1000);
      let categoryDivs = document.querySelectorAll('.xvpee5o.x1y332i5.x178xt8z.x13fuv20.xyj1x25._ak72._ak7l._ak7s._ak7w');
  
      for await (const categoryIndex of [...Array(categoryDivs.length).keys()]) {
          let categoryDivs = document.querySelectorAll('.xvpee5o.x1y332i5.x178xt8z.x13fuv20.xyj1x25._ak72._ak7l._ak7s._ak7w');
          let categoryDiv = categoryDivs[categoryIndex];
          let categoryNameElement = document.querySelector('#app > div > div.three._aigs > div._aigv._aig-._aohg > span > div > span > span > div > header > div > div.x104kibb.x1iyjqo2.x4osyxg.x6ikm8r.x10wlt62.x1mzt3pk.xo442l1.x1ua5tub.x1rdy4ex.x1jchvi3.xggjnk3 > h1');
          let categoryName = categoryNameElement ? categoryNameElement.textContent : "";
          console.log(categoryName);
          let buttonItem = document.querySelector(".xdod15v.x1ypdohk");
          buttonItem.click()
          await this.sleep(1000);
          let productCards = document.querySelectorAll("._ak72._ak73._ak7s._ak7t");
  
          let productData = [];
          let complementsDict;
          for await (const productIndex of [...Array(productCards.length).keys()]) {
            let categoryDivs = document.querySelectorAll('#app > div > div.three._aigs > div._aigv._aig-._aohg > span > div > span > span > div > div.x1n2onr6.x1n2onr6.xyw6214.x78zum5.x1r8uery.x1iyjqo2.xdt5ytf.x6ikm8r.x1odjw0f.x1hc1fzr.x1tkvqr7 > div');
            let categoryDiv = categoryDivs[categoryIndex];
            let productCards = categoryDiv.querySelectorAll("._ak72._ak73._ak7s._ak7t");
            let productCard = productCards[productIndex];
              await this.sleep(500);

              
              let titleElement = document.querySelector('#app > div > div.three._aigs > div._aigv._aig-._aohg > span > div > span > span > div > div.x1n2onr6.x1n2onr6.xyw6214.x78zum5.x1r8uery.x1iyjqo2.xdt5ytf.x6ikm8r.x1odjw0f.x1hc1fzr.x1tkvqr7 > div > div > div > div > div:nth-child(1) > div > div > div:nth-child(2) > div._ak8o > div > span');
              let priceElement = document.querySelector('#app > div > div.three._aigs > div._aigv._aig-._aohg > span > div > span > span > div > div.x1n2onr6.x1n2onr6.xyw6214.x78zum5.x1r8uery.x1iyjqo2.xdt5ytf.x6ikm8r.x1odjw0f.x1hc1fzr.x1tkvqr7 > div > div > div > div > div:nth-child(1) > div > div > div:nth-child(2) > div._ak8j > div._ak8k > div:nth-child(2) > span');
              let descricaoElement = document.querySelector('#app > div > div.three._aigs > div._aigv._aig-._aohg > span > div > span > span > div > div.x1n2onr6.x1n2onr6.xyw6214.x78zum5.x1r8uery.x1iyjqo2.xdt5ytf.x6ikm8r.x1odjw0f.x1hc1fzr.x1tkvqr7 > div > div > div > div > div:nth-child(1) > div > div > div:nth-child(2) > div._ak8j > div._ak8k > div:nth-child(1) > span');
              let productTitle = titleElement ? titleElement.textContent : "";
              let priceText = priceElement ? priceElement.textContent : "";
              let productPrice = priceText.replace(/[^\d,]/g, '').replace('.', ',');
              let imgSrc = "";
              let productDescricao = descricaoElement ? descricaoElement.textContent : "";
  
              complementsDict = [];
            await this.sleep(2000)
            
            let complementExpandables = ""
            
            for await (const complementExpandable of complementExpandables) {
              let complementElements = "";
              
              
              let optionsComplement = [];
    
              // Pegar o nome de cada complemento
              for await (const complementElement of complementElements) {
                let typeComplement = "";
                let required = "";
                let complementName = "";
                let minQtd = "";
                let maxQtd = "";
                // Pegar nome de cada opção do complemento da iteração
                
  
                let optionsElement = "";
                
                for await (const optionElement of optionsElement) {
    
                  let optionTitle = "";
                  let optionDescription = "";
                  let optionPrice = "";
                  let optionImg = "";
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
            
            
        }
        this.scrapedData.push({
          categoryName: categoryName,
          productsCategory: productData
        });
        await this.backPage(); 
        await this.sleep(1000)
      }
      //alert("Finalizado!")
  }
  
  
  async backPage() {
    await this.sleep(1000);
    let back = document.querySelector('.x1okw0bk.x16dsc37.x1ypdohk.xeq5yr9.xfect85')
    if (back) {
      console.log("Voltou")
      back.click()
  }
  }
  }
  
  
  