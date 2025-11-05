import LayoutContent from "@/components/layout-content";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const user = {
    name: "Zakaria",
    email: "z.mouchtati@gmail.com",
  };

  return (
    <div>
        HELLOWORLD
      <LayoutContent user={user}>{children}</LayoutContent>
    </div>
  );
};

export default layout;
