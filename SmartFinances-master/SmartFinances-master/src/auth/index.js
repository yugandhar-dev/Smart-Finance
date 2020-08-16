import { API } from "../backend";

export const signin = (user) => {
	return fetch(`${API}signin`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then(async response => {
			const signInResponse = await response.json();
			if (signInResponse.token) {
				localStorage.setItem("token", signInResponse.token);
			}
			return signInResponse;
		})
		.catch(err => console.log(err));
};

export const authenticate = (data, next) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("jwt", JSON.stringify(data));
		next();
	}
};

export const newTransaction = data => {
	//
	return fetch(`${API}user/newTransaction`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify(data),
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const createUser = data => {
	return fetch(`${API}admin/createNewUser`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify(data),
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const getUser = data => {
	return fetch(`${API}admin/manageUser`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify(data),
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

// Admin Fund Management
export const getFund = data => {
	return fetch(`${API}admin/manageFund`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify(data),
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

//User fund options
export const getLowRisk = data => {
	return fetch(`${API}user/fundOptions/lowRiskFund`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

//User fund options
export const getMediumRisk = data => {
	return fetch(`${API}user/fundOptions/mediumRiskFund`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		//body: JSON.stringify(data),
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

//User fund options
export const getHighRisk = data => {
	return fetch(`${API}user/fundOptions/highRiskFund`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		//body: JSON.stringify(data),
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

//User dashboard
export const getDashboard = data => {
	return fetch(`${API}user/dashboard`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		//body: JSON.stringify(data),
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};
