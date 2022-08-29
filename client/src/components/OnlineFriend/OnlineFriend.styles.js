import { createStyles } from '@mantine/core';

export default createStyles(() => ({
  onlineFriendWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
    marginRight: '20px',
    overflow: 'hidden',
    width: '50px',
    cursor: 'pointer',
  },

  onlineFriendPictureWrapper: {
    width: '40px',
    height: '40px',
    position: 'relative',
    marginBottom: '10px',
  },

  onlineFriendPicture: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  },

  onlineFriendUsername: {
    // textAlign: "left",
    overflow: 'hidden',
    display: 'inline-block',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  onlineDot: {
    position: 'absolute',
    right: 0,
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'greenyellow',
  },
}));
