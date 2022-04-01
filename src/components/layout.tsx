import { FC } from 'react';
import BaseProps from '../types/base-props';
import { Navbar } from './navbar';
import { Footer } from './footer';

export const Layout: FC<BaseProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}

