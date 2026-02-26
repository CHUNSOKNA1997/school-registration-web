const ContactMap = () => {
return (
<section className="flex justify-center px-4 -mt-16 pb-16 bg-gray-50">
<div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-lg aspect-[3/1.25]">
<iframe
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.989970133148!2d104.94022487584452!3d11.55257644439667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951fb4adc4add%3A0x9e5b38f6d5af96!2sDICHI%20Academy!5e0!3m2!1sen!2skh!4v1748512343861!5m2!1sen!2skh"
className="w-full h-full"
allowFullScreen
loading="lazy"
referrerPolicy="no-referrer-when-downgrade"
/>
</div>
</section>
);
};

export default ContactMap;
