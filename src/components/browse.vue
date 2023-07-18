<template>
	<div>
	<div class="main pt-6">
		<modal v-show="isVisible" v-body-scroll-lock="isVisible" v-on:close="hideModal()" :id="clicked_id"></modal>
	<div class="ml-5" v-if="movies">
		<div v-for="(categories,index) in movies" v-on:mouseover="showArrow(index)" v-on:mouseleave="hideArrow(index)">
			<h1 class="is-size-3 has-text-white mt-3 mb-1">{{ categories[0].categorie }}</h1>
			<div class="tile scrolling-wrapper selection height" id="container">
				<div v-on:click="slideLeft(index)" class="nav_button left ml-5">
					<i class="material-icons has-text-white is-size-1 noselect">chevron_left</i>
				</div>
				<div v-on:click="slideRight(index)" class="nav_button right">
					<i class="material-icons has-text-white is-size-1 noselect">chevron_right</i>
				</div>
				<div class="ml-1" id="tile">
					<div class="card is-clickable hovBigger" v-for="movie in categories" v-if="!movie.categorie" v-on:click="showModal(movie)" v-on:mouseover="show_quick_add(movie._id)" v-on:mouseleave="hide_quick_add(movie._id)">
						<div class="quick-add" v-bind:id="movie._id">
							<div class="control is-flex is-justify-content-space-between">
      <div class="add is-size-6 control" v-if="true" v-on:click="setCookie(id._id,$elem)">
        <div class="quick-add-button mt-3 pr-3"><i class="material-icons has-text-white">post_add</i></div>
      </div>
      <div class="add is-size-6 control" v-else v-on:click="delCookie(id._id)">
        <div class="quick-add-button mt-3 pr-3"><i class="material-icons mr-2">delete_sweep</i></div>
      </div>
    </div>
						</div>
						<div class="card-image">
							<figure class="image is-3by4">
								<img v-if="movie.poster" :src="movie.poster" alt="Placeholder image">
								<img v-else src="/static/index.png" alt="/static/index.png">
							</figure>
						</div>
						<div class="card-content no-scroll has-text-weight-bold" :class="{'moving-text':movie.title.length>20}">
							<p>{{ movie.title }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div v-else>
			<div class="w-100 no-scroll selection height ml-5">
			<div v-for="i in 4">
			<div class="background-grey m-4" style="width:300px"><br><br></div>
			<div class="tile is-2 mb-5" id="tile">
				<skeleton v-for="i in 10" :key="i"></skeleton>
			</div>
			</div>
		</div>
	</div>
	<div class="is-flex is-justify-content-center" v-if="notEnd && isLoadingMore == true">
		<div class="lds-ring"><div></div><div></div><div></div><div></div></div>
	</div>
	<div v-if="!notEnd">
		<footerComponent></footerComponent>
	</div>
</div>
</div>
</template>

<script>
import request from '../requests'
import modal from './modal.vue'
import footerComponent from './footer.vue'
import skeleton from './skeleton.vue'

function update_height_arrow(){
	let elems_right = document.getElementsByClassName('right')
	elems_right = Array.from(elems_right)
	elems_right.map((x)=>{
		x.style.height = x.parentElement.clientHeight + 'px'
	})
	let elems_left = document.getElementsByClassName('left')
	elems_left = Array.from(elems_left)
	elems_left.map((x)=>{
		x.style.height = x.parentElement.clientHeight + 'px'
	})
}

 function is_on_mobile() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem)
    })
}


function update_arrow(elem,index){
	if(elem.scrollLeft > 0){
		document.getElementsByClassName('left')[index].style.display = "flex"
	}
	else{
		document.getElementsByClassName('left')[index].style.display = "none"
	}
	if(elem.scrollLeft == (elem.scrollWidth - elem.clientWidth)){
		document.getElementsByClassName('right')[index].style.display = "none"
	}
	else{
		document.getElementsByClassName('right')[index].style.display = "flex"
	}
}




