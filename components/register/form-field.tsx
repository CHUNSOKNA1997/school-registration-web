import { Label } from "@/components/ui/label";

type Props = {
	label: string;
	required?: boolean;
	children: React.ReactNode;
};

const FormField = ({ label, required, children }: Props) => (
	<div className="flex flex-col gap-1.5">
		<Label className="text-xs font-semibold text-slate-600">
			{label} {required && <span className="text-red-400">*</span>}
		</Label>
		{children}
	</div>
);

export default FormField;
