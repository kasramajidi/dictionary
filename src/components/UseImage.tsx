import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface UnsplashImage {
  urls: {
    full: string;
  };
}

export default function UseImage(word: string) {
  return useQuery<UnsplashImage>({
    queryKey: ["image", word],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.unsplash.com/photos/random?query=${word}&client_id=asGgUQqvzoR0gGwDvuaMjHgHOjdE21D8LdiB2tksTAY`
      );
      return data;
    },
    enabled: word.length > 0,
  });
}
