import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box } from "@mui/material";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface Item {
  name: string;
}

export interface FilterDialogProps {
  type: string;
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
  type,
  title,
  items,
  selectedItems,
  onChange,
}: FilterDialogProps) => {
  const [open, setOpen] = useState(false);
  const handleChange = (type: string, name: string, isChecked: boolean) => {
    if (type === "radio") {
      if (isChecked) {
        onChange([name]);
      }
    } else {
      if (isChecked) {
        onChange([...selectedItems, name]);
      } else {
        onChange(selectedItems.filter((selectedItem) => selectedItem !== name));
      }
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: title === "" ? "inline" : "block" }}>
      <StyledButton
        onClick={handleClickOpen}
        sx={{ padding: title === "" ? "0.8rem 0 0.3rem 0" : "0.5rem 0" }}
      >
        {title !== "" ? (
          <KeyboardArrowRightIcon />
        ) : (
          <StyledAddCircleOutlineIcon />
        )}
      </StyledButton>
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
          {items.map((item) => (
            <Box key={item.name}>
              <StyledChecked
                type={type}
                id={item.name}
                name={title}
                checked={
                  !!selectedItems.find(
                    (selectedItem) => selectedItem === item.name
                  )
                }
                onChange={(event) =>
                  handleChange(type, item.name, event.target.checked)
                }
              />
              <StyledLabel htmlFor={item.name}>{item.name}</StyledLabel>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Done
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
};

const StyledButton = styled(Button)``;

const StyledChecked = styled("input")`
  display: none;
  &:checked + label {
    color: white;
    background-color: #ec407a;
    border-color: #ec407a;
  }
`;

const StyledLabel = styled("label")`
  display: inline-block;
  width: 100%;
  border: 1px solid grey;
  border-radius: 1rem;
  padding: 0.6rem;
  margin: 0 0 0.75rem 0;
  text-align: center;
  cursor: pointer;
`;

const StyledAddCircleOutlineIcon = styled(AddCircleOutlineIcon)`
  font-size: 2rem;
`;
