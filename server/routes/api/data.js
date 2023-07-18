const express = require('express')
const mongoose = require('mongoose')

const router = express.Router();

mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)

const url = 'secretURI'
mongoose.connect(url, {useNewUrlParser: true})
let data = mongoose.model('movies', {})

router.get('/', async (req,res)=>{
	const categories = ['For You','Action','Drama','Most Rated','Adventure','TV show']
	let rand_index = []
	let data = []
	rand_index = await creating_cat(rand_index,3,categories)
	data= Promise.all(
		rand_index.map(async(x)=>{
		let temp_data = await getData(null,null,x)
		return await temp_data
	}))
	//console.log('categori'+categories)
	res.send(await data)
	
})

router.post('/', async (req,res)=>{
	const categories = ['For You','Action','Drama','Most Rated','Adventure','TV show']
	let result = categories
	req.body.data.map((x)=>{
		result = result.filter(e => e != x)
	})
	let rand_index = []
	let data = []
	rand_index = await creating_cat(rand_index,3,result)
	console.log(rand_index)
	if(rand_index.length == 0){
		data = {end:"no more categories"}
	}
	else{
	data= Promise.all(
		rand_index.map(async(x)=>{
		let temp_data = await getData(null,null,x)
		console.log(x)
		return await temp_data
	}))
	}
	//console.log(await data)
	res.send(await data)
})


router.post('/id', async (req,res)=>{
	if(req.body.data){
		const movies = await getMovieDataFromId(req.body.data)
		res.send(await movies)
	}
	else{
		res.send('nothing to show')
	}
})

router.post('/search', async (req,res)=>{
	if(req.body.data){
		let suggestion = await getquery(req.body.data)
		res.send(await [suggestion])
		console.log("search "+ await typeof(suggestion))
	}
	else{
		res.send({err:"no result"})
	}
})


async function getquery(movQuery){
	const regex = new RegExp(movQuery, 'i')
	let res = await data.aggregate([
		{$match:{title:{$regex: regex}}},
		{$sample:{size:9}}
		]).limit(9)
	if(res.length == 0){
		return {err:'no resultz'}
	}
	return await res
}

async function getMovieDataFromId(ids_array){
	let res = []
	res = Promise.all(
		ids_array.map(async(x)=>{
		let temp = []
		await data.findById(x, async(err,movie)=>{
			temp.push(movie)
		})
		return await temp

	})
	)
	return await res
}

async function creating_cat (tab,n,cats){
	var tmp = cats
	let temp = []
	if(cats.length > 0){
	for(let i=0;i<n;i++){
		temp.push(random(tmp.length,tmp))
		//console.log(cats)
	}
	return await temp
	}
	else{
		return temp
	}

}

async function getData(req, res, cat){
	let a = []
	console.log(cat) 
	switch(cat.join()){
		case 'Action':
			a = await data.aggregate([
				{$match:{genres:'Action'}},
				{$sample:{size:20}}
				]).limit(20)
			break
		case 'Drama':
			a = await data.aggregate([
				{$match:{genres:'Drama'}},
				{$sample:{size:20}}
				]).limit(20)
			break
		case 'Adventure':
			a = await data.aggregate([
				{$match:{genres:'Adventure'}},
				{$sample:{size:20}}
				]).limit(20)
			break
		case 'TV show':
			a = await data.aggregate([
				{$match:{type:'series'}},
				{$sample:{size:20}}
				]).limit(20)
			break
		case 'Most Rated':
			a = await data.find({'imdb.rating': { "$ne": '' }}).sort({ 'imdb.rating':"desc"}).limit(20)
			break
		default:
			a = await data.aggregate([{$sample:{size:20}}]).limit(20)
			break
	}
	a.unshift({categorie:cat.join()})
	return await a
}

function random(catLength,tab){
	return tab.splice(Math.floor(Math.random() * catLength),1)
}

module.exports = router