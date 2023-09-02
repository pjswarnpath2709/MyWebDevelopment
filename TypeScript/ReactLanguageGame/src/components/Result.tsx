import {
  Button,
  Container,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../redux/store";
import { clearState } from "../redux/slices";
import { useNavigate } from "react-router-dom";
import { countMatchingElements } from "../utils/features";

const Result = () => {
  const { words, result } = useSelector((state: StoreType) => state.root);
  const correctAns = countMatchingElements(
    words.map((i) => i.meaning),
    result
  );
  const percentage: number = (correctAns / words?.length) * 100;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetHandler = (): void => {
    dispatch(clearState());
    navigate("/");
  };
  return (
    <Container maxWidth={"sm"}>
      <Typography variant="h3" color={"primary"} m={"2rem 0"}>
        Result
      </Typography>
      <Typography m={"1rem"} variant="h6">
        You got {correctAns} right out of {words?.length}
      </Typography>
      <Stack direction={"row"} justifyContent={"space-evenly"}>
        <Stack>
          <Typography m={"1rem 0"} variant="h5">
            Your Ans
          </Typography>
          <List>
            {result?.map((i, ind) => {
              return (
                <ListItem key={ind}>
                  <Typography
                    color={words[ind].meaning === result[ind] ? "blue" : "red"}
                  >
                    {" "}
                    {ind + 1} - {i}
                  </Typography>
                </ListItem>
              );
            })}
          </List>
        </Stack>
        <Stack>
          <Typography m={"1rem 0"} variant="h5">
            Correct Ans
          </Typography>
          <List>
            {words?.map((i, ind) => (
              <ListItem key={ind}>
                <Typography
                  color={words[ind].meaning === result[ind] ? "blue" : "red"}
                >
                  {ind + 1} - {i.meaning}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Stack>
      </Stack>
      <Typography
        m={"1rem"}
        variant="h5"
        color={percentage > 50 ? "blue" : "red"}
      >
        {percentage > 50 ? "Pass" : "Fail"}
      </Typography>
      <Button
        onClick={resetHandler}
        sx={{ margin: "1rem" }}
        variant="contained"
      >
        Reset
      </Button>
    </Container>
  );
};

export default Result;
