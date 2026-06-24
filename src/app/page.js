import Banner from "@/components/Banner";
import Faq from "@/components/Faq";
import Service from "@/components/Service";
import TutorsCard from "@/components/TutorsCard";


export default function Home() {
  return (
    <div>
      <Banner />
      <TutorsCard />
      <Service />
      <Faq />
    </div>
  );
}
