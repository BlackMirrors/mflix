<template>
	<transition name="modal-fade" v-if="id">
	<div class="modal" id="modale" v-body-scroll-lock="false">
  <div class="modal-background" v-on:click="close()"></div>
  <div class="modal-content">
    <div class="modal-card">
      <div class="image" v-if="id.poster">
      	<button class="delete is-large" v-on:click="close()"></button>
      	<img :src="id.poster"  alt="Placeholder image" class="is-overlay">
      	<div class="gradient"></div>
      </div>
    <section class="modal-card-body scrollable has-text-white">
    	<!--<div class="divider no-scroll"></div> -->
    	<div class="pt-5 mb-0">
      <p class="title has-text-white">{{ id.title }} 
      	<span class="has-text-grey-light is-size-4" v-if="id.released">
 					({{ getDate(id.released) }})
      	</span> 
        <span class="is-pulled-right">
          <div class="control is-flex is-justify-content-space-between">
      <div class="add is-size-6 control" v-if="!inList" v-on:click="setCookie(id._id)">
        <button class="button is-primary is-outlined"><i class="material-icons mr-2">post_add</i> Add to your list</button>
      </div>
      <div class="add is-size-6 control" v-else v-on:click="delCookie(id._id)">
        <button class="button is-white is-outlined"><i class="material-icons mr-2">delete_sweep</i>Remove from your list</button>
      </div>
    </div>
        </span>
    	</p>
      <div class="rating" v-if="id.imdb">
      	<!--<span class="stars" v-for="stars in parseInt(id.imdb.rating/2)">★</span>
      	<span>{{ id.imdb.rating/2 }}/5 </span>
      	<span>( {{ id.imdb.votes }} reviews )</span>-->
        <div v-if="id.genres">
            <span class="mr-1 tag" v-for="(genre,index) in id.genres">{{ genre }}</span>
        </div>
    	</div>
      <div class="navbar-brand is-flex is-justify-content-space-between w-100 mt-4">
        <div class="navbar-item has-text-white is-flex-grow-1 is-clickable" v-on:click='changeTab("synopsis")':class='{active:currentTab == "synopsis"}' id="synopsis"><p class="has-text-centered w-100">Synopsis</p></div>
        <div class="navbar-item has-text-white  is-flex-grow-1 is-clickable"  v-on:click='changeTab("casting")':class='{active:currentTab == "casting"}' id="casting"><p class="has-text-centered w-100">Casting</p></div>
        <div class="navbar-item has-text-white  is-flex-grow-1 is-clickable"  v-on:click='changeTab("reviews")':class='{active:currentTab == "reviews"}' id="reviews"><p class="has-text-centered w-100">Reviews</p></div>
        <div class="navbar-item has-text-white is-flex-grow-1  is-clickable"  v-on:click='changeTab("awards")':class='{active:currentTab == "awards"}' id="awards"><p class="has-text-centered w-100">Awards</p></div>
      </div>
    </div>
    <div v-if="currentTab == 'synopsis'" class="content p-5">
      <div v-if="id.fullplot">
        <p class="is-size-5 has-text-weight-bold">Synopsis: <span v-if="id.type">
          <div class="outline is-pulled-right" v-if="id.type == 'series'">
            TV-SHOW
          </div>
          <div class="outline is-pulled-right" v-else="">
            MOVIE
          </div>
        </span></p>
        <p>{{ id.fullplot }}</p>
        <div v-if="id.languages">
        <p class="is-size-5 has-text-weight-bold mb-3">Languages: 
          <span class="is-size-6 has-text-weight-normal" v-for="(language,index) in id.languages">{{ language }}<span v-if="index != id.languages.length - 1">, </span>
          </span>
        </p>
      </div>
      </div>
    </div>
    <div v-if="currentTab == 'casting'" class="content p-5">
      <div v-if="id.cast">
        <p class="is-size-5 has-text-weight-bold">Casting:
          <span class="is-size-6 is-italic has-text-grey-light" v-for="(cast,index) in id.cast">{{ cast }}<span v-if="index != id.cast.length - 1">, </span>
          </span>
        </p>
      </div>
      <div v-if="id.directors">
        <p class="is-size-5 has-text-weight-bold">Directors:
          <span class="is-size-6 is-italic has-text-grey-light" v-for="(director,index) in id.directors">{{ director }}<span v-if="index != id.directors.length - 1">, </span>
          </span>
        </p>
      </div>
      <div v-if="id.writers">
        <p class="is-size-5 has-text-weight-bold">Writers:
          <span class="is-size-6 is-italic has-text-grey-light" v-for="(writer,index) in id.writers">{{ writer }}<span v-if="index != id.writers.length - 1">, </span>
          </span>
        </p>
      </div>
    </div>
    <div v-if="currentTab == 'reviews'" class="content p-5">
      <div v-if="id.tomatoes">
          <span>Rotten Tomatoes:</span><br>
            <ul>
            <li v-if="id.tomatoes.viewer">
            <span>Viewers rating: </span>
            <span class="stars" v-for="stars in parseInt(id.tomatoes.viewer.rating/2)">🍅</span><span class="white-tomato" v-for="stars in 5-parseInt(id.tomatoes.viewer.rating/2)">🍅</span>
          <span>{{ id.tomatoes.viewer.rating/2 }}/5 </span>
          <span>( {{ id.tomatoes.viewer.numReviews.toLocaleString() }} reviews )</span>
          </li>
            <li v-if="id.tomatoes.critic">
              <span>Critics rating: </span>
            <span class="stars" v-for="stars in parseInt(id.tomatoes.critic.rating/2)">🍅</span><span class="white-tomato" v-for="stars in 5-parseInt(id.tomatoes.critic.rating/2)">🍅</span>
          <span>{{ id.tomatoes.critic.rating/2 }}/5 </span>
          <span>( {{ id.tomatoes.critic.numReviews.toLocaleString() }} reviews )</span>
            </li>
            </ul>
            <div v-if="id.tomatoes.consensus">
              <span class="is-italic">"{{ id.tomatoes.consensus }}"</span>
            </div>
            <div v-if="id.tomatoes.website">
              <a v-bind:href="id.tomatoes.website" class="button is-info is-light mt-2">Website</a>
            </div>
            <div class="mb-3"></div>
      </div>
      <div v-if="id.imdb">
        <span>Imdb rating: </span>
        <span class="stars" v-for="stars in parseInt(id.imdb.rating/2)">★</span><span v-for="stars in 5-parseInt(id.imdb.rating/2)">★</span>
        <span>{{ id.imdb.rating/2 }}/5 </span>
        <span>( {{ id.imdb.votes.toLocaleString() }} reviews )</span>
      </div>
    </div>
    <div v-if="currentTab == 'awards'" class="content p-5">
      <div v-if="id.awards">
        <div>
          <p v-if="id.awards.wins">🏆 : {{id.awards.wins}} awards</p>
          <p v-if="id.awards.nominations">🎫 : {{id.awards.nominations}} nominations</p>
          <p v-if="id.awards.text">{{id.awards.text}}</p>
        </div>
      </div>
    </div>
    </section>
  </div>
  </div>
