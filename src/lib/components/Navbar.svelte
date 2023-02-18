<script>
	import LoginHeader from './LoginHeader.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
</script>

<nav id="header" class="fixed w-full z-30 top-0 text-white">
	<div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-1">
		<div class="pl-4 flex items-center">
			<a
				class="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
				href="/"
			>
				<img class="h-14 fill-current inline" src="/images/hero.svg" />
			</a>
		</div>
		<div class="flex flex-wrap items-center justify-between mt-0 py-2">
			<ThemeToggle />
			<LoginHeader />
		</div>
	</div>
	<hr class="border-b border-neutral opacity-25 my-0 py-0" />
</nav>
