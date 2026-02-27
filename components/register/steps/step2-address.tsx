import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import FormField from "../form-field";
import StepButtons from "../step-buttons";
import type { FormData } from "../types";

type Props = {
	form: FormData;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onSelect: (field: keyof FormData, value: string) => void;
	onNext: (e: React.FormEvent) => void;
	step: number;
	onBack: () => void;
};

const Step2Address = ({ form, onChange, onSelect, onNext, step, onBack }: Props) => (
	<form onSubmit={onNext} className="flex flex-col gap-4">
		<FormField label="Current Address" required>
			<Textarea name="current_address" value={form.current_address} onChange={onChange} rows={2}
				placeholder="House #, Street, Sangkat, Khan, City" className="bg-white resize-none" required />
		</FormField>
		<FormField label="Permanent Address">
			<Textarea name="permanent_address" value={form.permanent_address} onChange={onChange} rows={2}
				placeholder="Leave blank if same as current" className="bg-white resize-none" />
		</FormField>
		<div className="grid grid-cols-2 gap-3">
			<FormField label="Emergency Contact" required>
				<Input name="emergency_contact" value={form.emergency_contact} onChange={onChange}
					placeholder="+855 12 000 000" className="bg-white" required />
			</FormField>
			<FormField label="Relationship" required>
				<Select required value={form.emergency_contact_relationship} onValueChange={(v) => onSelect("emergency_contact_relationship", v)}>
					<SelectTrigger className="bg-white h-9 w-full"><SelectValue placeholder="Select..." /></SelectTrigger>
					<SelectContent>
						<SelectItem value="parent">Parent</SelectItem>
						<SelectItem value="sibling">Sibling</SelectItem>
						<SelectItem value="guardian">Guardian</SelectItem>
						<SelectItem value="relative">Relative</SelectItem>
						<SelectItem value="other">Other</SelectItem>
					</SelectContent>
				</Select>
			</FormField>
		</div>
		<StepButtons step={step} onBack={onBack} />
	</form>
);

export default Step2Address;
