const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Arish'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Arish'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Arish'
    })
})

app.get('/products',(req,res)=>{
  
    if(!req.query.search){
        return res.send({
            error:'Please search something'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Please provide an address'
        })
    }
 
geocode(req.query.address,(error,data)=>{
if(error){
    return res.send({error})
}
forecast(data.latitude,data.longitude,(error,foreCast)=>{
    if(error){
        return res.send({error})
    }
      res.send({
          location:foreCast.location,
          precipitation:foreCast.precipitation,
          humidity:foreCast.humidity,
          temperature:foreCast.temperature

      })
    
})    
})

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Arish',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Arish',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})