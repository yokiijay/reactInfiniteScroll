global.fetch = require('node-fetch')
const config = require('universal-config')
const Unsplash = require('unsplash-js').default
const toJson = require('unsplash-js').toJson
const express= require('express')
const app = express()

//配置unsplash
const unsplash = new Unsplash({
	applicationId: config.get('APPLICATION_ID'),
	secret: config.get('SECRET'),
	callbackUrl: config.get('CALLBACK_URL')
})


app.get('/api/photos', (req,res)=>{
	unsplash.photos.listPhotos(req.query.start, req.query.count)
	.then(toJson)
	.then(json => res.json(json))
})

const PORT = process.env.PORT || 5000
app.listen(5000, ()=>console.log(`Server started on PORT ${PORT}`))