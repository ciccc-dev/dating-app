import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import { ListItemGrid } from "../LIstItemGrid";
import Switch from "@mui/material/Switch";

interface AgePreferenceInputSliderProps {
  minAgeData: number;
  maxAgeData: number;
  minAge: string;
  maxAge: string;
  onChange: <T>(title: string, value: T) => void;
  checked: boolean;
  isAgeFiltered: string;
}

export const AgePreferenceInputSlider = ({
  minAgeData,
  maxAgeData,
  minAge,
  maxAge,
  onChange,
  checked,
  isAgeFiltered,
}: AgePreferenceInputSliderProps) => {
  const handleSliderChange = (event: Event, newValue: any) => {
    if (minAgeData !== newValue[0]) {
      onChange(minAge, Number(newValue[0]));
    }
    if (maxAgeData !== newValue[1]) {
      onChange(maxAge, Number(newValue[1]));
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.id === "min"
      ? onChange(minAge, Number(event.target.value))
      : onChange(maxAge, Number(event.target.value));
  };

  const handleCheckedChange = () => {
    onChange(isAgeFiltered, !checked);
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
    <Box sx={{ width: "100%" }}>
      <ListItemGrid
        titleComponent={
          <Typography id="input-slider" gutterBottom>
            Age Preference
          </Typography>
        }
        switchComponent={
          <Switch
            checked={checked}
            onChange={handleCheckedChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
      />
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Input
            id="min"
            value={minAgeData}
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
            value={[minAgeData, maxAgeData]}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            id="max"
            value={maxAgeData}
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

const Input = styled(MuiInput)`
  width: 42px;
`;
