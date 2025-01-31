import React from 'react'
import NavBar from '../components/Navbar/NavBar'
import VilaBooking from '../components/Booking Pages/VilaBooking'
import BannerSlider from '../components/Home/BannerSlider'
import banner from "@assets/images/aeon.webp";
import VillaBookinBanner from '../components/Booking Pages/VillaBookinBanner';
import HotelDetails from '../components/Booking Pages/HotelDetails';
const Villabooking = () => {
  return (
    <div>
        <div><NavBar /></div>
        
        
        <div>
        <VillaBookinBanner banner={banner} />
      </div>
      <div className='lg:mx-20 pb-10'>
        <VilaBooking/>
      </div>
      <div className='lg:mx-20 pt-20 pb-10'>
        <HotelDetails/>
      </div>
    </div>
  )
}

export default Villabooking