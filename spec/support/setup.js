require("ts-node").register({
  transpileOnly: true,
  compilerOptions: {
    jsx: "react-jsx",
    module: "commonjs",
    moduleResolution: "node",
  },
});

require("tsconfig-paths/register");
