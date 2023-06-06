const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const ejs = require('ejs')
const express = require('express')

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article",articleSchema)

// //GET
// app.get("/articles",function(req,res){
//     Article.find(function(err,foundArticles){
//         if (!err){
//             res.send(foundArticles);
//         }
//         else{
//             res.send(err);
//         }
        
//     });
// });

// //POST 

// app.post("/articles", function(req,res){
//     console.log(req.body.title)
//     console.log(req.body.content)

//     const newArticle = new Article({
//         title: req.body.title,
//         content:req.body.content
//     })

//     newArticle.save(function(err){
//         if(!err){
//             res.send("Successfully added article")
//         }else{
//             res.send(err);
//         }
//     })
// });

// // DELETE

// app.delete("/article", function(err){
//     if(!err){
//         res.send("Successfully deleted all the articles!")
//     }
//     else{
//         res.send(err)
//     }
// });

app.route("/articles")

.get(function(req,res){
    Article.find(function(err,foundArticles){
        if (!err){
            res.send(foundArticles);
        }
        else{
            res.send(err);
        }
        
    });
})

.post(function(req,res){
    console.log(req.body.title)
    console.log(req.body.content)

    const newArticle = new Article({
        title: req.body.title,
        content:req.body.content
    })

    newArticle.save(function(err){
        if(!err){
            res.send("Successfully added article")
        }else{
            res.send(err);
        }
    })
})

.delete(function(err){
    if(!err){
        res.send("Successfully deleted all the articles!")
    }
    else{
        res.send(err)
    }
});

////////////////////////////////////////////////////////////////////////


app.route("/articles/:articleTitle")

.get(function(req,res){
    Article.findOne({title:req.params.articleTitle},function(err,foundArticle){
        if(foundArticle){
            res.send(foundArticle)
        }else{
            res.send("No article found matching your title!")
        }
    })
})

.put(function(req, res){
    Article.update(
        {title: req.params.articleTitle},
        {title:req.body.title, content:req.body.content},
        {overwrite:true},
        function(err){
            if(!err){
                res.send("Updated succesfully")
            }else{
                res.send(err)
            }
        }
    )
})

.patch(function(req,res){
    Article.update({title: req.params.articleTitle},
        {$set:req.body},
        function(err){
            if(!err){
                res.send("Updates")
            }else{
                res.send(err )
            }
        })
})

.delete(function(req,res){
    Article.deleteOne({title:req.params.articleTitle},
        function(err){
            if(!err){
                res.send("Updates")
            }else{
                res.send(err )
            }
        })
});

app.listen(3000,function(){
    console.log("server running on port 3000");
})