"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { RegisterFormStateProvider } from "./context/register-form-context";
import { useRegisterForm } from "./hooks/use-register-form";
import { useRegisterStepQuery } from "./hooks/use-register-step-query";
import RegisterSidebar from "./sidebar";
import PaymentStep from "./steps/payment-step";
import Step1Personal from "./steps/step1-personal";
import Step2Address from "./steps/step2-address";
import Step3Parent from "./steps/step3-parent";
import Step4Academic from "./steps/step4-academic";
import { REGISTER_FLOW_STEPS } from "./types";

const RegisterForm = () => {
	const router = useRouter();
	const {
		agreeError,
		form,
		formMethods,
		onAgreeChange,
		onChange,
		onDateChange,
		onFile,
		onSelect,
		submit,
	} = useRegisterForm({
		onSubmitSuccess: () => {
			goToStep("payment");
		},
	});
	const { goToStep, step, stepIndex } = useRegisterStepQuery();
	const currentStepMeta = REGISTER_FLOW_STEPS[stepIndex];
	const isPaymentStep = step === "payment";

	const next = (e: React.FormEvent) => {
		e.preventDefault();
		const nextStep = REGISTER_FLOW_STEPS[stepIndex + 1];
		if (nextStep) {
			goToStep(nextStep.value);
		}
	};
	const back = () => {
		const previousStep = REGISTER_FLOW_STEPS[stepIndex - 1];
		if (previousStep) {
			goToStep(previousStep.value);
		}
	};
	const submitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
		void submit(event);
	};
	const registerFormContextValue = useMemo(
		() => ({
			agreeError,
			form,
			onAgreeChange,
			onChange,
			onDateChange,
			onFile,
			onSelect,
		}),
		[agreeError, form, onAgreeChange, onChange, onDateChange, onFile, onSelect],
	);

	return (
		<FormProvider {...formMethods}>
			<RegisterFormStateProvider value={registerFormContextValue}>
				<div className="min-h-screen flex">
					<RegisterSidebar step={step} />

					{/* Right panel */}
					<div className="flex-1 bg-gray-50 flex flex-col justify-center overflow-y-auto py-10 px-6 sm:px-12">
						{/* Mobile logo */}
						<div className="flex lg:hidden items-center gap-2 mb-6">
							<Image src="/starlight-logo.png" alt="Starlight Academy" width={32} height={32} />
							<span className="font-bold text-slate-800">Starlight Academy</span>
						</div>

						<div className={`${isPaymentStep ? "max-w-4xl" : "max-w-lg"} mx-auto w-full`}>
							{!isPaymentStep && (
								<>
									<div className="mb-1 flex items-start justify-between gap-4">
										<div>
											<p className="text-xs font-semibold uppercase tracking-widest text-blue-500">
												Step {stepIndex + 1} of {REGISTER_FLOW_STEPS.length}
											</p>
											<h2 className="text-2xl font-extrabold text-slate-800">{currentStepMeta.label}</h2>
										</div>
										<Link
											href="/"
											className="inline-flex items-center gap-1 text-xs text-blue-500 hover:cursor-pointer hover:underline"
										>
											<ArrowLeft className="h-3.5 w-3.5" />
											<span>Back to Home</span>
										</Link>
									</div>

									<div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
										<div className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
											style={{ width: `${((stepIndex + 1) / REGISTER_FLOW_STEPS.length) * 100}%` }} />
									</div>
								</>
							)}

							{step === "1" && <Step1Personal onNext={next} step={stepIndex} onBack={back} />}
							{step === "2" && <Step2Address onNext={next} step={stepIndex} onBack={back} />}
							{step === "3" && <Step3Parent onNext={next} step={stepIndex} onBack={back} />}
							{step === "4" && <Step4Academic onSubmit={submitForm} step={stepIndex} onBack={back} />}
							{step === "payment" && (
								<PaymentStep
									onBack={() => goToStep("4")}
									onProceed={() => router.push("/onboarding")}
								/>
							)}
						</div>
					</div>
				</div>
			</RegisterFormStateProvider>
		</FormProvider>
	);
};

export default RegisterForm;
