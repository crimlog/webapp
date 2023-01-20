<script>
	import { onMount } from 'svelte';
	import { signInWithMetaMask } from '../util/auth';

	onMount(async () => {
		console.log('selectedAddress', ethereum.selectedAddress);
	});
</script>

<button class="metamask-button" on:click={signInWithMetaMask}>
	<img src="/images/metamask.svg" alt="Metamask logo" />
	<span>Login</span>
</button>

<style>
	.metamask-button {
		display: flex;
		align-items: center;
		background-color: #e8831d;
		color: white;
		padding: 0.25rem 2rem;
		border-radius: 0.5rem;
		border: none;
	}
	.metamask-button img {
		display: inline;
		width: 3rem;
		height: 3rem;
		margin-right: 1rem;
	}
	.metamask-button span {
		font-size: 1.25rem;
		margin-right: 0.5rem;
	}
</style>
