import React from "react";
import { Container, Box, Typography, Link, List, ListItem, Stack, ListItemIcon } from "@mui/material";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import { v4 as uuidv4 } from "uuid";
interface Link {
  name: string;
  icon?: JSX.Element;
  url: string;
}

interface FooterDataItem {
  title: string;
  links: Link[];
}

interface FooterData extends Array<FooterDataItem> {}

export default function Footer() {
  const footerData: FooterData = [
    {
      title: "Buy",
      links: [
        {
          name: "Nature Ayur",
          url: "https://www.facebook.com/hashan.madaranga.7/",
        },
        {
          name: "Nature Ayur",
          url: "https://www.facebook.com/hashan.madaranga.7/",
        },
        {
          name: "Nature Ayur",
          url: "https://www.facebook.com/hashan.madaranga.7/",
        },
      ],
    },
    {
      title: "Sell",
      links: [
        {
          name: "Nature Ayur",
          url: "https://www.facebook.com/hashan.madaranga.7/",
        },
      ],
    },
    {
      title: "Stay connected",
      links: [
        {
          name: "Nature Ayur",
          icon: <FacebookIcon />,
          url: "https://www.facebook.com/hashan.madaranga.7/",
        },
      ],
    },
    {
      title: "Help",
      links: [
        {
          name: "Nature Ayur",
          url: "https://www.facebook.com/hashan.madaranga.7/",
        },
      ],
    },
    {
      title: "About Us",
      links: [
        {
          name: "Nature Ayur",
          url: "https://www.facebook.com/hashan.madaranga.7/",
        },
      ],
    },
  ];

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Divider sx={{ p: 0, m: 0 }} />
        <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="start" spacing={2}>
          {footerData.map((item) => (
            <Box key={uuidv4()}>
              <Typography align="center">{item.title}</Typography>
              <Divider />
              <List>
                {item.links.map((link, i) => (
                  <ListItem disablePadding sx={{ pt: 1, pb: 1, pr: 0, pl: 0 }} key={uuidv4()}>
                    {link!.icon && <ListItemIcon sx={{ minWidth: "0px", pr: 1 }}>{link!.icon}</ListItemIcon>}
                    <FooterLink name={link.name} url={link.url} />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </Stack>
        <Box>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}

interface FooterLinkProps {
  name: string;
  url: string;
}

function FooterLink(props: FooterLinkProps) {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      <Link color="inherit" underline="hover" href={props.url}>
        {props.name}
      </Link>
    </Typography>
  );
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://www.facebook.com/hashan.madaranga.7/">
        Nature Ayur
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
