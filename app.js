javascript:

var QUAL_COLUNA_MARCADOR = 0;

var myFile = document.createElement('input');
myFile.type = 'file';
myFile.click();

myFile.onchange = function(){

  var QUAL_COLUNA_NDS = prompt("Em qual coluna está as NDS? 1 para primeira, 2 para segunda, ....");
  var file = this.files[0];

  var reader = new FileReader();
  reader.onload = function(progressEvent){

    let encontrados = 0;
    let naoEncontrados = [];

    var table = document.getElementById("MainContent_gvResultado");
    var lines = this.result.split('\n');
    for(var i = 0; i < lines.length; i++){

      fileValue = lines[i].replace(/(\r\n|\n|\r)/gm, "").replace(/\s/g, '');

      if (!fileValue)
        continue;

      for (var j = 1; j < table.rows.length - 1; j++) {

        tableValue = table.rows[j].cells[QUAL_COLUNA_NDS].innerText;
        if (!tableValue)
          continue;

        if (fileValue == tableValue) {
          encontrados++;
          checkButton=  table.rows[j].cells[QUAL_COLUNA_MARCADOR].getElementsByTagName('input')[0].checked = true;
          break;
        }
      }

      if (tableValue && tableValue != fileValue)
        naoEncontrados.push(fileValue);

    }

    encontradosMarcados = "";
    if (encontrados > 0)
      encontradosMarcados = "\nAs NDs encontradas foram marcadas!\n";

    listaNaoEncontrados = "";
    if (naoEncontrados.length > 0)
      listaNaoEncontrados = "\nLista de não encontrados:";


    message = "\nEncontrados: " + encontrados.toString() + "\nNão encontrados: " + naoEncontrados.length.toString() + "\n" + encontradosMarcados + listaNaoEncontrados;

    prompt(message, naoEncontrados.join(', '));
  };
  reader.readAsText(file);
};
