import { SwiperSlide } from "swiper/react";
import { originalImageUrl } from "../api/tmdbService";

export default function TrendingMovie({style}) {
  return <SwiperSlide>
    <div style={style}>
      asd
    </div>  
  </SwiperSlide>
}

export const toComponents = (movies) => movies.map(e => {
  return <TrendingMovie movie={e} />
});