<script>
	import { setContextClient } from '@urql/svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import Navbar from '../lib/components/Navbar.svelte';
	import { detectEthereum, urql_client } from '../lib/util/auth';

	setContextClient(urql_client);

	onMount(async () => {
		await detectEthereum();
	});
</script>

<Navbar />

<!-- <div class="mt-20"> -->
<slot />
<!-- </div> -->
