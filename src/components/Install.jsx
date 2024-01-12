import { useEffect, useRef, useState } from "react";

let installPrompt = null;

function disableInAppInstallPrompt() {
    installPrompt = null;
}

const InstallPWA = () => {
    // const installButton = document.querySelector("#id-install-summary");
    const installContainer = useRef(null);
    const [installable, setInstallable] = useState(false);
    const [showInstallContainer, setShowInstallContainer] = useState(false);

    const unsetInstallable = () => {
        // installPrompt = null;
        // disableInAppInstallPrompt();
        setInstallable(() => false);
    }

    const InstallPWAButton = ({ text }) => {
        const installButton = useRef(null);

        const clickInstallButton = async () => {
            if (!installPrompt) {
                console.log("Install prompt not initialized");
                return;
            }
            const result = await installPrompt.prompt();
            console.log("Install prompt was:", result.outcome);
            if (result.outcome === "accepted") { closeInstallContainer(); };
        }

        return (
            <button
                type="button"
                className={"btn btn-success outline-none border-0 h-12 leading-[48px] px-4 rounded-xl"}
                ref={installButton}
                onClick={clickInstallButton}
            >
                {text}
            </button>
        )
    }

    // installButton.addEventListener("click", async () => {
    //     if (!installPrompt) {
    //         console.log("Install prompt not initialized");
    //         return;
    //     }
    //     const result = await installPrompt.prompt();
    //     console.log("Install prompt was:", result.outcome);
    //     disableInAppInstallPrompt();
    // });

    // let installable = false;

    window.addEventListener("appinstalled", () => {
        console.log("App already installed")
        unsetInstallable();
    });

    const closeInstallContainer = () => {
        installPrompt = null;
        setShowInstallContainer(false);
    }

    const handleBeforePromptInstall = (event) => {
        setInstallable(true);
        // const relatedApps = await navigator.getInstalledRelatedApps();
        // Search for a specific installed platform-specific app
        // console.log(relatedApps);
        // const psApp = relatedApps.find((app) => console.log(app));

        event.preventDefault();
        installPrompt = event;
        console.log("Before install prompt available");
    }

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", handleBeforePromptInstall);

        return () => { window.removeEventListener("beforeinstallprompt", handleBeforePromptInstall) }
    }, []);

    useEffect(() => {
        setShowInstallContainer(installable);
        // console.log(installable);
    }, [installable]);

    return (
        <>
            {
                showInstallContainer
                && <section id="id-install-summary" className={"sticky top-[72px] lg:top-[80px] z-10 flex flex-row items-center p-4 bg-gray-200 backdrop-blur-md shadow dark:bg-[#27CE8E]/10 dark:lg:bg-[#27CE8E]/5"} ref={installContainer}>
                    <button type={"button"} className={"fa fa-times font-14 border-0 bg-transparent square-4 leading-8 text-center relative self-start dark:color-whitesmoke"} onClick={closeInstallContainer}></button>
                    <div className={"install-message w-full px-4 dark:color-whitesmoke"}>
                        Install Summary.
                        <div className={""}>
                            Installation takes less than 10 seconds
                        </div>
                    </div>
                    <InstallPWAButton text={"Install"} />
                </section>
            }
        </>
    );
}

export default InstallPWA;