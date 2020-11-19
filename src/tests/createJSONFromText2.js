function json_from_survey_text_file(file_path, qn){
    var fs = require('fs');
    var es = require('event-stream');
    var out = "\{ name: " + qn + ",";
    out = out + " [ ";
    var s = fs.createReadStream(file_path)
        .pipe(es.split())
        .pipe(es.mapSync(function(line) {
            //pause the readstream
            s.pause();
            //console.log("line:", line);

	    if (line) {
		var v = line.split(':')
		//console.log(v[0])
		//console.log(v[1])
	    
		out = out + ' { question:' + v[1] + ',';
		out = out + " answers: [";
		out = out + "  \{ type: \"1\", content: \"1\" \},";
		out = out + "  \{ type: \"2\", content: \"2\" \},";
		out = out + "  \{ type: \"3\", content: \"3\" \},";
		out = out + "  \{ type: \"4\", content: \"4\" \},";
		out = out + "  \{ type: \"5\", content: \"5\" \} ] \},";
	    }
	    //console.log(out);
	    s.resume();
        })
        .on('error', function(err) {
            console.log('Error:', err);
         })
        .on('end', function() {
            out = out + ' ] \}';
            //console.log('Finish reading.');
        }));
    //return JSON.parse(out);
    console.log(out);
    return(out)
}

// test code
var testOut = json_from_survey_text_file( 'Proust.txt', 'Proust' );
console.log(testOut);
