<template>
<footer class="footer">
  <div class="content has-text-centered">
    <p>
      Made By Whoonix, Student in CS in France, The purpose of this website is only to show what I can do
    </p>
    <p>
    	Made with <a href="" class="has-text-danger is-inverted">Bulma</a> a CSS framwork, and with <a href="" class="has-text-danger is-inverted">VueJS</a>
    </p>
    <p>
    	And <a href="" class="has-text-danger is-inverted">NodeJS</a> with <a href="" class="has-text-danger is-inverted">Express</a> For the backend
    </p>
    <p><a href="" class="has-text-danger is-inverted">MongoDB Atlas</a> for the data base with the mflix dataset</p>
  </div>
</footer>
</template>

<script>
	export default {
		name:'footerComponent'
	}
</script>
<style scoped>
	.footer{
		background: linear-gradient(to right, #2f0707 ,#400101);
		color: white;
		padding-bottom: 3em;
	}
</style>