export default({
	name: 'Browse_all',
	components:{
		modal,
		footerComponent,
		skeleton
	},
	data(){
		return {
			movies: '',
			isVisible: false,
			clicked_id: {},
			isLoadingMore: false,
			isSearching:false,
			notEnd:true,
			isMobile: false,
			err: ''
		}
	},
	async created(){
		try{
			const allMovies = await request.getMovies_20()
			this.movies = allMovies
		}
		catch(err){
			this.err = err
		}
		this.isMobile = is_on_mobile()
		document.querySelector('body').onscroll= async ()=>{
			if (((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight-30) && this.isLoadingMore == false && this.notEnd == true) {
  			this.isLoadingMore = true
  			let cats = []
  			this.movies.map((x)=>{
  				cats.push(x[0].categorie)
  			})
  			this.showMore(cats)
  		}
  		if(is_on_mobile() != true){
  			document.getElementsByClassName("main")[0].onresize = ()=>{
				update_height_arrow()
				alert('not dead')
			}
  		}
		}

	},
	updated(){
		if(this.isMobile != true){
		update_height_arrow()
		this.$nextTick(function () {
			let arrows = document.getElementsByClassName('selection')
			arrows = Array.from(arrows)
			arrows.map((x,index)=>{
				x.onscroll = () =>{
					update_arrow(x,index)
				}
			})
		})
		}
	},
	destroyed(){
		document.getElementsByClassName("main").onresize = ""
		document.querySelector('body').onscroll=""
		document.getElementsByClassName('selection').onscroll=""
	},
	methods:{
		slideRight (index){
			let elem = document.getElementsByClassName('selection')[index]
			elem.scrollLeft += window.innerWidth*0.70
		},
		slideLeft (index){
			let elem = document.getElementsByClassName('selection')[index]
			elem.scrollLeft -= window.innerWidth*0.70
		},
		showModal (index){
			document.querySelector('html').style.overflow = "hidden"
			this.clicked_id = index
			this.isVisible = true

		},
		hideModal (){
			document.querySelector('html').style.overflow = "auto"
			this.clicked_id = {}
			this.isVisible = false
		},
		showMore:async function(cats){
			const response = await request.getMoreMovies(cats)
			this.isLoadingMore = false
			if(response.end){
				this.notEnd = false
			}else{
			let a = this.movies
			this.movies = a.concat(response)
			console.log(this.movies)
			}
		},
		showArrow(index){
			if(this.isMobile != true){
			update_arrow(document.getElementsByClassName('selection')[index],index)
			}
		},
		hideArrow(index){
			document.getElementsByClassName('left')[index].style.display = 'none'
			document.getElementsByClassName('right')[index].style.display = 'none'
		},
		getDate(date){
      		return new Date(date).toLocaleString('default',{month: 'short',year :'numeric'})
      	},
      	show_quick_add(elem){
      		document.getElementById(elem).style.visibility = "visible"
      	},
      	hide_quick_add(elem){
      		document.getElementById(elem).style.visibility = "hidden"
      	},
      	setCookie(id_movie,elem){
      		elem.prevent.default();
      		alert('ok')
        	//request.setCookies(id_movie)
        	
      	}
	}

})	
</script>

<style>
#container{
	width: 100%;
}
.modal-card, .modal-content{
	margin:0;
}
.quick-add-button{
	
}
.quick-add{
	position:absolute;
	top:0px;
	right:0px;
	z-index:1;
	visibility:hidden;
}
@media screen and (min-width: 769px){
	.image-grey{
		width: 200px;
		overflow-x: hidden;
		max-width: 100%;
	}
}
.sidenav {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: #111; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
}
.scrolling-wrapper {
	overflow-x: scroll;
	overflow-y: hidden;
	white-space: nowrap;
	scroll-behavior: smooth;
	scrollbar-color: #1a1a1a #1a1a1a;
	scrollbar-width: thin;
	-webkit-overflow-scrolling: touch;
}
.scrolling-wrapper::-webkit-scrollbar {
 width: 12px;
 height: 8px;
}
.scrolling-wrapper::-webkit-scrollbar-thumb {
 background: white;
 border-radius: 8px;
}
.scrolling-wrapper::-webkit-scrollbar-track{
 background: #1a1a1a;
 border-radius: 10px;
}


@media (hover: hover) and (pointer: fine) {
	.scrolling-wrapper::-webkit-scrollbar-thumb:hover{
 background: #ffffff;
}
  .scrolling-wrapper:hover{
	scrollbar-color: grey #232e39;
	}
	.hovBigger:hover{
	font-size: 1.1em;
}

}
.card-image>figure>img{
	border-top-left-radius: .5rem !important;
	border-top-right-radius: .5rem !important;
}
.no-scroll{
	overflow: hidden;
}
.hovBigger{
	transition: .3s;
}
.card {
	display: inline-block;
	margin-right:15px;
	background: white;
	color:black;
	width: 12rem;
}
.card-image{
	background: #1a1a1a;
}
.media, .content{
	overflow-x: hidden;
	-o-text-overflow: ellipsis;
	   text-overflow: ellipsis;
}
.subtitle{
	text-align: left !important;
}
.nav_button{
	background: rgba(0,0,0,0.25);
	width: 60px;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: center;
	    -ms-flex-pack: center;
	        justify-content: center;
	-webkit-box-align: center;
	    -ms-flex-align: center;
	        align-items: center;
	cursor: pointer;
}
.nav_button:nth-child(1){
	position: absolute;
	left: 0px;
	z-index: 2;
	display: none;
}
.nav_button:nth-child(2){
	position: absolute;
	right: 0px;
	z-index: 2;
}
.right{
	display: none;
}
.nav>i{
	cursor: pointer;
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */ /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
.outlined{
	border:2px solid yellow;
	border-radius: 5px;
	padding: 3px;
	background: #DAB800;
	color: black;
	
}
.subtitle{
	padding-bottom: 5px;
}
.card-content{
	position: absolute;
	bottom: 0px;
	color:white;
	width: 100%;
	background: -webkit-gradient(linear,left top, left bottom,from(transparent),to(black));
	background: -o-linear-gradient(transparent,black);
	background: linear-gradient(transparent,black);
	padding-bottom: 7px;
	padding-top: 5em;
	border-bottom-left-radius: 0px !important;
	border-bottom-right-radius: 0px !important;
}
.media{
	margin-bottom:2px !important;
}
.tile{
	margin-bottom: 1em;
}
.image{
	background: #1a1a1a;
}

 body.modal-open {
  overflow: hidden;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  -webkit-animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: red  transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  -webkit-animation-delay: -0.45s;
          animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  -webkit-animation-delay: -0.3s;
          animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  -webkit-animation-delay: -0.15s;
          animation-delay: -0.15s;
}
@-webkit-keyframes lds-ring {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes lds-ring {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}

.moving-text:hover{
display: inline-block;
  white-space: nowrap;
  animation: floatText 6s infinite linear;
  width: 100%;
}
@keyframes floatText {
	50%{
		text-indent: -200%;
	}
	50.1%{
		text-indent: 100%;
	}
}
</style>