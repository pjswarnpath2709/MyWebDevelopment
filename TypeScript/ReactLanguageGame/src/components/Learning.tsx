import { ArrowBack, VolumeUp } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchAudio, translateWords } from "../utils/features";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  getWordsFailure,
  getWordsRequest,
  getWordsSuccess,
} from "../redux/slices";
import { StoreType } from "../redux/store";
import Loader from "./Loader";

const Learning = () => {
  const [count, setCount] = useState<number>(0);
  const params = useSearchParams()[0].get("lang") as LangCodeType;
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [audioSrc, setAudioSrc] = useState<string>("");
  const dispatch = useDispatch();
  const nextHandler = (): void => {
    setCount((prev) => prev + 1);
    setAudioSrc("");
  };

  const { loading, error, words } = useSelector(
    (state: StoreType) => state.root
  );
  const audioHandler = async (): Promise<void> => {
    const Player: HTMLAudioElement = audioRef.current!;
    if (Player && audioSrc !== "") {
      Player.play();
    } else {
      const data = await fetchAudio(words[count]?.word, params);
      setAudioSrc(data);
    }
  };
  useEffect(() => {
    dispatch(getWordsRequest());
    translateWords(params)
      .then((arr: WordType[]) => dispatch(getWordsSuccess(arr)))
      .catch((error) => dispatch(getWordsFailure(error.message)));
    if (error) {
      alert(error);
      dispatch(clearState());
    }
  }, [dispatch, error, params]);

  if (loading) return <Loader />;

  if (words.length === 0) {
    return <div>Words Not There yet , Start from home page please</div>;
  }

  return (
    <Container maxWidth={"sm"} sx={{ padding: "1rem" }}>
      {audioSrc !== "" && <audio src={audioSrc} autoPlay ref={audioRef} />}
      <Button
        onClick={
          count === 0 ? () => navigate("/") : () => setCount((prev) => prev - 1)
        }
      >
        <ArrowBack />
      </Button>
      <Typography m={"2rem 0"}>Learning Made Easy</Typography>
      <Stack direction={"row"} spacing={"1rem"}>
        <Typography variant="h4">
          {count + 1}.) {words[count]?.word}
        </Typography>
        <Typography color={"blue"} variant="h4">
          : {words[count]?.meaning}
        </Typography>
        <Button onClick={audioHandler} sx={{ borderRadius: "50%" }}>
          <VolumeUp />
        </Button>
      </Stack>
      <Button
        onClick={
          count === words.length - 1 ? () => navigate("/quiz") : nextHandler
        }
        sx={{ margin: "3rem 0" }}
        variant="contained"
        fullWidth
      >
        {count === words.length - 1 ? "Test" : "Next"}
      </Button>
    </Container>
  );
};

export default Learning;
