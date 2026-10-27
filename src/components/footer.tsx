import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { ReactNode } from "react";
import { FaFacebookF, FaHeart, FaInstagram } from "react-icons/fa";
import { FiMail, FiMapPin } from "react-icons/fi";
import Logo from "../../public/logo.png";
import { siteMetadata } from "../data/site-metadata";
import { NAV_ITEMS } from "../utils/constants";

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
    <Link
      href={href}
      isExternal
      w={10}
      h={10}
      rounded="full"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      bg="white"
      color="gray.600"
      border="1px solid"
      borderColor="gray.200"
      transition="all 0.2s ease"
      _hover={{ bg: "brand.500", borderColor: "brand.500", color: "white" }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Link>
  );
};

const FooterHeading = ({ children }: { children: ReactNode }) => (
  <Heading as="h3" fontSize="sm" textTransform="uppercase" letterSpacing="0.08em" color="gray.900" mb={4}>
    {children}
  </Heading>
);

const FooterLink = ({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) => (
  <Link
    as={external ? undefined : NextLink}
    href={href}
    isExternal={external}
    color="gray.600"
    transition="color 0.2s ease"
    _hover={{ color: "brand.500", textDecoration: "none" }}
  >
    {children}
  </Link>
);

export const Footer = () => {
  return (
    <Box as="footer" bg="gray.50" borderTop="1px solid" borderColor="gray.100" mt={{ base: 16, md: 24 }}>
      <Container maxW="7xl" px={{ base: 4, md: 6 }} py={{ base: 12, md: 16 }}>
        <SimpleGrid templateColumns={{ base: "1fr", md: "1fr 1.4fr", lg: "1.2fr 1.6fr 1fr" }} spacing={{ base: 10, md: 12 }}>
          <Stack spacing={5}>
            <Image src={Logo} alt="Physioteam Lappersdorf" width={180} height={45} />
            <Text color="gray.600" maxW="xs">
              Ihre Gesundheit – Unsere Motivation.
            </Text>
            <Stack direction="row" spacing={3}>
              <SocialButton label="Facebook" href="https://www.facebook.com/profile.php?id=100064030505869">
                <FaFacebookF />
              </SocialButton>
              <SocialButton label="Instagram" href="https://www.instagram.com/physioteam.lappersdorf/">
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Stack>

          <Box>
            <FooterHeading>Navigation</FooterHeading>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacingX={8} spacingY={2.5} whiteSpace="nowrap">
              {NAV_ITEMS.map((item) => (
                <FooterLink key={item.label} href={item.href ?? "#"} external={item.external}>
                  {item.label}
                </FooterLink>
              ))}
            </SimpleGrid>
          </Box>

          <Box>
            <FooterHeading>Kontakt</FooterHeading>
            <Stack spacing={3}>
              <Flex align="center" gap={3}>
                <Icon as={FiMail} color="brand.500" />
                <FooterLink href={`mailto:${siteMetadata.email}`} external>
                  {siteMetadata.email}
                </FooterLink>
              </Flex>
              <Flex align="center" gap={3}>
                <Icon as={FiMapPin} color="brand.500" />
                <FooterLink href="/kontakt">Kontakt & Anfahrt</FooterLink>
              </Flex>
            </Stack>
          </Box>
        </SimpleGrid>
      </Container>

      <Box borderTop="1px solid" borderColor="gray.200">
        <Container
          as={Stack}
          maxW="7xl"
          px={{ base: 4, md: 6 }}
          py={5}
          direction={{ base: "column", md: "row" }}
          spacing={3}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          fontSize="sm"
          color="gray.500"
        >
          <Text>© {new Date().getFullYear()} {siteMetadata.title}</Text>
          <Stack direction={{ base: "column", sm: "row" }} spacing={{ base: 2, sm: 6 }} align={{ base: "flex-start", sm: "center" }}>
            <FooterLink href="/impressum">Datenschutz & Impressum</FooterLink>
            <Flex align="center" gap={1.5}>
              Made with <Icon as={FaHeart} color="brand.500" boxSize={3} /> by
              <Link href="https://twitter.com/boingCntributor" isExternal _hover={{ color: "brand.500" }}>
                Sebastian
              </Link>
            </Flex>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};
