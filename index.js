var express = require('express');
var multer  = require('multer')
var fs = require('fs')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
//var upload = multer({ dest: 'uploads/' })

var app = express();

var port = process.env.PORT || 8080;

var router = express.Router(); 

router.get("/",function(req,res) {
    res.json({message:"RestFull Server Online"})
})

router.get("/test",function(req,res) {
    res.send("<h1>The server is online!!!</h1>")
})

router.post("/listener",upload.single('file'),function(req,res) {
    console.log(req.file.originalname);
    fs.writeFileSync('uploads/' + req.file.originalname,req.file.buffer)
    res.send('ok')
})

app.use('/api',router)

app.listen(port);
console.log("The server is online on port " + port)