import { gql } from '@urql/svelte';
import { urql_client } from './auth';

export const removeStudentFromAttendanceQueue = async function ({ queueId, studentId }) {
	const res = await urql_client
		.mutation(
			gql`
				mutation ($queueId: ObjectID!, $studentId: Int!) {
					attendanceQueueRemoveStudent(queueId: $queueId, studentId: $studentId) {
                        id
                    }
				}
			`,
			{ queueId, studentId },
			{ requestPolicy: 'network-only' },
		)
		.toPromise();

	// handle errors
	console.log('getNonce', res);
	return res.data.attendanceQueueRemoveStudent;
};
