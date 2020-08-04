<html>
    <head>
        <title>spotif.ai</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
    </head>
    <body>
      <script type="text/javascript">
      function processImage() {
          // API key and endpoint
          const subscriptionKey = "b2cf0902bf004b89b2a5096c2df5e0e3";

          const uriBase =
              "https://spotifai.cognitiveservices.azure.com/face/v1.0/detect";

          // Request parameters.
          var params = {
              "returnFaceId": "true",
              "returnFaceLandmarks": "false",
              "returnFaceAttributes":
                  "age,emotion"
          };

          // Display the image.
          var sourceImageUrl = document.getElementById("inputImage").value;
          document.querySelector("#sourceImage").src = sourceImageUrl;

          // Perform the REST API call.
          $.ajax({
              url: uriBase + "?" + $.param(params),

              // Request headers.
              beforeSend: function(xhrObj){
                  xhrObj.setRequestHeader("Content-Type","application/json");
                  xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
              },

              type: "POST",

              // Request body.
              data: '{"url": ' + '"' + sourceImageUrl + '"}',
          })

          .done(function(data) {
              // Show formatted JSON on webpage.
              $("#responseTextArea").val(JSON.stringify(data, null, 2));
          })

          .fail(function(jqXHR, textStatus, errorThrown) {
              // Display error message.
              var errorString = (errorThrown === "") ?
                  "Error. " : errorThrown + " (" + jqXHR.status + "): ";
              errorString += (jqXHR.responseText === "") ?
                  "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                      jQuery.parseJSON(jqXHR.responseText).message :
                          jQuery.parseJSON(jqXHR.responseText).error.message;
              alert(errorString);
          });
      };
      </script>
      <h1>spotif.ai</h1>
      Enter image URL<br><br>
      Image to analyze: <input type="text" name="inputImage" id="inputImage"
          value="" />
      <button onclick="processImage()">Analyze</button><br><br>
      <div id="wrapper" style="width:1020px; display:table;">
          <div id="jsonOutput" style="width:600px; display:table-cell;">
              JSON:<br><br>
              <textarea id="responseTextArea" class="UIInput"
                  style="width:580px; height:400px;"></textarea>
          </div>
          <div id="imageDiv" style="width:420px; display:table-cell;">
              Image:<br><br>
              <img id="sourceImage" width="400" />
          </div>
      </div>
    </body>
</html>
