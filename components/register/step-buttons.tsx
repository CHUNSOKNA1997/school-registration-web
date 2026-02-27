import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
	step: number;
	onBack: () => void;
	isLast?: boolean;
};

const StepButtons = ({ step, onBack, isLast }: Props) => (
	<div className="flex gap-3 mt-2">
		{step > 0 && (
			<Button type="button" variant="outline" onClick={onBack} className="flex-1 cursor-pointer gap-1">
				<ChevronLeft className="w-4 h-4" /> Back
			</Button>
		)}
		<Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer gap-1">
			{isLast ? "Submit Application" : (<>Next <ChevronRight className="w-4 h-4" /></>)}
		</Button>
	</div>
);

export default StepButtons;
