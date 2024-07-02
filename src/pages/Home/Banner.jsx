import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from 'swiper/modules';


import 'swiper/css/navigation';
import { Link } from 'react-router-dom';




const Banner = () => {


   const text = <>
         
        <h1 className='font-bold text-4xl'>Here you can tell us any Queries about <br /> our products </h1>


   </>


    return (
        <Swiper
        spaceBetween={50}
        slidesPerView={1}
        centeredSlides={true}
     loop={true}
     autoplay={{
       delay: 2000,
       disableOnInteraction: false,
     }}
  
    
     modules={[Autoplay]}
     className="mySwiper" >



      <div >
      <SwiperSlide >
      <div className="hero h-[900px] bg-cover rounded-lg lg:w-full mx-auto " style={{backgroundImage: 'url(https://i.ibb.co/HxfJjb8/Donate-blood.webp)'}}>
        <div className="hero-overlay "></div>
        <div className="hero-content text-center text-neutral-content">
       <div className='flex mt-24 gap-28'>
       <Link to='/searchDonor'><button className='btn btn-outline btn-accent font-bold '>Search Donor</button></Link>
       <Link to='/signup'><button className='btn btn-outline btn-accent font-bold '>Join as a Donor</button></Link>
       </div>
  </div>
</div>



</SwiperSlide>
        <SwiperSlide className=''>
        <div className="hero h-[900px] bg-cover rounded-lg lg:w-[1770px] mx-auto " style={{backgroundImage: 'url(https://i.ibb.co/MZzfTc2/415-blood-donation-be-a-saviour.jpg)'}}>
        <div className="hero-overlay "></div>
        <div className="hero-content text-center text-neutral-content">
        <div className='flex gap-28'>
        <Link to='/searchDonor'><button className='btn btn-outline btn-accent font-bold '>Search Donor</button></Link>
       <Link to='/signup'><button className='btn btn-outline btn-accent font-bold '>Join as a Donor</button></Link>
       </div>
  </div>
</div>


        </SwiperSlide>
        <SwiperSlide>

        <div className="hero h-[900px] bg-cover rounded-lg lg:w-[1770px] mx-auto " style={{backgroundImage: 'url(https://i.ibb.co/6WkKwm6/blood-donation.jpg)'}}>
        <div className="hero-overlay "></div>
        <div className="hero-content text-center text-neutral-content">
        <div className='flex gap-28'>
        <Link to='/searchDonor'><button className='btn  btn-accent font-bold '>Search Donor</button></Link>
       <Link to='/signup'><button className='btn btn-accent font-bold '>Join as a Donor</button></Link>
       </div>
  </div>
</div>


        </SwiperSlide>
        <SwiperSlide>
        <div className="hero h-[900px] bg-cover rounded-lg lg:w-[1770px] mx-auto " style={{backgroundImage: 'url(https://i.ibb.co/mN5G6Sw/blood-donor-day-june-14-PP9-KH2.jpg)'}}>
        <div className="hero-overlay "></div>
        <div className="hero-content text-center text-neutral-content">
        <div className='flex gap-28'>
       
       <Link to='/searchDonor'><button className='btn btn-outline btn-accent font-bold '>Search Donor</button></Link>
       <Link to='/signup'><button className='btn  btn-accent font-bold '>Join as a Donor</button></Link>
       </div>
  </div>
</div>


        </SwiperSlide>
        <SwiperSlide>

        <div className="hero h-[900px] bg-cover rounded-lg lg:w-[1770px] mx-auto " style={{backgroundImage: 'url(https://i.ibb.co/XDdwzx1/human-blood-donate-on-white-background-free-vector.jpg)'}}>
        <div className="hero-overlay "></div>
        <div className="hero-content text-center text-neutral-content">
        <div className='flex gap-28'>
        <Link to='/searchDonor'><button className='btn bg-red-600  btn-accent border-none  text-white font-bold '>Search Donor</button></Link>
       <Link to='/signup'><button className='btn btn-outline btn-accent font-bold '>Join as a Donor</button></Link>
       </div>
  </div>
</div>


        </SwiperSlide>
       
      </div>
       
      </Swiper>
    );
};

export default Banner;