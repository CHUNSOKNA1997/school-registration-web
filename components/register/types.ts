export type FormData = {
	// Step 1 – Personal Information
	first_name: string;
	last_name: string;
	khmer_name: string;
	date_of_birth: Date | null;
	place_of_birth: string;
	birth_province_id: string;
	birth_district_id: string;
	birth_commune_id: string;
	birth_village_id: string;
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

export type RegisterStepId = "1" | "2" | "3" | "4" | "payment";

export const INITIAL_FORM: FormData = {
	first_name: "Sokna", last_name: "Chun", khmer_name: "ចុន សោកនា", date_of_birth: new Date("2008-05-10"),
	place_of_birth: "", gender: "male", student_type: "new", nationality: "Cambodian",
	birth_province_id: "", birth_district_id: "", birth_commune_id: "", birth_village_id: "",
	phone: "+855 12 345 678", email: "sokna.chun@example.com",
	current_province_id: "", current_district_id: "", current_commune_id: "", current_village_id: "",
	current_address: "",
	emergency_contact: "+855 93 456 789",
	emergency_contact_relationship: "parent",
	parent_name: "Chun Dara", parent_phone: "+855 77 222 333", parent_occupation: "Business Owner",
	class_id: "Grade 10A", shift: "morning", academic_year: "2026-2027",
	previous_school: "", notes: "Interested in science club and English debate.", photo: null, documents: null, agree: true,
};

export const REGISTER_FLOW_STEPS = [
	{ value: "1", label: "Personal Info", icon: "User" },
	{ value: "2", label: "Address & Emergency", icon: "Home" },
	{ value: "3", label: "Parent / Guardian", icon: "Users" },
	{ value: "4", label: "Academic Details", icon: "BookOpen" },
	{ value: "payment", label: "Payment", icon: "CreditCard" },
] as const;

export const FORM_STEP_IDS = ["1", "2", "3", "4"] as const;
