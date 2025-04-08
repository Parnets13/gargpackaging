// import React from "react";
// import { testimonial } from "../../data/Data";

// const Testimonial = () => {
//   return (
//     <div className="mt-10 mx-4 sm:mx-20">
//       <p
//         className="text-center font-semibold text-xl lg:text-2xl"
//         style={{ color: "#C95E18" }}
//       >
//         Our Testimonial
//       </p>
//       <h1
//         className="text-center font-bold text-3xl mt-2 md:text-4xl lg:text-5xl"
//         style={{ color: "#45595b" }}
//       >
//         Our Client Saying!
//       </h1>
//       <div className="grid grid-cols-1 gap-4 mt-10 lg:grid-cols-2">
//         {testimonial.map((val) => {
//           return (
//             <div
//               key={val.id}
//               className="rounded-lg"
//               style={{ backgroundColor: "#f4f6f8" }}
//             >
//               <p className="p-5" style={{ color: "#45595b" }}>
//                 {val.desc}
//               </p>
//               <hr
//                 className="w-10/12 m-auto h-0.5 xl:h-1 my-3"
//                 style={{ backgroundColor: "#c95e18" }}
//               />
//               <div className="flex justify-between my-6">
//                 <div className="flex mx-4">
//                   <div className="flex flex-col justify-center ml-6">
//                     <h3
//                       className="text-xl font-semibold"
//                       style={{ color: "#45595b" }}
//                     >
//                       {val.name}
//                     </h3>
//                     <p className="my-3" style={{ color: "#45595b" }}>
//                       {val.prof}
//                     </p>
//                     <span style={{ color: "#452a6f",display:'inline' }}>{val.star}</span>
//                     <span style={{ color: "#452a6f",display:'inline'  }}>{val.star}</span>
//                     <span style={{ color: "#452a6f" }}>{val.star}</span>
//                     <span style={{ color: "#452a6f" }}>{val.star}</span>
//                     <span style={{ color: "#45595b" }}>{val.star}</span>
//                   </div>
//                 </div>
//                 <span className="relative right-5 flex justify-center items-center">
//                   <i
//                     className="fa fa-quote-right fa-2x"
//                     style={{ color: "#c95e18" }}
//                   ></i>
//                 </span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Testimonial;

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Star, StarHalf, StarBorder } from "@mui/icons-material";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Testimonial = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [Testimonials, setTestimonials] = useState([]);

  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      description:
        "This product has completely transformed my workflow. It's intuitive, powerful, and exactly what I needed.",
      name: "Sarah Johnson",
      position: "CEO, Tech Innovations",
      rating: 5,
    },
    {
      id: 2,
      description:
        "Incredible service and support. The team goes above and beyond to ensure customer satisfaction.",
      name: "Michael Chen",
      position: "CTO, Global Solutions",
      rating: 4.5,
    },
    {
      id: 3,
      description:
        "A game-changing solution that has helped our company increase productivity and efficiency.",
      name: "Emily Rodriguez",
      position: "Operations Manager, BizTech",
      rating: 4,
    },
  ];

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3003/api/testimonials/fetch"
      );
      const testimonials = response.data.slice(0, 6);
      setTestimonials(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Render star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <Box display="flex" justifyContent="center" my={1}>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} sx={{ color: "#F97316" }} />
        ))}
        {hasHalfStar && <StarHalf sx={{ color: "#F97316" }} />}
        {[...Array(emptyStars)].map((_, i) => (
          <StarBorder key={`empty-${i}`} sx={{ color: "#F97316" }} />
        ))}
      </Box>
    );
  };

  return (
    <Container maxWidth="xl">
      <h3 style={{ textAlign: "center", marginBottom: "9px", padding: "6px" }}>
        Testimonials
      </h3>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={false}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        style={{
          paddingBottom: "50px",
          "--swiper-pagination-color": theme.palette.primary.main,
          "--swiper-navigation-color": theme.palette.primary.main,
        }}
      >
        {Testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial._id}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                textAlign: "center",
                maxWidth: "100%",
                margin: "auto",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                paragraph
                sx={{ fontStyle: "italic", mb: 2 }}
              >
                "{testimonial.description}"
              </Typography>

              {renderStars(testimonial.rating)}

              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold", mt: 2 }}
              >
                {testimonial.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {testimonial.position}
              </Typography>
            </Paper>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Testimonial;
