import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import Typography from "@mui/material/Typography";

interface DistanceInputSliderProps {
  distance: number;
  onChange: (value: number) => void;
}

export const DistanceInputSlider = ({
  distance,
  onChange,
}: DistanceInputSliderProps) => {
  const handleSliderChange = (event: Event, newValue: any) => {
    onChange(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  const handleBlur = () => {
    if (typeof distance === "number") {
      if (typeof distance === "number" && distance < 0) {
        onChange(0);
      } else if (distance > 100) {
        onChange(100);
      }
    } else {
      onChange(0);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        Distance
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item></Grid>
        <Grid item xs>
          <Slider
            value={typeof distance === "number" ? distance : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={distance}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const Input = styled(MuiInput)`
  width: 42px;
`;
