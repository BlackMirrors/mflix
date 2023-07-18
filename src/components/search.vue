<template>
	<transition name="modal-fade">
	<div>
		<modal v-show="isVisible" v-body-scroll-lock="isVisible" v-on:close="hideModal()" :id="clicked_id"></modal>
		<div class="modal" id="search_modal">
  <div class="modal-background" v-on:click="close()"></div>
  <div class="modal-content">
  <div v-if="suggestion">
  	<div v-for="elem in suggestion[0]">
  		<p class="is-size-4 pt-3 is-clickable pl-4 pb-3" v-on:click="showModal(elem)">{{elem.title}}</p>
  	</div>
  </div>
  <div v-if="err">
  	{{ err }}
  </div>
  </div>
  <button class="modal-close is-large" aria-label="close"></button>
</div>
	</div>
</transition>
</template>
<script>
	import request from '../requests'
	import modal from './modal.vue'
	export default{
		name:'search',
		data(){
			return {
				suggestion:[],
				err:'',
				isVisible: false,
				clicked_id: {},
			}
		},
		components:{
			modal
		},
		async created(){			
			console.log(this.movie.length)
		},	
		methods:{
			close() {
        this.$emit('close')
      },
      showModal (index){
			//document.querySelector('body').style.overflow = "hidden"
			this.clicked_id = index
			this.isVisible = true

		},
		hideModal (){
			//document.querySelector('body').style.overflow = "auto"
			this.clicked_id = {}
			this.isVisible = false
		},
		},
		props:{
	  	movie:String
	  },
	  watch:{
	  	movie: async function(){
	  		if(this.movie.length > 0){
					const res = await request.queriesMovie(this.movie)
					if(await res[0].err){
						this.err = 'No movies for this query'
						this.suggestion = ''
					}
					else{
						this.err = ''
						this.suggestion = res
					}

					}
					else{
						this.err = 'No movies for this query'
						this.suggestion = ''
					}
	  	}
	  }
	}
</script>
<style scoped>
	.modal{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;

	}
	#search_modal{
		z-index: 29;
	}
	.modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }
.modal-content{
	align-items: flex-start;
	max-height: 70vh;
	color:white;
}
.is-clickable:hover{
	background: rgba(255,255,255,0.1);
	color:red;
}
p{
	border-bottom:1px solid red;
}
.modal-background{}
</style>