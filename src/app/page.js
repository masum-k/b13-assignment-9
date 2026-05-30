import Banner from "@/components/Banner";
import Faq from "@/components/Faq";
import Rating from "@/components/Rating";
import TutorsCard from "@/components/TutorsCard";


export default function Home() {
  return (
    <div>
      <Banner />
      <TutorsCard />
      <Rating />
      <Faq />
    </div>
  );
}
