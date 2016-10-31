var http = require("http");
var unix;
var natural;
var output;
var month ="";

var server = http.createServer(function(req,res){
    var request_url_parameter = req.url.toString().slice(1);
    var parameter_length = request_url_parameter.length;
    var parameter_isNotNumber = isNaN(Number(request_url_parameter))
    var parameter_lastFourIsNumber = isNaN(Number(request_url_parameter.slice(request_url_parameter.length-4)))
    if (
            (request_url_parameter !== "") &&
            (parameter_isNotNumber) 
        ){ 
            var monthFullNames = ['January', 'February','March','April','May','June','July','August', 'September', 'October', 'November', 'December'];
            var month_full = request_url_parameter.slice(0,request_url_parameter.indexOf('%20'))
            console.log('original month:' +month_full)
            var day_full = request_url_parameter.slice(request_url_parameter.indexOf('%20')+3)
            day_full = Number(day_full.slice(0,day_full.indexOf('%20')-1))
            console.log('original day:' +day_full)
            var year = Number(request_url_parameter.slice(request_url_parameter.length-4))
            console.log('original year:' +year)
            if (month_full.length < 2 || month_full.length > 9){
                console.log('month fail: '+month_full)
                res.end(JSON.stringify(show_null()))
            }
            else if (isNaN(year) || year <0){
                console.log('year fail:' +year)
                res.end(JSON.stringify(show_null()))
            }
            
            else{
            var i, j;
            for (i=0, j=0; i<monthFullNames.length, j<month_full.length; j++){
                if(month_full.charAt(j).toLowerCase() !== monthFullNames[i].charAt(j).toLowerCase() ){
                    //console.log('upper: '+month_full.charAt(j).toLowerCase())
                    //console.log('next month')
                    month="";
                    //console.log('clear word'+word)
                    i++;
                    j=0;
                }else{
                    //console.log('lower: '+month_full.charAt(j).toLowerCase())
                    //console.log(month_full);
                    //console.log(j)
                    month += month_full.charAt(j).toLowerCase();
                    if (month === month_full){
                        month_full = monthFullNames[i];
                    }
                }
            }
            var dateString = month_full+day_full+year
            console.log(dateString)
            unix = new Date(dateString);
            console.log(unix);
            var temp_output = {
                'unix': Date.parse(unix),
                'natural':month_full + ' ' + day_full + ' ' + year
                }
            console.log("I'm natural code")
            res.end(JSON.stringify(temp_output))}
        }
    else if (
            (!parameter_isNotNumber) && 
            (parameter_length === 13)
        ){
            var unixtime = Number(request_url_parameter); 
            var date = new Date(unixtime);
                unix = unixtime;
                natural = null;
                var temp_output = {
                    'unix': unix,
                    'natural': date.toDateString().slice(4)
                    }
                console.log("I'm unix code")
                res.end(JSON.stringify(temp_output))
        }
    else
    {
      console.log('general fail')
      res.end(JSON.stringify(show_null()))
    }
    
    
  
});
server.listen(process.env.PORT, function(){
    console.log("Server listening on: "+ process.env.PORT);
});

function show_null(){
    unix = null;
    natural = null;
      output = {
         'unix': unix,
        'natural': natural
        }
    return output
}

