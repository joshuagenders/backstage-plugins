import { Button, createStyles, Drawer, IconButton, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import Close from '@material-ui/icons/Close'
import { EditPageComponent } from '../EditPageComponent/EditPageComponent'
import { ViewPageComponent } from '../ViewPageComponent'



const useDrawerStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '50%',
      justifyContent: 'space-between',
      padding: theme.spacing(2.5),
    },
  }),
);

const useDrawerContentStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    icon: {
      fontSize: 20,
    },
    content: {
      height: '80%',
      backgroundColor: '#EEEEEE',
    },
    secondaryAction: {
      marginLeft: theme.spacing(2.5),
    },
  }),
);


/* Example content wrapped inside the Drawer component */
const DrawerContent = ({
    toggleDrawer,
  }: {
    toggleDrawer: (isOpen: boolean) => void;
  }) => {
    const classes = useDrawerContentStyles();
  
    return (
      <>
        <div className={classes.header}>
          <Typography variant="h5">Side Panel Title</Typography>
          <IconButton
            key="dismiss"
            title="Close the drawer"
            onClick={() => toggleDrawer(false)}
            color="inherit"
          >
            <Close className={classes.icon} />
          </IconButton>
        </div>
        <div className={classes.content}>
            <EditPageComponent />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => toggleDrawer(false)}
          >
            Primary Action
          </Button>
          <Button
            className={classes.secondaryAction}
            variant="outlined"
            color="primary"
            onClick={() => toggleDrawer(false)}
          >
            Secondary Action
          </Button>
        </div>
      </>
    )
  }  

// todo use https://backstage.io/storybook/?path=/story/layout-drawer--default-drawer for edit
export const ViewControl = () => {
    const [isOpen, toggleDrawer] = useState(false);
    const classes = useDrawerStyles();
  
    return (
      <>
        <ViewPageComponent />
        <Button
          variant="contained"
          color="primary"
          onClick={() => toggleDrawer(true)}
        >
          Edit
        </Button>
        <Drawer
          classes={{
            paper: classes.paper,
          }}
          anchor="right"
          open={isOpen}
          onClose={() => toggleDrawer(false)}
        >
          <DrawerContent toggleDrawer={toggleDrawer} />
        </Drawer>
      </>
    )
}
