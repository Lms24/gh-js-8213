import * as Sentry from "@sentry/node";
import express from "express";

const app = express();

Sentry.init({
  dsn: "https://8bffc3913fa54bf0ba5a7645222be038@o447951.ingest.sentry.io/4503970489761792",
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

const handler = (req, res, next) => {
  next();
};

app.use("/route", handler);

app.get("/route", (req, res) => {
  res.send("Hello World!");
});

app.use(Sentry.Handlers.errorHandler());

app.listen(3000, () => {
  console.log("listening on port 3000...");
});
