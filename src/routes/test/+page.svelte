<script>
	import LoginHeader from '$lib/components/LoginHeader.svelte';
	import { onMount } from 'svelte';

	onMount(async () => {
		console.log('selectedAddress', ethereum.selectedAddress);
		// await signInWithMetaMask();
	});
</script>

<nav>
	<LoginHeader />
</nav>
