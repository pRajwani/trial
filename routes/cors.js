var cors = require('cors')

const whiteList =['http://localhost:3000','http://localhost:4200', 'http://localhost:4200/login', 'https://flamboyant-dijkstra-7e93d2.netlify.app']

var corsOptionDelegate = (req,callback)=>{
    var corsOption;
    
    if(whiteList.indexOf(req.header('Origin'))!=-1)
    {
        corsOption= {origin:true}
    }
    else{
        corsOption={origin:false}
    }
    callback(null,corsOption)
}

exports.cors = cors()
exports.corsOption = cors(corsOptionDelegate)