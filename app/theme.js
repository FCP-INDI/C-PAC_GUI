import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';

export default createMuiTheme({
  typography: {
    useNextVariants: true,
    fontSize: 15,
  },
  palette: {
    primary: { main: teal[200] },
    secondary: { main: teal[600] }
  },
  props: {
    MuiGrid: {
      spacing: 2
    },
    MuiPaper: {
      square: true
    },
  },
  overrides: {
    MuiOutlinedInput: {
      adornedEnd: {
        // paddingRight: 0,
        width: 'calc(100% - 14px)',
      },
    },
    MuiButton: {
      root: {
        whiteSpace: 'nowrap',
      },
    },
    MuiAlert: {
      root: {
        lineHeight: 2.85,
        padding: '6px 16px',
        minHeight: 'calc(2.85em + 12px)',
        '@media (max-width:700px)': {
          flexWrap: 'wrap',
        },
      },
      icon: {
        justifyContent: 'center',
        alignItems: 'center',
        '@media (max-width:700px)': {
          flexBasis: '10%',
        },
      },
      message: {
        lineHeight: 'normal',
        justifyContent: 'left',
        alignSelf: 'center',
        '@media (max-width:700px)': {
          flexBasis: '80%',
          textAlign: 'center',
        },
      },
      action: {
        lineHeight: 'normal',
        display: 'block',
        alignSelf: 'center',
        '@media (max-width:700px)': {
          paddingLeft: 0,
          margin: '5px auto',
        },
      },
    },
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: 'inherit',
        }
      },
    },
    MuiStepper: {
      root: {
        '&$vertical': {
          '@media (max-width:600px)': {
            padding: 0.
          },
        },
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32
      }
    },
    MuiBadge: {
      root: {
        "& .MuiSvgIcon-root": {
          fontSize: '1.4em',
        }
      },
    },
    MuiFormGroup: {
      root: {
        border: "1px solid rgba(0, 0, 0, 0.23)",
        borderRadius: 4,
        padding: 14,
        marginTop: 16,
        marginBottom: 8,
        '&$row': {
          border: 0,
          borderRadius: 0,
          margin: 0,
          padding: 0,
        }
      }
    }
  }
});
