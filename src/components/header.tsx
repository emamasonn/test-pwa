import { useEffect, useState } from "react";
import { Flex, Button, IconButton, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import homeIcon from "../icons/home.png";

const Header = () => {
  const [isReadyForInstall, setIsReadyForInstall] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      // Stash the event so it can be triggered later.
      // @ts-ignore
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
    });
  }, []);

  const downloadApp = async () => {
    console.log("👍", "butInstall-clicked");
    // @ts-ignore
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    // @ts-ignore
    window.deferredPrompt = null;
    // Hide the install button.
    setIsReadyForInstall(false);
  };

  return (
    <Flex
      position="fixed"
      zIndex="1"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      height="50px"
      p="20px"
    >
      {isReadyForInstall && (
        <Button
          bg="green.100"
          size="sm"
          color="green.500"
          _hover={{
            bg: "green.200",
          }}
          onClick={downloadApp}
        >
          Descargar PWA
        </Button>
      )}
      <Link to="/">
        <IconButton
          aria-label="Home"
          icon={<Image src={homeIcon} />}
          bg="#fff"
        />
      </Link>
      <Button
        bg="green.100"
        size="sm"
        color="green.500"
        _hover={{
          bg: "green.200",
        }}
      >
        <Link to="/create">Create</Link>
      </Button>
    </Flex>
  );
};

export default Header;
