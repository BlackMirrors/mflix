<template>
	<div id="app">
		<div>
			<router-view name="navbar" v-if="!ifHome"></router-view>
		</div>
		<router-view></router-view>
		<router-view  name="modal_login"></router-view>
		<router-view  name="Browse"></router-view>
		<router-view  name="myList"></router-view>
	</div>
</template>

<script>
export default {
	name: 'App',
	computed:{
		ifHome() {
        return this.$route.name == "Menu";
    	}
	}
}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;	
		background: #1a1a1a;

	}
	html{
	background:black;
	}

</style>
