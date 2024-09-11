import { Button, Dialog, DialogTitle } from "@mui/material";
import { Fragment } from "react";

const TodoDetails = ({
  todoDetails,
  openDialog,
  setTodoDetails,
  setOpenDialogue,
}) => {
  return (
    <Fragment>
      <Dialog open={openDialog}>
        <DialogTitle>{todoDetails?.todo}</DialogTitle>
        <Button
          onClick={() => {
            setTodoDetails("");
            setOpenDialogue(false);
          }}
        >
          Close
        </Button>
      </Dialog>
    </Fragment>
  );
};

export default TodoDetails;
