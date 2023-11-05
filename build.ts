const fs = require("node:fs");
const path = require("node:path");
const fse = require("fs-extra");
const cp = require("child_process");
const fsPromises = require("fs/promises");
const os = require("os");

function maketmp() {
  return new Promise((resolve, reject) => {
    fs.mkdtemp(path.join(os.tmpdir(), "use-c"), (err: any, dir: any) => {
      if (err !== null) reject(err);
      else resolve(dir);
    });
  });
}

async function copyCurrentDirectoryToDist(filePath: string) {
  fse.copySync(filePath, filePath + ".original");

  const content = fse.readFileSync(filePath, "utf8");
  const isServerActionFile = content.startsWith("'use server'");
  const splits = content.split(/"use c";/);
  let result = splits[0];

  for (let i = 1; i < splits.length; i++) {
    const endOfCCode = findClosingBrace(splits[i]);

    let cCode = splits[i].slice(0, endOfCCode);
    const hasArgs = cCode.includes("jsValue");
    cCode = cCode.replace("jsValue", "argv[1]");

    if (!isServerActionFile) {
      result += `"use server";\n`;
    }
    const dir = await maketmp();

    const cFile = path.join(dir, "main.c");
    const outputFile = path.join(dir, "main-next");

    await fsPromises.writeFile(cFile, cCode);
    await cp.spawnSync("cc", [cFile, "-o", outputFile]);

    result += `return require('child_process').spawnSync(\`${outputFile}\`${
      hasArgs ? ",[jsValue]" : ""
    }).stdout.toString();`;
    result += splits[i].slice(endOfCCode, splits[i].length);
  }
  fse.writeFileSync(filePath, result, "utf8");
}

function findClosingBrace(string: String) {
  let codeBlocksCounter = 0;
  let characterCounter = 0;
  while (characterCounter < string.length) {
    const ch = string[characterCounter];
    if (ch === "{") codeBlocksCounter++;
    else if (ch === "}") codeBlocksCounter--;
    if (codeBlocksCounter == -1) return characterCounter;
    characterCounter++;
  }
  return null;
}

function resetToOriginalState(filePath: string) {
  const path = require("node:path");
  const fse = require("fs-extra");
  const finalFileName = filePath.replace(".original", "");
  fse.removeSync(finalFileName);
  fse.moveSync(filePath, finalFileName);
}
const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));

async function build() {
  await fromDir(path.join(__dirname, "src"), ".js", copyCurrentDirectoryToDist);
  await fromDir(
    path.join(__dirname, "src"),
    ".tsx",
    copyCurrentDirectoryToDist
  );

  try {
    const output = await cp.spawnSync("next", ["build", "--debug"]);
    console.log(output.stdout.toString());
  } catch (e) {
    console.log(e);
  } finally {
    console.log("cleanup");

    await fromDir(
      path.join(__dirname, "src"),
      ".js.original",
      resetToOriginalState
    );
    await fromDir(
      path.join(__dirname, "src"),
      ".tsx.original",
      resetToOriginalState
    );
  }
}

async function fromDir(startPath: any, filter: any, callback: any) {
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  var files = fs.readdirSync(startPath);

  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (
      stat.isDirectory() &&
      filename.startsWith("node_modules") === false &&
      filename.startsWith(".next") === false
    ) {
      await fromDir(filename, filter, callback); //recurse
    } else if (filename.endsWith(filter)) {
      await callback(filename);
    }
  }
}

build();
