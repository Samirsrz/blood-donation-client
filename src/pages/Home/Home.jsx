import Banner from "./Banner";
import BannerUsage from "./BannerUsage";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import OurVolunteer from "./OurVolunteer";

const Home = () => {
    return (
        <div className="overflow-x-hidden">
              <BannerUsage></BannerUsage>  
            <div className="w-[1720px] my-7 mx-auto">
            <OurVolunteer></OurVolunteer>
            </div>
            <ContactUs></ContactUs>
            <Footer></Footer>
        </div>
    );
};

export default Home;