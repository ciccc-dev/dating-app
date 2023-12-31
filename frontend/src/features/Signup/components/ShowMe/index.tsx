import { MouseEvent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

import { NotificationBar } from "../../../../components/NotificationBar";
import { useDialogState } from "../../../../hooks/useDialogState";

const showMeGenders = ["Men", "Women", "All"];

type Phase = "birthday" | "purpose";

interface Props {
  values: string[];
  onChange: (category: string, values: string[]) => void;
  onChangePhase: (phase: Phase) => void;
}

export const ShowMe = ({ values, onChange, onChangePhase }: Props) => {
  const [isOpen, { open, close }] = useDialogState();

  const remove = (chosenGender: string) => {
    const index = values.indexOf(chosenGender);
    onChange(
      "showMe",
      values.filter((_, idx) => idx !== index)
    );
  };
  const add = (chosenGender: string) =>
    onChange("showMe", [...values, chosenGender]);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    const chosenGender = e.currentTarget.dataset.gender as string;
    values.includes(chosenGender) ? remove(chosenGender) : add(chosenGender);
  };

  const navigatePrev = () => onChangePhase("birthday");
  const navigateNext = () => {
    if (values.length === 0) return open();
    onChangePhase("purpose");
  };

  return (
    <StyledWrapper>
      <Wrapper>
        <Typography variant='h2' align='center'>
          Show me for
        </Typography>
      </Wrapper>
      <Wrapper>
        <Grid container spacing={2}>
          {showMeGenders.map((gender) => (
            <Grid item key={gender} xs={4}>
              <Button
                fullWidth
                key={gender}
                variant={values.includes(gender) ? "contained" : "outlined"}
                data-gender={gender}
                onClick={handleClick}
              >
                {gender}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Wrapper>
      <Wrapper
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant='outlined' sx={{ margin: 1 }} onClick={navigatePrev}>
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
        message='Please choose'
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled(Box)`
  justify-content: center;
  width: 100%;
`;

const Wrapper = styled(`div`)`
  margin: 100px;
  display: flex;
  justify-content: center;
`;
