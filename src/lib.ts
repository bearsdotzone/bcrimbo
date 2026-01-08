/* eslint-disable libram/verify-constants */
import { displayAmount, Item } from "kolmafia";
import { $item } from "libram";

export function allDisplayed(input: Item[]) {
  return input.every((i) => displayAmount(i) >= 1);
}

export function sanitizeString(input: string) {
  return input.replace(/\n/g, "").replace(/ {2}/g, "");
}

export const equippable: Item[] = [
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

export const oneOffs: Item[] = [
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

export const skillBooks: Item[] = [
  $item`Shanty: I'm Smarter Than a Drunken Sailor`,
  $item`Shanty: Let's Beat Up This Drunken Sailor`,
  $item`Shanty: Look At That Drunken Sailor Dance`,
  $item`Shanty: Only Dogs Love a Drunken Sailor`,
  $item`Shanty: Who's Going to Pay This Drunken Sailor?`,
  $item`The Encyclopedia of Holiday Funerary Rites`,
];

export const consumables: Item[] = [
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

export const tattoo = $item`Crymbocurrency tattoo`;
