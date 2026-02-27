"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import RegisterSidebar from "./sidebar";
import Step1Personal from "./steps/step1-personal";
import Step2Address from "./steps/step2-address";
import Step3Parent from "./steps/step3-parent";
import Step4Academic from "./steps/step4-academic";
import { INITIAL_FORM, STEPS, type FormData } from "./types";

const RegisterForm = () => {
	const [step, setStep] = useState(0);
	const [submitted, setSubmitted] = useState(false);
	const [form, setForm] = useState<FormData>(INITIAL_FORM);

	const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
		}));
	};

	const handleSelect = (field: keyof FormData, value: string) =>
		setForm((prev) => ({ ...prev, [field]: value }));

	const handleDateChange = (field: keyof FormData, date: Date | undefined) =>
		setForm((prev) => ({ ...prev, [field]: date ?? null }));

	const handleFile = (e: React.ChangeEvent<HTMLInputElement>, field: "photo" | "documents") =>
		setForm((prev) => ({ ...prev, [field]: e.target.files?.[0] ?? null }));

	const next = (e: React.FormEvent) => { e.preventDefault(); setStep((s) => s + 1); };
	const back = () => setStep((s) => s - 1);
	const submit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

	const sharedProps = { form, onChange: handleInput, onSelect: handleSelect, onDateChange: handleDateChange, step, onBack: back };

	return (
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
							Thank you for applying to Starlight Academy. Our admissions team will review your application and contact you within 3–5 business days.
						</p>
						<Button onClick={() => { setSubmitted(false); setStep(0); setForm(INITIAL_FORM); }}
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

						{step === 0 && <Step1Personal {...sharedProps} onNext={next} />}
						{step === 1 && <Step2Address  {...sharedProps} onNext={next} />}
						{step === 2 && <Step3Parent   {...sharedProps} onNext={next} />}
						{step === 3 && <Step4Academic {...sharedProps} onFile={handleFile} onSubmit={submit} />}

						<p className="text-center text-xs text-slate-400 mt-4">
							<Link href="/" className="text-blue-500 hover:underline">← Back to Home</Link>
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default RegisterForm;
