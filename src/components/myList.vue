<template>
	<div class="mylist">
		<modal v-show="isVisible" v-body-scroll-lock="isVisible" v-on:close="hideModal(clicked_id)" :id="clicked_id"></modal>
		<div class="container">
			<div class="title pt-6 has-text-white has-text-centered">Your List</div>
			<div v-if="!loading">
				<span v-if="!noMovies"  class="is-flex is-flex-wrap-wrap">
					<div v-for="(movieCard,index) in movies">
					<div class="card mt-6 is-clickable hovBigger" v-on:click="showModal(movieCard[0])">
						<div class="card-image">
					    <figure class="image is-3by4">
					      <img :src=movieCard[0].poster alt="Placeholder image">
					    </figure>
					  </div>
						<div class="card-content">
							<div class="content">{{movieCard[0].title}}</div>
						</div>
					</div>
					</div>		
				</span>
				<div v-else>
				<div class="mt-6 is-size-4 has-text-centered has-text-white"><span class="underline-red pb-1">{{ err }}</span></div>
			</div>
			</div>
			<div v-else class="w-100">
				<div>
					<skeleton v-for="i in 40" class="mt-6" :key="i"></skeleton>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import request from '../requests'
	import skeleton from './skeleton.vue'
	import modal from './modal.vue'

	export default ({
		name:'myList',
		components:{
			skeleton,
			modal
		},
		data(){
			return {
				movies: [],
				err: '',
				noMovies:false,
				loading:true,
				isVisible: false,
				clicked_id: {}

			}
		},
		async created(){
			this.$nextTick(async function () {
			try{
			if(document.cookie.indexOf('myList') == -1){
				this.err = 'No movies in your list'
				this.noMovies = true
				this.loading = false
			}
			else{

					const data = await request.getMoviesList()
					if(await data){
						console.log(typeof(data))
						if(typeof(data) == 'boolean'){
							this.loading = false
							this.noMovies = true
							this.movies = []
						}
						else{
							this.movies = data
							this.loading = false
							this.err = ''
						}
					}

				
			}
			}
			catch(err){
				console.log(err)
			}
			})
		},
		methods:{
			showModal (index){
			document.querySelector('html').style.overflow = "hidden"
			this.clicked_id = index
			this.isVisible = true

		},
		hideModal (index){
			document.querySelector('html').style.overflow = "auto"
			this.updateList()
			this.clicked_id = {}
			this.isVisible = false
		},
		async updateList(){
      	if(document.cookie.indexOf('myList') == -1){
				this.err = 'No movies in your list'
				this.noMovies = true
				this.loading = false
			}
			else{
					const data = await request.getMoviesList()
					if(await data){
						if(typeof(data) == 'boolean'){
							this.loading = false
							this.noMovies = true
							this.movies = []
						}
						else{
							this.movies = data
							this.loading = false
							this.err = ''
						}
					}

			}
		}
	}})
</script>

<style scoped>
	.mylist{
		background: #1a1a1a;
		min-height: 100vh;
	}
	.card {
	display: inline-block;
	margin-right:15px;
	background: white;
	color:black;
	width: 12rem;
}
.card-image{
	background: black;
}
.media, .content{
	overflow-x: hidden;
	-o-text-overflow: ellipsis;
	   text-overflow: ellipsis;
}
.hovBigger{
	transition: .3s;
}
.hovBigger:hover{
	font-size: 1.1em;
}
.underline-red{
	border-bottom:3px solid red;

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
</style>