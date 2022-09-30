import { useEffect } from 'react';
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
import { CelebrationTwoTone, Refresh, Share } from '@mui/icons-material';
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
    <DialogTitle sx={{ m: 0, p: 2, fontSize: "18px", textTransform: "uppercase", fontWeight: 600 }} {...other}>
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

export default function PopupModal({emojiGrid, open, setOpen, finishStatus}) {
  // const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if(finishStatus === "completed" || finishStatus === "failed"){
      setOpen(true)
    }
  }, [finishStatus]);

  const handleClose = () => {
    setOpen(false);
  };

  const guessDistribution = [0, 0, 2, 6, 1, 0];
  const totalgames = guessDistribution.reduce((partialSum, a) => partialSum + a, 0);
  let currentGuessNo;
  let sharingText;

  if(typeof window !== "undefined"){
    if(finishStatus === "completed"){
      sharingText = `Wordle ${emojiGrid.length}/6 \n\n${emojiGrid.join("\n")} \n\n${window.location.href}`;
      currentGuessNo = 3;
    }
    else if(finishStatus === "failed"){
      sharingText = `Wordle -/6 \n\n${emojiGrid.join("\n")} \n\n${window.location.href}`;
    }
    {
      sharingText = `Play Wordle \n${window.location.href}`
    }
  }

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={"sm"}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {finishStatus === "completed" && <span>Congratulations</span>} 
          {finishStatus === "failed" && <span>Better luck next time</span>} 
          {finishStatus === "" && <span>Wordle</span>} 
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className='popup-modal'>

            {/* <div style={ {textAlign: "center"} }>
              <CelebrationTwoTone sx={{fontSize: "64px", margin: "12px"}} color="secondary"/>
            </div> */}

            <h4 className='sub-heading'>Statistics</h4>
            <div className='stats'>
              <div>
                <p className="head">1</p>
                <p className="label">Played</p>
              </div>
              <div>
                <p className="head">100</p>
                <p className="label">Win %</p>
              </div>
              <div>
                <p className="head">1</p>
                <p className="label">Current streak</p>
              </div>
              <div>
                <p className="head">1</p>
                <p className="label">Max streak</p>
              </div>
            </div>

            <div className="guess-distribution">
              <h4 className='sub-heading'>Guess distribution</h4>
              {
                guessDistribution.map((item, ind) => (
                  <div className="row" key={ind}>
                    <div className="num">{ind+1}</div>
                    <div className="progress">
                      <div className="progress-bar" style={{width: (item*100/totalgames)+"%", background: ind === currentGuessNo ? "#538d4e" : "#666"}}>
                        {item}
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            
          </div>
          
        </DialogContent>
        <DialogActions>
          <RWebShare
            data={{
              url: sharingText,
              title: "Share",
            }}
            onClick={() => console.log(sharingText)}
          >
            <Button 
              startIcon={<Share/>}
              variant="contained" size="large" disableElevation 
              onClick={() => {
                console.table(emojiGrid);
              }}  
            >
              Share 
            </Button>
          </RWebShare>


          <Button
            startIcon={<Refresh/>} 
            variant="contained" size="large" color="secondary" disableElevation onClick={handleClose}>
            New game
          </Button>


          

        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
