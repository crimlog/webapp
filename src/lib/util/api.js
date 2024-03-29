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
	return res.data.attendanceQueueRemoveStudent;
};

export const addStudentToQueue = async function () {
	console.log('in queue');
	return urql_client.mutation(
		gql`
			mutation attendanceQueueAddStudent($queueId: ObjectID!, $studentId: Int!) {
				attendanceQueueAddStudent(queueId: $queueId, studentId: $studentId) {
					id
				}
			}
		`,
		{ queueId: '63fa76383e1757d4e60a7ab5', studentId: 12345678 },
		{ requestPolicy: 'network-only' },
	);
};

export const attendanceQueueMintStudent = async function ({ queueId, studentId }) {
	const res = await urql_client
		.mutation(
			gql`
				mutation ($queueId: ObjectID!, $studentId: Int!) {
					attendanceQueueMintStudent(queueId: $queueId, studentId: $studentId) {
                        id
                    }
				}
			`,
			{ queueId, studentId },
			{ requestPolicy: 'network-only' },
		)
		.toPromise();

	// handle errors
	return res.data.attendanceQueueMintStudent;
};

export const attendanceQueueMint = async function ({ queueId }) {
	const res = await urql_client
		.mutation(
			gql`
				mutation ($queueId: ObjectID!) {
					attendanceQueueMint(queueId: $queueId) {
                        id
                    }
				}
			`,
			{ queueId },
			{ requestPolicy: 'network-only' },
		)
		.toPromise();

	// handle errors
	return res.data.attendanceQueueMint;
};
