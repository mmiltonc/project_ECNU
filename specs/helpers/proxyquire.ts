import path from "path";
import proxyquireFactory from "proxyquire";

const proxyquire = proxyquireFactory.noCallThru();

export const proxyquireFromRoot = (modulePath: string, stubs: object) => {
  return proxyquire(path.join(process.cwd(), modulePath), stubs);
};
