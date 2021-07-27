import React from "react";
import { Header, Footer, TextArea } from "@components/index";

function App() {
  return (
    <div className="layout">
      <Header />
      <main>
        <TextArea />
      </main>
      <Footer />
    </div>
  );
}

export default App;
