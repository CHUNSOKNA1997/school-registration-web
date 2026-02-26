import AboutHero from "@/components/about/hero";
import AboutIntro from "@/components/about/intro";
import Mission from "@/components/about/mission";
import OriginStory from "@/components/about/origin-story";
import Stats from "@/components/about/stats";

const AboutPage = () => {
	return (
		<div className="flex flex-col bg-white">
			<AboutHero />
			<AboutIntro />
			<Mission />
			<OriginStory />
			<Stats />
		</div>
	);
};

export default AboutPage;
