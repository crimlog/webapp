<script>
	export let courses = [];
</script>

<div class="flex flex-row items-center">
	{#each courses as course}
		<div
			class="card w-96 bg-base-200 closed-queue m-2"
			class:active-queue={course.status === 'ACTIVE'}
		>
			<div class="card-body items-center text-center">
				<h2 class="card-title">{course.code}</h2>
				<p>Queue is {course.status}</p>
				<div class="card-actions justify-end">
					<a
						href={course.status === 'CLOSED' ? '#' : '/professor/queue'}
						class:pointer-events-none={course.status === 'CLOSED'}
					>
						<button
							class="btn btn-accent"
							class:btn-disabled={course.status === 'CLOSED'}>View Queue</button
						>
					</a>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.closed-queue {
		border: 2px solid red;
	}

	.active-queue {
		border: 2px solid green;
	}
</style>
