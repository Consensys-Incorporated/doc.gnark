import React from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type CardItem = {
  title: string;
  link: string;
  eyebrow: string;
  description: string;
};

const CardList: CardItem[] = [
  {
    eyebrow: "01 / Start",
    title: "Build your first circuit",
    link: "/how-to/get_started",
    description:
      "Install gnark, define a circuit, and generate your first proof in Go.",
  },
  {
    eyebrow: "02 / Learn",
    title: "Understand the system",
    link: "/category/concepts",
    description:
      "Explore constraint systems, proving schemes, curves, and zk-SNARK fundamentals.",
  },
  {
    eyebrow: "03 / Reference",
    title: "Find the right API",
    link: "/reference/api",
    description:
      "Jump from the high-level circuit API to packages and Go reference documentation.",
  },
];

function Card({ eyebrow, title, link, description }: CardItem) {
  return (
    <Link className={styles.card} to={link}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <Heading as="h3">{title}</Heading>
      <p>{description}</p>
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </Link>
  );
}

export default function HomepageCards(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.heading}>
          <Heading as="h2">Choose a path</Heading>
          <p>From first proof to production circuit.</p>
        </div>
        <div className={styles.grid}>
          {CardList.map((props, idx) => (
            <Card key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
