function test(trs){
	for (var i = 2; i < trs.length; i++){
  	var tds = trs[i].getElementsByTagName('td');
    var isGreen = 1;
    for (var j = 0; j < tds.length; j++){
    	if(tds[j].textContent.replace(/^\s+|\n|\s+$/g, '') == '0'){
        isGreen = 0;
      }
    }
    if(isGreen == 1){
    	trs[i].remove();
      test(trs);
    }
  }
  return;
}

function filterCommands(type) {
    if(type != "all"){
        //document.getElementById("myTable").deleteRow(0);
	    var tables = document.getElementsByTagName('table');
        //console.log(tables);
	    if(tables.length > 0){
		    for (var i = 0; i < tables.length; i++){
			    var trs = tables[i].getElementsByTagName('tr');
                test(trs);
            }
        }
    }
}

function remElems(){
    var tables = document.getElementsByTagName('table');
    var hrs = document.getElementsByTagName('hr');
    var brs = document.getElementsByTagName('br');
    for (var i = 0; i < tables.length; i++){
        var trs = tables[i].getElementsByTagName('tr');
        if(trs.length == 2){
            tables[i].style.display = "none";
            hrs[i].style.display = "none";
            brs[i*2].style.display = "none";
            brs[i*2+1].style.display = "none";
            var tds = trs[1].getElementsByTagName('td');
            var header = tds[0].textContent.replace(/^\s+|\n|\s+$/g, '');
            document.getElementById(header).style.display = "none";
        }
    }
}

function loadJS(FILE_URL, async = true) {
  let scriptEle = document.createElement("script");

  scriptEle.setAttribute("src", FILE_URL);
  scriptEle.setAttribute("type", "text/javascript");
  scriptEle.setAttribute("async", async);

  document.body.appendChild(scriptEle);

  // success event 
  scriptEle.addEventListener("load", () => {
    console.log("File loaded")
  });
   // error event
  scriptEle.addEventListener("error", (ev) => {
    console.log("Error on loading file", ev);
  });
}

function createLink(ref, text) {
    // Create anchor element.
    var a = document.createElement('a'); 
                  
    // Create the text node for anchor element.
    var link = document.createTextNode(text);
                  
    // Append the text node to anchor element.
    a.appendChild(link); 
                  
    // Set the title.
    //a.title = "This is Link"; 
                  
    // Set the href property.
    a.href = ref; 
                  
    // Append the anchor element to the body.
    document.body.prepend(a); 
}

$(document).ready(function() {

    var url_string = window.location.href;
    var url = new URL(url_string);
    var type = url.searchParams.get("type");

    filterCommands(type);

    var part1 = '';
    var part2 = '';
    if(url_string.includes('#') && url_string.includes('?')){
        part1 = url_string.split('?')[0];
        part2 = '#'+url_string.split('#')[1];
    } else if (url_string.includes('#') && !url_string.includes('?')){
        part1 = url_string.split('#')[0];
        part2 = '#'+url_string.split('#')[1];
    } else if (!url_string.includes('#') && url_string.includes('?')){
        part1 = url_string.split('?')[0];
        part2 = '';
    } else {
        part1 = url_string;
        part2 = '';    
    }


    if(type != "all"){
        createLink(part1+"?type=all"+part2, "ALL");
    } else {
        createLink(part1+"?type=filter"+part2, "Uncovered");
    }
    remElems();

});

$( document ).ready(function() {
    console.log( "ready!" );
    document.querySelector("#loader").style.display = "none";
});
