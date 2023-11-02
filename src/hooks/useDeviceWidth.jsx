import { useEffect, useState } from "react";

export const useDeviceWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [screenWidth, setScreenWidth] = useState(window.screen.width);
    const [screenResized, setScreenResized] = useState(false);
    const deviceWidthEnum = {
        "desktop": 1200,
        "laptop": 992,
        "tablet": 768,
        "phone": 600
    }

    useEffect(() => {
        setScreenWidth(window.innerWidth);
        setScreenWidth(window.screen.width);
    }, [windowWidth]);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
            setScreenWidth(window.screen.width);
            setScreenResized(true);
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            // setScreenResized(false);
        };
    }, [screenResized]);

    return { windowWidth, screenWidth, deviceWidthEnum };
}