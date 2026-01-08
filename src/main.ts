/* eslint-disable libram/verify-constants */
import { Args } from "grimoire-kolmafia";
import {
  availableAmount,
  bufferToFile,
  haveFamiliar,
  Item,
  myId,
  myName,
  printHtml,
  toItem,
  toSlot,
  visitUrl,
  weaponHands,
} from "kolmafia";
import { $familiar, $item, $items, $slot } from "libram";
import {
  oneOffs,
  equippable,
  skillBooks,
  consumables,
  tattoo,
  allDisplayed,
  sanitizeString,
  goodTableData,
  badTableData,
  colorText,
  tableHeader,
} from "./lib";

export const args = Args.create(
  "bcrimbo",
  `A tool for checking whether you've had the maximum amount of fun this Crimbo 2025.
  Maximum fun is defined as:
  - Having at least one of every item in your display case
  - Having consumed at least one of every food and drink
  - Having unlocked the tattoo and the familiar`,
  {
    html: Args.flag({
      default: false,
      help: `Generate an html version of the report at data/bcrimbo_${myName()}.html`,
    }),
  },
);

export default function main(command?: string): void {
  Args.fill(args, command);
  if (args.help) {
    Args.showHelp(args);
    return;
  }

  const myCollection = visitUrl(`displaycollection.php?who=${myId()}`);
  function displayAmount(item: Item) {
    const sanitizedName = item.name.replace("(", "\\(").replace(")", "\\)").replace("?", "\\?");
    const regex = new RegExp(`${sanitizedName}( \\([\\d,]+\\))?<\\/b>`);
    return myCollection.match(regex) ? 1 : 0;
  }

  printHtml(colorText("One-offs"), false);
  let oneoffTable = "<table border=2>";
  oneoffTable += tableHeader(["Display", "", "Display"]);
  const entries: string[] = [];
  oneOffs.forEach((x) => {
    entries.push(
      `<td>${x.name}</td>
      ${displayAmount(x) >= 1 ? goodTableData : badTableData}</td>`,
    );
  });
  const rows = Math.ceil(entries.length / 2.0);
  for (let i = 0; i < rows; i++) {
    oneoffTable += `<tr>${entries[i]}${i + rows < entries.length ? entries[i + rows] : ""}</tr>`;
  }
  oneoffTable += "</table>";
  printHtml(sanitizeString(oneoffTable), false);

  const consumeHistory = visitUrl("showconsumption.php");
  printHtml(colorText("Consumables"), false);
  let consumableTable = "<table border=2>";
  consumableTable += tableHeader(["Display", "Consumed"]);
  consumables.forEach((x) => {
    consumableTable += `<tr>
    <td>${x.name}</td>
    ${displayAmount(x) >= 1 ? goodTableData : badTableData}</td>
    ${consumeHistory.includes(x.name) ? goodTableData : badTableData}</td>
    </tr>`;
  });
  consumableTable += "</table>";
  printHtml(sanitizeString(consumableTable), false);

  printHtml(colorText("Skillbooks"), false);
  let skillbookTable = "<table border=2>";
  skillbookTable += tableHeader(["Display", "Display (used)", "Owned"]);
  skillBooks.forEach((x) => {
    const used = $item`${x.name} (used)`;
    skillbookTable += `<tr>
    <td>${x.name}</td>
    ${displayAmount(x) >= 1 ? goodTableData : badTableData}</td>
    ${displayAmount(used) >= 1 ? goodTableData : badTableData}</td>
    ${availableAmount(used) >= 1 ? goodTableData : badTableData}</td>
    </tr>`;
  });
  skillbookTable += "</table>";
  printHtml(sanitizeString(skillbookTable), false);

  const haveTattoo = visitUrl("account_tattoos.php").includes("cryptotat.gif");
  printHtml(colorText("Tattoo"), false);
  const tattooTable = `<table border=2>
    ${tableHeader(["Display", "Learned"])}
    <tr>
      <td>${tattoo.name}</td>
      ${displayAmount(tattoo) >= 1 ? goodTableData : badTableData}</td>
      ${haveTattoo ? goodTableData : badTableData}</td>
    </tr>
  </table>`;
  printHtml(sanitizeString(tattooTable), false);

  const familiarSeed = $item`assembled tiny plastic Santa skeleton`;
  const familiar = $familiar`Tiny Plastic Santa Claus Skeleton`;
  printHtml(colorText("Familiar"), false);
  const familiarTable = `<table border=2>
    ${tableHeader(["Display", "Grown"])}
    <tr>
      <td>Tiny Plastic Santa Claus Skeleton</td>
      ${displayAmount(familiarSeed) >= 1 ? goodTableData : badTableData}</td>
      ${haveFamiliar(familiar) ? goodTableData : badTableData}</td>
    </tr>
  </table>`;
  printHtml(sanitizeString(familiarTable), false);

  const singleEquipItems = $items`burnt bone belt, hot boning knife, smoldering vertebra`;
  printHtml(colorText("Equipment"), false);
  let equipmentTable = "<table border=2>";
  equipmentTable += tableHeader(["Display", "Owned", "Usable", "Slot", "Single Equip"]);
  equippable.forEach((x) => {
    let sickoAmount = 1;
    switch (toSlot(x)) {
      case $slot`hat`:
      case $slot`off-hand`:
      case $slot`pants`:
        sickoAmount = 2;
        break;
      case $slot`weapon`:
        sickoAmount = weaponHands(x) === 1 ? 3 : 1;
        break;
      default:
        sickoAmount = 1;
    }

    const singleEquip = singleEquipItems.includes(x);
    if (singleEquip) {
      sickoAmount = 1;
    }

    equipmentTable += `<tr>
    <td>${x.name}</td>
    ${displayAmount(x) >= 1 ? goodTableData : badTableData}</td>
    ${availableAmount(x) >= 1 ? goodTableData : badTableData}</td>
    ${availableAmount(x) >= sickoAmount ? `<td color="green">` : `<td>`}${availableAmount(x)} / ${sickoAmount}</td>
    <td>${toSlot(x)}</td>
    ${singleEquip ? goodTableData : badTableData}</td>
    </tr>`;
  });
  equipmentTable += "</table>";
  printHtml(sanitizeString(equipmentTable), false);

  const wonCrimbo =
    allDisplayed(equippable) &&
    allDisplayed(oneOffs) &&
    allDisplayed(skillBooks) &&
    allDisplayed(skillBooks.map((i) => toItem(`${i.name} (used)`))) &&
    allDisplayed(consumables) &&
    consumables.every((i) => consumeHistory.includes(i.name)) &&
    displayAmount(tattoo) >= 1 &&
    haveTattoo &&
    displayAmount(familiarSeed) >= 1 &&
    haveFamiliar(familiar);

  if (wonCrimbo) {
    printHtml("You won crimbo! Good job!");
  }

  if (args.html) {
    printHtml(colorText(`Writing results to data/bcrimbo_${myName()}.html`), false);
    bufferToFile(
      `
      <h1>Crimbo 2025 Report</h1>${wonCrimbo ? "You won crimbo! Good job!" : ""}
      <div style="display: flex; width: 100vw; flex-wrap: wrap;">
        <div>
          <h2>One-offs</h2>
          ${oneoffTable}
        </div>
        <div>
          <h2>Consumables</h2>
          ${consumableTable}
        </div>
        <div>
          <h2>Equipment</h2>
          ${equipmentTable}
        </div>
        <div>
          <h2>Skillbooks</h2>
          ${skillbookTable}
        </div>
        <div>
          <h2>Tattoo</h2>
          ${tattooTable}
        </div>
        <div>
          <h2>Familiar</h2>
          ${familiarTable}
        </div>
      </div>
    `,
      `data/bcrimbo_${myName()}.html`,
    );
  }
}
