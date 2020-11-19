const lineReader = require('line-reader');

function json_from_survey_text_file(file_path, qn){
    var out = "\{ name: " + qn + ",";
    out = out + " [ ";
    var Promise = require('bluebird');
    var eachLine = Promise.promisify(lineReader.eachLine);


    eachLine(file_path, (line, last) => {
	//console.log(line);
	if (line) {
	    var v = line.split(':')
	    //console.log(v[0])
	    //console.log(v[1])

	    var inc_out  = " \{ question:" + v[1] + ",";
	    inc_out = inc_out + " answers: [";
	    inc_out = inc_out + "  \{ type: \"1\", content: \"1\" \},";
	    inc_out = inc_out + "  \{ type: \"2\", content: \"2\" \},";
	    inc_out = inc_out + "  \{ type: \"3\", content: \"3\" \},";
	    inc_out = inc_out + "  \{ type: \"4\", content: \"4\" \},";
	    inc_out = inc_out + "  \{ type: \"5\", content: \"5\" \} ] \},";
	    out = out + inc_out;
	}
    }).then( ()=>{
	out = out + " ] \}";
	//return JSON.parse(out);
	console.log(out);
    });
    
    return(out)
}

// test code
var testOut = json_from_survey_text_file( 'Proust.txt', 'Proust' );
console.log(testOut);
