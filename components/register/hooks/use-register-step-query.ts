import { useEffect } from "react";
import { parseAsInteger, useQueryState } from "nuqs";

type Options = {
	maxStep: number;
};

export const useRegisterStepQuery = ({ maxStep }: Options) => {
	const [stepParam, setStepParam] = useQueryState(
		"step",
		parseAsInteger.withOptions({ history: "push", scroll: false }),
	);

	const normalizedStep = stepParam && stepParam >= 1 && stepParam <= maxStep ? stepParam : 1;
	const step = normalizedStep - 1;

	useEffect(() => {
		if (stepParam !== normalizedStep) {
			void setStepParam(normalizedStep, { history: "replace", scroll: false });
		}
	}, [normalizedStep, setStepParam, stepParam]);

	const goToStep = (nextStep: number) => {
		const clamped = Math.min(Math.max(nextStep, 0), maxStep - 1) + 1;
		void setStepParam(clamped, { history: "push", scroll: false });
	};

	const resetToFirstStep = () => {
		void setStepParam(1, { history: "replace", scroll: false });
	};

	return {
		goToStep,
		resetToFirstStep,
		step,
	};
};
