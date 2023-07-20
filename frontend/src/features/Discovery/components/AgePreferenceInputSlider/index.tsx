import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const Input = styled(MuiInput)`
  width: 42px;
`;

export const AgePreferenceInputSlider = () => {
  const [value, setValue] = useState<number[]>([20, 30]);
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newArray = [...value];
    if (event.target.id === "min") {
      newArray[0] = Number(event.target.value);
    } else {
      newArray[1] = Number(event.target.value);
    }
    setValue(newArray);
  };

  // const handleBlur = () => {
  //   if (typeof value === "number") {
  //     if (typeof value === "number" && value < 0) {
  //       setValue(0);
  //     } else if (value > 100) {
  //       setValue(100);
  //     }
  //   } else {
  //     setValue(0);
  //   }
  // };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        Age Preference
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Input
            id="min"
            value={value[0]}
            size="small"
            onChange={handleInputChange}
            // onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
        <Grid item xs>
          <Slider
            value={value}
            // value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            id="max"
            value={value[1]}
            size="small"
            onChange={handleInputChange}
            // onBlur={handleBlur}
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
