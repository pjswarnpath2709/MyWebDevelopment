import axios from "axios";
import _ from "lodash";

import { generate } from "random-words";

const generateOptions = (
  meaning: { Text: string }[],
  index: number
): string[] => {
  const correctAns = meaning[index].Text;
  const incorrectOptions = _.sampleSize(
    meaning.filter((_, ind) => ind != index),
    3
  ).map((i) => i.Text);
  const mcqOptions = _.shuffle([...incorrectOptions, correctAns]);
  return mcqOptions;
};

export const translateWords = async (
  params: LangCodeType
): Promise<WordType[]> => {
  try {
    const words = generate(8).map((word) => {
      return { Text: word };
    });

    const res = await axios.post(
      "https://microsoft-translator-text.p.rapidapi.com/translate",
      words,
      {
        params: {
          "to[0]": params,
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API,
          "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
      }
    );
    const receive: FetchedDataType[] = res.data;
    const arr: WordType[] = receive.map((i, ind) => {
      const options: string[] = generateOptions(words, ind);
      return {
        word: i.translations[0].text,
        meaning: words[ind].Text,
        options: options,
      };
    });
    return arr;
  } catch (err) {
    console.log(err);
    throw new Error("features.ts , translateWords , someError");
  }
};

export const countMatchingElements = (
  arr1: string[],
  arr2: string[]
): number => {
  if (arr1.length !== arr2.length) {
    throw new Error("Arrays are not equal");
  }
  let matchingCount = 0;
  for (let i: number = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) matchingCount++;
  }
  return matchingCount;
};

export const fetchAudio = async (
  text: string,
  lang: LangCodeType
): Promise<string> => {
  const speechCodes = {
    hi: "hi-in",
    ja: "ja-jp",
    es: "es",
    fr: "fr-fr",
  };
  const encodedParams = new URLSearchParams({
    src: text,
    hl: speechCodes[lang],
    r: "0",
    c: "mp3",
    f: "8khz_8bit_mono",
    b64: "true",
  });
  try {
    const { data }: { data: string } = await axios.post(
      "https://voicerss-text-to-speech.p.rapidapi.com/",
      encodedParams,
      {
        params: { key: import.meta.env.VITE_TEXT_TO_SPEECH_API },
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API,
          "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
        },
      }
    );
    // console.log(response.data);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Something Went Wrong");
  }
};
