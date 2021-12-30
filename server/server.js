//express
let express = require('express')
let cors = require('cors')
let bodyParser = require('body-parser')
let app = express()

let events = require('events')
let eventEmitter = new events.EventEmitter();


app.use(cors())
app.use(bodyParser.urlencoded({extended:true})).use(bodyParser.json())


//get mbs wp-json data
var newBody = "";
var gatherBody = "";
var deliverBody = "";
var doneBody = "";

//new eventEmiter
app.post('/new',function(req,res) {
    newBody = req.body;
     eventEmitter.emit('onNew', newBody.id , (req.headers.domain) )
     res.status(200).send('OK')


})

//gather eventEmiter
app.post('/gather',function(req,res) {
    gatherBody = req.body;
     eventEmitter.emit('onGather', gatherBody.id ,(req.headers.domain))
     res.status(200).send('OK') 


})

//deliver eventEmiter
app.post('/deliver',function(req,res) {
    deliverBody = req.body;
     eventEmitter.emit('onDeliver', deliverBody.id , (req.headers.domain))
     res.status(200).send('OK')


})

//done eventEmiter
app.post('/done',function(req,res) {
    doneBody = req.body;
    eventEmitter.emit('onDone', doneBody.id ,(req.headers.domain))
    res.status(200).send('OK')


})

//delete eventEmiter
app.post('/delete',function(req,res) {
    doneBody = req.body;
    eventEmitter.emit('onDelete', doneBody.id ,(req.headers.domain))
    res.status(200).send('OK')


})

//clear eventEmiter
app.post('/clear',function(req,res) {
    eventEmitter.emit('onClear', (req.headers.domain))
    res.status(200).send('OK')


})

app.get('/hesed',function(req,res) {
  res.send(JSON.parse(fs.readFileSync('hesed.json', "utf8")))
})

app.get('/mbs',function(req,res) {

    res.send(JSON.parse(fs.readFileSync('mbs.json', "utf8")))
})


 
app.listen(8000,()=>{
    console.log("The server is up");
})



// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@z@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@z@

// websocket

const http = require("http");
const WebsocketServer = require("websocket").server
const fs = require("fs")
const { currentTime } = require('./utils')

let connection = null; 
const httpServer = http.createServer((req, res) => {
    console.log("We have recived a req");
})

const wss = new WebsocketServer({
    "httpServer": httpServer
})


// on new write to json and send data to react
eventEmitter.on('onNew', function( id, domain ){
    let jsonPath = (domain == 'bundles') ? 'mbs.json' : 'hesed.json' //json path trenry
    console.log(jsonPath);

    fs.readFile( jsonPath , 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {

        let obj = JSON.parse(data); //now it an object
        let item = {id: id, timestamp: currentTime()}

        obj[0].data.push(item); //add some data
        let json = JSON.stringify(obj); //convert it back to json

        fs.writeFile(jsonPath, json, 'utf8', function(err) {
            if (err) throw err;

            // console.log("The written has the following contents:");
            // console.log(JSON.parse(fs.readFileSync(jsonPath, "utf8"))[0]);  
            console.log("File written successfully\n");
            connection.send([JSON.stringify(item)," " + domain, ' new'])  
            
            }); // write it back 
       
    }});

})

// on gather write to json and send data to react
eventEmitter.on('onGather', function( id, domain ){

    let jsonPath = (domain == 'bundles') ? 'mbs.json' : 'hesed.json' //json path trenry
    console.log(jsonPath);

    fs.readFile( jsonPath , 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            
        let obj = JSON.parse(data); //now it an object
        let item = {id: id, timestamp: currentTime()}

        obj[1].data.push(item); //add some data
        let json = JSON.stringify(obj); //convert it back to json

        fs.writeFile(jsonPath, json, 'utf8', function(err) {
            if (err) throw err;

            console.log("File written successfully\n");
            connection.send([JSON.stringify(item)," " + domain, ' gather'])  
            
            }); // write it back 
       
    }});
    // connection.send([data, domain, ' deliver'])  
})

