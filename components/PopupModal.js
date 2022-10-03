import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Celebration, CelebrationTwoTone, Refresh, Share } from '@mui/icons-material';
import { RWebShare } from 'react-web-share';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({

  '& .MuiBackdrop-root':{
    backgroundColor: "rgba(0,0,0,0.75)",
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),

  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, fontSize: "18px", fontWeight: 600 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
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
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function PopupModal({emojiGrid, open, setOpen, finishStatus, restartGame}) {
  // const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = useState({});
  const [totalGamesWon, setTotalGamesWon] = useState();
  const [sharingText, setSharingText] = useState();
  useEffect(() => {
    if(finishStatus === "completed" || finishStatus === "failed"){
      setOpen(true)
    }
  }, [finishStatus]);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(finishStatus === "completed"){
      setSharingText(`Wordle ${emojiGrid.length}/6 \n\n${emojiGrid.join("\n")} \n\n${window.location.href}`);
    }
    else if(finishStatus === "failed"){
      setSharingText(`Wordle -/6 \n\n${emojiGrid.join("\n")} \n\n${window.location.href}`);
    }
    else {
      setSharingText(`Play Wordle \n${window.location.href}`);
    }

    let localUserData = JSON.parse( localStorage.getItem("userData") );
    setUserData(localUserData);

  }, [open]);

  useEffect(() => {
    let totalGamesWon = userData?.guessDistribution?.reduce((partialSum, a) => partialSum + a, 0);
    setTotalGamesWon(totalGamesWon);

  }, [userData]);


  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={"sm"}
        disableRestoreFocus //to prevent submitting word not to open modal (focus on prev button)
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          &nbsp;
          {finishStatus === "completed" && <span>Congratulations</span>} 
          {finishStatus === "failed" && <span>Better luck next time</span>} 
          {finishStatus === "" && <span>Wordle</span>} 

        </BootstrapDialogTitle>
        <DialogContent dividers >
          <div className='popup-modal'>

            {/* <div style={ {textAlign: "center"} }>
              <CelebrationTwoTone sx={{fontSize: "64px", margin: "12px"}} color="secondary"/>
            </div> */}

            <h4 className='sub-heading'>Statistics</h4>
            <div className='stats'>
              <div>
                <p className="head">{userData?.totalGames}</p>
                <p className="label">Played</p>
              </div>
              <div>
                <p className="head">{(totalGamesWon*100/userData?.totalGames).toFixed(1)}</p>
                <p className="label">Win %</p>
              </div>
              <div>
                <p className="head">{userData.currentStreak}</p>
                <p className="label">Current streak</p>
              </div>
              <div>
                <p className="head">{userData.maxStreak}</p>
                <p className="label">Max streak</p>
              </div>
            </div>

            <div className="guess-distribution">
              <h4 className='sub-heading'>Guess distribution</h4>
              {
                userData?.guessDistribution?.map((item, ind) => {
                  return (
                    <div className="row" key={ind}>
                      <div className="num">{ind+1}</div>
                      <div className="progress">
                        <div className="progress-bar" style={{width: (totalGamesWon ? item*100/totalGamesWon : 0)+"%", background: ind === emojiGrid.length-1 && finishStatus === "completed" ? "#538d4e" : "rgba(122, 122, 122, 0.7)"}}>
                          {item}
                        </div>
                      </div>
                    </div>
                  )
              })
              }
            </div>
            
          </div>
          
        </DialogContent>
        <DialogActions>
          <RWebShare
            data={{
              url: "sharingText",
              title: "Share",
            }}
            onClick={() => console.log(sharingText)}
          >
            <Button 
              startIcon={<Share/>}
              variant="contained" size="large" disableElevation  
            >
              Share 
            </Button>
          </RWebShare>


          <Button
            startIcon={<Refresh/>} 
            variant="contained" size="large" color="secondary" disableElevation onClick={restartGame}>
            New game
          </Button>


          

        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
