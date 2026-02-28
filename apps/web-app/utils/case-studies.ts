import { ASSETS } from "@/constants";

export interface OverviewStat {
  label: string;
  value: string;
  accent?: boolean;
}

export interface SolutionCard {
  iconKey: string;
  title: string;
  description: string;
  fullWidth?: boolean;
}

export interface SolutionGroup {
  iconKey: string;
  title: string;
  items: string[];
}

export type Solution =
  | { type: "cards"; items: SolutionCard[] }
  | { type: "groups"; groups: SolutionGroup[] };

export interface OutcomeItem {
  iconKey: string;
  stat: string;
  description: string;
  fullWidth?: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  tagline: string;
  timeline: string;
  value: string;
  platforms: string;
  additionalStats: OverviewStat[];
  techList: string[];
  mobileImageSrc: string;
  mobileImageAlt: string;
  webImageSrc: string;
  webImageAlt: string;
  webSectionTitle: string;
  webSectionLabel: string;
  webSectionText: string[];
  problem: string[];
  problemHighlight: string;
  solution: Solution;
  outcomes: OutcomeItem[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "aria",
    title: "Aria",
    description: "Direct-to-fan music monetization",
    tagline:
      "Artists earn directly from their fans through subscriptions, tips, and creative funding goals.",
    timeline: "8 Weeks",
    value: "$5,000+",
    platforms: "Web + Mobile",
    additionalStats: [
      { label: "Users", value: "5000+" },
      { label: "Artists Onboarded", value: "800+", accent: false },
    ],
    techList: [
      "Expo / React Native mobile app",
      "Next.js web platform",
      "App Store deployment",
    ],
    mobileImageSrc: ASSETS.images.ariaMobileIos,
    mobileImageAlt: "Aria mobile app screenshot",
    webImageSrc: ASSETS.images.ariaWeb,
    webImageAlt: "Aria web platform screenshot",
    webSectionTitle: "Web Experience",
    webSectionLabel: "Desktop Platform",
    webSectionText: [
      "The web app covers both sides: the artist experience and the listener experience.",
      "Artists get a dashboard for managing content, tracking earnings, and seeing who's supporting them.",
      "Listeners can stream, build playlists, and pay artists directly without leaving the app.",
    ],
    problem: [
      "Emerging artists struggle to earn meaningful income on traditional streaming platforms.",
      "Revenue depends on scale rather than direct fan support.",
    ],
    problemHighlight:
      "Aria's answer was direct fan support. No streaming royalty math, just people paying artists they actually follow.",
    solution: {
      type: "cards",
      items: [
        {
          iconKey: "playerPlay",
          title: "Music Playback",
          description: "Music playback across web and mobile, with consistent quality.",
        },
        {
          iconKey: "folder",
          title: "Library Management",
          description: "Organise and manage your music collection.",
        },
        {
          iconKey: "userPlus",
          title: "Artist Subscriptions",
          description: "Monthly subscriptions to support favourite artists.",
        },
        {
          iconKey: "currencyDollar",
          title: "Direct Tipping",
          description: "Send tips directly to artists you love.",
        },
        {
          iconKey: "target",
          title: "Goal-Based Funding",
          description: "Fund an artist's next project, recording session, or tour.",
        },
        {
          iconKey: "shield",
          title: "Secure Authentication",
          description: "Protected accounts with role-based access.",
        },
        {
          iconKey: "users",
          title: "Artist and Listener Roles",
          description: "Artists and listeners get completely different interfaces, each built for how they actually use the app.",
          fullWidth: true,
        },
      ],
    },
    outcomes: [
      {
        iconKey: "users",
        stat: "5000+",
        description: "Active users on the platform",
      },
      {
        iconKey: "microphone",
        stat: "800+",
        description: "Artists onboarded and earning",
      },
      {
        iconKey: "chartLine",
        stat: "Direct Monetization",
        description: "Artist revenue flowing through the platform from day one",
      },
      {
        iconKey: "deviceMobile",
        stat: "Cross-Platform",
        description: "Consistent experience across web and mobile",
      },
      {
        iconKey: "rocket",
        stat: "Built to grow",
        description:
          "Architecture that supports new features without rework. Artists, payments, and streaming are all independent.",
        fullWidth: true,
      },
    ],
  },
  {
    id: "crown-lusso",
    title: "Crown Lusso",
    description: "Property booking and management system",
    tagline:
      "A booking and management system that cut out the phone calls and gave the team proper visibility over their properties.",
    timeline: "6 Weeks",
    value: "$3,500",
    platforms: "Web + Mobile",
    additionalStats: [],
    techList: [
      "Next.js property management platform",
      "Expo / React Native guest booking app",
      "Supabase backend services",
    ],
    mobileImageSrc: ASSETS.images.crownLussoMobileIos,
    mobileImageAlt: "Crown Lusso mobile app screenshot",
    webImageSrc: ASSETS.images.crownLussoWeb,
    webImageAlt: "Crown Lusso web dashboard screenshot",
    webSectionTitle: "Web Dashboard",
    webSectionLabel: "Management Interface",
    webSectionText: [
      "The dashboard is where the team runs operations day-to-day.",
      "Staff see live bookings, check property availability, and manage everything from one screen.",
      "Permissions are scoped per role, so different staff only see what they need.",
    ],
    problem: [
      "Bookings relied on manual coordination and phone calls.",
      "Management lacked centralised oversight of property operations.",
    ],
    problemHighlight:
      "They needed one system that worked for both guests and staff, not two separate workarounds.",
    solution: {
      type: "groups",
      groups: [
        {
          iconKey: "deviceMobile",
          title: "Guest Mobile App",
          items: [
            "Browse available properties",
            "Book directly through the app",
            "Secure authentication system",
          ],
        },
        {
          iconKey: "desktop",
          title: "Management Dashboard",
          items: [
            "All bookings in one view",
            "Property status tracking",
            "Visibility across all properties",
            "Role-based access control",
          ],
        },
      ],
    },
    outcomes: [
      {
        iconKey: "calendarCheck",
        stat: "Faster Bookings",
        description:
          "Guests book themselves through the app. No back-and-forth required.",
      },
      {
        iconKey: "phoneOff",
        stat: "No More Phone Tags",
        description: "Guests book directly, staff don't take reservation calls",
      },
      {
        iconKey: "eye",
        stat: "Live Visibility",
        description: "The team sees every booking and property status in real time",
      },
      {
        iconKey: "sitemap",
        stat: "One Platform",
        description: "Bookings, availability, and access control in one place.",
      },
    ],
  },
];

export const getCaseStudyById = (id: string): CaseStudy | undefined =>
  CASE_STUDIES.find((s) => s.id === id);
