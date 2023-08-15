import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

import { sexualOrientations } from "../../../../constants/sexualOrientations";
import { NotificationBar } from "../../../../components/NotificationBar";
import { useDialogState } from "../../../../hooks/useDialogState";

type Phase = "interest" | "purpose";

interface Props {
  value: string;
  onChange: (category: string, value: string) => void;
  onChangePhase: (phase: Phase) => void;
}

export const SexualOrientatins = ({
  value,
  onChange,
  onChangePhase,
}: Props) => {
  const [isOpen, { open, close }] = useDialogState();

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    onChange("sexualOrientation", event.currentTarget.dataset.sexual as string);
  const navigatePrev = () => onChangePhase("purpose");
  const navigateNext = () => {
    if (value.length === 0) return open();
    onChangePhase("interest");
  };

  return (
    <StyledWrapper>
      <Wrapper>
        <Typography variant='h2' gutterBottom align='center'>
          My sexual orientation is...
        </Typography>
      </Wrapper>
      <Wrapper>
        <Grid container spacing={2}>
          {sexualOrientations.map((orientation) => {
            return (
              <Grid key={orientation.name} item xs={4}>
                <Button
                  fullWidth
                  key={orientation.name}
                  variant={
                    orientation.name === value ? "contained" : "outlined"
                  }
                  data-sexual={orientation.name}
                  onClick={handleClick}
                >
                  {orientation.name}
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
        message='Please choose a sexual orientation'
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
