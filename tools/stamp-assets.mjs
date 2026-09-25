/* Cache-busting des assets.
   Le site est 100 % statique (aucun build), mais GitHub Pages sert
   css/styles.css et js/app.js avec un max-age : sans parametre de version,
   un simple rechargement peut reafficher l'ancien CSS ( Symptome : les
   couleurs des jauges ne se mettent pas a jour).

   Ce script derive la version du CONTENU des fichiers, donc :
     - il n'y a rien a incrementer a la main,
     - la version change des que le CSS ou le JS change,
     - il n'y a pas de probleme d'egg-and-p Chicken avec le commit.

   Usage : node tools/stamp-assets.mjs   (a lancer apres toute modif CSS/JS) */

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS = ["css/styles.css", "js/app.js"];

const hash = createHash("sha256");
for (const asset of ASSETS) {
  hash.update(readFileSync(join(root, asset)));
}
const version = hash.digest("hex").slice(0, 8);

const indexPath = join(root, "index.html");
const before = readFileSync(indexPath, "utf8");
const after = before.replace(
  /(href="css\/styles\.css|src="js\/app\.js)(\?v=[0-9a-f]+)?/g,
  (_m, ref) => ref + "?v=" + version
);

if (before === after) {
  console.log("Assets deja a jour (v=" + version + ") - rien a faire.");
} else {
  writeFileSync(indexPath, after);
  console.log("Assets estampilles : v=" + version);
  for (const asset of ASSETS) console.log("  " + asset);
}
