import type { icons } from "../utils/icons";

type Topic = {
  title: string;
  description: string;
  href: string;
  icon: keyof typeof icons;
};

export const introductionTopics: Topic[] = [
  {
    icon: "rocket",
    title: "Getting Started",
    description:
      "Install Hintorium and create your first tooltip in under 5 minutes.",
    href: "/docs/getting-started",
  },
  {
    icon: "codeSlash",
    title: "API reference",
    description: "Complete API documentation",
    href: "/docs/api",
  },
];

export const topics: Topic[] = [
  {
    icon: "book",
    title: "Introduction",
    description: "Learn the basics about Tooltip Library",
    href: "/docs/introduction",
  },
  {
    icon: "zap",
    title: "Getting Started",
    description: "Install and set up in minutes",
    href: "/docs/getting-started",
  },
  {
    icon: "codeSlash",
    title: "API reference",
    description: "Complete API documentation",
    href: "/docs/api",
  },
  {
    icon: "palette",
    title: "Customization",
    description: "Customize the look and feel",
    href: "/docs/style",
  },
  {
    icon: "accessibility",
    title: "Accessibility",
    description: "WCAG compliant and keyboard friendly",
    href: "/docs/accessibility",
  },
  {
    icon: "feather",
    title: "Animation",
    description: "Feel free to animations",
    href: "/docs/animations",
  },
];
