<template>
	<div>
		<search v-if="ifBrowse" v-show="isSearching" v-on:close="close()" :movie="searchInput"></search>
		<nav class="navbar is-fixed-top is-flex is-justify-content-center is-align-items-center" role="navigation" aria-label="main navigation">
			<div class="navbar-brand">
				<router-link :to="{name: 'Menu'}" exact class="navbar-item has-text-white" id="menu">MFlix</router-link>
				<router-link :to="{name: 'Browse'}" exact class="navbar-item has-text-white">Browse</router-link>
				<router-link :to="{name: 'myList'}" exact class="navbar-item has-text-white">My List</router-link>
			</div>
			<div class="search" href="" v-show="ifBrowse">
				<div class="control has-icons-left">
					<input class="input" v-on:click="search()" id="search" placeholder="Search film, Tv show, anime, and more ...">
					<span class="icon is-small is-left">
						<span class="material-icons">search</span>
					</span>
				</div>
				<div class="is-flex is-align-items-centered close" v-if="isSearching">
			        <div class="icon is-small is-right">
						<span class="material-icons" v-on:click="close()">close</span>
					</div>
			    </div>
			</div>
			<div class="dropdown is-right is-hoverable">
				<div class="dropdown-trigger">
					<button class="button has-background-black is-outlined is-danger" aria-haspopup="true" aria-controls="dropdown-menu3">
						<span class="flag-icon flag-icon-us"></span>
						<span class="icon is-small">
							<span class="material-icons has-text-white" aria-hidden="true">keyboard_arrow_down</span>
						</span>
					</button>
				</div>
				<div class="dropdown-menu has-background-black " id="dropdown-menu3" role="menu">
					<div class="dropdown-content has-background-black is-flex is-flex-direction-column">
						<div class="is-flex is-justify-content-center is-clickable"><span class="flag-icon flag-icon-fr"></span></div>
						<div class="is-flex is-justify-content-center mt-3 is-clickable"><span class="flag-icon flag-icon-es"></span></div>
					</div>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
import search from './search.vue'
export default { name: 'navbar',
	data(){
		return {
			isSearching:false,
			searchInput:''
		}
	},
	mounted(){
		let dropdown = document.querySelector('.dropdown');
		dropdown.addEventListener('click', function(event) {
			event.stopPropagation();
			dropdown.classList.toggle('is-active');
		});
		document.getElementById('search').oninput = (x) =>{
    			console.log('ok')
    			this.searchInput = x.target.value
    		}
		this.$nextTick(function () {
			/*document.getElementById('search').addEventListener("input", function detect (x){
    		this.searchInput = x.target.value
			console.log(this.searchInput)
    	},{once:false})*/

		})
	},
	components:{
		search
	},
	computed: {
    ifBrowse() {
        return (this.$route.name == "Browse") || (this.$route.name == "myList");
    },
	},
	methods:{
		search(){
			this.isSearching=true	
		},
		close(){
			this.isSearching=false
			document.getElementById('search').value = ''
		},
		Typing(){
    	
    	}
	}
 }
</script>

<style scoped>
	i{
		color: red;
		background: red;
	}
	#dropdown-menu3{
		background:red;
		min-width:5rem !important;
	}
	.close{
		color:red;
	 	cursor: pointer;
	 	-webkit-box-flex: 0;
	 	    -ms-flex: 0;
	 	        flex: 0;
	 	position: relative;
	 	-webkit-transform: translateX(-2em);
	 	    -ms-transform: translateX(-2em);
	 	        transform: translateX(-2em);
	}
	@media screen and (max-width: 769px){
		.search{
			-webkit-box-flex:1;
			    -ms-flex:1;
			        flex:1;
					display: -webkit-box;
					display: -ms-flexbox;
					display: flex;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
		position: fixed;
		background: black;
		width: 100vw;
		top: 0;
		left: 0;
		margin-left: 0 !important;
		margin-right: 0 !important;
		-webkit-box-shadow: 0px 1em 1em black;
		        box-shadow: 0px 1em 1em black;
		}
		.close{
			position: absolute;
			right: 0;
			-webkit-transform: translateY(0px);
			    -ms-transform: translateY(0px);
			        transform: translateY(0px);
			margin-right: 1em;
		}
		.navbar{
			top:auto;
			bottom: 0;
		}
	}
	.fa-envelope{
		color: red;
		background: red;
	}
	.search{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
		-webkit-box-flex: 1;
		    -ms-flex: 1;
		        flex: 1;
		margin-right: 1em;
		margin-left: 1em;
	}
	.search>div:nth-child(1){
		-webkit-box-flex: 1;
		    -ms-flex: 1;
		        flex: 1;
	}
	.search>div>input{
		width: 100%;
		color: red;
		background: transparent;
		border-color: #323131;
	}
	.search>div>input:focus{
		-webkit-box-shadow: 0 0 5px .1em red;
		        box-shadow: 0 0 5px .1em red;
	}
	.navbar{
		background: black;
		color:white;
	}
	.navbar-item{
		margin-bottom: 3px;
	}
	.navbar-item:after{
	  position:absolute;
	  content: '';
	  bottom: 0px;
	  left: 0px;
	  width: 100%;
	  border-bottom: solid 2px red;
	  -webkit-transform: scaleX(0);
	      -ms-transform: scaleX(0);
	          transform: scaleX(0);  
	  -webkit-transition: -webkit-transform .3s ease-in-out;  
	  transition: -webkit-transform .3s ease-in-out;  
	  -o-transition: transform .3s ease-in-out;  
	  transition: transform .3s ease-in-out;  
	  transition: transform .3s ease-in-out, -webkit-transform .3s ease-in-out;
	}
	.navbar-item:hover:after{
		-webkit-transform: scaleX(1);
		    -ms-transform: scaleX(1);
		        transform: scaleX(1);
	}
	.navbar-item.active:after{
		-webkit-transform: scaleX(1) !important;
		    -ms-transform: scaleX(1) !important;
		        transform: scaleX(1) !important;
	}
	#search::placeholder{
		color:red;
	}
	router-link{
		color:white;
	}
	#menu{
		background-position:100%, 50px;
		background-size: 10px 1000px;
		background:linear-gradient(to top,red 0%,white 40%);
		background-clip:text;
		color:transparent !important;
		
		font-weight:bold;
		transition:1s;
	}
	#menu:hover{
		background-position: 100% -50px;

	}
	nav{ background: black; }
	ul{ color:red; }
</style>
