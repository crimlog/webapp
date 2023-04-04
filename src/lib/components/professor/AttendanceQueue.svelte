<script>
	import { attendanceQueueMintStudent, removeStudentFromAttendanceQueue } from '$lib/util/api';
	import { attendanceQueueByCoureIdStore } from '$stores';
	import { onMount } from 'svelte';

	const courseId = '636fe6844498e9db2cf95605';

	$: attendanceQueue = attendanceQueueByCoureIdStore(courseId);
	let activePage = 1;
	$: pageCount = Math.ceil(
		($attendanceQueue?.data?.attendanceQueueByCourseId?.students?.length ?? 0) / 5,
	);
	let removing = new Map(); //list of students being removed to prevent double clicks
	let minting = new Map(); //list of students being minted to prevent double clicks

	const setActivePage = (pageNo) => {
		activePage = pageNo;
	};

	const refetch = async () => {
		await attendanceQueueByCoureIdStore(courseId);
		setTimeout(refetch, 3000);
	};

	const mintStudentNft = async (studentId) => {
		try {
			if (minting.get(studentId) === true) return console.log('already minting');
			minting.set(studentId, true);

			await attendanceQueueMintStudent({
				queueId: $attendanceQueue?.data?.attendanceQueueByCourseId?.id,
				studentId,
			});
		} catch (e) {
			console.error(e);
		} finally {
			minting.set(studentId, false);
			// e.target.classList.remove('loading');
		}
	};

	const removeFromQueue = (studentId) => async (e) => {
		try {
			if (removing.get(studentId) === true) return console.log('already removing');
			removing.set(studentId, true);
			// e.target.classList.add('loading');
			// e.target.textContent = '';

			await removeStudentFromAttendanceQueue({
				queueId: $attendanceQueue?.data?.attendanceQueueByCourseId?.id,
				studentId,
			});
		} catch (e) {
			console.error(e);
		} finally {
			removing.set(studentId, false);
			// e.target.classList.remove('loading');
		}
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
					<th />
				</tr>
			</thead>
			<tbody>
				{#each $attendanceQueue?.data?.attendanceQueueByCourseId?.students?.slice((activePage - 1) * 5, activePage * 5) as { id, first, last }}
					<tr>
						<td>{first}</td>
						<td>{last}</td>
						<td class="w-8">
							<button
								class="btn btn-sm h-9 btn-info mx-3"
								on:click|self={() => mintStudentNft(id)}>Mint</button
							>
							<button
								class="btn btn-sm h-9 btn-error"
								on:click|self={removeFromQueue(id)}>Remove</button
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<div class="btn-group float-right mt-2">
			{#if pageCount > 1}
				{#each Array(pageCount) as _, i}
					<button
						class="btn btn-sm bg-neutral"
						class:btn-active={i + 1 === activePage}
						on:click={() => setActivePage(i + 1)}>{i + 1}</button
					>
				{/each}
			{/if}
		</div>
	</div>
{/if}
