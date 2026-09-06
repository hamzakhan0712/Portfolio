import { Link } from "react-router-dom";
import { DocsPage } from "@/components/docs/docs-layout";
import { CodePanel } from "@/components/docs/code-panel";
import { Callout, H2, P, PageHeader, Prop, PropList } from "@/components/docs/prose";
import { API_BASE } from "@/data/docs-nav";
import { contactPayload } from "@/data/payloads";

const authPayload = {
  required: false,
  scheme: null,
  transport: "none — payloads are embedded in the page bundle",
  human_contact: {
    email: contactPayload.email,
    linkedin: contactPayload.linkedin,
    based_in: contactPayload.based_in,
  },
  response_time: contactPayload.response_time,
  open_to: contactPayload.open_to,
};

export default function Authentication() {
  return (
    <DocsPage
      title="How this works"
      aside={
        <CodePanel method="GET" path="/authentication" response={authPayload} />
      }
    >
      <PageHeader
        method="GET"
        path="/authentication"
        title="How this works"
        lead="Why this site looks like software documentation, and what the code panels on every page actually are."
      />

      <Callout tone="warn" title="The code panels are illustrations">
        Each page shows an example of how a program would ask for that page&apos;s
        information, written against <code>{API_BASE}</code>. That address does
        not exist and nothing is actually sent anywhere — the data is built into
        the page you are reading. The information in those panels is real; the
        idea that you could fetch it over a network is the decorative part, and
        saying so seemed better than letting you find out by trying.
      </Callout>

      <H2>Why it is laid out this way</H2>
      <P>
        A backend developer builds the part of an app you never see — the bit
        that stores your data and answers requests from the app on your screen.
        The document that comes with such a system is called a reference: what
        it can do, what it gives back, and what it does not handle. Laying out my
        own portfolio in that form is a small demonstration of the job itself.
      </P>
      <P>
        In practice that means the site is a document rather than a slideshow:
        no scrolling animations, everything one click away in the sidebar, and a
        search box (<span className="kbd">⌘K</span>) that answers questions
        about anything published here. If you are not technical, read the
        left-hand column and ignore the right — nothing is only in the code.
      </P>

      <H2>Reaching me</H2>
      <P>
        The one endpoint with a real effect is{" "}
        <Link to="/contact">
          <code>POST /contact</code>
        </Link>
        , which opens your mail client. Everything else is read-only.
      </P>

      <PropList>
        <Prop name="email" type="string">
          <a href={`mailto:${contactPayload.email}`}>{contactPayload.email}</a> —
          the fastest route, and the one I check.
        </Prop>
        <Prop name="response_time" type="string">
          {contactPayload.response_time}.
        </Prop>
        <Prop name="based_in" type="string">
          {contactPayload.based_in}.
        </Prop>
        <Prop name="open_to" type="string[]">
          {contactPayload.open_to.join(", ")}. Remote included.
        </Prop>
      </PropList>

      <H2>Rate limits</H2>
      <P>
        None on reading. On writing, one human answering mail between building
        things — so a considered message gets a considered reply, and a bulk
        template gets neither.
      </P>
    </DocsPage>
  );
}
