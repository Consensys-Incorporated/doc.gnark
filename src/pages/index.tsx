import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import HomepageCards from "@site/src/components/HomepageCards";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  return (
    <header className={styles.hero}>
      <div className={clsx("container", styles.heroInner)}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>zk-SNARKs · Go · Open source</span>
          <Heading as="h1">
            Build proofs.
            <br />
            Write Go.
          </Heading>
          <p>
            gnark is a fast, expressive library for designing and verifying
            zero-knowledge circuits in Go.
          </p>
          <div className={styles.actions}>
            <Link
              className="button button--primary button--lg"
              to="/howto/get_started">
              Get started
            </Link>
            <Link className={styles.textLink} to="https://play.gnark.io">
              Try the playground <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className={styles.mark} aria-hidden="true">
          <img src="/img/gnark-logo-assets/svgs/white-symbol.svg" alt="" />
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Fast, expressive zk-SNARKs in Go"
      description="Design, compile, prove, and verify zero-knowledge circuits with gnark, a fast zk-SNARK library written in Go.">
      <HomepageHeader />
      <main>
        <HomepageCards />
      </main>
    </Layout>
  );
}
