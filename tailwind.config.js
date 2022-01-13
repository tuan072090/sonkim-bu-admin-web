module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                mainTextColor: "#252525",
                primary: {
                    50: "#f1fdef",
                    100: "#C9F7ED",
                    200: "#96EFE3",
                    300: "#5CD0CA",
                    400: "#319EA2",
                    500: "#075A64",
                    600: "#054656",
                    700: "#033548",
                    800: "#02263A",
                    900: "#011B30",
                },
                secondary: {
                    100: "#FEF7D4",
                    200: "#FDEEAA",
                    300: "#FAE07F",
                    400: "#F5D25E",
                    500: "#EFBC2B",
                    600: "#CD9B1F",
                    700: "#AC7C15",
                    800: "#8A600D",
                    900: "#724B08",
                },
            },
            // fontSize: {
            //     base: ['0.95rem', {lineHeight: '1.3rem'}]
            // }
            fontFamily: {
                sans: ["Muli", "sans-serif"],
                serif: ["Merriweather", "serif"],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
