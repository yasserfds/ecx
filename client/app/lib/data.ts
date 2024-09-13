interface INavItemsDataProps {
  name: string;
  url: string;
}

// Correct type declaration for an array of NavItemsDataProps
export const navItemsData: INavItemsDataProps[] = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];
