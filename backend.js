function getMetadata(){
  var x = document.getElementById("myFile");
  var txt = "";
  if ('files' in x) {
    if (x.files.length == 0) {
      txt = "Select one or more files.";
    } else {
      for (var i = 0; i < x.files.length; i++) {
        var file = x.files[i];
        if ('name' in file) {
          txt += "File Name: " + file.name + "<br>";
        }
        if ('size' in file) {
          txt += "Size: " + file.size + " bytes <br>";
        }
      }
    }
  }
  else {
    if (x.value == "") {
      txt += "Select one or more files.";
    } else {
      txt += "The files property is not supported by your browser!";
      txt  += "<br>The path of the selected file: " + x.value;
    }
  }
  document.getElementById("metadata").innerHTML = txt;
}
