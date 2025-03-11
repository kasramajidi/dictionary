import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface UnsplashImage {
  urls: {
    full: string;
  };
}

export default function ImageApi(word: string) {
  return useQuery<UnsplashImage>({
    queryKey: ["image", word],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.unsplash.com/photos/random?query=${word}&client_id=ZkXL7H08Pr2POftgKWM_Xi0IzRmsYZtu62R5lEAexfc`
      );
      return data;
    },
    enabled: word.length > 0,
  });
}
