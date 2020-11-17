import {insert_json,find_json} from './mongoUtils';
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')

const app = express();

var dbname = 'mongodb+srv://<username>:<password>@cluster0.3cmqe.mongodb.net/<dbname>?retryWrites=true&w=majority';

// middle ware
app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());

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
	var json =json_from_survey_text_file(  file_path, {qname = qn} );
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
