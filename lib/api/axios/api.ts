import axios from "axios";

const api = axios.create({
	timeout: 15000,
	headers: {
		Accept: "application/json",
	},
});

export default api;
