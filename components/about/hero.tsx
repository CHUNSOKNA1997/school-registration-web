import Image from "next/image";

const team = [
	{ name: "John Smith", role: "Project Lead", image: "/about/our-team/project-lead.jpg" },
	{ name: "Sarah Johnson", role: "Software Engineer", image: "/about/our-team/software-engineer.jpg" },
	{ name: "David Lee", role: "UI/UX Designer", image: "/about/our-team/ui-ux.jpg" },
	{ name: "Emily Chen", role: "DevOps Engineer", image: "/about/our-team/dev-ops.png" },
];

const AboutHero = () => {
	return (
		<section className="pt-8 pb-16 border-b border-gray-100">
			<div className="max-w-5xl mx-auto px-4">
				<p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">Our Team</p>
				<h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-10 max-w-xl leading-snug">
					Meet the team behind Starlight Academy
				</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
					{team.map((member) => (
						<div key={member.name} className="bg-gray-100 rounded-2xl overflow-hidden flex flex-col">
							<div className="px-5 pt-5 pb-3">
								<p className="font-bold text-slate-800 text-base">{member.name}</p>
								<p className="text-slate-400 text-sm mt-1">{member.role}</p>
							</div>
							<div className="mx-4 mb-4 rounded-xl overflow-hidden">
								<Image
									src={member.image}
									alt={member.name}
									width={400}
									height={300}
									className="w-full object-cover object-top h-[220px]"
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default AboutHero;
