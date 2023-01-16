import { createGlobalStyle } from "styled-components";
import tw, { theme, GlobalStyles as BaseStyles } from "twin.macro";

import "@presentation/styles/global.css";

const CustomStyles = createGlobalStyle({
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...tw`antialiased`,
  },
});

export function GlobalStyles() {
  return (
    <>
      <BaseStyles />
      <CustomStyles />
    </>
  );
}
