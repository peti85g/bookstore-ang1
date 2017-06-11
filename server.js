var express = require('express');
var app = express();


var mongojs = require('mongojs');
var db = mongojs('bookstore',['bookstore']);
var bodyParser = require('body-parser');


app.use(bodyParser.json());


app.get('/bookstore', function(req, res){
    console.log('got request');
    db.bookstore.find(function(err, docs){
        if(err) throw err;
        console.log(docs);
        res.json(docs);
    });
});

app.post('/bookstore', function(req, res){
    console.log(req.body);
    db.bookstore.insert(req.body, function(err, doc){
        if(err) throw err;
        res.json(doc);
    });
});
//{title:req.body.title, author:req.body.author, isbn: req.body.isbn}

app.delete('/bookstore/:id',function(req, res, next){
    var id = req.params.id;
    console.log(id);
    db.bookstore.remove({_id : mongojs.ObjectId(id)}, function(err, doc){
        if(err){
            next(err);
        }else{
        res.json(doc);
        }
    });
});

app.get('/bookstore/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.bookstore.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        if(err) throw err;
        res.json(doc);    
    });
});

app.put('/bookstore/:id', function(req, res){
    var id = req.params.id;
    console.log(req.body.isbn);
    db.bookstore.findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {$set: {title: req.body.title, author: req.body.author, isbn: req.body.isbn}},
        new:true
    },
        function(err, doc){
            if(err) throw err;
            res.json(doc);
        }
    );
});


app.use(express.static(__dirname + '/public'));
app.listen(3000);

console.log('server at 3000');