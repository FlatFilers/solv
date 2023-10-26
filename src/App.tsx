import { Dispatch, SetStateAction, useState } from "react";
import { ISpace, useSpace } from "@flatfile/react";
import { workbook } from "./workbook";
import { listener } from "./listeners/simple";

const spaceProps: ISpace = {
  name: "Patient Bill",
  publishableKey: "pk_3d58fedecb4f4bfcb4069aa4fba74227",
  environmentId: "us_env_OkhzeYtv",
};

const Space = ({
  setShowSpace,
}: {
  setShowSpace: Dispatch<SetStateAction<boolean>>;
}) => {
  const space = useSpace({
    ...spaceProps,
    workbook,
    listener,
    sidebarConfig: {
      showSidebar: true,
    },
    themeConfig: {
      root: {
        primaryColor: "#E30C79",
        dangerColor: "#E30C79",
      },
      sidebar: {
        logo: "https://www.solvhealth.com/images/logo/solv_dark.svg",
      },
    },
    closeSpace: {
      operation: "submitActionFg",
      onClose: () => setShowSpace(false),
    },
  });
  return space;
};

export default function App() {
  const [showSpace, setShowSpace] = useState(false);

  return (
    <div className="content">
      <div className="centered">
        <img src={"https://www.solvhealth.com/dir/solv-og.png"} alt="Solv Health" className="logo" />
        <h2>
          Welcome to <span className="highlight">Solv Health</span>
        </h2>
        <p>Import your patient bills with ease.</p>
        {/*Button to trigger the modal */}
        <div>
          <button
            className="contrast"
            onClick={() => {
              setShowSpace(!showSpace);
            }}
          >
            {showSpace ? "Close" : "Open"} Patient Bill Space
          </button>
          {showSpace && <Space setShowSpace={setShowSpace} />}
        </div>
      </div>
    </div>
  );
}
