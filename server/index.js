const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

const posts = require('./routes/api/data')

app.use('/api/data', posts)

if(process.env.NODE_ENV === 'production'){
	app.use(express.static(__dirname+ '/public/'))
	app.get(/.*/, (req,res) => res.sendFile(__dirname+'/public/index.html'))
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))