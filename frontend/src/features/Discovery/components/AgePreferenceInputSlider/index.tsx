import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import { ListItemGrid } from "../LIstItemGrid";
import Switch from "@mui/material/Switch";

interface AgePreferenceInputSliderProps {
  ageRange: number[];
  onChange: (value: number[]) => void;
  checked: boolean;
  onCheckedChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AgePreferenceInputSlider = ({
  ageRange,
  onChange,
  checked,
  onCheckedChange,
}: AgePreferenceInputSliderProps) => {
  const handleSliderChange = (event: Event, newValue: any) => {
    onChange(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newArray = [...ageRange];
    if (event.target.id === "min") {
      newArray[0] = Number(event.target.value);
    } else {
      newArray[1] = Number(event.target.value);
    }
    onChange(newArray);
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
            onChange={onCheckedChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
      />
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Input
            id="min"
            value={ageRange[0]}
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
            value={ageRange}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            id="max"
            value={ageRange[1]}
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
