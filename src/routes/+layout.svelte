<script>
	import { createClient, setContextClient } from '@urql/svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { detectEthereum } from '../lib/util/auth';

	const client = createClient({
		url: `http://localhost:3000/graphql`,
	});
	setContextClient(client);

	onMount(async () => {
		await detectEthereum();
	});
</script>

<slot />
