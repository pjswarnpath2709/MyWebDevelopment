import { Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { languages } from "../constants/languages";

const Home = () => {
  const navigate = useNavigate();
  const languageSelectHandler = (langCode: string): void => {
    navigate(`/learn?lang=${langCode}`);
  };
  return (
    <Container maxWidth={"sm"}>
      <Typography variant="h3" p={"2rem"} textAlign={"center"}>
        Welcome , Begin Your Learning Journey
      </Typography>
      <Stack
        direction={"row"}
        spacing={"2rem"}
        p={"2rem"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {languages.map((language) => {
          return (
            <Button
              variant={"contained"}
              onClick={() => {
                languageSelectHandler(language.code);
              }}
              key={language.code}
            >
              {language.name}
            </Button>
          );
        })}
      </Stack>
      <Typography textAlign={"center"}>
        Choose One Language From Above
      </Typography>
    </Container>
  );
};

export default Home;
