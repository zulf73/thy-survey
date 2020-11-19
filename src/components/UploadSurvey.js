import { parse } from 'path';
import {insert_json,find_json} from './mongoUtils';
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const fs = require('fs');
const app = express();
var dbname = 'mongodb+srv://<username>:<password>@cluster0.3cmqe.mongodb.net/<dbname>?retryWrites=true&w=majority';


// middle ware
app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());

function json_from_survey_text_file(file_path, qn){
    var fs = require('fs');
    var es = require('event-stream');
    var out = '{ name: ' + qn + ',';
    var s = fs.createReadStream(path)
        .pipe(es.split())
        .pipe(es.mapSync(function(line) {
            //pause the readstream
            s.pause();
            //console.log("line:", line);
            var v = line.split(':')
            out = out + v[0] + ' : ' + v[1] + ','
            s.resume();
        })
        .on('error', function(err) {
            console.log('Error:', err);
         })
        .on('end', function() {
            out = out + '}';
            console.log('Finish reading.');
        }));
    return JSON.parse(out);
}


// file upload api
app.post('/upload', (req, res) => {

    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
        // accessing the file
    const myFile = req.files.file;

    var file_path = `${__dirname}/public/${myFile.name}`;
    //  mv() method places the file inside public directory
    myFile.mv(file_path, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }

    // read the file and produce json

	var json =json_from_survey_text_file(  file_path, myFile );
	var id = insert_json( json, dbname, 'surveys');
	// redirect to a path that does
	// the questionnaire rendering
	return redirect_survey_page(id)

	// returing the response with file path and name
        //return res.send({name: myFile.name, path: `/${myFile.name}`});
    });
})

class UploadSurvey extends Component {
    
};

export default UploadSurvey;
