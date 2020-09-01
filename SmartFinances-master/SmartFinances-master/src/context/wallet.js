import { createContext, useContext } from "react";

export const WalletContext = createContext();

export const useWallet = () => {
	return useContext(WalletContext);
};