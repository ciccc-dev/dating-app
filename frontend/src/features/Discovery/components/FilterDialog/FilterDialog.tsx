import Button from "@mui/material/Button";
import { styled as muiStyled } from "@mui/material/styles";
import styled from "@emotion/styled";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Item } from "../../../DatingApp/components/Navigation";
import { Box } from "@mui/material";
import { useState } from "react";

const BootstrapDialog = muiStyled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface FilterDialogProps {
  title: string;
  items: Item[];
  selectedItems: string[];
  onChange: (values: string[]) => void;
}

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, width: "500px" }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export const FilterDialog = ({
  title,
  items,
  selectedItems,
  onChange,
}: FilterDialogProps) => {
  const [open, setOpen] = useState(false);
  const handleRadioChange = (name: string, isChecked: boolean) => {
    if (isChecked) {
      onChange([name]);
    }
  };

  const handleCheckBoxChange = (name: string, isChecked: boolean) => {
    if (isChecked) {
      onChange([...selectedItems, name]);
    } else {
      onChange(selectedItems.filter((selectedItem) => selectedItem !== name));
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  console.log(selectedItems);

  return (
    <div>
      <Button onClick={handleClickOpen}>
        {title}
        <KeyboardArrowRightIcon />
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {title === "Looking For"
            ? items.map((item, index) => (
                <Box key={index}>
                  <StyledCheckBox
                    type="radio"
                    id={index.toString()}
                    name="lookingFor"
                    checked={
                      !!selectedItems.find(
                        (selectedItem) => selectedItem === item.name
                      )
                    }
                    onChange={(event) =>
                      handleRadioChange(item.name, event.target.checked)
                    }
                  />
                  <StyledLabel htmlFor={index.toString()}>
                    {item.name}
                  </StyledLabel>
                </Box>
              ))
            : items.map((item, index) => (
                <Box key={index}>
                  <StyledCheckBox
                    type="checkbox"
                    id={index.toString()}
                    checked={
                      !!selectedItems.find(
                        (selectedItem) => selectedItem === item.name
                      )
                    }
                    onChange={(event) =>
                      handleCheckBoxChange(item.name, event.target.checked)
                    }
                  />
                  <StyledLabel htmlFor={index.toString()}>
                    {item.name}
                  </StyledLabel>
                </Box>
              ))}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Done
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

const StyledCheckBox = styled.input`
  // display: none;
`;

// const StyledFormControlLabel = styled(FormControlLabel)`
//   display: flex;
//   justify-content: space-between;
//   border: 1px solid grey;
//   border-radius: 0.25rem;
//   padding: 0.6rem;
//   margin-bottom: 0.75rem;
//   cursor: pointer;
//   ${StyledCheckBox}:checked + & {
//     background: #e0e0e0;
//   }
// `;

const StyledLabel = styled.label`
  display: inline-block;
  width: 100%;
  border: 1px solid grey;
  border-radius: 1rem;
  padding: 0.6rem;
  margin: 0 0 0.75rem 0;
  text-align: center;
  cursor: pointer;
`;
