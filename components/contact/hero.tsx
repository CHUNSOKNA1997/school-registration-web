import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const ContactHero = () => {
return (
<section
data-header-overlay="true"
className="relative h-[calc(100vh+65px)] -mt-[65px] pt-[65px] flex items-center bg-cover bg-center bg-no-repeat px-4"
style={{ backgroundImage: "url('/hero-section.jpeg')" }}
>
<div className="absolute inset-0 bg-slate-900/70" />
<div className="relative z-10 w-full max-w-5xl mx-auto">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
{/* Left: Text */}
<div>
<h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight lg:leading-[4rem] mb-6">
Help us route <br /> your inquiry
</h1>
<p className="text-white/75 text-sm lg:text-base leading-relaxed max-w-md">
Questions about our programs, application process, or how to get started? We&apos;re here to guide you through every step. Contact us to learn which program fits your goals and timeline.
</p>
</div>

{/* Right: Contact Card */}
<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 flex flex-col gap-6">
<div className="flex items-center gap-3">
<Image src="/starlight-logo.png" alt="Starlight Academy" width={48} height={48} />
<div>
<p className="text-white/60 text-xs">Starlight Academy</p>
<p className="text-white font-bold text-lg">Let&apos;s Get In Touch</p>
</div>
</div>

<div className="h-px bg-white/20" />

<div className="flex flex-col gap-3">
<Link
href="tel:+15551234567"
className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-4 py-3"
>
<div className="bg-blue-500 rounded-full p-2">
<Phone className="w-4 h-4 text-white" />
</div>
<div>
<p className="text-white/60 text-xs">Phone</p>
<p className="text-white text-sm font-semibold">+1 (555) 123-4567</p>
</div>
</Link>

<Link
href="mailto:hello@starlightacademy.edu"
className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-4 py-3"
>
<div className="bg-blue-500 rounded-full p-2">
<Mail className="w-4 h-4 text-white" />
</div>
<div>
<p className="text-white/60 text-xs">Email</p>
<p className="text-white text-sm font-semibold">hello@starlightacademy.edu</p>
</div>
</Link>
</div>

<div className="h-px bg-white/20" />

<p className="text-white/50 text-xs text-center">
123 Academy Lane, Springfield, CA 90001
</p>
</div>
</div>
</div>
</section>
);
};

export default ContactHero;
