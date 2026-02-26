import Image from "next/image";

const team = [
	{ name: "SOKNA Chun", role: "Project Lead", image: "/about/our-team/project-lead.jpg" },
	{ name: "Sros Bondit", role: "Front-end Developer", image: "/about/our-team/front-end-1.jpg" },
	{ name: "Doung Chanvattana", role: "UI/UX Designer", image: "/about/our-team/ux-ui.jpg" },
	{ name: "Torng Mengheng", role: "Front-end Developer", image: "/about/our-team/front-end-2.png" },
];

const AboutHero = () => {
	return (
		<section className="pt-8 pb-16 border-b border-gray-100">
			<div className="max-w-5xl mx-auto px-4">
				<p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">Our Team</p>
				<h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-10 leading-snug">
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
