import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import { Switch } from "@mui/material";
import { ListItemGrid } from "../LIstItemGrid";

interface DistanceInputSliderProps {
  data: number;
  onChange: <T>(title: string, value: T) => void;
  checked: boolean;
  distance: string;
  isDistanceFiltered: string;
}

export const DistanceInputSlider = ({
  data,
  onChange,
  checked,
  distance,
  isDistanceFiltered,
}: DistanceInputSliderProps) => {
  const handleSliderChange = (event: Event, newValue: any) => {
    onChange(distance, newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(distance, Number(event.target.value));
  };

  const handleCheckedChange = () => {
    onChange(isDistanceFiltered, !checked);
  };

  const handleBlur = () => {
    if (typeof data === "number") {
      if (typeof data === "number" && data < 0) {
        onChange(distance, 0);
      } else if (data > 100) {
        onChange(distance, 100);
      }
    } else {
      onChange(distance, 0);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <ListItemGrid
        titleComponent={<Typography id="input-slider">Distance</Typography>}
        switchComponent={
          <Switch
            checked={checked}
            onChange={handleCheckedChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
      />
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={9}>
          <StyledSlider
            value={typeof data === "number" ? data : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            value={data}
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

const StyledSlider = styled(Slider)``;
