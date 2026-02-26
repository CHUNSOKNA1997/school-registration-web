import { Mail, Phone, MapPin } from "lucide-react";

const contactItems = [
	{
		icon: Mail,
		label: "Email",
		value: "hello@starlightacademy.edu",
		href: "mailto:hello@starlightacademy.edu",
	},
	{
		icon: Phone,
		label: "Phone",
		value: "+1 (555) 123-4567",
		href: "tel:+15551234567",
	},
	{
		icon: MapPin,
		label: "Address",
		value: "123 Academy Lane, Springfield, CA 90001",
		href: null,
	},
];

const ContactInfo = () => {
	return (
		<section className="py-14 border-b border-gray-100">
			<div className="max-w-5xl mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{contactItems.map(({ icon: Icon, label, value, href }) => (
						<div key={label} className="flex flex-col items-center text-center gap-3 p-8 rounded-2xl bg-gray-50">
							<div className="bg-blue-100 p-3 rounded-full">
								<Icon className="w-6 h-6 text-blue-600" />
							</div>
							<p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{label}</p>
							{href ? (
								<a href={href} className="text-slate-700 font-medium hover:text-blue-600 transition-colors text-sm">
									{value}
								</a>
							) : (
								<p className="text-slate-700 font-medium text-sm">{value}</p>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ContactInfo;
