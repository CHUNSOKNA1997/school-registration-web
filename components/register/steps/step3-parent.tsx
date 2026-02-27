import { Input } from "@/components/ui/input";
import FormField from "../form-field";
import StepButtons from "../step-buttons";
import type { FormData } from "../types";

type Props = {
	form: FormData;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onNext: (e: React.FormEvent) => void;
	step: number;
	onBack: () => void;
};

const Step3Parent = ({ form, onChange, onNext, step, onBack }: Props) => (
	<form onSubmit={onNext} className="flex flex-col gap-4">
		<FormField label="Parent / Guardian Name" required>
			<Input name="parent_name" value={form.parent_name} onChange={onChange} placeholder="Full name" className="bg-white" required />
		</FormField>
		<FormField label="Parent Phone" required>
			<Input type="tel" name="parent_phone" value={form.parent_phone} onChange={onChange} placeholder="+855 12 345 678" className="bg-white" required />
		</FormField>
		<FormField label="Parent Occupation">
			<Input name="parent_occupation" value={form.parent_occupation} onChange={onChange} placeholder="e.g. Teacher, Farmer, Business" className="bg-white" />
		</FormField>
		<StepButtons step={step} onBack={onBack} />
	</form>
);

export default Step3Parent;
