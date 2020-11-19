// read the JSON
// insert the JSON in 'survey' collection
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://zulf:snaggle41014@cluster0.3cmqe.mongodb.net/<dbname>?retryWrites=true&w=majority";
var fs = require('fs');

// these things always have promisify problems
var jsonObject = JSON.parse('{}');
fs.readFile('./Proust.json', 'utf8', (err, data) => {
    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {
        // parse JSON string to JSON object
        jsonObject = JSON.parse(data);
    }
});
// do we have the JSON object?	    

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("prod");
  dbo.collection("customers").insertOne(jsonObject, function(err, res) {
    if (err) throw err;
    db.close();
  });
});
	    
