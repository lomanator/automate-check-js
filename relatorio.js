javascript:

var TABLE_ID = "MainContent_divResposta";
var table = document.getElementById(TABLE_ID);
var headerHTML = table.getElementsByTagName('thead')[0].rows[0].cells;
var rowsHTML = table.getElementsByTagName('tbody')[0].rows;

alert('Selecione arquivo com os resultados desejados.');

var myFile = document.createElement('input');
myFile.type = 'file';
myFile.click();

myFile.onchange = function(){
  var file = this.files[0];

  var reader = new FileReader();
  reader.onload = function(progressEvent){

    var searchingTerms = this.result.split('\n');
    searchingTerms = searchingTerms.map(s => s.replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g, ' ').trim().toLowerCase());
    searchingTerms = searchingTerms.filter(s => s ? true : false);

    var headerArray = []
    for (var i = 0; i < headerHTML.length; i++) {
      headerArray.push(headerHTML[i].innerText);
    }

    var rowsArray = [ headerArray ];
    var cellArray = []

    var i = 0;
    var firstValue = ''
    while (i < rowsHTML.length - 1) {
      firstValue = rowsHTML[i].cells[0].innerText;
      if (!isNaN(firstValue)) { //Linha de dados
        resultText = rowsHTML[i+1].cells[0].innerText;
        if (searchingTerms.indexOf(resultText.replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g, ' ').trim().toLowerCase()) > -1){
          cellArray = [];
          for (j = 0; j< rowsHTML[i].cells.length; j++)
            cellArray.push(rowsHTML[i].cells[j].innerText);
          cellArray.push(resultText);
          rowsArray.push(cellArray);
        }
      }
      i++;
    }

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    newdate = year + "-" + month + "-" + day;

    var csvContent = "data:text/csv;charset=utf-8,"
      + rowsArray.map(e => e.join(";")).join("\n");
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "NDS_bloqueadas_" + newdate + ".csv");
    document.body.appendChild(link);

    alert('Relatório gerado com ' + rowsArray.length + ' items encontrados. Salvando...')
    link.click();
  };
  reader.readAsText(file);
};