</div>
</transition>
</template>
<script>
import request from '../requests'

  export default {
    name: 'modal',
    data(){
    	return{
    		cookies:'',
    		myList:[],
    		inList:false,
        currentTab:"synopsis"
    	}
    },
    beforeUpdate(){
    	if(document.cookie.indexOf('myList') != -1){
      	this.cookies = request.getCookie()
      	this.updateList()
    	}else{
    		this.inList = false
    	}
    },
    methods: {
      close() {
        this.currentTab="synopsis"
        this.$emit('close')
      },
      changeTab(changingTo){
        if(changingTo != this.currentTab){
         
          this.currentTab = changingTo
          document.getElementById(changingTo).classList.add("active")
        }
      },
      getDate(date){
      	return new Date(date).toLocaleString('default',{month: 'short',year :'numeric'})
      },
      setCookie(id_movie){
        request.setCookies(id_movie)
        this.cookies = request.getCookie()
        this.updateList()
      },
      updateList(){
      	if(document.cookie.indexOf('myList') != -1){
      	let n = 0
      	this.cookies.map((x)=>{
      		if(x == this.id._id){
      			n++
      		}
      	})
      	if(n>0){
      		this.inList = true
      	}else{
      		this.inList = false
      	}}
      	else{
      		this.inList = false
      	}
      },
      delCookie(id){
      	//document.cookie = "myList=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      	request.delCookie(id)
      	if(document.cookie.indexOf('myList') != -1){
      		this.cookies = request.getCookie()
      	}
      	this.updateList()
      }
    },
    props:{
    	id:Object
    }
  }
