/// <reference types="vite/client" />

type LangCodeType = "ja" | "hi" | "es" | "fr";

type LanguageType = {
  name: string;
  code: LangCodeType;
};

type WordType = {
  word: string;
  meaning: string;
  options: string[];
};

interface StateType {
  loading: boolean;
  result: string[];
  words: WordType[];
  error?: string;
}

type FetchedDataType = {
  translations: { text: string }[];
};
