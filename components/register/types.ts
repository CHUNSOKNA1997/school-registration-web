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
	current_province_id: string;
	current_district_id: string;
	current_commune_id: string;
	current_village_id: string;
	current_address: string;
	permanent_province_id: string;
	permanent_district_id: string;
	permanent_commune_id: string;
	permanent_village_id: string;
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
	current_province_id: "", current_district_id: "", current_commune_id: "", current_village_id: "",
	current_address: "",
	permanent_province_id: "", permanent_district_id: "", permanent_commune_id: "", permanent_village_id: "",
	permanent_address: "", emergency_contact: "",
	emergency_contact_relationship: "",
	parent_name: "", parent_phone: "", parent_occupation: "",
	class_id: "", shift: "", academic_year: "",
	previous_school: "", notes: "", photo: null, documents: null, agree: false,
};

export const STEPS = [
	{ label: "Personal Info",		icon: "User" },
	{ label: "Address & Emergency",	icon: "Home" },
	{ label: "Parent / Guardian",	icon: "Users" },
	{ label: "Academic Details",	icon: "BookOpen" },
] as const;
