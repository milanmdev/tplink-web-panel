import Document, { Html, Head, Main, NextScript } from "next/document";

import { FooterModule } from "../components/footer";

class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik:wght@600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-brand">
          <Main />
          <NextScript />
        </body>
        {/* Footer */}
        <FooterModule />
      </Html>
    );
  }
}

export default CustomDocument;
