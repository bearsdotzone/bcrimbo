/* eslint-disable libram/verify-constants */
import {
  availableAmount,
  bufferToFile,
  displayAmount,
  Item,
  print,
  printHtml,
  toSlot,
  visitUrl,
  weaponHands,
} from "kolmafia";
import { $item, $slot } from "libram";

function sanitizeString(input: string) {
  return input.replace(/\n/g, "").replace(/ {2}/g, "");
}

export default function main(): void {
  const equippable: Item[] = [
    $item`bone-polishing rag`,
    $item`burnt bone belt`,
    $item`cursed ship's lantern`,
    $item`extra-thick Crimbo sweater`,
    $item`fireproof bonesaw`,
    $item`flaming fistbone`,
    $item`heat-resistant harpoon pistol`,
    $item`hot boning knife`,
    $item`scorched skeleton mask`,
    $item`scorched skeleton pants`,
    $item`scorched skeleton shirt`,
    $item`smoldering vertebra`,
    $item`undertakers' forceps`,
    $item`vermiculite shield`,
  ];

  const oneOffs: Item[] = [
    $item`assembled tiny plastic Santa skeleton`,
    $item`baked bone meal`,
    $item`boiling bone marrow`,
    $item`boiling cerebrospinal fluid`,
    $item`boiling synovial fluid`,
    $item`burnt incisor`,
    $item`burnt phalange`,
    $item`burnt radius`,
    $item`burnt rib`,
    $item`burnt skull`,
    $item`buryable chest`,
    $item`cinnamon doubloon`,
    $item`counterskeleton elixir`,
    $item`crate of prize-winning cheese`,
    $item`crate of prize-winning rum`,
    $item`Crymbocurrency`,
    $item`glimmering golden crystal`,
    $item`gummi fingerbone`,
    $item`messenger parrot egg`,
    $item`miniature sleigh`,
    $item`Santa-Slayer medal`,
    $item`scorched skull trophy`,
    $item`Skull of Claus`,
    $item`smoldering bone dust`,
    $item`tiny plastic left skeleton arm`,
    $item`tiny plastic left skeleton leg`,
    $item`tiny plastic right skeleton arm`,
    $item`tiny plastic right skeleton leg`,
    $item`tiny plastic skeleton Crimbo hat`,
    $item`tiny plastic skeleton pelvis`,
    $item`tiny plastic skeleton rib cage`,
    $item`tiny plastic skeleton skull`,
    $item`volatile bone bomb`,
  ];

  const skillBooks: Item[] = [
    $item`Shanty: I'm Smarter Than a Drunken Sailor`,
    $item`Shanty: Let's Beat Up This Drunken Sailor`,
    $item`Shanty: Look At That Drunken Sailor Dance`,
    $item`Shanty: Only Dogs Love a Drunken Sailor`,
    $item`Shanty: Who's Going to Pay This Drunken Sailor?`,
    $item`The Encyclopedia of Holiday Funerary Rites`,
  ];

  const consumables: Item[] = [
    $item`bottle of prize-winning rum`,
    $item`mulled butter rum`,
    $item`"salvaged" wine`,
    $item`Scotch and eggnog`,
    $item`Steve Abrams' Holiday Sampler Beer`,
    $item`traditional gingerloaf`,
    $item`treasure chestnut`,
    $item`weak skeleton venom`,
    $item`wedge of prize-winning cheese`,
    $item`wing bone`,
  ];

  const tattoo = $item`Crymbocurrency tattoo`;

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
      ${displayAmount(x) >= 1 ? `<td color="green">☑️` : `<td color="red">❌`}</td>`,
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
    ${displayAmount(x) >= 1 ? `<td color="green">☑️` : `<td color="red">❌`}</td>
    ${consumeHistory.includes(x.name) ? `<td color="green">☑️` : `<td color="red">❌`}</td>
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
    // const used =
    //   x === $item`Shanty: Only Dogs Love a Drunken Sailor`
    //     ? $item`Shanty: Only Dogs Love Drunken Sailors (used)`
    //     : $item`${x.name} (used)`;
    const used = $item`${x.name} (used)`;
    skillbookTable += `<tr>
    <td>${x.name}</td>
    ${displayAmount(x) >= 1 ? `<td color="green">☑️` : `<td color="red">❌`}</td>
    ${displayAmount(used) >= 1 ? `<td color="green">☑️` : `<td color="red">❌`}</td>
    ${availableAmount(used) >= 1 ? `<td color="green">☑️` : `<td color="red">❌`}</td>
    </tr>`;
  });
  skillbookTable += "</table>";
  printHtml(sanitizeString(skillbookTable), false);

  print("Tattoo", "#FFFF00");
  const tattooTable = `<table border=2>
    <tr>
      <th></th>
      <th>Display</th>
      <th>Learned</th>
    </tr>
    <tr>
      <td>${tattoo.name}</td>
      ${displayAmount(tattoo) >= 1 ? `<td color="green">☑️` : `<td color="red">❌`}</td>
      ${visitUrl("account_tattoos.php").includes("cryptotat.gif") ? `<td color="green">☑️` : `<td color="red">❌`}</td>
    </tr>
  </table>`;
  printHtml(sanitizeString(tattooTable), false);

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

    const singleEquip = visitUrl(`desc_item.php?whichitem=${x.descid}`).includes(
      "You may not equip more than one of these at a time.",
    );
    if (singleEquip) {
      sickoAmount = 1;
    }

    equipmentTable += `<tr>
    <td>${x.name}</td>
    ${displayAmount(x) >= 1 ? `<td color="green">☑️` : `<td color="red">❌`}</td>
    ${availableAmount(x) >= 1 ? `<td color="green">☑️` : `<td color="red">❌`}</td>
    ${availableAmount(x) >= sickoAmount ? `<td color="green">` : `<td>`}${availableAmount(x)} / ${sickoAmount}</td>
    <td>${toSlot(x)}</td>
    ${singleEquip ? `<td color="green">☑️` : `<td color="red">❌`}</td>
    </tr>`;
  });
  equipmentTable += "</table>";
  printHtml(sanitizeString(equipmentTable), false);

  bufferToFile(
    `
      <h1>Crimbo 2025 Report</h1>
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
      </div>
    `,
    "data/bcrimbo.html",
  );
}
