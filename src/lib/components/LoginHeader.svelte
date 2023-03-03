<script>
	import { professorStore } from '../../stores';
	import { signInWithMetaMask } from '../util/auth';

	$: professor = professorStore();
</script>

<div class="flex flex-col justify-center px-4">
	{#if $professor.fetching === true}
		<button class="btn btn-ghost btn-lg text-primary loading" />
	{:else if $professor?.data?.professorSelf?.first}
		<h1 class="text-2xl text-center text-neutral">
			{$professor.data.professorSelf.first}
			{$professor.data.professorSelf.last}
		</h1>
	{:else}
		<button class="metamask-button" on:click={signInWithMetaMask}>
			<img src="/images/metamask.svg" alt="Metamask logo" />
			<span>Login</span>
		</button>
	{/if}
</div>

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
