javascript:

var TABLE_ID = "MainContent_gvResultado";
var COL_CHECKBOX = 0;

var myFile = document.createElement('input');
myFile.type = 'file';
myFile.click();

myFile.onchange = function(){

  var col_nds = prompt("Em qual coluna está as NDS? 1 para primeira, 2 para segunda, ....");
  if ( (! Number.isInteger(parseInt(col_nds))) || parseInt(col_nds) < 0) {
    alert("Coluna tem que ser um número inteiro maior ou igual a 0!");
    return;
  }

  var file = this.files[0];

  var reader = new FileReader();
  reader.onload = function(progressEvent){

    let encontrados = new Set();
    let naoEncontrados = new Set();

    var table = document.getElementById(TABLE_ID);
    var lines = this.result.split('\n');
    for(var i = 0; i < lines.length; i++){

      fileValue = lines[i].replace(/(\r\n|\n|\r)/gm, "").replace(/\s/g, '');

      if (!fileValue)
        continue;

      for (var j = 1; j < table.rows.length - 1; j++) {

        tableValue = table.rows[j].cells[col_nds].innerText;
        if (!tableValue)
          continue;

        if (fileValue == tableValue) {
          encontrados.add(fileValue);
          checkButton=  table.rows[j].cells[COL_CHECKBOX].getElementsByTagName('input')[0].checked = true;
          break;
        }
      }

      if (tableValue && tableValue != fileValue)
        naoEncontrados.add(fileValue);

    }

    encontradosMarcados = "";
    if (encontrados.size > 0)
      encontradosMarcados = "\nAs NDs encontradas vão ser marcadas!\n";

    listaNaoEncontrados = "";
    if (naoEncontrados.size > 0)
      listaNaoEncontrados = "\nLista de não encontrados:";


    message = "\nEncontrados: " + encontrados.size.toString() + "\nNão encontrados: " + naoEncontrados.size.toString() + "\n" + encontradosMarcados + listaNaoEncontrados;
    console.log("\n###### Encontrados:\n" + Array.from(encontrados).join('\n'));
    console.log("\n###### Não encontrados:\n" + Array.from(naoEncontrados).join('\n'));
    prompt(message, Array.from(naoEncontrados).join(', '));
  };
  reader.readAsText(file);
};
