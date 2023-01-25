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
