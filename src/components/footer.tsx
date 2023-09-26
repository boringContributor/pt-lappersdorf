import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  keyframes,
} from "@chakra-ui/react";
import Image from "next/image";
import { ReactNode } from "react";
import { FaInstagram, FaFacebook, FaHeart } from "react-icons/fa";
import Logo from "../../public/logo.png";
import { motion } from "framer-motion";

const animationKeyframes = keyframes`
from { transform: scale(0.8); }
to { transform: scale(1.2); }
`;

const animation = `${animationKeyframes} 1s infinite ease-in-out alternate`;

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      target={"_blank"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Image src={Logo} alt="logo" width={200} height={50} />
        <Stack direction={"row"} spacing={6}>
          <Link href={"/impressum"}>Datenschutz & Impressum</Link>
          <Link href={"/kontakt"}>Kontakt</Link>
          <Link target='_blank' href={"https://aio-gesundheitsmanagement.de"}>All In One Gesundheitsmanagement</Link>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Box display={"flex"}>
            <Text display={"flex"}>© {new Date().getFullYear()} Made with </Text>
            <Box
              as={motion.div}
              animation={animation}
              padding="1"
              width="6"
              height="6"
            >
              <FaHeart color="red" />
            </Box>
            by&nbsp;
            <Link href={"https://twitter.com/boingCntributor"} target="_blank">
              Sebastian
            </Link>
          </Box>

          <Stack direction={"row"} spacing={6}>
            <SocialButton
              label={"Twitter"}
              href={"https://www.facebook.com/profile.php?id=100064030505869"}
            >
              <FaFacebook />
            </SocialButton>
            <SocialButton
              label={"Instagram"}
              href={"https://www.instagram.com/physioteam.lappersdorf/"}
            >
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};
