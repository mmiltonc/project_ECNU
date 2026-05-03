process.env.NODE_ENV = process.env.NODE_ENV || "test";

require("@next/env").loadEnvConfig(process.cwd());

require("ts-node").register({
  transpileOnly: true,
  compilerOptions: {
    jsx: "react-jsx",
    module: "commonjs",
    moduleResolution: "node",
  },
});

require("tsconfig-paths/register");
