import "../styles/globals.css";

import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { ThemeProvider } from "next-themes";

import AppLayout from "layout/AppLayout";

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);
    return getLayout(
        <AppLayout>
            <ThemeProvider defaultTheme="dark">
                <Component {...pageProps} />
            </ThemeProvider>
        </AppLayout>
    );
}

export default MyApp;
