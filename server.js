var fs = require("fs");
var request = require("request");
var cheerio = require("cheerio");


var stream = fs.createWriteStream("data.csv");
stream.once("open", function(fd){

	stream.write("region,leave,remain\n");

	for(var i=97; i<=122; i++){
		
		request("http://www.bbc.co.uk/news/politics/eu_referendum/results/local/" + String.fromCharCode(i), function(error, response, html){

			var $ = cheerio.load(html);

			$(".eu-ref-result-bar").each(function(i, element){
			
				stream.write("\"" + $(this).find(".eu-ref-result-bar__title").text().toLowerCase() + "\",");
				stream.write("\"" + $(this).find(".eu-ref-result-bar__party--leave .eu-ref-result-bar__votes").text().toString().toLowerCase().replace("votes", "").trim() + "\",");
				stream.write("\"" + $(this).find(".eu-ref-result-bar__party--remain .eu-ref-result-bar__votes").text().toString().toLowerCase().replace("votes", "").trim() + "\"");
				stream.write("\n");
				
			});

		});

	}

});
