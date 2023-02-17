<script>
	import { attendanceRecordStore } from '$stores';
	import { DateTime } from 'luxon';
	import { onMount } from 'svelte';

	$: attendanceRecords = attendanceRecordStore();

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
					.slice(0, 5) as { student, timestamp, course, professor }}
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
	</div>
{/if}
