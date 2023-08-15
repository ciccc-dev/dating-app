import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

import { genders } from "../../../../constants/gender";
import { NotificationBar } from "../../../../components/NotificationBar";
import { useDialogState } from "../../../../hooks/useDialogState";

type Phase = "username" | "birthday";

interface Props {
  value: string;
  onChange: (key: string, value: string) => void;
  onChangePhase: (phase: Phase) => void;
}

export const Gender = ({ value, onChange, onChangePhase }: Props) => {
  const [isOpen, { open, close }] = useDialogState();

  const handleChange = (event: React.MouseEvent<HTMLElement>) =>
    onChange("gender", event.currentTarget.dataset.gender as string);

  const navigateNext = () => {
    if (value.length === 0) return open();
    onChangePhase("birthday");
  };
  const navigatePrevious = () => onChangePhase("username");

  return (
    <Box sx={{ justifyContent: "center", width: "100%" }}>
      <Wrapper>
        <Typography variant='h2' gutterBottom align='center'>
          I am a
        </Typography>
      </Wrapper>
      <Wrapper>
        <Grid container spacing={2}>
          {Object.values(genders).map((gender) => {
            return (
              <Grid key={gender} item xs={4}>
                <Button
                  fullWidth
                  key={gender}
                  data-gender={gender}
                  variant={gender === value ? "contained" : "outlined"}
                  onClick={handleChange}
                >
                  {gender}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Wrapper>
      <Wrapper
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant='outlined'
          sx={{ margin: 1 }}
          onClick={navigatePrevious}
        >
          Back
        </Button>
        <Button variant='contained' sx={{ margin: 1 }} onClick={navigateNext}>
          Next
        </Button>
      </Wrapper>
      <NotificationBar
        isOpen={isOpen}
        onClose={close}
        isSuccess={false}
        message='Please choose a gender'
      />
    </Box>
  );
};

const Wrapper = styled(`div`)`
  margin: 100px;
  display: flex;
  justify-content: center;
`;
