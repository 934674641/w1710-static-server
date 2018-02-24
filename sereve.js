var http=require("http");
var config=require("./config");
var fs=require("fs");
var path=require("path");


var httpobj=http.createServer(function (req,res) {
   if(req.url=="/favicon.ico"){
       res.end();
   }else{
       var rootdir=path.join(__dirname,config.root);

       fs.stat(rootdir,function (err,info) {
               if(err){
                  res.setHeader("content-type","text/html;charset=utf-8");
                  res.end(config.root+"根目录不存在");
               }else{

                   var url=path.join(__dirname,config.root,req.url);
                   if(!path.extname(url)){
                       url=path.join(url,config.index)
                   }
                   
                   fs.stat(url,function (err,info) {
                       if(err){
                           res.end("not find");
                       }else{

                           fs.readFile(url,function (err,info) {

                               res.end(info);

                           })
                       }
                   })



               }
       })



   }

});


httpobj.listen(8888)