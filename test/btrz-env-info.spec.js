import "./setup";

import { expect } from "chai";
import { insertHTML, mountComponent } from "./utils";
import BtrzEnvInfo from '../src/btrz-env-info';

describe("BtrzEnvInfo", () => {
  it("should render the info from the environment", () => {
   const envInfo = {
      commitUrl: "https://github.com/Betterez/btrz-web-websales/tree/03878b8014cdcc2237898531c05aa3b9d7f11c40",
      version: "03878b8",
      serverId: "i-0e34254daf60f23a3"
    }

    const component = mountComponent(BtrzEnvInfo, envInfo);

    expect(component.$el.innerHTML).to.include(`<a href="${envInfo.commitUrl}"`);
    expect(component.$el.innerHTML).to.include(`${envInfo.version}`);
    expect(component.$el.innerHTML).to.include(`ServerId: ${envInfo.serverId}`);
    expect(component.$el.innerHTML).to.equal(`Version: <a href="${envInfo.commitUrl}" target="_blank">${envInfo.version}</a> - ServerId: ${envInfo.serverId}`);

  });
});
