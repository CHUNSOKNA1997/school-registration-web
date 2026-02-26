"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const ContactForm = () => {
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
	};

	return (
		<section className="py-14">
			<div className="max-w-5xl mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
					<div>
						<p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">Send a Message</p>
						<h2 className="text-3xl font-extrabold text-slate-800 mb-4 leading-snug">
							We're here to help
						</h2>
						<p className="text-slate-500 text-sm leading-relaxed">
							Whether you have a question about admissions, programs, or anything else — our team is ready to answer all your questions.
						</p>
					</div>

					<div>
						{submitted ? (
							<div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
								<p className="text-blue-700 font-semibold text-lg">Thank you!</p>
								<p className="text-blue-500 text-sm mt-1">We've received your message and will be in touch soon.</p>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="flex flex-col gap-4">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div className="flex flex-col gap-1">
										<label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">First Name</label>
										<input
											type="text"
											required
											placeholder="John"
											className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
										/>
									</div>
									<div className="flex flex-col gap-1">
										<label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Last Name</label>
										<input
											type="text"
											required
											placeholder="Smith"
											className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
										/>
									</div>
								</div>
								<div className="flex flex-col gap-1">
									<label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</label>
									<input
										type="email"
										required
										placeholder="john@example.com"
										className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
									/>
								</div>
								<div className="flex flex-col gap-1">
									<label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Message</label>
									<textarea
										required
										rows={4}
										placeholder="How can we help you?"
										className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 resize-none"
									/>
								</div>
								<Button
									type="submit"
									className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3 text-sm font-semibold cursor-pointer"
								>
									Send Message
								</Button>
							</form>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactForm;
