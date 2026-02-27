import Image from "next/image";
import { User, Home, Users, BookOpen, CheckCircle2 } from "lucide-react";
import { STEPS } from "./types";

const ICONS = { User, Home, Users, BookOpen };

type Props = { step: number };

const RegisterSidebar = ({ step }: Props) => (
	<div className="hidden lg:flex lg:w-[40%] bg-blue-600 flex-col items-center justify-center px-12 text-white relative overflow-hidden">
		<div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-500/40" />
		<div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-700/40" />

		<div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-sm">
			<Image src="/starlight-logo.png" alt="Starlight Academy" width={80} height={80} className="drop-shadow-lg" />
			<h1 className="text-3xl font-extrabold leading-tight tracking-tight">Starlight Academy</h1>
			<p className="text-blue-100 text-sm leading-relaxed">
				Join a world-class learning community where every student is empowered to shine.
			</p>

			<div className="flex flex-col gap-3 w-full mt-4">
				{STEPS.map((s, i) => {
					const Icon = ICONS[s.icon];
					const done = i < step;
					const active = i === step;
					return (
						<div key={i} className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${active ? "bg-white/20 font-semibold" : done ? "bg-white/10 opacity-80" : "opacity-40"}`}>
							<div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 ${done ? "bg-green-400 text-white" : active ? "bg-white text-blue-600" : "bg-white/20 text-white"}`}>
								{done ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
							</div>
							<div className="text-left">
								<p className="text-xs text-blue-200">Step {i + 1}</p>
								<p className="text-sm">{s.label}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	</div>
);

export default RegisterSidebar;
