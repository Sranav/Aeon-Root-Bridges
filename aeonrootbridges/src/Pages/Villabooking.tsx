import NavBar from '../components/Navbar/NavBar'
import VilaBooking from '../components/Booking Pages/VilaBooking'
import banner from "@assets/images/aeon.webp";
import VillaBookinBanner from '../components/Booking Pages/VillaBookinBanner';
import RoomDetails from '../components/Booking Pages/RoomDetails';
import HomeFooter from '../components/Home/HomeFooter';
import OtherProperties from '../components/Booking Pages/OtherProperties';
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
      {/* <div className='lg:mx-20 pt-20 pb-10'>
        <HotelDetails/>
      </div> */}
      <div className='lg:mx-20 pt-20 pb-10'>
        <RoomDetails/>
      </div>
      <div className='lg:mx-20 pt-20 pb-10'>
        <OtherProperties/>
      </div>
      <div className='lg:mx-20 pb-10 pt-14 xs:px-6 lg:px-0'>
      <HomeFooter/>
      </div>
    </div>
  )
}

export default Villabooking