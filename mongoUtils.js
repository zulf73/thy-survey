// need function to
// put JSON in Mongo
// and pull out JSON


var MongoClient = require('mongodb').MongoClient


function insert_json( json, db_url, coll ){
    var db;
    // db_url = 'mongodb://localhost:27017/mydb'
    MongoClient.connect(db_url,function (err, database) {
	if (err) 
   	    throw err
	else
	{
	    db = database;
	    console.log('Connected to MongoDB');
	    
	}
    });
    db.collection(coll).insertOne(json,(e,r)=>{
	if(e) throw e;
	db.close();
    }
}

    function find_json( db_url, coll, criteria={} ){
    var db;
    // db_url = 'mongodb://localhost:27017/mydb';
    MongoClient.connect( db_url,
	function (err, database) {
	    if (err) 
   		throw err
	    else {
		db = database;
		//console.log('Connected to MongoDB');
	    }
	});

    var res;
    db.collection(coll).find(criteria).toArray(function(err, result) {
	if (err) throw err;
    //console.log(result);
	res = result;
	db.close();
    });
    return res;
}
