// src/globals.d.ts
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        url?: string;
        style?: React.CSSProperties;
        className?: string;
        width?: string;
        height?: string;
      };
    }
  }
}
declare module "../../animations";
declare module "../../utils";
declare module "../../hooks/useActiveSection";
