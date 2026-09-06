import { Link } from "react-router-dom";
import { DocsPage } from "@/components/docs/docs-layout";
import { CodePanel } from "@/components/docs/code-panel";
import { Callout, H2, P, PageHeader } from "@/components/docs/prose";
import { SolutionSheet } from "@/components/solution-sheet";
import { solutionsPayload } from "@/data/payloads";
import { solutions } from "@/data/solutions";

/**
 * The work as an offer.
 *
 * `/projects` is the record — here is what I built, for whom, and how. This
 * page is the other half a business owner needs: here is what I can build for
 * you, priced as a domain rather than as a technology, with the already-running
 * system attached to every claim.
 *
 * Nothing on this page is a capability I have not shipped. That is the whole
 * discipline of it — four banners because four domains have real software
 * behind them, not because four is a nice number for a grid.
 */

export default function Solutions() {
  return (
    <DocsPage
      title="Solutions"
      aside={
        <CodePanel method="GET" path="/solutions" response={solutionsPayload} />
      }
    >
      <PageHeader
        method="GET"
        path="/solutions"
        title="What I can build for you"
        lead={`${solutions.length} systems that already exist, running today, ready to be set up for another business. Not proposals — every line below is something the software already does.`}
      />

      <Callout tone="ok" title="How an engagement runs">
        A call, then a fixed scope: setup and branding, the changes your
        business needs, your data imported, and a handover you can run without
        me. I built every system here alone, so you talk to the person writing
        the code.
      </Callout>

      {solutions.map((solution) => (
        <SolutionSheet key={solution.slug} solution={solution} />
      ))}

      <H2>Something close but not quite</H2>
      <P>
        A rental desk rather than co-living, inbound support rather than
        outbound sales, a distributor rather than a trader — the shape carries
        over and the difference is fields and rules, not a rewrite. See the{" "}
        <Link to="/projects">full project list</Link>, the{" "}
        <Link to="/errors">limits of what I do</Link>, or{" "}
        <Link to="/contact">tell me what you are running today</Link>.
      </P>
    </DocsPage>
  );
}
