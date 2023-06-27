import {colors, createTheme} from '@mui/material'

const green = '#00d488'
const navDisabled = {
    root: {
        '&.Mui-disabled': {
            opacity: 0.65,
        },
    },
}
const headingDefaults = {
    fontWeight: 500,
    letterSpacing: '0em',
    lineHeight: 1.4,
    marginBottom: '1.5rem',
}

export default createTheme({
    components: {
        MuiAccordion: {
            defaultProps: {
                disableGutters: true,
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                ...navDisabled,
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    //backgroundColor: '#fff',
                    color: 'rgb(120, 120, 120)',
                },
            },
        },
        MuiBreadcrumbs: {
            styleOverrides: {
                root: {
                    marginBottom: 5,
                },
            },
        },
        MuiGrid: {
            defaultProps: {
                spacing: 2,
            },
        },
        MuiGrid2: {
            defaultProps: {
                spacing: 2,
            },
        },
        MuiImageListItemBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fff',
                    marginRight: 32,
                },
                subtitle: {
                    whiteSpace: 'normal',
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                button: {
                    color: green,
                },
                root: {
                    color: green,
                },
                underlineAlways: {
                    color: green,
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                ...navDisabled,
            },
        },
        MuiStack: {
            defaultProps: {
                spacing: 2,
            },
        },
        MuiTypography: {
            styleOverrides: {
                caption: {
                    color: '#777777',
                },
                h1: {
                    ...headingDefaults,
                    fontSize: 'min(2.2rem, 2.2vmax)',
                    lineHeight: 1.2,
                },
                h2: {
                    ...headingDefaults,
                    fontSize: 'min(2rem, 2vmax)',
                },
                h3: {
                    ...headingDefaults,
                    fontSize: 'min(1.8rem, 1.8vmax)',
                },
                h4: {
                    ...headingDefaults,
                    fontSize: 'min(1.6rem, 1.6vmax)',
                },
                h5: {
                    ...headingDefaults,
                    fontSize: 'min(1.4rem, 1.4vmax)',
                },
                h6: {
                    ...headingDefaults,
                    fontSize: 'min(1.2rem, 1.2vmax)',
                },
                paragraph: {
                    lineHeight: '25px',
                    marginBottom: '1.5rem',
                },
            },
        },
    },
    palette: {
        background: {
            default: '#fff',
        },
        error: {
            main: colors.red.A400,
        },
        mode: 'light',
        primary: {
            main: green,
        },
        secondary: {
            main: '#777777',
        },
    },
})
