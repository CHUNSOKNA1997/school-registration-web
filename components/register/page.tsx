"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { RegisterFormStateProvider } from "./context/register-form-context";
import { useRegisterForm } from "./hooks/use-register-form";
import { useRegisterStepQuery } from "./hooks/use-register-step-query";
import RegisterSidebar from "./sidebar";
import Step1Personal from "./steps/step1-personal";
import Step2Address from "./steps/step2-address";
import Step3Parent from "./steps/step3-parent";
import Step4Academic from "./steps/step4-academic";
import { STEPS } from "./types";

const RegisterForm = () => {
	const {
		agreeError,
		form,
		formMethods,
		onAgreeChange,
		onChange,
		onDateChange,
		onFile,
		onSelect,
		resetForm: resetRegisterForm,
		submit,
		submitted,
	} = useRegisterForm();
	const { goToStep, resetToFirstStep, step } = useRegisterStepQuery({ maxStep: STEPS.length });

	const next = (e: React.FormEvent) => { e.preventDefault(); goToStep(step + 1); };
	const back = () => goToStep(step - 1);
	const resetForm = () => {
		resetRegisterForm();
		resetToFirstStep();
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

						{submitted ? (
							<div className="max-w-md mx-auto w-full text-center flex flex-col items-center gap-5">
								<CheckCircle2 className="w-16 h-16 text-blue-500" />
								<h2 className="text-2xl font-extrabold text-slate-800">Application Received!</h2>
								<p className="text-slate-500 text-sm leading-relaxed">
									Thank you for applying to Starlight Academy. Our admissions team will review your application and contact you within 3-5 business days.
								</p>
								<Button onClick={resetForm}
									className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 cursor-pointer">
									Submit Another
								</Button>
								<Link href="/" className="text-sm text-blue-600 hover:underline">← Back to Home</Link>
							</div>
						) : (
							<div className="max-w-lg mx-auto w-full">
								{/* Header */}
								<p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-1">
									Step {step + 1} of {STEPS.length}
								</p>
								<h2 className="text-2xl font-extrabold text-slate-800 mb-1">{STEPS[step].label}</h2>

								{/* Progress bar */}
								<div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
									<div className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
										style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
								</div>

								{step === 0 && <Step1Personal onNext={next} step={step} onBack={back} />}
								{step === 1 && <Step2Address onNext={next} step={step} onBack={back} />}
								{step === 2 && <Step3Parent onNext={next} step={step} onBack={back} />}
								{step === 3 && <Step4Academic onSubmit={submitForm} step={step} onBack={back} />}

								<p className="text-center text-xs text-slate-400 mt-4">
									<Link href="/" className="text-blue-500 hover:underline">← Back to Home</Link>
								</p>
							</div>
						)}
					</div>
				</div>
			</RegisterFormStateProvider>
		</FormProvider>
	);
};

export default RegisterForm;
