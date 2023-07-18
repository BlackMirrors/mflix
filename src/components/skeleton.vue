<template>
					<div class="card w-100">
						<div class="card-image">
							<figure class="image is-square image-grey">
								
							</figure>
						</div>
						<div class="card-content">
							<div class="media">
								<div class="media-content">
									<div class="title background-grey"></div>
									<div class="subtitle background-yellow"></div>
								</div>
							</div>
							<div class="content background-grey mt-3">
								<br>
							</div>
						</div>
					</div>
			
</template>

<script>
	export default { name: 'skeleton'}
</script>
<style>
	.modal-card, .modal-content{
	margin:0;
}
@media screen and (min-width: 769px){
	.image-grey{
		width: 200px;
		overflow-x: hidden;
		max-width: 100%;
	}
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
	.background-grey{
	background: #7f7e7e;
	width: 100%;
	-webkit-animation: pulse-bg 1s 2;
	        animation: pulse-bg 1s 2;
}
.image-grey{
	background: #7f7e7e;
	height: 200px;
	-webkit-animation: pulse-bg 1s 2;
	        animation: pulse-bg 1s 2;
}
@-webkit-keyframes pulse-bg {
    0% { background-color: #7f7e7e; }
    50% { background-color: #323232; }
    100% { background-color: #7f7e7e; }
  }
@keyframes pulse-bg {
    0% { background-color: #7f7e7e; }
    50% { background-color: #323232; }
    100% { background-color: #7f7e7e; }
  }
</style>