import { gql, queryStore } from '@urql/svelte';
import { urql_client } from './lib/util/auth';
import { persisted } from './LocalStorageStore';

export const jwt = persisted('jwt');

export const professorStore = (_jwt = jwt.get()) =>
	queryStore({
		client: urql_client,
		query: gql`
			query ProfessorSelf {
				professorSelf {
					first
					last
				}
			}
		`,
		requestPolicy: 'network-only',
		context: {
			fetchOptions: {
				headers: {
					authorization: `Bearer ${_jwt}`,
				},
			},
		},
	});

export const attendanceRecordStore = () =>
	queryStore({
		client: urql_client,
		query: gql`
			query AttendanceRecords {
				attendanceRecords {
					id
					student {
						first
						last
						walletAddress
					}
					professor {
						first
						last
						walletAddress
					}
					course {
						code
						name
					}
					timestamp
				}
			}
		`,
		requestPolicy: 'network-only',
	});
