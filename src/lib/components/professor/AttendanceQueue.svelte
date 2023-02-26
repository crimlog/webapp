<script>
	import { attendanceQueueByCoureIdStore } from '$stores';
	import { onMount } from 'svelte';

	const courseId = '636fe6844498e9db2cf95605';

	$: attendanceQueue = attendanceQueueByCoureIdStore(courseId);
	let activePage = 1;

	const setActivePage = (pageNo) => {
		activePage = pageNo;
	};

	const refetch = async () => {
		await attendanceQueueByCoureIdStore(courseId);
		setTimeout(refetch, 3000);
	};

	onMount(() => {
		refetch();
	});
</script>

{#if $attendanceQueue.fetching === true}
	<button class="btn btn-ghost btn-lg text-primary loading" />
{:else}
	<div class="max-w-full">
		<table class="table w-[60rem]">
			<thead>
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
				</tr>
			</thead>
			<tbody>
				{#each $attendanceQueue?.data?.attendanceQueueByCourseId?.students?.slice((activePage - 1) * 5, activePage * 5) as { first, last }}
					<tr>
						<td>{first}</td>
						<td>{last}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<div class="btn-group float-right mt-2">
			{#each Array(Math.ceil($attendanceQueue?.data?.attendanceQueueByCourseId?.students?.length / 5)) as _, i}
				<button
					class="btn btn-sm bg-neutral"
					class:btn-active={i + 1 === activePage}
					on:click={() => setActivePage(i + 1)}>{i + 1}</button
				>
			{/each}
		</div>
	</div>
{/if}
