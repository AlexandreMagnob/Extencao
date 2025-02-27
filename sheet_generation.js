async function createCSV(data, name) {
  const csvData = [];

  csvData.push([
      'TIPO',
      'NOME',
      'DESCRIÇÃO',
      'VALOR',
      'VALOR DE CUSTO',
      'VALOR PROMOCIONAL',
      'IMAGEM',
      'CODIGO PDV',
      'DISPONIBILIDADE DO ITEM',
      'TIPO COMPLEMENTO',
      'QTDE MINIMA',
      'QTDE MAXIMA',
      'CALCULO DOS COMPLEMENTOS',
      'REAPROVEITAR',
  ]);

  const scrapedData = data;

  scrapedData.forEach(categoryData => {
      const categoryName = categoryData.categoryName;
      const categoryDesc = categoryData.categoryDesc;
      csvData.push(['Categoria', categoryName, categoryDesc]);

      categoryData.productsCategory.forEach(productData => {
          const productName = productData.title;
          const productDescription = productData.descricao;
          const productPrice = productData.price;
          const promotionPrice = productData.promoPrice;
          const imgSrc = productData.imgSrc;
          const codigoPdv = ''; // Adicione o código PDV aqui, se tiver

          // Preencha os campos de código PDV e disponibilidade do item, se disponíveis
          if (codigoPdv && productData.disponibilidade) {
              const disponibilidade = productData.disponibilidade;
              csvData.push(['Produto', productName, productDescription, productPrice, promotionPrice, imgSrc, codigoPdv, disponibilidade]);
          } else {
              csvData.push(['Produto', productName, productDescription, productPrice, '', promotionPrice, imgSrc]);
          }

          // Verifique se complementsDict existe antes de iterar
          if (productData.complementsDict && productData.complementsDict.length > 0) {
              productData.complementsDict.forEach(complementData => {
                  const complementName = complementData.nameComplement;
                  const complementType = complementData.typeComplement;
                  const complementRequired = complementData.required ? 'Obrigatório' : 'Não';
                  const complementMinQtd = complementData.minQtd;
                  const complementMaxQtd = complementData.maxQtd;

                  csvData.push(['Complemento', complementName, '', '', '', '', '', '', '', complementType, complementMinQtd, complementMaxQtd]);

                  complementData.options.forEach(option => {
                      const optionName = option.optionTitle;
                      const optionPrice = option.optionPrice;
                      const optionDescription = option.optionDescription;
                      const optionImg = option.optionImg ? option.optionImg : "";

                      csvData.push(['Opcao', optionName, optionDescription, optionPrice, '', '', optionImg, '', '', '', '', '']);
                  });
              });
          }
      });
  });

  // Converter para CSV usando a biblioteca papaparse
  const csv = Papa.unparse(csvData);

  // Criar um Blob com o conteúdo CSV
  const blob = new Blob([csv], { type: 'text/csv' });

  // Criar um objeto URL para o Blob
  const url = URL.createObjectURL(blob);

  // Criar um link de download
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;

  const fileName = name !== "" ? name : "planilha_produto";

  a.download = `${fileName}.csv`; // Nome do arquivo de download

  // Anexar o link ao documento e simular um clique nele
  document.body.appendChild(a);
  a.click();

  // Limpar e revogar o objeto URL
  URL.revokeObjectURL(url);

  // Remover o link após o download
  document.body.removeChild(a);
}
