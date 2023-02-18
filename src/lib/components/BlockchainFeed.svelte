<script>
	import { attendanceRecordStore } from '$stores';
	import { DateTime } from 'luxon';
	import { onMount } from 'svelte';

	$: attendanceRecords = attendanceRecordStore();
	let activePage = 1;

	const setActivePage = (pageNo) => {
		activePage = pageNo;
	};

	const refetch = async () => {
		await attendanceRecordStore();
		setTimeout(refetch, 3000);
	};

	onMount(() => {
		refetch();
	});
</script>

{#if $attendanceRecords.fetching === true}
	<button class="btn btn-ghost btn-lg text-primary loading" />
{:else}
	<div class="max-w-full">
		<table class="table w-[60rem]">
			<thead>
				<tr>
					<th>Student</th>
					<th>Time</th>
					<th>Course</th>
					<th>Professor</th>
					<!-- <th>Room</th> -->
				</tr>
			</thead>
			<tbody>
				{#each $attendanceRecords?.data?.attendanceRecords
					// ?.flatMap((e) => [e, e, e, e, e, e, e, e, e, e])
					?.sort((a, b) => b.timestamp - a.timestamp)
					?.slice((activePage - 1) * 5, activePage * 5) as { student, timestamp, course, professor }}
					<tr>
						<td>{student.first} {student.last}</td>
						<td
							>{DateTime.fromMillis(timestamp).toLocaleString(
								DateTime.DATETIME_SHORT,
							)}</td
						>
						<td>{course.code}</td>
						<td>{professor.first} {professor.last}</td>
						<!-- <td>18-120</td> -->
					</tr>
				{/each}
			</tbody>
		</table>
		<div class="btn-group float-right mt-2">
			{#each Array(Math.ceil($attendanceRecords?.data?.attendanceRecords?.length / 5)) as _, i}
				<button
					class="btn btn-sm bg-neutral"
					class:btn-active={i + 1 === activePage}
					on:click={() => setActivePage(i + 1)}>{i + 1}</button
				>
			{/each}
		</div>
	</div>
{/if}
