import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HeroSlider = () => {
  return (
    <div className="relative group">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-[600px]"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative h-full w-full">
            <img 
              src="https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
              alt="Luxury Watch Auction"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl text-white">
                  <span className="text-lg bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    Live Bidding
                  </span>
                  <h2 className="text-5xl font-bold my-6">Vintage Luxury Watches</h2>
                  <p className="text-xl mb-8">Bid on exclusive timepieces from legendary brands</p>
                  <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full transition-all">
                    Join Auction
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative h-full w-full">
            <img 
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
              alt="Classic Car Auction"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl text-white">
                  <span className="text-lg bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    Ending Soon
                  </span>
                  <h2 className="text-5xl font-bold my-6">Classic Car Collection</h2>
                  <p className="text-xl mb-8">Rare vintage automobiles up for auction</p>
                  <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full transition-all">
                    Place Bid
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative h-full w-full">
            <img 
              src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
              alt="Art Auction"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl text-white">
                  <span className="text-lg bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    Premium Art
                  </span>
                  <h2 className="text-5xl font-bold my-6">Modern Art Masterpieces</h2>
                  <p className="text-xl mb-8">Invest in contemporary art collections</p>
                  <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full transition-all">
                    View Gallery
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Custom Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        <div className="swiper-pagination !relative !w-auto"></div>
      </div>
    </div>
  );
};

export default HeroSlider;