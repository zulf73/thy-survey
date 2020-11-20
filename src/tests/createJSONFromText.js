var fs = require('fs');

function json_from_survey_text_file(file_path, qn){
    var data = fs.readFileSync( file_path, 'utf8' );
    var lines = data.split("\n");
    
    var out = "\{ name: " + qn + ", value:[ ";
    lines.forEach( (line) => {
	if (line) {
	    var v = line.split(':')
	    var inc_out  = " \{ question:" + v[1] + ",";
	    inc_out = inc_out + " answers: [";
	    inc_out = inc_out + "  \{ type: \"1\", content: \"1\" \},";
	    inc_out = inc_out + "  \{ type: \"2\", content: \"2\" \},";
	    inc_out = inc_out + "  \{ type: \"3\", content: \"3\" \},";
	    inc_out = inc_out + "  \{ type: \"4\", content: \"4\" \},";
	    inc_out = inc_out + "  \{ type: \"5\", content: \"5\" \} ] \},";
	    out = out + inc_out;
	}
    });
    out = out + " ] \}";
    return(out);
}

var testOut = json_from_survey_text_file( 'testQ.txt', 'testQ');
fs.writeFileSync( 'testQ.json', testOut, 'utf8' );

// let us upload it directly in 'survey'
// read the JSON
// insert the JSON in 'survey' collection
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://zulf:snaggle41014@cluster0.3cmqe.mongodb.net/<dbname>?retryWrites=true&w=majority";
var fs = require('fs');
var JSON = require('dirty-json');
// these things always have promisify problems
var jsonFileData = fs.readFileSync('./testQ.json', 'utf8');
var jsonObject = JSON.parse(jsonFileData);

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("prod");
  dbo.collection("surveys").insertOne(jsonObject, function(err, res) {
    if (err) throw err;
    db.close();
  });
});
