import Link from "next/link";
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
	onFile: (e: React.ChangeEvent<HTMLInputElement>, field: "photo" | "documents") => void;
	onSubmit: (e: React.FormEvent) => void;
	step: number;
	onBack: () => void;
};

const Step4Academic = ({ form, onChange, onSelect, onFile, onSubmit, step, onBack }: Props) => (
	<form onSubmit={onSubmit} className="flex flex-col gap-4">
		<div className="grid grid-cols-2 gap-3">
			<FormField label="Class" required>
				<Input name="class_id" value={form.class_id} onChange={onChange} placeholder="e.g. Grade 10A" className="bg-white" required />
			</FormField>
			<FormField label="Shift" required>
				<Select required value={form.shift} onValueChange={(v) => onSelect("shift", v)}>
					<SelectTrigger className="bg-white h-9 w-full"><SelectValue placeholder="Select..." /></SelectTrigger>
					<SelectContent>
						<SelectItem value="morning">Morning</SelectItem>
						<SelectItem value="afternoon">Afternoon</SelectItem>
						<SelectItem value="evening">Evening</SelectItem>
					</SelectContent>
				</Select>
			</FormField>
		</div>
		<div className="grid grid-cols-2 gap-3">
			<FormField label="Registration Date" required>
				<Input type="date" name="registration_date" value={form.registration_date} onChange={onChange} className="bg-white" required />
			</FormField>
			<FormField label="Academic Year" required>
				<Input name="academic_year" value={form.academic_year} onChange={onChange} placeholder="e.g. 2024-2025" className="bg-white" required />
			</FormField>
		</div>
		<FormField label="Previous School">
			<Input name="previous_school" value={form.previous_school} onChange={onChange} placeholder="Name of previous school" className="bg-white" />
		</FormField>
		<div className="grid grid-cols-2 gap-3">
			<FormField label="Student Photo">
				<Input type="file" accept="image/*" onChange={(e) => onFile(e, "photo")} className="bg-white cursor-pointer" />
			</FormField>
			<FormField label="Documents">
				<Input type="file" accept=".pdf,.doc,.docx,image/*" onChange={(e) => onFile(e, "documents")} className="bg-white cursor-pointer" />
			</FormField>
		</div>
		<FormField label="Notes">
			<Textarea name="notes" value={form.notes} onChange={onChange} rows={3}
				placeholder="Any additional information..." className="bg-white resize-none" />
		</FormField>
		<label className="flex items-start gap-2.5 cursor-pointer">
			<input required type="checkbox" name="agree" checked={form.agree}
				onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
				className="mt-0.5 accent-blue-600 w-4 h-4" />
			<span className="text-xs text-slate-500 leading-relaxed">
				I agree to the{" "}
				<Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>{" "}and{" "}
				<Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
			</span>
		</label>
		<StepButtons step={step} onBack={onBack} isLast />
	</form>
);

export default Step4Academic;
