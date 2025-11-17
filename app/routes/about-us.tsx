import ErrorPage from "~/components/app-components/ErrorPage";
import { isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/about-us";
import AboutUs from "~/components/app-components/about-us-com";

const Company = () => {
  return (
    <div>
      <AboutUs />
    </div>
  );
};

export default Company;

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let status: number | undefined;
  let title = "Oops!";
  let message = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    status = error.status;
    title = error.status === 404 ? "404" : `Error ${error.status}`;
    message =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || message;
  } else if (import.meta.env.DEV && error instanceof Error) {
    message = error.message;
    stack = error.stack;
  }

  return (
    <ErrorPage status={status} title={title} message={message} stack={stack} />
  );
}
