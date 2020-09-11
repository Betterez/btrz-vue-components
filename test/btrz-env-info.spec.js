import "./setup";

import {expect} from "chai";
import {mountComponent} from "./utils";
import BtrzEnvInfo from "../src/btrz-env-info";

describe("BtrzEnvInfo", () => {
  it("should render the info from the environment", () => {
    const envInfo = {
        commitUrl: "https://github.com/Betterez/btrz-web-websales/tree/03878b8014cdcc2237898531c05aa3b9d7f11c40",
        version: "03878b8",
        serverId: "i-0e34254daf60f23a3"
      },
      component = mountComponent(BtrzEnvInfo, envInfo);

    expect(component.$el.innerHTML).to.include(`href="${envInfo.commitUrl}"`);
    expect(component.$el.innerHTML).to.include(`${envInfo.version}`);
    expect(component.$el.innerHTML).to.include(`ServerId: ${envInfo.serverId}`);
    expect(component.$el.innerHTML)
      .to.equal(`Version: <a aria-hidden="true" tabindex="-1" href="${envInfo.commitUrl}" target="_blank">${envInfo.version}</a> - ServerId: ${envInfo.serverId}`);
  });
});
