import { Input } from "@/components/ui/input";
import {
	Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import DatePicker from "@/components/ui/date-picker";
import FormField from "../form-field";
import StepButtons from "../step-buttons";
import type { FormData } from "../types";

type Props = {
	form: FormData;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSelect: (field: keyof FormData, value: string) => void;
	onDateChange: (field: keyof FormData, date: Date | undefined) => void;
	onNext: (e: React.FormEvent) => void;
	step: number;
	onBack: () => void;
};

const Step1Personal = ({ form, onChange, onSelect, onDateChange, onNext, step, onBack }: Props) => (
	<form onSubmit={onNext} className="flex flex-col gap-4">
		<div className="grid grid-cols-2 gap-3">
			<FormField label="First Name" required>
				<Input name="first_name" value={form.first_name} onChange={onChange} placeholder="e.g. Sokna" className="bg-white" required />
			</FormField>
			<FormField label="Last Name" required>
				<Input name="last_name" value={form.last_name} onChange={onChange} placeholder="e.g. Chun" className="bg-white" required />
			</FormField>
		</div>
		<FormField label="Khmer Name" required>
			<Input name="khmer_name" value={form.khmer_name} onChange={onChange} placeholder="ចុន សោក័នា" className="bg-white" required />
		</FormField>
		<div className="grid grid-cols-2 gap-3">
			<FormField label="Date of Birth" required>
				<DatePicker
					value={form.date_of_birth ?? undefined}
					onChange={(date) => onDateChange("date_of_birth", date)}
					placeholder="Select date"
					captionLayout="dropdown"
					fromYear={1950}
					toYear={new Date().getFullYear()}
				/>
			</FormField>
			<FormField label="Place of Birth" required>
				<Input name="place_of_birth" value={form.place_of_birth} onChange={onChange} placeholder="e.g. Phnom Penh" className="bg-white" required />
			</FormField>
		</div>
		<div className="grid grid-cols-2 gap-3">
			<FormField label="Gender" required>
				<Select required value={form.gender} onValueChange={(v) => onSelect("gender", v)}>
					<SelectTrigger className="bg-white h-9 w-full"><SelectValue placeholder="Select..." /></SelectTrigger>
					<SelectContent>
						<SelectItem value="male">Male</SelectItem>
						<SelectItem value="female">Female</SelectItem>
						<SelectItem value="other">Other</SelectItem>
					</SelectContent>
				</Select>
			</FormField>
			<FormField label="Student Type" required>
				<Select required value={form.student_type} onValueChange={(v) => onSelect("student_type", v)}>
					<SelectTrigger className="bg-white h-9 w-full"><SelectValue placeholder="Select..." /></SelectTrigger>
					<SelectContent>
						<SelectItem value="new">New Student</SelectItem>
						<SelectItem value="transfer">Transfer</SelectItem>
						<SelectItem value="returning">Returning</SelectItem>
					</SelectContent>
				</Select>
			</FormField>
		</div>
		<FormField label="Nationality" required>
			<Input name="nationality" value={form.nationality} onChange={onChange} placeholder="e.g. Cambodian" className="bg-white" required />
		</FormField>
		<div className="grid grid-cols-2 gap-3">
			<FormField label="Phone" required>
				<Input type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="+855 12 345 678" className="bg-white" required />
			</FormField>
			<FormField label="Email">
				<Input type="email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com" className="bg-white" />
			</FormField>
		</div>
		<StepButtons step={step} onBack={onBack} />
	</form>
);

export default Step1Personal;
