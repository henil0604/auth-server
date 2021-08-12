<script>

	import Card from './components/Card.svelte';
	import ChangeScreen from './helpers/ChangeScreen';

</script>


<svelte:head>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

	<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">

	<!-- Fontawesome -->
	<script src="https://kit.fontawesome.com/6932c76b50.js" crossorigin="anonymous"></script>

	<!-- Svelte Material UI -->
	<!-- Fonts -->
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/icon?family=Material+Icons"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
	/>

	<!-- Material Typography -->
	<link
		rel="stylesheet"
		href="https://unpkg.com/@material/typography@11.0.0/dist/mdc.typography.css"
	/>

	<!-- SMUI -->
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/svelte-material-ui@4.0.0/bare.min.css"
	/>
</svelte:head>


<main>
	<Card/>
</main>

<style>

	:global(body){
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		min-width: 100vw;
		min-height: 100vh;
		background-color: #FFFFFF;
		padding: 10px;
	}

	main{
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 100%;
		min-height: 100%;
	}

	@media only screen and (max-width: 767px){
		main{
			position: relative;
		}
	}


</style>