"use client";

import Image from "next/image";
import khqrImage from "@/assets/images/khqr.svg";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
	onBack: () => void;
	onProceed: () => void;
};

const TOTAL_COST = 120;

const PaymentStep = ({ onBack, onProceed }: Props) => (
	<div className="flex flex-col gap-3">
		<div className="flex items-start justify-between gap-4">
			<div>
				<p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">Step 5 of 5</p>
				<h2 className="mt-1 text-[1.5rem] font-extrabold text-slate-900">Complete Your Payment</h2>
				<p className="mt-1 text-[11px] leading-4 tracking-[-0.01em] text-slate-600 lg:whitespace-nowrap">
					Your application has been submitted. To continue onboarding, complete the payment using PayWay by scanning the KHQR below.
				</p>
			</div>
			<button
				type="button"
				onClick={onBack}
				className="inline-flex shrink-0 items-center gap-1 text-xs text-blue-500 hover:cursor-pointer hover:underline"
			>
				<ArrowLeft className="h-3.5 w-3.5" />
				<span>Back To Application</span>
			</button>
		</div>

		<div className="flex flex-col gap-3">
			<Card className="border-blue-100 bg-white shadow-sm">
				<CardContent className="space-y-2.5 py-3.5">
					<div className="flex w-full items-center gap-3 rounded-[1.25rem] border border-slate-900 bg-white p-3 text-left shadow-sm">
						<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ef1f2f] p-2.5">
							<Image
								src={khqrImage}
								alt="ABA Pay KHQR"
								className="h-auto w-full"
							/>
						</div>
						<div className="min-w-0 flex-1">
							<p className="text-[1.2rem] font-extrabold tracking-tight leading-none text-slate-950">ABA Pay KHQR</p>
							<p className="mt-1 text-sm leading-5 text-slate-700">Pay with KHQR compatible banking apps</p>
						</div>
						<div className="shrink-0 text-slate-900">
							<div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-900">
								<div className="h-4 w-4 rounded-full border-2 border-slate-900 bg-slate-900" />
							</div>
						</div>
					</div>

					<div className="grid gap-3 rounded-[1.25rem] border border-slate-200 bg-slate-50 p-3 sm:grid-cols-[1fr_auto] sm:items-end">
						<div className="grid gap-2">
							<div>
								<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Total Cost</p>
								<p className="mt-1 text-[1.35rem] font-extrabold text-slate-900">${TOTAL_COST.toFixed(2)}</p>
							</div>
						</div>
						<Button
							type="button"
							onClick={onProceed}
							className="w-full bg-blue-600 py-2 text-xs hover:cursor-pointer hover:bg-blue-700 sm:w-auto sm:min-w-32"
						>
							Proceed
							<ArrowRight className="ml-2 h-3.5 w-3.5" />
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	</div>
);

export default PaymentStep;
