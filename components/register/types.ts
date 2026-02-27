export type FormData = {
	// Step 1 – Personal Information
	first_name: string;
	last_name: string;
	khmer_name: string;
	date_of_birth: Date | null;
	place_of_birth: string;
	gender: string;
	student_type: string;
	nationality: string;
	phone: string;
	email: string;
	// Step 2 – Address & Emergency Contact
	current_address: string;
	permanent_address: string;
	emergency_contact: string;
	emergency_contact_relationship: string;
	// Step 3 – Parent / Guardian
	parent_name: string;
	parent_phone: string;
	parent_occupation: string;
	// Step 4 – Academic Details
	class_id: string;
	shift: string;
	registration_date: string;
	academic_year: string;
	previous_school: string;
	notes: string;
	photo: File | null;
	documents: File | null;
	agree: boolean;
};

export const INITIAL_FORM: FormData = {
	first_name: "", last_name: "", khmer_name: "", date_of_birth: null,
	place_of_birth: "", gender: "", student_type: "", nationality: "",
	phone: "", email: "",
	current_address: "", permanent_address: "", emergency_contact: "",
	emergency_contact_relationship: "",
	parent_name: "", parent_phone: "", parent_occupation: "",
	class_id: "", shift: "", registration_date: "", academic_year: "",
	previous_school: "", notes: "", photo: null, documents: null, agree: false,
};

export const STEPS = [
	{ label: "Personal Info",		icon: "User" },
	{ label: "Address & Emergency",	icon: "Home" },
	{ label: "Parent / Guardian",	icon: "Users" },
	{ label: "Academic Details",	icon: "BookOpen" },
] as const;
