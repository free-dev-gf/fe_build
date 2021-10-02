const recast = require("recast");

const code = [
    "function add(a, b) {",
    "  return a +",
    "    // Weird formatting, huh?",
    "    b;",
    "}",
].join("\n");

const ast = recast.parse(code);

const {
    variableDeclaration,
    variableDeclarator,
    functionExpression,
} = recast.types.builders;
const add = ast.program.body[0];
ast.program.body[0] = variableDeclaration("const", [
    variableDeclarator(add.id, functionExpression(null, add.params, add.body)),
]);

const output = recast.print(ast).code;

console.log(output);
