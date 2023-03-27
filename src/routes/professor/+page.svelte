<script>
	import CourseList from '../../lib/components/professor/CourseList.svelte';
</script>

<div class="flex flex-col items-center">
	<h1 class="text-3xl m-5">Your Courses</h1>
	<CourseList
		courses={[
			{ code: 'CST-451', status: 'ACTIVE' },
			{ code: 'CST-323', status: 'CLOSED' },
		]}
	/>
</div>
