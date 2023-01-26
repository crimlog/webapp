import detectEthereumProvider from '@metamask/detect-provider';
import { createClient, gql } from '@urql/svelte';
import { get } from 'svelte/store';
import { jwt, professorStore } from '../../stores';

export const urql_client = createClient({
	url: 'http://localhost:3000/graphql',
});

let ethereum;

const getNonce = async function (walletAddress) {
	const res = await urql_client
		.query(
			gql`
				query ProfessorNonce($walletAddress: String!) {
					professorNonce(walletAddress: $walletAddress)
				}
			`,
			{ walletAddress },
			{ requestPolicy: 'network-only' },
		)
		.toPromise();

	// handle errors
	console.log('getNonce', res);
	return res.data.professorNonce;
};

export const detectEthereum = async function () {
	const provider = await detectEthereumProvider();
	if (!!provider) {
		ethereum = provider;
		console.log('Ethereum successfully detected!');
	} else {
		console.log('no provider found');
	}
};

export const signInWithMetaMask = async function () {
	const accounts = await ethereum.request({
		method: 'eth_requestAccounts',
	});

	if (!accounts[0]) throw 'No MetaMask accounts found';

	const walletAddress = accounts[0];

	const nonce = await getNonce(walletAddress);

	const signature = await ethereum.request({
		method: 'personal_sign',
		params: [`Sign message to login to CrimLog: ${nonce}`, walletAddress],
	});

	console.log('signedData', signature);

	const res = await urql_client
		.mutation(
			gql`
				mutation Login($walletAddress: String!, $signature: String!) {
					professorLogin(walletAddress: $walletAddress, signature: $signature)
				}
			`,
			{ walletAddress, signature },
			{ requestPolicy: 'network-only' },
		)
		.toPromise();
	console.log('signInWithMetaMask', res);

	// handle errors
	const new_jwt = res.data.professorLogin;
	jwt.set(new_jwt);
	professorStore(); // refresh store for the frontend

	return new_jwt;
};

export const getProfessor = async function () {
	const res = await urql_client
		.query(
			gql`
				query ProfessorSelf {
					professorSelf {
						first
						last
					}
				}
			`,
			{},
			{
				requestPolicy: 'network-only',
				fetchOptions: {
					headers: {
						authorization: `Bearer ${get(jwt)}`,
					},
				},
			},
		)
		.toPromise();

	// handle errors
	console.log('getProfessor', res);
	return res.data.professorSelf;
};
