import AboutBanner from "@/components/about/banner";
import AboutHero from "@/components/about/hero";
import AboutIntro from "@/components/about/intro";
import Mission from "@/components/about/mission";
import OriginStory from "@/components/about/origin-story";

const AboutPage = () => {
	return (
		<div className="flex flex-col bg-white">
			<AboutBanner />
			<AboutHero />
			<AboutIntro />
			<Mission />
			<OriginStory />
		</div>
	);
};

export default AboutPage;
