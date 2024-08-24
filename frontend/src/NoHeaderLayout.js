import React from "react";
import ClientHeader from "./guest/components/ClientHeader";
import FooterClient from "./guest/components/FooterClient";

const NoHeaderLayout = ({ children }) => (
  <div className="no-header-content">
    <ClientHeader />
    <div className="">
      {children}
    </div>
    <FooterClient />
  </div>
);

export default NoHeaderLayout;
