import {
  LinksFunction,
  MetaFunction,
  ErrorBoundaryComponent,
} from "react-router";

export declare namespace Route {
  export type LinksFunction = LinksFunction;
  export type MetaFunction = MetaFunction;
  export type ErrorBoundaryProps = {
    error: any;
  };
}
