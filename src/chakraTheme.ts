import { extendTheme } from "@chakra-ui/react"
import colors from 'tailwindcss/colors'
export const CustomTheme = extendTheme({
    colors: {
        primary: {
            100: colors.emerald[300],
            200: colors.emerald[400],
            800: colors.emerald[600],
        }, complimentry: {
            100: colors.violet[500],
            800: colors.violet[600],
        }
    },
    config: {
        initialColorMode: 'system',
        useSystemColorMode: true,
    },
})

