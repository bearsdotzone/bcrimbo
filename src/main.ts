/* eslint-disable libram/verify-constants */
import { Args } from "grimoire-kolmafia";
import {
  availableAmount,
  bufferToFile,
  displayAmount,
  haveFamiliar,
  myName,
  print,
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

  print("One-offs", "#FFFF00");
  let oneoffTable = "<table border=2>";
  oneoffTable += `
  <tr>
    <th></th>
    <th>Display</th>
    <th></th>
    <th>Display</th>
  </tr>`;
  const entries: string[] = [];
  oneOffs.forEach((x) => {
    entries.push(
      `<td>${x.name}</td>
      ${displayAmount(x) >= 1 ? `<td color="green">☑️` : `<td color="purple">❌`}</td>`,
    );
  });
  const rows = Math.ceil(entries.length / 2.0);
  for (let i = 0; i < rows; i++) {
    oneoffTable += `<tr>${entries[i]}${i + rows < entries.length ? entries[i + rows] : ""}</tr>`;
  }
  oneoffTable += "</table>";
  printHtml(sanitizeString(oneoffTable), false);

  const consumeHistory = visitUrl("showconsumption.php");
  print("Consumables", "#FFFF00");
  let consumableTable = "<table border=2>";
  consumableTable += `<tr>
  <th></th>
  <th>Display</th>
  <th>Consumed</th>
  </tr>`;
  consumables.forEach((x) => {
    consumableTable += `<tr>
    <td>${x.name}</td>
    ${displayAmount(x) >= 1 ? `<td color="green">☑️` : `<td color="purple">❌`}</td>
    ${consumeHistory.includes(x.name) ? `<td color="green">☑️` : `<td color="purple">❌`}</td>
    </tr>`;
  });
  consumableTable += "</table>";
  printHtml(sanitizeString(consumableTable), false);

  print("Skillbooks", "#FFFF00");
  let skillbookTable = "<table border=2>";
  skillbookTable += `
  <tr>
    <th></th>
    <th>Display</th>
    <th>Display (used)</th>
    <th>Have (used)</th>
  </tr>`;
  skillBooks.forEach((x) => {
    const used = $item`${x.name} (used)`;
    skillbookTable += `<tr>
    <td>${x.name}</td>
    ${displayAmount(x) >= 1 ? `<td color="green">☑️` : `<td color="purple">❌`}</td>
    ${displayAmount(used) >= 1 ? `<td color="green">☑️` : `<td color="purple">❌`}</td>
    ${availableAmount(used) >= 1 ? `<td color="green">☑️` : `<td color="purple">❌`}</td>
    </tr>`;
  });
  skillbookTable += "</table>";
  printHtml(sanitizeString(skillbookTable), false);

  const haveTattoo = visitUrl("account_tattoos.php").includes("cryptotat.gif");
  print("Tattoo", "#FFFF00");
  const tattooTable = `<table border=2>
    <tr>
      <th></th>
      <th>Display</th>
      <th>Learned</th>
    </tr>
    <tr>
      <td>${tattoo.name}</td>
      ${displayAmount(tattoo) >= 1 ? `<td color="green">☑️` : `<td color="purple">❌`}</td>
      ${haveTattoo ? `<td color="green">☑️` : `<td color="purple">❌`}</td>
    </tr>
  </table>`;
  printHtml(sanitizeString(tattooTable), false);

  const familiarSeed = $item`assembled tiny plastic Santa skeleton`;
  const familiar = $familiar`Tiny Plastic Santa Claus Skeleton`;
  print("Familiar", "#FFFF00");
  const familiarTable = `<table border=2>
    <tr>
      <th></th>
      <th>Display</th>
      <th>Grown</th>
    </tr>
    <tr>
      <td>Tiny Plastic Santa Claus Skeleton</td>
      ${displayAmount(familiarSeed) >= 1 ? `<td color="green">☑️` : `<td color="purple">❌`}</td>
      ${haveFamiliar(familiar) ? `<td color="green">☑️` : `<td color="purple">❌`}</td>
    </tr>
  </table>`;
  printHtml(sanitizeString(familiarTable), false);

  const singleEquipItems = $items`burnt bone belt, hot boning knife, smoldering vertebra`;
  print("Equipment", "#FFFF00");
  let equipmentTable = "<table border=2>";
  equipmentTable += `<tr>
  <th></th>
  <th>Display</th>
  <th>Personal</th>
  <th>Sicko</th>
  <th>Slot</th>
  <th>Single Equip</th>
  </tr>`;
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
    ${displayAmount(x) >= 1 ? `<td color="green">☑️` : `<td color="purple">❌`}</td>
    ${availableAmount(x) >= 1 ? `<td color="green">☑️` : `<td color="purple">❌`}</td>
    ${availableAmount(x) >= sickoAmount ? `<td color="green">` : `<td>`}${availableAmount(x)} / ${sickoAmount}</td>
    <td>${toSlot(x)}</td>
    ${singleEquip ? `<td color="green">☑️` : `<td color="purple">❌`}</td>
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
    print(`Writing results to data/bcrimbo_${myName()}.html`, "#FFFF00");
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
