const PrivacyPage = () => {
	const year = new Date().getFullYear();

	return (
		<div className="min-h-screen bg-slate-900 pt-[65px]">
			{/* Hero */}
			<div className="bg-slate-800 border-b border-white/10 py-14 px-6 text-center">
				<h1 className="text-4xl font-extrabold text-white mb-3">Privacy Policy</h1>
				<p className="text-white/60 text-sm">Last updated: January 1, {year}</p>
			</div>

			{/* Content */}
			<div className="max-w-3xl mx-auto px-6 py-14 flex flex-col gap-10">

				<section>
					<h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
					<p className="text-white/70 leading-relaxed text-sm">
						Welcome to Starlight Academy. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or register for our programs.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
					<p className="text-white/70 leading-relaxed text-sm mb-3">
						We may collect the following types of information:
					</p>
					<ul className="list-disc list-inside text-white/70 text-sm flex flex-col gap-2">
						<li><span className="font-semibold text-white/90">Personal Identification:</span> Name, email address, phone number, date of birth.</li>
						<li><span className="font-semibold text-white/90">Academic Information:</span> Previous academic records, transcripts, and application materials.</li>
						<li><span className="font-semibold text-white/90">Usage Data:</span> Browser type, IP address, pages visited, and time spent on our site.</li>
						<li><span className="font-semibold text-white/90">Communications:</span> Messages you send us via contact forms or email.</li>
					</ul>
				</section>

				<section>
					<h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
					<p className="text-white/70 leading-relaxed text-sm mb-3">We use the information we collect to:</p>
					<ul className="list-disc list-inside text-white/70 text-sm flex flex-col gap-2">
						<li>Process and manage your application and enrollment.</li>
						<li>Communicate with you about your application status and program updates.</li>
						<li>Improve our website and services.</li>
						<li>Send administrative information such as policy changes.</li>
						<li>Comply with legal obligations.</li>
					</ul>
				</section>

				<section>
					<h2 className="text-xl font-bold text-white mb-3">4. Sharing Your Information</h2>
					<p className="text-white/70 leading-relaxed text-sm">
						We do not sell, trade, or rent your personal information to third parties. We may share data with trusted service providers who assist in operating our website and services, provided they agree to keep this information confidential. We may also disclose information when required by law.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-bold text-white mb-3">5. Data Security</h2>
					<p className="text-white/70 leading-relaxed text-sm">
						We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-bold text-white mb-3">6. Your Rights</h2>
					<p className="text-white/70 leading-relaxed text-sm mb-3">You have the right to:</p>
					<ul className="list-disc list-inside text-white/70 text-sm flex flex-col gap-2">
						<li>Access and receive a copy of your personal data.</li>
						<li>Request correction of inaccurate data.</li>
						<li>Request deletion of your personal data.</li>
						<li>Withdraw consent at any time where processing is based on consent.</li>
					</ul>
				</section>

				<section>
					<h2 className="text-xl font-bold text-white mb-3">7. Cookies</h2>
					<p className="text-white/70 leading-relaxed text-sm">
						Our website may use cookies to enhance user experience. You can choose to disable cookies through your browser settings. Note that some features of the site may not function properly without cookies.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-bold text-white mb-3">8. Contact Us</h2>
					<p className="text-white/70 leading-relaxed text-sm">
						If you have any questions or concerns about this Privacy Policy, please contact us at:{" "}
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

export default PrivacyPage;
