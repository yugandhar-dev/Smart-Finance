import { API } from "../backend";

export const signin = user => {
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

export const payToMerchant = data => {
	return fetch(`${API}user/payToMerchant`, {
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
// withdraw Amount
export const InvestmentWithdraw = data => {
	return fetch(`${API}user/investmentwithdraw`, {
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
export const getUserDetails = () => {
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
export const getProfileSettings = data => {
  return fetch(`${API}user/changeProfileSettings`, {
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

export const getInvestmentDetails = data => {
	return fetch(`${API}/user/getinvestments`, {
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

export const sellInvestments = data => {
	return fetch(`${API}/user/investmentsell`, {
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

export const getInvestmentOptions = data => {
	return fetch(`${API}/user/investmentOptions`, {
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

export const getAllInvestmentOptions = () => {
	return fetch(`${API}/user/allInvestments`, {
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

export const getInvestmentCompanies = data => {
	return fetch(`${API}/user/company`, {
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

export const getUserPhoneNumber = email => {
  return fetch(`${API}/admin/getPhoneNumber`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getReceiptValue = formData => {
  return fetch(`${API}/user/receipt-value`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Access-Control-Allow-Origin": "*",
    },
    body: formData,
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getEmailId = accountNumber => {
  return fetch(`${API}/user/getEmailId`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accountNumber: parseInt(accountNumber) }),
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const addFundsToWallet = data => {
  return fetch(`${API}/user/walletbalance`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const investFunds = data => {
  console.log(data);
  return fetch(`${API}/user/userinvestments`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getTransactionHistory = data => {
  return fetch(`${API}/user/transactionhistory`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .catch(err => console.log(err));
};

export const receiptTransaction = data => {
  console.log(data, "line 358");
  return fetch(`${API}/user/uploadreceipt`, {
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
