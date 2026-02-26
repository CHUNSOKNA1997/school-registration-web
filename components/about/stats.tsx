const stats = [
	{ value: "5,000+", label: "Students Enrolled" },
	{ value: "120+", label: "Expert Instructors" },
	{ value: "25+", label: "Years of Excellence" },
	{ value: "98%", label: "Graduation Rate" },
];

const Stats = () => {
	return (
		<section className="py-16">
			<div className="max-w-screen-lg mx-auto px-4">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
				{stats.map((s) => (
					<div key={s.label} className="flex flex-col gap-1">
						<span className="text-4xl md:text-5xl font-extrabold text-slate-800">{s.value}</span>
						<span className="text-slate-400 text-sm">{s.label}</span>
					</div>
				))}
			</div>
			</div>
		</section>
	);
};

export default Stats;
