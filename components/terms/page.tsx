const TermsPage = () => {
	const year = new Date().getFullYear();

	return (
		<div className="min-h-screen bg-slate-900 pt-[65px]">
			{/* Hero */}
			<div className="bg-slate-800 border-b border-white/10 py-14 px-6 text-center">
				<h1 className="text-4xl font-extrabold text-white mb-3">Terms of Service</h1>
				<p className="text-white/60 text-sm">Last updated: January 1, {year}</p>
			</div>

			{/* Content */}
			<div className="max-w-3xl mx-auto px-6 py-14 flex flex-col gap-10">

				<section>
					<h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
					<p className="text-white/70 leading-relaxed text-sm">
						By accessing or using the Starlight Academy website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-bold text-white mb-3">2. Use of the Website</h2>
					<p className="text-white/70 leading-relaxed text-sm mb-3">You agree to use this website only for lawful purposes. You must not:</p>
					<ul className="list-disc list-inside text-white/70 text-sm flex flex-col gap-2">
						<li>Use the site in any way that violates applicable local, national, or international laws.</li>
						<li>Transmit any unsolicited or unauthorized advertising or promotional material.</li>
						<li>Attempt to gain unauthorized access to any part of the website or its related systems.</li>
						<li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the website.</li>
					</ul>
				</section>

				<section>
					<h2 className="text-xl font-bold text-white mb-3">3. Registration & Account</h2>
					<p className="text-white/70 leading-relaxed text-sm">
						To access certain features, you may be required to register and create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-bold text-white mb-3">4. Application & Enrollment</h2>
					<p className="text-white/70 leading-relaxed text-sm">
						Submitting an application does not guarantee enrollment. Starlight Academy reserves the right to accept or deny any application at its sole discretion. All application information provided must be accurate, complete, and truthful. Providing false information may result in immediate disqualification or dismissal.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-bold text-white mb-3">5. Intellectual Property</h2>
					<p className="text-white/70 leading-relaxed text-sm">
						All content on this website — including text, graphics, logos, images, and software — is the property of Starlight Academy and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-bold text-white mb-3">6. Limitation of Liability</h2>
					<p className="text-white/70 leading-relaxed text-sm">
						Starlight Academy shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of or inability to use the website or services, even if we have been advised of the possibility of such damages. Our total liability shall not exceed the amount paid by you, if any, for accessing our services.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-bold text-white mb-3">7. Disclaimer of Warranties</h2>
					<p className="text-white/70 leading-relaxed text-sm">
						This website and its content are provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-bold text-white mb-3">8. Third-Party Links</h2>
					<p className="text-white/70 leading-relaxed text-sm">
						Our website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-bold text-white mb-3">9. Changes to Terms</h2>
					<p className="text-white/70 leading-relaxed text-sm">
						Starlight Academy reserves the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after any changes constitutes your acceptance of the new terms.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-bold text-white mb-3">10. Contact Us</h2>
					<p className="text-white/70 leading-relaxed text-sm">
						If you have any questions about these Terms of Service, please contact us at:{" "}
						<a href="mailto:hello@starlightacademy.edu" className="text-blue-400 hover:underline">
							hello@starlightacademy.edu
						</a>
					</p>
				</section>

				<div className="h-px bg-white/10" />
			</div>
		</div>
	);
};

export default TermsPage;
