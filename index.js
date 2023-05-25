import * as Sentry from "@sentry/node";
import express from "express";

const app = express();

Sentry.init({
  dsn: "https://public@dsn.ingest.sentry.io/1337",
  release: "1.0",
  // eslint-disable-next-line deprecation/deprecation
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
  debug: true,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.get("/route", (req, res) => {
  res.send("Hello World!");
});

app.use(Sentry.Handlers.errorHandler());

app.listen(3000, () => {
  console.log("listening on port 3000...");
});
