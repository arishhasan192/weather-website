const request=require('request')
const forecast=(latitude,longitude,callback)=>{
const url='http://api.weatherstack.com/current?access_key=c6c7bff8373eadee43e71b00034a65df&query='+latitude+','+longitude+''
request({url:url,json:true},(error,response)=>{

if(error){
    callback('1 Error',undefined)
}
else if(response.body.error){
    callback('2 Error',undefined)
}
else{
    callback(undefined, {
        location:response.body.location.name,
        temperature:response.body.current.temperature,
        precipitation:response.body.current.precip,
        humidity:response.body.current.humidity
    })//response.body.location.name + ' It is currently ' + response.body.current.temperature + ' degres out. There is a ' + response.body.current.precip+ '% chance of rain.')
}
})
}

module.exports=forecast