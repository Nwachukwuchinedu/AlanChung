/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string;
  link?: string;
}

export interface Achievement {
  title: string;
  description: string;
  icon?: string;
}

export const portfolioData = {
  name: "Alan Chung",
  title: "Entrepreneur, Venture Partner, Angel Investor",
  tagline: "Building startups, backing founders, and shaping the future of technology.",
  about: {
    title: "The Entrepreneurial Journey",
    content: "I love building startups from the ground up. My passion lies in the intersection of technology, product strategy, and human-centric design. Over the last three decades, I've had the privilege of founding several companies, leading them through significant acquisitions, and now, backing the next generation of visionary founders as a venture partner and angel investor.",
    story: [
      "My journey began in the early days of the web, where I worked on pioneering some of the first web-based applications at Sun Microsystems and Carnegie Mellon. This foundation of deep technical expertise eventually evolved into a focus on building products that millions of people use and love.",
      "As a founder, I've seen the full lifecycle of a startup—from the first line of code to acquisition by tech giants like Facebook. These experiences have taught me that great companies aren't just built on code; they are built on great teams, resilience, and a relentless focus on the user experience.",
      "Today, I spend my time mentoring founders at ER Accelerator and investing in companies that are solving real problems with innovative technology. When I'm not in a boardroom or a terminal, you'll likely find me with a camera in hand, exploring the world through a viewfinder."
    ]
  },
  experience: [
    {
      role: "Trustee",
      company: "Woods Hole Oceanographic Institution",
      duration: "Present",
      location: "Woods Hole, MA",
      description: "Supporting the world's leading independent non-profit organization dedicated to ocean research, exploration, and education."
    },
    {
      role: "Venture Partner",
      company: "ER Accelerator",
      duration: "Present",
      location: "New York, NY",
      description: "Mentoring and advising early-stage startups in the ERA portfolio, helping founders scale their businesses and refine their product-market fit."
    },
    {
      role: "Board Member",
      company: "WildAid",
      duration: "Present",
      location: "San Francisco, CA",
      description: "Working to end the illegal wildlife trade by reducing consumer demand through high-impact media campaigns."
    },
    {
      role: "Board Member",
      company: "ecoAmerica",
      duration: "Present",
      location: "Washington D.C.",
      description: "Empowering Americans to lead on climate change through research and strategic partnerships."
    },
    {
      role: "Founder & CEO",
      company: "Perka",
      duration: "2011 – 2014",
      location: "New York, NY",
      description: "Built the premier mobile loyalty platform for small businesses. Perka was named one of the Top 10 Most Innovative Companies in Mobile by Fast Company."
    },
    {
      role: "Founder & CEO",
      company: "Zenbe",
      duration: "2007 – 2010",
      location: "New York, NY",
      description: "Created an award-winning webmail and collaboration suite. Zenbe was acquired by Facebook in 2010 to help build their messaging platform."
    },
    {
      role: "Sr. Director",
      company: "AOL",
      duration: "2004 – 2006",
      location: "Dulles, VA",
      description: "Led large-scale web innovation initiatives at AOL, overseeing products used by millions of users worldwide."
    },
    {
      role: "Founder & CEO",
      company: "iAmaze",
      duration: "1999 – 2002",
      location: "San Francisco, CA",
      description: "Pioneered web-based applications long before modern web standards. Developed one of the first web-based presentation tools, which was acquired by AOL."
    },
    {
      role: "Sr. Staff Engineer",
      company: "Sun Microsystems",
      duration: "1995 – 1999",
      location: "Mountain View, CA",
      description: "Contributed to core Java and web technology development during the height of the dot-com era."
    },
    {
      role: "Co-Founder",
      company: "Lighthouse Design",
      duration: "Early 90s",
      location: "San Mateo, CA",
      description: "Founded one of the most respected ISVs for the NeXT platform, creating high-end productivity software."
    },
    {
      role: "Research Staff",
      company: "Carnegie Mellon University",
      duration: "Early 90s",
      location: "Pittsburgh, PA",
      description: "Conducted research at the intersection of human-computer interaction and software engineering."
    }
  ],
  achievements: [
    {
      title: "Fast Company Top 10",
      description: "Recognized as one of the Most Innovative Companies in Mobile for Perka."
    },
    {
      title: "Facebook Acquisition",
      description: "Led Zenbe through a successful acquisition, contributing to the future of social messaging."
    },
    {
      title: "Early Web Pioneer",
      description: "Developed web applications at scale before the advent of AJAX or modern frameworks."
    },
    {
      title: "20+ Years Investing",
      description: "Successfully identifying and backing founders across multiple technology cycles."
    }
  ],
  expertise: [
    "Startup Building",
    "Product Strategy",
    "Team Leadership",
    "Venture Investing",
    "Technology Trends",
    "Software Architecture"
  ],
  interests: [
    {
      title: "Photography",
      description: "Capturing the world through a lens, focusing on minimalist landscapes and urban life.",
      imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Travel",
      description: "Exploring diverse cultures and architectural wonders around the globe.",
      imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200"
    }
  ],
  contact: {
    email: "alan@perkainc.com",
    location: "New York / San Francisco",
    socials: [
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/alanchung1" }
    ]
  }
};
