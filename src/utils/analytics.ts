import ReactGA from "react-ga4";

type EventParams = Record<string, string | number>;

export const trackEvent = (eventName: string, params?: EventParams) => {
  ReactGA.event(eventName, params);
};
