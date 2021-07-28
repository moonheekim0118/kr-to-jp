import React from "react";
import { Header, Footer, Converter } from "@components/index";

function App() {
  return (
    <div className="layout">
      <Header />
      <main>
        <Converter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
