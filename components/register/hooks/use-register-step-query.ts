import { parseAsStringLiteral, useQueryState } from "nuqs";
import { REGISTER_FLOW_STEPS, type RegisterStepId } from "../types";

type Options = {
	defaultStep?: RegisterStepId;
};

const STEP_QUERY_VALUES = REGISTER_FLOW_STEPS.map((step) => step.value) as [RegisterStepId, ...RegisterStepId[]];

export const useRegisterStepQuery = ({ defaultStep = "1" }: Options = {}) => {
	const [step, setStep] = useQueryState(
		"step",
		parseAsStringLiteral(STEP_QUERY_VALUES)
			.withDefault(defaultStep)
			.withOptions({ history: "push", scroll: false }),
	);

	const stepIndex = REGISTER_FLOW_STEPS.findIndex((item) => item.value === step);

	const goToStep = (nextStep: RegisterStepId) => {
		void setStep(nextStep, { history: "push", scroll: false });
	};

	const resetToFirstStep = () => {
		void setStep("1", { history: "replace", scroll: false });
	};

	return {
		goToStep,
		resetToFirstStep,
		step,
		stepIndex,
	};
};
