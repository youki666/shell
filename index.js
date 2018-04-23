var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var path = request.url 
  var query = ''
  if(path.indexOf('?') >= 0){ query = path.substring(path.indexOf('?')) }
  var pathNoQuery = parsedUrl.pathname
  var queryObject = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/


  if(path =='/style'){
    response.setHeader('Content-Type','text/css; charset= utf-8')
    response.write('h1{color:red;}')
    response.end()
  }else if(path =='/main'){
    response.setHeader('Content-Type','text/javascript;charset= utf-8')
    response.write('alert("有朋自远方来，不亦乐乎！")')
    response.end()
  }else if(path == '/'){
    var string = fs.readFileSync('./index.html','utf-8')
    var amount = fs.readFileSync('./db','utf-8')//100
        string = string.replace('&&&amount&&&',amount)
    response.setHeader('Content-Type','text/html;charset=utf-8')
    response.write(string)
    response.end()
  }else if(path == '/pay'){
    var amount = fs.readFileSync('./db','utf-8')//100
    var newAmount = amount -1
      fs.writeFileSync('./db',newAmount)//100
     response.setHeader('Content-Type','application/javascript')
      response.statusCode = 200
      response.write(`
        ${query.callbackName}.call('undefined','success')

        `
        )
    response.end()
  }else{
    response.statusCode = 404
    response.setHeader('Content-Type','text/html;charset=utf-8')
    response.write('<!Doctype>\n<html>'+
      '<head><style>'+
      'body{background-color:navy;display:flex; justify-content: center;align-items:center}h1{font-size:144px;color:#fff}'+
      '</style></head><body>\n'+
      '<h1>404 NOT FOUND</h1>'+
      '</body></html>'
      )
    response.end()
  }




  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)

