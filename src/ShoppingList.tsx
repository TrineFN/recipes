import { Dialog, List, ListItem, DialogContent, DialogTitle, ListItemIcon, Checkbox, ListItemText, useMediaQuery, useTheme, IconButton } from "@material-ui/core";
import { Dispatch, SetStateAction } from "react";
import { selectShoppingItems, useStore } from "./model";
import CloseIcon from '@material-ui/icons/Close';
import { DialogActions } from "@material-ui/core";
import FileCopyIcon from '@material-ui/icons/FileCopy';
interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ShoppingList({ open, setOpen }: Props) {
  const shoppingList = useStore(selectShoppingItems);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const copyToClipBoard = () => {
    const text = Object.entries(shoppingList).map(([_, i]) => `- ${i.name}: ${i.amount} ${i.unit}\n`);
    navigator.clipboard.writeText(text.toString().replaceAll(",", ""))
  }

  return (
    <Dialog open={open} fullScreen={fullScreen} onClose={() => setOpen(false)}>
      <DialogTitle>
        Shopping List
        <IconButton onClick={() => setOpen(false)} style={{ position: "absolute", right: theme.spacing(1), top: theme.spacing(1) }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <List>
          {Object.entries(shoppingList).map(([_, i]) => (
            <ListItem key={i.name}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                />
              </ListItemIcon>
              <ListItemText primary={`${i.name}: ${i.amount} ${i.unit}`} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <IconButton color="primary" onClick={copyToClipBoard}>
          <FileCopyIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  )
}