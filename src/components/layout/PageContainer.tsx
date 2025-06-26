import React from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "full";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "white" | "gray" | "slate" | "transparent";
  as?: React.ElementType;
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

const paddingClasses = {
  none: "",
  sm: "px-4 py-4 sm:px-6 sm:py-6",
  md: "px-4 py-6 sm:px-6 sm:py-8 lg:px-8",
  lg: "px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12",
  xl: "px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20",
};

const backgroundClasses = {
  white: "bg-white",
  gray: "bg-gray-50",
  slate: "bg-slate-50",
  transparent: "bg-transparent",
};

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
  maxWidth = "7xl",
  padding = "md",
  background = "transparent",
  as: Component = "div",
}) => {
  return React.createElement(
    Component,
    {
      className: cn(
        "mx-auto w-full",
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        backgroundClasses[background],
        className
      ),
    },
    children
  );
};

// Pre-configured variants for common use cases
export const PageHeader: React.FC<
  Omit<PageContainerProps, "padding" | "background">
> = (props) => <PageContainer {...props} padding="md" background="white" />;

export const PageContent: React.FC<Omit<PageContainerProps, "padding">> = (
  props
) => <PageContainer {...props} padding="lg" />;

export const PageSection: React.FC<PageContainerProps> = (props) => (
  <PageContainer {...props} as="section" />
);

// Utility component for centering content with minimal padding
export const CenteredContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}> = ({ children, className, size = "md" }) => {
  const sizeMap = {
    sm: "md",
    md: "lg",
    lg: "xl",
    xl: "2xl",
    "2xl": "3xl",
  } as const;

  return (
    <PageContainer
      maxWidth={sizeMap[size]}
      padding="md"
      className={cn("text-center", className)}
    >
      {children}
    </PageContainer>
  );
};

// Utility component for full-width sections with background
export const FullWidthSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  background?: PageContainerProps["background"];
  innerMaxWidth?: PageContainerProps["maxWidth"];
}> = ({ children, className, background = "gray", innerMaxWidth = "7xl" }) => {
  return (
    <section className={cn("w-full", backgroundClasses[background], className)}>
      <PageContainer maxWidth={innerMaxWidth} padding="lg">
        {children}
      </PageContainer>
    </section>
  );
};
