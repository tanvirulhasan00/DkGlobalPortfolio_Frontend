import { isRouteErrorResponse, Outlet } from "react-router";
import ErrorPage from "~/components/app-components/ErrorPage";
import Footer from "~/components/app-components/Footer";
import Header from "~/components/app-components/Header";
import Topbar from "~/components/app-components/Topbar";
import type { Route } from "./+types/dashboard";

export default function Dashboard() {
  return (
    <div>
      <Topbar />
      <Header />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

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
