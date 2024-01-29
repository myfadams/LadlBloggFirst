import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
let posts=[]

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
function createPost(author,title,message){
    this.author=author;
    this.title=title;
    this.message=message;
    this.preview=message.substring(0,100);
    // this.id=id;
}

app.get("/", (req,res)=>{
    res.render("index.ejs",{allPosts:posts});
})
app.get("/create",(req,res)=>{
    res.render("createPost.ejs");
})
app.post("/create", (req,res)=>{
    if(req.body.name.replace(/\s/g,"")==="" ||req.body.title.replace(/\s/g,"")==="" ||req.body.text.replace(/\s/g,"")==="" ){
        res.redirect("/create");
    }else{
        let post = new createPost(req.body.name, req.body.title, req.body.text,);
        posts.push(post)
        res.redirect("/")
        // console.log(posts)
    }
})

app.get("/viewpost", function(req,res){
    // console.log(posts)
    let postToView = posts[parseInt(req.query.linkid)];
    
    res.render("viewPosts.ejs",{postN:postToView});
});
app.get("/remove",function(req,res){
    let n =parseInt(req.query.id);
    console.log(n)
    console.log()
    if(n!==0){
        posts.splice(n, 1);
    }else{
        posts.splice(0,1);
    }
    // console.log(posts)
    console.log();
    res.redirect("/")
});
let nInt;
app.get("/edit",function(req,res){
    nInt = parseInt(req.query.id);
    console.log(posts[nInt])
    res.render("edit.ejs",{post:posts[nInt]})
});
app.post("/edit",function(req,res){
    let Cn =(req.body.Cname.replace(/\s/g, ""));
    let Ct =(req.body.Ctitle.replace(/\s/g, ""));
    let Ctex=(req.body.Ctext.replace(/\s/g,""));
    if(Cn==="" || Ct ==="" || Ctex ===""){
         res.render("edit.ejs", { post: posts[nInt] });
    }
    else{
        console.log(req.body);
        let editedPost = new createPost(req.body.Cname, req.body.Ctitle, req.body.Ctext)
        editedPost["id"]=nInt;
        posts[nInt]=editedPost;
        res.redirect("/")
    }
})
app.listen(port, function(){
    console.log(`listening on port ${port}`);
})
