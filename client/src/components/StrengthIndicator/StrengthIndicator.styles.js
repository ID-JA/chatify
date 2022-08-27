import { createStyles } from '@mantine/core';

export default createStyles((theme, { passwordLength, passwordLong, passwordStrong }) => ({
  'strength-indicator': {
    position: 'relative',
    height: '3px',
    background: '#ddd',
    margin: '15px  0',
    borderRadius: '2px',
    visibility: passwordLength > 0 ? 'visible' : 'hidden',
    '&::before, &::after  ': {
      content: '""',
      height: 'inherit',
      background: 'transparent',
      display: 'block',
      borderColor: '#fff',
      borderStyle: 'solid',
      borderWidth: '0 6px 0',
      position: 'absolute',
      width: 'calc(20% + 6px)',
      zIndex: '10',
    },
    '&::before': {
      left: 'calc(20% - 3px)',
    },
    '&::after': {
      right: 'calc(20% - 3px)',
    },
  },
  'strength-indicator-fill': {
    height: 'inherit',
    position: 'absolute',
    width: 0,
    borderRadius: 'inherit',
    transition: ' width 0.5s ease-in-out, background 0.25s',
    "&[data-strength='0']": {
      width: '20%',
      background: 'darkred',
    },
    "&[data-strength='1']": {
      width: '40%',
      background: 'orangered',
    },
    "&[data-strength='2']": {
      width: '60%',
      background: 'orange',
    },
    "&[data-strength='3']": {
      width: '80%',
      background: 'yellowgreen',
    },
    "&[data-strength='4']": {
      width: '100%',
      background: 'green',
    },
  },
  badge: {
    display: passwordLength !== 0 ? 'inline-block' : 'none',
    padding: '.25em .4em',
    fontSize: '75%',
    fontWeight: '700',
    lineHeight: '1',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    paddingRight: '.6em',
    paddingLeft: '.6em',
    borderRadius: '10rem',
    color: '#ffffffff',

    backgroundColor: passwordLong
      ? passwordStrong
        ? theme.colors.green[6]
        : theme.colors.yellow[6]
      : theme.colors.red[8],
  },
}));
