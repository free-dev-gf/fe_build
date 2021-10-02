const babel = require("@babel/core");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;

const code = `
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function commonDivision(a, b) {
  while (b !== 0) {
      if (a > b) {
          a = sub(a, b);
      } else {
          b = sub(b, a);
      }
  }
  return a;
}
`;

babel.transform("var a = 1;", {}, function(err, result) {
    // console.log("result:", result);
});

const ast = parser.parse(code);

traverse(ast, {
    enter(path) {
        if (path.isIdentifier({ name: "n" })) {
            path.node.name = "x";
        }
    },
});

const output = generate(
    ast,
    { sourceMaps: true, sourceFileName: "source.js" },
    code
);

function merge() {
    const a = "var a = 1;";
    const b = "var b = 2;";
    const astA = parser.parse(a, { sourceFilename: "a.js" });
    const astB = parser.parse(b, { sourceFilename: "b.js" });
    const ast = {
        type: "Program",
        body: [...astA.program.body, ...astB.program.body],
    };

    const { code, map } = generate(
        ast,
        { sourceMaps: true },
        {
            "a.js": a,
            "b.js": b,
        }
    );
    console.log(code, map);
}

merge();
