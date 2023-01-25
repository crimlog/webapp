<script>
	import { onMount } from 'svelte';
	import { jwt, professorStore } from '../../stores';
	import { signInWithMetaMask } from '../util/auth';

	console.log('jwt', $jwt);
	$: professor = professorStore();
	const lazyLoad = async function () {
		console.log('done loading professor', professor);
	};

	onMount(async () => {
		console.log('selectedAddress', ethereum.selectedAddress);
	});
</script>

{#if $professor.fetching === true}
	<p>Loading...</p>
{:else if $professor?.data?.professorSelf?.first}
	<div class="flex flex-col justify-center h-screen">
		<h1 class="text-4xl text-center">
			Welcome, {$professor.data.professorSelf.first}
			{$professor.data.professorSelf.last}
		</h1>
	</div>
{:else}
	<button class="metamask-button" on:click={signInWithMetaMask}>
		<img src="/images/metamask.svg" alt="Metamask logo" />
		<span>Login</span>
	</button>
{/if}

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
