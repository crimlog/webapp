import detectEthereumProvider from '@metamask/detect-provider';

let ethereum;

const getNonce = async () => 'f954a67c-9c5a-41eb-809a-0d1f066be94b';

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

	const nonce = await getNonce();

	const signedData = await ethereum.request({
		method: 'personal_sign',
		params: [`Sign message to login to CrimLog: ${nonce}`, walletAddress],
	});

	console.log('signedData', signedData);
};
