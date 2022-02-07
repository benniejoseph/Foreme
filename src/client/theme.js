import * as colors from 'twind/colors';

export default {
    fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Rufina', 'serif']
    },
    extend: {
        colors: {
            gray: colors.blueGray,
            brand: colors.blue,
            input_background: colors.coolGray,
            background: colors.lightBlue,
            accentOne: colors.pink,
            destructive: colors.red,
            warning: colors.amber,
            success: colors.green
        },
        borderRadius: {
            sm: '2px',
            md: '4px',
            lg: '8px'
        },
        spacing: {
            xs: '2px',
            sm: '8px',
            md: '16px',
            lg: '24px',
            xl: '48px'
        }
    },
    container: {
        center: true
    }
};
