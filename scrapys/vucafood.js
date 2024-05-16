class scrapyVucaFood {
  constructor() {
    this.scrapedData = [];
    this.titleRestaurant = "";
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async checkAndScrape() {
    await this.sleep(500);
    const categoryCards = document.querySelectorAll('.category-card__container');
    if (categoryCards.length > 0) {
      await this.clickCategoryCards();
    } else {
      await this.clickProductCards();
    }
  }

  async clickCategoryCards() {
    let categoryGrid = document.querySelector('.category-grid');
    let categoryCards = categoryGrid.querySelectorAll('.category-card__container');

    for await (const categoryCardIndex of [...Array(categoryCards.length).keys()]) {
      await this.sleep(500);

      let categoryGrid = document.querySelector('.category-grid');
      let categoryCards = categoryGrid.querySelectorAll('.category-card__container');
      let categoryCard = categoryCards[categoryCardIndex];

      console.log({ categoryCards, categoryCard });
      // Adicione um tempo de espera antes do clique para garantir que a página esteja pronta
      await this.sleep(1000);
      // Use o método scrollIntoView para garantir que o elemento esteja visível
      categoryCard.scrollIntoView();
      // Clique no elemento
      categoryCard.click();
      console.log("clicou")
      // Aguarde um tempo suficiente após o clique antes de chamar clickProductCards
      await this.sleep(1000);
      // Chame clickProductCards
      await this.clickProductCards();
      console.log("executou!")
      // Aguarde antes de voltar à página anterior
      await this.sleep(1000);
      // Volte à página anterior
      await this.backPage();
    }
  }

  async checkRepetition(complementExpandable) {
    let button = complementExpandable.querySelector("[data-testid='btn-plus']");
    if (button) {
      return "com repeticao";
    } else {
      return "sem repeticao";
    }
  }

  async  processTypeComplement(typeComplement, complementExpandable) {
    const complement = typeComplement.trim();
    let repetition = await this.checkRepetition(complementExpandable);
    let type = "";
    let minQtd = 0;
    let maxQtd = 0;

    if (complement.match(/^Escolha (\d+) item/)) {
      const itemCount = parseInt(complement.match(/^Escolha (\d+) item/)[1], 10);
      if (itemCount !== 1) {
        type = 'Mais de uma opcao ' + repetition;
        minQtd = itemCount;
        maxQtd = itemCount;
        console.log('minQtd:', minQtd, 'maxQtd:', maxQtd);
      } else {
        type = "Apenas uma opcao";
        minQtd = 1;
        maxQtd = 1;
        console.log('minQtd:', minQtd, 'maxQtd:', maxQtd);
      }
    } else if (complement.match(/^Escolha até (\d+) itens/)) {
      const maxItems = parseInt(complement.match(/^Escolha até (\d+) itens/)[1], 10);
      type = 'Mais de uma opcao ' + repetition;
      maxQtd = maxItems;
      console.log('minQtd:', minQtd, 'maxQtd:', maxQtd);
    } else if (complement.match(/^Escolha até (\d+) item/)) {
      type = 'Apenas uma opcao ';
      maxQtd = 1;
      console.log('minQtd:', minQtd, 'maxQtd:', maxQtd);
    } else if (complement.match(/^Escolha de \d+ até \d+ itens$/)) {
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

  async getOptionsComplement (optionsContainer) {
    let optionTitle = "";
    let optionDescription = "";
    let optionPriceText = "";
    let optionPrice = "";

    let optionsElement = optionsContainer.querySelectorAll('dd');

      for await (const optionElement of optionsElement) {
          console.log("ENTROUUU 2") 
          let optionTitleElement = optionElement.querySelector('h1');
          let optionPriceElement = optionElement.querySelector('h3'); 
          let optionDescriptionElement = optionElement.querySelector('.chooser-info__description.text-grey-2.text-left.font-1.mb-1');

           optionTitle = optionTitleElement ? optionTitleElement.textContent : "";
           optionDescription = optionDescriptionElement ? optionDescriptionElement.textContent : "";
           optionPriceText = optionPriceElement ? optionPriceElement.textContent : "0";
           optionPrice = optionPriceText.replace(/[^\d,.]/g, '').replace('.', ',');

           return [optionTitle,optionDescription,optionPrice];
      }
  }

  async clickProductCards() {
    console.log("executando..");
    await this.sleep(1000);
    let categoryDivs = document.querySelectorAll('.cardapio.js-cardapio');

    for await (const categoryDiv of categoryDivs) {
        let categoryNameElement = categoryDiv.querySelector('.cardapio__secao.js-categoria');
        let categoryName = categoryNameElement ? categoryNameElement.textContent : "";
        console.log(categoryName);
        let productCards = categoryDiv.querySelectorAll(".cardapio-item.js-item-url");

        let productData = [];
        let complementsDict;
        for await (const productCard of productCards) {
            await this.sleep(500);

            productCard.click();
            console.log("clicou")
            await this.sleep(1000);

            let productContainer = document.querySelector('.box-item-modal');
            let titleElement = productContainer.querySelector('.produto-header__titulo');
            let priceElement = productContainer.querySelector('.produto-header__valor');
            let imgElement = productContainer.querySelector('img');
            let descricaoElement = productContainer.querySelector('.produto-header__descricao');
            let productTitle = titleElement ? titleElement.textContent : "";
            let priceText = priceElement ? priceElement.textContent : "";
            let productPrice = priceText.replace(/[^\d,.]/g, '').replace('.', ',');
            let imgSrc = imgElement ? imgElement.src : "";
            let productDescricao = descricaoElement ? descricaoElement.textContent : "";

            complementsDict = [];

            await this.sleep(2000)
            let complementExpandables = document.querySelectorAll('.form.js-produto-opcoes');
      
            for await (const complementExpandable of complementExpandables) {

                let complementElements = complementExpandable.querySelectorAll('.produto-opcoes-secao.js-grupos');
                console.log(complementElements)

                
                    // Pegar o nome de cada complemento
                    for await (const complementElement of complementElements) {

                        let typeComplementElement = complementElement.querySelector('h3');
                        let complementNameElement = complementElement.querySelector('h1');
                        let requiredElement = complementElement.querySelector('strong');
                        let typeComplementText = typeComplementElement ? typeComplementElement.childNodes[0].nodeValue.trim() : "";

                        let [typeComplement, minQtd, maxQtd] = await this.processTypeComplement(typeComplementText, complementExpandable)
                        let required = requiredElement ? requiredElement.textContent : "";
                        let complementName = complementNameElement ? complementNameElement.textContent : "";
                        // Pegar nome de cada opção do complemento da iteração
                        let optionsComplement = [];

                        let optionsContainers = complementExpandable.querySelectorAll('dl[style="display:block"]')



                        for await (const optionsContainer of optionsContainers) {
                          let [optionTitle,optionDescription,optionPrice] = await this.getOptionsComplement(optionsContainer)
                          


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
                        console.log("NOME DO COMPLEMENTO: ", complementName)
                        console.log("TEXTO DO TIPO DO COMPLEMENTO: ", typeComplementText.trim())
                        console.log("TIPO DO COMPLEMENT: ", typeComplement)
                        console.log("QUANTIDADE MIN: ", minQtd)
                        console.log("QUANTIDADE MAX: ", maxQtd)
                        console.log("REQUERED: ", required)
                        console.log("OPÇOES: ", optionsComplement)
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
            // console.log("- - - - - - - - - - - - - - - - - ")
            // console.log("NOME PRODUTO: ", productTitle)
            // console.log("PREÇO PRODUTO: ", productPrice)
            // console.log("IMAGEM: ", imgSrc)
            // console.log("DESCRIÇAO: ", productDescricao)
            // console.log("- - - - - - - - - - - - - - - - - ")
            // console.log("                                  ")
            await this.backPage();
            await this.sleep(1000)

        }
        this.scrapedData.push({
            categoryName: categoryName,
            productsCategory: productData
        });
    }
}


  async backPage() {
    await this.sleep(1000);
    let back = document.querySelector('.fancybox-button.fancybox-close-small');
    if (back) {
      // console.log("Voltou");
      back.click();
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