</script>
<style scoped>
	.modal{
		overflow: hidden;
	}
  .white-tomato{
    color: transparent;  
  text-shadow: 0 0 0 black;
  }
  .navbar-item{
    background:transparent;
    transition:background .3s;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
  }
  .content{
    background:#2e2c2c;
    height:15em;
    outline:2px red;
    border-bottom:2px solid red;
    border-right:2px solid red;
    border-left:2px solid red;
    scrollbar-color: white #201f1f ;
    scrollbar-width: thin;
    color:#e2e0e0 !important;
  }
  .navbar-item:after{
    position:absolute;
    content: '';
    bottom: 0px;
    left: 0px;
    width: 100%;
    border-bottom: solid 2px red;
    -webkit-transition: -webkit-transform .3s ease-in-out;  
    transition: -webkit-transform .3s ease-in-out;  
    -o-transition: transform .3s ease-in-out;  
    transition: transform .3s ease-in-out;  
    transition: transform .3s ease-in-out, -webkit-transform .3s ease-in-out;
  }
  .navbar-item:hover{
    background:#454545;
  }
  .navbar-item.active{
    border-top:solid 2px red;
    border-right:solid 2px red;
    border-left:solid 2px red;
    border-top-right-radius:5px;
    border-top-left-radius:5px;
    background:#2e2c2c;
  }
  .navbar-item:hover:after{
    -webkit-transform: scaleX(0);
        -ms-transform: scaleX(0);
            transform: scaleX(0);
  }
  .navbar-item.active:after{
    -webkit-transform: scaleX(0);
        -ms-transform: scaleX(0);
            transform: scaleX(0);
  }
	.modal-background{
		position: fixed;
		transform: scale(1.1);
	}
	.delete{
		z-index: 1003;
		float: right;
		background: black;
		margin-right: 5px;
	}
	.add{
	
		height: 2em;
	}
	.add>button{
		height: 100% !important;
	}
	.gradient{
		position: absolute;
		top:0px;
		background: -webkit-gradient(linear, left top, left bottom, from(transparent), to(#201f1f));
		background: -o-linear-gradient(transparent, #201f1f);
		background: linear-gradient(transparent, #201f1f);
    width: 100%;
    height: 100%;
    z-index: 1001;
	}
	.outline{
		border:1px solid black;
		padding: 2px;
		border-radius: 4px;
	}
	.modal{display: -webkit-box;display: -ms-flexbox;display: flex; z-index: 35;}
	.modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }
  .fixed{
    position:fixed;
    width:inherit;
    max-width:inherit;
  }
  .divider{
  	width: 100%;
  	height: 40px;
  	background: -webkit-gradient(linear, left top, left bottom, from(#201f1f), to(transparent));
  	background: -o-linear-gradient(#201f1f, transparent);
  	background: linear-gradient(#201f1f, transparent);
  	position: absolute;
 		-webkit-transform: translateY(-20px);
 		    -ms-transform: translateY(-20px);
 		        transform: translateY(-20px);
 		overflow: hidden;
  }

  hr.solid {
  border-top: 3px solid #bbb;
  margin-bottom: 20px;
  margin-top:12px;
	}
	.rating{
		margin-bottom: 5px;
	}
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    -webkit-transition: opacity .5s ease;
    -o-transition: opacity .5s ease;
    transition: opacity .5s ease;
  }
  .scrollable{
  	scrollbar-color: #201f1f #201f1f ;
		scrollbar-width: thin;
  }
  .scrollable::-webkit-scrollbar {
 width: 12px;
 height: 8px;
}
.scrollable::-webkit-scrollbar-thumb {
 background: white;
 border-radius: 8px;
}
.scrollable::-webkit-scrollbar-track{
 background: #1a1a1a;
 border-radius: 10px;
}
  .scrollable:hover{
  	scrollbar-color:white #201f1f;
  }
  section>div{
  	margin-bottom: 20px;
  }
  .title{
  	margin-bottom: 5px;
  }
  
  .modal-card-head{
  	background: black;
  	padding: 0px;
  	border-radius: 5px;
  }
  .modal-card-body{
  	background: #201f1f;
  }
  .modal-card{
  	max-height: 100vh !important;
  }
  .modal-content{
  	max-height: 100vh !important;
  }
  .image{
    background: #201f1f;
     width: 100%;
    height: 35vh;
    position: relative;
    overflow: hidden;
  }
  .stars{
  	display: inline-block;
  	color:#FFD700;
  }
  .w-100{
    width:100%;
  }
</style>