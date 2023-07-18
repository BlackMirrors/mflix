const url = 'https://whoonix.herokuapp.com/api/data/'

class requests{
	static async getMovies_20(){
		const response = await fetch(url)
		.then((res) => {return res.json()})
		return response
	}
	static async getMoreMovies(cats){
		const response = await fetch(url,{
			method:'POST',
			headers: {
			      'Content-Type': 'application/json'
			    },
			body: JSON.stringify({'data':cats})
			})
		.then((res) => {return res.json()})
		return response
	}
	static async getMoviesList(){
		const cookie = this.getCookie()
		const response = await fetch(url+'id/',{
			method:'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({'data':cookie})
		})
		.then((res) => {
			if(typeof(res)=='object'){
				return res.json()
			}
			else{
				return false
			}
		})
		
		return response
	}
	static async queriesMovie(query){
		const response = await fetch(url+'search/',{
			method:'POST',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({'data':query})
		})
		.then(res => {
			if(typeof(res)=='object'){
				return res.json()
			}
			else{
				return false
			}
		})
		return response
	}
	static createCookie(name,data){
		return document.cookie = name + "=" + data + "/;"
	}
	static getCookie(){
		if(document.cookie.indexOf('myList') != -1){
			return this.getCookies()[0][1].replace('/','').split(',')
		}
		else{
			return ''
		}
	}
	static setCookies(data){
		if(document.cookie.indexOf('myList') == -1){
			const movies = [data]
			this.createCookie('myList', movies)
		}
		else{
			let movies = this.getCookies()
			movies = movies[0][1].replace('/','').split(',')
			movies.push(data)
			this.createCookie('myList', movies)
		}
	}
	static getCookies() {
		var decodedCookie = decodeURIComponent(document.cookie)
		var ca = decodedCookie.split(';')

		return ca.map(function(c){
		    while (c.charAt(0) == ' ') {
		        c = c.substring(1)
		    }
		        return c.split("=")
		    }
		)
	} 
	static delCookie(id){
		if(document.cookie.indexOf('myList') != -1){
			let data = this.getCookies()[0][1].replace('/','').split(',')
			if(data.length > 1){
			data.map((x,index)=>{
				if(x == id){
					data.splice(index,1)
				}
			})
			this.createCookie('myList',data)
			}
			else{
				document.cookie = "myList=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
			}
		}
	}
}

export default requests