// on deliver write to json and send data to react
eventEmitter.on('onDeliver', function( id, domain ){

    let jsonPath = (domain == 'bundles') ? 'mbs.json' : 'hesed.json' //json path trenry
    console.log(jsonPath);

    fs.readFile( jsonPath , 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            
        let obj = JSON.parse(data); //now it an object
        let item = {id: id, timestamp: currentTime()}

        obj[2].data.push({id: id, timestamp: currentTime()}); //add some data
        let json = JSON.stringify(obj); //convert it back to json

        fs.writeFile(jsonPath, json, 'utf8', function(err) {
            if (err) throw err;

            console.log("File written successfully\n");
            connection.send([JSON.stringify(item)," " + domain, ' deliver'])  
            
            }); // write it back 
       
    }});

})

// on done write to json and send data to react
eventEmitter.on('onDone', function( id, domain ){

    let jsonPath = (domain == 'bundles') ? 'mbs.json' : 'hesed.json' //json path trenry
    console.log(jsonPath);

    fs.readFile( jsonPath , 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            
        let obj = JSON.parse(data); //now it an object
        let item = {id: id, timestamp: currentTime()}

        obj[3].data.push({id: id, timestamp: currentTime()}); //add some data
        let json = JSON.stringify(obj); //convert it back to json

        fs.writeFile(jsonPath, json, 'utf8', function(err) {
            if (err) throw err;

            console.log("File written successfully\n");
            connection.send([JSON.stringify(item)," " + domain, ' done'])  
 
            
            }); // write it back 
       
    }});

})


// on delete write to json and send data to react
eventEmitter.on('onDelete', function( id, domain ){

    let jsonPath = (domain == 'bundles') ? 'mbs.json' : 'hesed.json' //json path trenry
    console.log(jsonPath);

    fs.readFile( jsonPath , 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            
        let obj = JSON.parse(data); //now it an object

         //find id and delete from all
        const findId = (element) => element.id == id;
        
         let newDeleteId = obj[0].data.findIndex(findId);
         let gatherDeleteId = obj[1].data.findIndex(findId);
         let deliveyDeleteId = obj[2].data.findIndex(findId);
         let doneDeleteId = obj[3].data.findIndex(findId);

        if( newDeleteId != -1 ){
            obj[0].data.splice(newDeleteId,1)
            console.log("new : delete");
            
        } else {
            console.log("new : nothing to delete");
        }

        if( gatherDeleteId != -1 ){
            obj[1].data.splice(gatherDeleteId,1)
            console.log("gather : delete");

        }else {
            console.log("gather : nothing to delete");
        }

        if( deliveyDeleteId != -1 ){
            obj[2].data.splice(deliveyDeleteId,1)
            console.log("delivery : delete");

        }else {
            console.log("delivery : nothing to delete");
        }

        if( doneDeleteId != -1 ){
            obj[3].data.splice(doneDeleteId,1)
            console.log("done :  delete");

        }else {
            console.log("done : nothing to delete");
        }

        let json = JSON.stringify(obj); //convert it back to json

        fs.writeFile(jsonPath, json, 'utf8', function(err) {
            if (err) throw err;

            console.log("Delete Finished\n");
            connection.send([id," " + domain, ' delete'])  
           
        
            }); // write it back 
       
    }});

})

// on delete write to json and send data to react
eventEmitter.on('onClear', function(domain){

    let jsonPath = (domain == 'bundles') ? 'mbs.json' : 'hesed.json' //json path trenry

    fs.readFile( jsonPath , 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            
        let obj = JSON.parse(data); //now it an object

         obj[0].data = [];
         obj[1].data = [];
         obj[2].data = [];
         obj[3].data = [];


        let json = JSON.stringify(obj); //convert it back to json

        fs.writeFile(jsonPath, json, 'utf8', function(err) {
            if (err) throw err;

            console.log("Clear Finished\n");
            connection.send([domain, ' clear'])  
           
        
            }); // write it back 
       
    }});

})

// all wss .on
wss.on("request", request => {
   connection =  request.accept(null, request.origin)
   connection.on("open", () => console.log("OPENED!"))
   connection.on("close", () => console.log("CLOSED!"))

   connection.on("message", message => {
       console.log(`Recived message ${message.utf8Data}`);
   })
})

httpServer.listen(8080, () => console.log("Listening on 8080"));




// test function
// function send(){
//     connection.send(`Message ${Math.random()}`)

//     setTimeout(send,5000);
// }