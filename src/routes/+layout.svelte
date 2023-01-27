<script>
	import { setContextClient } from '@urql/svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { detectEthereum, urql_client } from '../lib/util/auth';

	setContextClient(urql_client);

	onMount(async () => {
		await detectEthereum();
	});
</script>

<slot />
