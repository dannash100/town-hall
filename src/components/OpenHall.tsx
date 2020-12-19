import React from "react";
import Header from "./Header";
import { observer } from "mobx-react-lite";
import "./OpenHall.css";

import FixedTitle from "./FixedTitle";
import Sidebar from "./Sidebar";

function OpenHall() {
  return (
    <>
      <Header isHome={true} />
      <FixedTitle />
      <Sidebar isOpenHall={true} />
      <div className="OpenHall">
        <div className="open-hall-container">
          <p style={{ marginBottom: 50 }}>
            Open <i>H</i>all is a regular, semi-public meeting hosted by{" "}
            <i>T</i>own <i>H</i>all.
          </p>
          <p style={{marginBottom: 50}}>
            Typically these sessions are prompted by a Hot Question: a
            provocation from one of the group, not disclosed in advance, so
            absorbed and answered in an informal conversation. This is an
            invitation to share what is churning around in your mind, right now.
          </p>
          <p>
            Open Hall meetings take place on Zoom. Register below for an
            upcoming event and we will send you the link a few days in advance.
          </p>
        </div>
      </div>
    </>
  );
}

export default observer(OpenHall);
