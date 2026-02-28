import { useState } from "react";
import { AsYouType } from "libphonenumber-js";
import { useForm, useWatch } from "react-hook-form";
import { INITIAL_FORM, type FormData } from "../types";

const PHONE_FIELDS: Array<keyof FormData> = ["phone", "parent_phone", "emergency_contact"];

const formatPhoneNumber = (value: string) => new AsYouType("KH").input(value);

export const useRegisterForm = () => {
	const [submitted, setSubmitted] = useState(false);
	const [agreeError, setAgreeError] = useState(false);
	const formMethods = useForm<FormData>({
		defaultValues: INITIAL_FORM,
	});
	const { control, handleSubmit, reset, setValue } = formMethods;
	const form = useWatch({ control }) as FormData;

	const setField = (field: keyof FormData, value: FormData[keyof FormData], shouldTouch = true) => {
		setValue(field as never, value as never, { shouldDirty: true, shouldTouch });
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		const field = name as keyof FormData;
		const nextValue = PHONE_FIELDS.includes(field) ? formatPhoneNumber(value) : value;
		setField(field, nextValue as FormData[typeof field]);
	};

	const onSelect = (field: keyof FormData, value: string) => {
		if (field === "birth_province_id") {
			setField("birth_province_id", value);
			setField("birth_district_id", "");
			setField("birth_commune_id", "");
			setField("birth_village_id", "");
			setField("place_of_birth", "", false);
			return;
		}

		if (field === "birth_district_id") {
			setField("birth_district_id", value);
			setField("birth_commune_id", "");
			setField("birth_village_id", "");
			setField("place_of_birth", "", false);
			return;
		}

		if (field === "birth_commune_id") {
			setField("birth_commune_id", value);
			setField("birth_village_id", "");
			setField("place_of_birth", "", false);
			return;
		}

		if (field === "student_type" && value !== "transfer") {
			setField("student_type", value);
			setField("previous_school", "");
			setField("documents", null, false);
			return;
		}

		if (field === "current_province_id") {
			setField("current_province_id", value);
			setField("current_district_id", "");
			setField("current_commune_id", "");
			setField("current_village_id", "");
			setField("current_address", "", false);
			return;
		}

		if (field === "current_district_id") {
			setField("current_district_id", value);
			setField("current_commune_id", "");
			setField("current_village_id", "");
			setField("current_address", "", false);
			return;
		}

		if (field === "current_commune_id") {
			setField("current_commune_id", value);
			setField("current_village_id", "");
			setField("current_address", "", false);
			return;
		}

		setField(field, value as FormData[typeof field]);
	};

	const onDateChange = (field: keyof FormData, date: Date | undefined) => {
		setField(field, (date ?? null) as FormData[typeof field]);
	};

	const onFile = (e: React.ChangeEvent<HTMLInputElement>, field: "photo" | "documents") => {
		setField(field, e.target.files?.[0] ?? null);
	};

	const onAgreeChange = (checked: boolean) => {
		setField("agree", checked);
		if (checked) setAgreeError(false);
	};

	const submit = handleSubmit((values) => {
		if (!values.agree) {
			setAgreeError(true);
			return;
		}
		setAgreeError(false);
		setSubmitted(true);
	});

	const resetForm = () => {
		setSubmitted(false);
		setAgreeError(false);
		reset(INITIAL_FORM);
	};

	return {
		agreeError,
		form,
		formMethods,
		onAgreeChange,
		onChange,
		onDateChange,
		onFile,
		onSelect,
		resetForm,
		submit,
		submitted,
	};
};
