import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000, 
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true, 
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-indigo-600 to-blue-500 min-h-screen text-white overflow-hidden">
      <header className="text-center py-20">
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-yellow-300"
        >
          Welcome to <span className="text-yellow-500">BidOut!!</span>
        </motion.h1>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg mt-4"
        >
          The best auction platform to bid on your favorite items.
        </motion.p>

        {/* Animated Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 flex justify-center space-x-4"
        >
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="#"
            className="bg-yellow-400 text-black px-6 py-3 rounded-full shadow-lg"
          >
            Explore Auctions
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="#"
            className="bg-blue-600 px-6 py-3 rounded-full shadow-lg"
          >
            Register Now
          </motion.a>
        </motion.div>
      </header>

      {/* Auction Items Carousel */}
      <section className="py-16">
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-semibold text-center"
        >
          Featured Auction Items
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-10"
        >
          <Slider {...carouselSettings}>
            {/* Carousel Items */}
            {[1, 2, 3, 4, 5].map((item) => (
              <motion.div
                key={item}
                className="p-4"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-white p-4 rounded-lg shadow-lg text-black">
                  <motion.img
                    src={`https://via.placeholder.com/300?text=Item+${item}`}
                    alt={`Item ${item}`}
                    className="w-full h-48 object-cover rounded-lg"
                    whileHover={{ scale: 1.1 }}
                  />
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl font-semibold mt-4"
                  >
                    Auction Item {item}
                  </motion.h3>
                  <p className="text-gray-700 mt-2">Bid now starting at $100!</p>
                </div>
              </motion.div>
            ))}
          </Slider>
        </motion.div>
      </section>
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="slick-arrow slick-next text-black hover:text-yellow-400"
      onClick={onClick}
    >
      <i className="fas fa-arrow-right"></i>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="slick-arrow slick-prev text-black hover:text-yellow-400"
      onClick={onClick}
    >
      <i className="fas fa-arrow-left"></i>
    </div>
  );
};

export default HomePage;
