import Image from "next/image";

const Mission = () => {
	return (
		<section className="py-16 border-b border-gray-100">
			<div className="max-w-screen-lg mx-auto px-4">
				<div className="flex flex-col md:flex-row-reverse gap-12 md:gap-20 items-center">
				<div className="flex-1">
					<h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-6">
						Mission in Education
					</h2>
					<p className="text-slate-500 leading-relaxed mb-4">
						Bridging Talent with Opportunity — To close the gap between academic learning and
						real-world readiness, empowering every student to become a confident, capable, and
						compassionate contributor to society.
					</p>
					<p className="text-slate-500 leading-relaxed">
						We are on a mission to nurture generations of learners who are equipped with critical
						thinking, digital literacy, and a lifelong love of learning — accessible to all who seek
						to grow.
					</p>
				</div>
				<div className="flex-1 w-full rounded-2xl overflow-hidden">
					<Image
						src="/about/mission.jpg"
						alt="Mission at Starlight Academy"
						width={700}
						height={460}
						className="w-full object-cover rounded-2xl"
					/>
				</div>
			</div>
			</div>
		</section>
	);
};

export default Mission;
