/* eslint-disable libram/verify-constants */
import {
  availableAmount,
  displayAmount,
  Item,
  mallPrice,
  print,
  sellPrice,
  sellsItem,
  visitUrl,
} from "kolmafia";
import { $coinmaster, $item } from "libram";

let crymbocurrencyTotal = 0;
let meatTotal = 0;

function printPrice(iItem: Item) {
  if (sellsItem($coinmaster`The HMS Bounty Hunter`, iItem)) {
    const price = sellPrice($coinmaster`The HMS Bounty Hunter`, iItem);
    print(`Buy for ${price} Crymbocurrency`);
    crymbocurrencyTotal += price;
  } else {
    const price = mallPrice(iItem);
    print(`Buy for ${price} meat`, `#FF00FF`);
    meatTotal += price;
  }
}

export default function main(): void {
  const desirables: [Item, number][] = [
    [$item`treasure chestnut`, 1],
    [$item`mulled butter rum`, 1],
    [$item`cinnamon doubloon`, 1],
    [$item`Crymbocurrency`, 1],
    [$item`extra-thick Crimbo sweater`, 2],
    [$item`The Encyclopedia of Holiday Funerary Rites`, 1],
    [$item`Steve Abrams' Holiday Sampler Beer`, 2],
    [$item`crate of prize-winning rum`, 1],
    [$item`bottle of prize-winning rum`, 2],
    [$item`Santa-Slayer medal`, 1],
    [$item`Skull of Claus`, 1],
    [$item`boiling bone marrow`, 1],
    [$item`boiling cerebrospinal fluid`, 1],
    [$item`boiling synovial fluid`, 1],
    [$item`smoldering vertebra`, 2],
    [$item`smoldering bone dust`, 1],
    [$item`volatile bone bomb`, 1],
    [$item`hot boning knife`, 3],
    [$item`flaming fistbone`, 3],
    [$item`burnt bone belt`, 2],
    [$item`scorched skull trophy`, 1],
    [$item`wing bone`, 2],
    [$item`weak skeleton venom`, 2],
    [$item`baked bone meal`, 1],
    [$item`tiny plastic skeleton rib cage`, 1],
    [$item`tiny plastic skeleton skull`, 1],
    [$item`tiny plastic skeleton Crimbo hat`, 1],
    [$item`tiny plastic left skeleton arm`, 1],
    [$item`tiny plastic left skeleton leg`, 1],
    [$item`tiny plastic right skeleton arm`, 1],
    [$item`tiny plastic right skeleton leg`, 1],
    [$item`tiny plastic skeleton pelvis`, 1],
    [$item`assembled tiny plastic Santa skeleton`, 1],
    [$item`miniature sleigh`, 1],
    [$item`undertakers' forceps`, 4],
    [$item`bone-polishing rag`, 3],
    [$item`scorched skeleton mask`, 3],
    [$item`scorched skeleton shirt`, 2],
    [$item`scorched skeleton pants`, 3],
    [$item`messenger parrot egg`, 1],
    [$item`buryable chest`, 1],
    [$item`Shanty: Let's Beat Up This Drunken Sailor`, 1],
    [$item`Shanty: Let's Beat Up This Drunken Sailor (used)`, 1],
    [$item`Shanty: I'm Smarter Than a Drunken Sailor`, 1],
    [$item`Shanty: I'm Smarter Than a Drunken Sailor (used)`, 1],
    [$item`Shanty: Look At That Drunken Sailor Dance`, 1],
    [$item`Shanty: Look At That Drunken Sailor Dance (used)`, 1],
    [$item`Shanty: Who's Going to Pay This Drunken Sailor?`, 1],
    [$item`Shanty: Who's Going to Pay This Drunken Sailor? (used)`, 1],
    [$item`Shanty: Only Dogs Love a Drunken Sailor`, 1],
    [$item`Shanty: Only Dogs Love Drunken Sailors (used)`, 1],
    [$item`Crymbocurrency tattoo`, 2],
    [$item`fireproof bonesaw`, 4],
    [$item`vermiculite shield`, 3],
    [$item`cursed ship's lantern`, 3],
    [$item`heat-resistant harpoon pistol`, 4],
    [$item`traditional gingerloaf`, 1],
    [$item`Scotch and eggnog`, 1],
    [$item`counterskeleton elixir`, 1],
    [$item`"salvaged" wine`, 1],
    [$item`The Encyclopedia of Holiday Funerary Rites (used)`, 1],
    [$item`crate of prize-winning cheese`, 1],
    [$item`wedge of prize-winning cheese`, 1],
    [$item`gummi fingerbone`, 1],
    [$item`glimmering golden crystal`, 1],
  ];

  let successes = `☑️`;
  for (let i = 0; i < desirables.length; i++) {
    const iItem = desirables[i][0];
    const have = displayAmount(iItem) + availableAmount(iItem);
    const desired = desirables[i][1];
    if (iItem.fullness || iItem.inebriety) {
      const eaten = visitUrl("showconsumption.php").includes(iItem.name);
      if (displayAmount(iItem) >= 1 && eaten) {
        successes = successes.concat(` ${iItem.name}`);
      } else {
        print(`~ ${iItem.name}`);
        if (!eaten) {
          print(`\t Need to eat ${iItem.name}`);
          if (availableAmount(iItem) === 0) printPrice(iItem);
        }
        if (displayAmount(iItem) === 0) {
          print(`\t Need to display ${iItem.name}`);
        }
      }
    } else if (iItem === $item`Crymbocurrency tattoo`) {
      const displayed = displayAmount(iItem) > 0;
      const learned = visitUrl("account_tattoos.php").includes("cryptotat.gif");
      if (displayed && learned) {
        successes = successes.concat(` ${iItem.name}`);
      } else if (displayed) {
        print(`~ ${iItem.name}`);
        print(`\t Need to learn ${iItem.name}`);
      } else if (learned) {
        print(`~ ${iItem.name}`);
        print(`\t Need to display ${iItem.name}`);
      } else {
        print(`❌ ${iItem.name} - ${have} / ${desired}`);
      }
    } else {
      if (have >= desired) {
        if (displayAmount(iItem) >= 1) {
          successes = successes.concat(` ${iItem.name}`);
        } else {
          print(`~ ${iItem.name}`);
        }
      } else {
        print(`❌ ${iItem.name} - ${have} / ${desired}`);
        for (let j = 0; j < desired - have; j++) {
          printPrice(iItem);
        }
      }
    }
  }
  print(successes, `#00FF00`);
  print(`Total ${crymbocurrencyTotal} Crymbocurrency, ${meatTotal} meat`);
  const availableCrymbocurrency =
    availableAmount($item`Crymbocurrency`) +
    availableAmount($item`burnt skull`) * 50 +
    availableAmount($item`burnt rib`) * 20 +
    availableAmount($item`burnt radius`) * 10 +
    availableAmount($item`burnt phalange`) * 5 +
    availableAmount($item`burnt incisor`);
  print(`Possible Crymbocurrency ${availableCrymbocurrency}`);
}
