import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Definition {
  definition: string;
  example?: string;
  synonyms?: string[];
  antonyms?: string[];
}

interface Meaning {
  partOfSpeech: string;
  definition: Definition[];
}

interface WordData {
  word: string;
  meanings: Meaning[];
}

export default function Data(word: string) {
  return useQuery<WordData>({
    queryKey: ["wordData", word],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      return data[0];
    },
    enabled: word.length > 0,
  });
}
