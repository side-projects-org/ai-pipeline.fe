import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// interface ScrollToTopProps {
//     children?: React.ReactNode;
// }

// const ScrollToTop = ({ children }: ScrollToTopProps) => {
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // return (<>{children}</>);
    return null;
};

export default ScrollToTop;