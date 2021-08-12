import App from './App.svelte';

let app = null;

window.Config = {
	googleOauthClientId: "",
	onAuthorize: (data) => {
	}
};

if (typeof window.Config != "object" || Array.isArray(window.Config)) {
	document.body.innerHTML = "Invalid Configration Detected";
}

window.runApp = () => {
	app = new App({
		target: document.body,
	});
}

window.runApp();

export default app;