"use client";

import { createContext, useContext } from "react";
import type { FormData } from "../types";

type RegisterFormContextValue = {
	agreeError: boolean;
	form: FormData;
	onAgreeChange: (checked: boolean) => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onDateChange: (field: keyof FormData, date: Date | undefined) => void;
	onFile: (e: React.ChangeEvent<HTMLInputElement>, field: "photo" | "documents") => void;
	onSelect: (field: keyof FormData, value: string) => void;
};

const RegisterFormContext = createContext<RegisterFormContextValue | null>(null);

type Props = {
	children: React.ReactNode;
	value: RegisterFormContextValue;
};

export const RegisterFormStateProvider = ({ children, value }: Props) => (
	<RegisterFormContext.Provider value={value}>
		{children}
	</RegisterFormContext.Provider>
);

export const useRegisterFormState = () => {
	const context = useContext(RegisterFormContext);
	if (!context) {
		throw new Error("useRegisterFormState must be used within RegisterFormStateProvider.");
	}
	return context;
};
