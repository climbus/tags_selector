import { setupWorker } from "msw/browser";
import handlers from "../__tests__/handlers";

export const worker = setupWorker(...handlers);
