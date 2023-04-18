<script>
	import {
		attendanceQueueMint,
		attendanceQueueMintStudent,
		removeStudentFromAttendanceQueue,
	} from '$lib/util/api';
	import { attendanceQueueByCoureIdStore } from '$stores';
	import { onMount } from 'svelte';

	const courseId = '636fe6844498e9db2cf95605';

	$: attendanceQueue = attendanceQueueByCoureIdStore(courseId);
	let activePage = 1;
	$: pageCount = Math.ceil(
		($attendanceQueue?.data?.attendanceQueueByCourseId?.students?.length ?? 0) / 5,
	);
	const removing = new Map(); //list of students being removed to prevent double clicks
	const minting = new Map(); //list of students being minted to prevent double clicks
	const minted = new Set(); //list of students that have been minted

	const setActivePage = (pageNo) => {
		activePage = pageNo;
	};

	const refetch = async () => {
		await attendanceQueueByCoureIdStore(courseId);
		setTimeout(refetch, 3000);
	};

	const mintStudentNft = (studentId) => async (e) => {
		try {
			if (minting.get(studentId) === true) return console.log('already minting');
			minting.set(studentId, true);

			// show spinner on button
			e.target.classList.add('loading');
			e.target.textContent = '';

			await attendanceQueueMintStudent({
				queueId: $attendanceQueue?.data?.attendanceQueueByCourseId?.id,
				studentId,
			});

			minted.add(studentId);
			e.target.parentElement
				.querySelectorAll('button')
				.forEach((btn) => btn.classList.add('btn-disabled'));
			e.target.textContent = 'Minted';
		} catch (e) {
			e.target.textContent = 'Mint';
			console.error(e);
		} finally {
			minting.set(studentId, false);
			e.target.classList.remove('loading');
		}
	};

	const mintEntireQueue = async function (e) {
		const ALL_MINTING_KEY = '_all';
		try {
			if (minting.get(ALL_MINTING_KEY) === true)
				return console.log('already minting for all');
			minting.set(ALL_MINTING_KEY, true);
			// show spinner on button
			e.target.classList.add('loading');
			// e.target.textContent = '';

			// set all other mint/remove btns to disabled
			document
				.querySelectorAll('.btn-mint, .btn-remove')
				.forEach((btn) => btn.classList.add('btn-disabled'));

			await attendanceQueueMint({
				queueId: $attendanceQueue?.data?.attendanceQueueByCourseId?.id,
			});
			//wait 1 second
			// await new Promise((resolve) => setTimeout(resolve, 1000));
		} catch (e) {
			// e.target.textContent = 'Mint';
			console.error(e);
		} finally {
			minting.set(ALL_MINTING_KEY, false);
			e.target.classList.remove('loading');
			e.target.classList.add('btn-disabled');
		}
	};

	const removeFromQueue = (studentId) => async (e) => {
		try {
			if (removing.get(studentId) === true) return console.log('already removing');
			removing.set(studentId, true);

			// show spinner on button
			e.target.classList.add('loading');
			e.target.textContent = '';

			await removeStudentFromAttendanceQueue({
				queueId: $attendanceQueue?.data?.attendanceQueueByCourseId?.id,
				studentId,
			});
		} catch (e) {
			console.error(e);
		} finally {
			removing.set(studentId, false);
			e.target.classList.remove('loading');
			e.target.textContent = 'Remove';
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
		<div>
			<p class="text-2xl text-center text-neutral my-4">
				Queue status: {$attendanceQueue?.data?.attendanceQueueByCourseId?.status}
			</p>
		</div>
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
								class="btn btn-sm h-9 btn-info mx-3 btn-mint"
								on:click|self={mintStudentNft(id)}>Mint</button
							>
							<button
								class="btn btn-sm h-9 btn-error btn-remove"
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
		<div class="mt-4 text-center">
			<button class="btn btn-sm h-9 btn-info mx-3" on:click|self={mintEntireQueue}
				>Mint All</button
			>
		</div>
	</div>
{/if}
