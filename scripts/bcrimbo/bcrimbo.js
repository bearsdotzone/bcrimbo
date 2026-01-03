"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = function(target, all) {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = function(to, from, except, desc) {
  if (from && typeof from == "object" || typeof from == "function")
    for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++)
      key = keys[i], !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: function(k) {
        return from[k];
      }.bind(null, key), enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = function(mod) {
  return __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
};

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: function() {
    return main;
  }
});
module.exports = __toCommonJS(main_exports);
var import_kolmafia2 = require("kolmafia");

// node_modules/libram/dist/template-string.js
var import_kolmafia = require("kolmafia");

// node_modules/libram/dist/utils.js
function _createForOfIteratorHelper(r, e) {
  var t = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && typeof r.length == "number") {
      t && (r = t);
      var _n = 0, F = function() {
      };
      return { s: F, n: function() {
        return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] };
      }, e: function(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = !0, u = !1;
  return { s: function() {
    t = t.call(r);
  }, n: function() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function(r2) {
    u = !0, o = r2;
  }, f: function() {
    try {
      a || t.return == null || t.return();
    } finally {
      if (u) throw o;
    }
  } };
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if (typeof r == "string") return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _arrayLikeToArray(r, a) {
  (a == null || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function splitByCommasWithEscapes(str) {
  var returnValue = [], ignoreNext = !1, currentString = "", _iterator2 = _createForOfIteratorHelper(str.split("")), _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
      var char = _step2.value;
      char === "\\" ? ignoreNext = !0 : (char == "," && !ignoreNext ? (returnValue.push(currentString.trim()), currentString = "") : currentString += char, ignoreNext = !1);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return returnValue.push(currentString.trim()), returnValue;
}

// node_modules/libram/dist/template-string.js
var concatTemplateString = function(literals) {
  for (var _len = arguments.length, placeholders = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)
    placeholders[_key - 1] = arguments[_key];
  return literals.raw.reduce(function(acc, literal, i) {
    var _placeholders$i;
    return acc + literal + ((_placeholders$i = placeholders[i]) !== null && _placeholders$i !== void 0 ? _placeholders$i : "");
  }, "");
}, handleTypeGetError = function(Type, error) {
  var message = "".concat(error), match = message.match(RegExp("Bad ".concat(Type.name.toLowerCase(), " value: .*")));
  match ? (0, import_kolmafia.print)("".concat(match[0], "; if you're certain that this ").concat(Type.name, " exists and is spelled correctly, please update KoLMafia"), "red") : (0, import_kolmafia.print)(message);
}, createSingleConstant = function(Type, converter) {
  var tagFunction = function(literals) {
    for (var _len2 = arguments.length, placeholders = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)
      placeholders[_key2 - 1] = arguments[_key2];
    var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));
    try {
      return Type.get(input);
    } catch (error) {
      handleTypeGetError(Type, error);
    }
    (0, import_kolmafia.abort)();
  };
  return tagFunction.cls = Type, tagFunction.none = Type.none, tagFunction.get = function(name) {
    var value = converter(name);
    return value === Type.none ? null : value;
  }, tagFunction;
}, createPluralConstant = function(Type) {
  var tagFunction = function(literals) {
    for (var _len3 = arguments.length, placeholders = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++)
      placeholders[_key3 - 1] = arguments[_key3];
    var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));
    if (input === "")
      return Type.all();
    try {
      return Type.get(splitByCommasWithEscapes(input));
    } catch (error) {
      handleTypeGetError(Type, error);
    }
    (0, import_kolmafia.abort)();
  };
  return tagFunction.all = function() {
    return Type.all();
  }, tagFunction;
}, $bounty = createSingleConstant(import_kolmafia.Bounty, import_kolmafia.toBounty), $bounties = createPluralConstant(import_kolmafia.Bounty), $class = createSingleConstant(import_kolmafia.Class, import_kolmafia.toClass), $classes = createPluralConstant(import_kolmafia.Class), $coinmaster = createSingleConstant(import_kolmafia.Coinmaster, import_kolmafia.toCoinmaster), $coinmasters = createPluralConstant(import_kolmafia.Coinmaster), $effect = createSingleConstant(import_kolmafia.Effect, import_kolmafia.toEffect), $effects = createPluralConstant(import_kolmafia.Effect), $element = createSingleConstant(import_kolmafia.Element, import_kolmafia.toElement), $elements = createPluralConstant(import_kolmafia.Element), $familiar = createSingleConstant(import_kolmafia.Familiar, import_kolmafia.toFamiliar), $familiars = createPluralConstant(import_kolmafia.Familiar), $item = createSingleConstant(import_kolmafia.Item, import_kolmafia.toItem), $items = createPluralConstant(import_kolmafia.Item), $location = createSingleConstant(import_kolmafia.Location, import_kolmafia.toLocation), $locations = createPluralConstant(import_kolmafia.Location), $modifier = createSingleConstant(import_kolmafia.Modifier, import_kolmafia.toModifier), $modifiers = createPluralConstant(import_kolmafia.Modifier), $monster = createSingleConstant(import_kolmafia.Monster, import_kolmafia.toMonster), $monsters = createPluralConstant(import_kolmafia.Monster), $path = createSingleConstant(import_kolmafia.Path, import_kolmafia.toPath), $paths = createPluralConstant(import_kolmafia.Path), $phylum = createSingleConstant(import_kolmafia.Phylum, import_kolmafia.toPhylum), $phyla = createPluralConstant(import_kolmafia.Phylum), $servant = createSingleConstant(import_kolmafia.Servant, import_kolmafia.toServant), $servants = createPluralConstant(import_kolmafia.Servant), $skill = createSingleConstant(import_kolmafia.Skill, import_kolmafia.toSkill), $skills = createPluralConstant(import_kolmafia.Skill), $slot = createSingleConstant(import_kolmafia.Slot, import_kolmafia.toSlot), $slots = createPluralConstant(import_kolmafia.Slot), $stat = createSingleConstant(import_kolmafia.Stat, import_kolmafia.toStat), $stats = createPluralConstant(import_kolmafia.Stat), $thrall = createSingleConstant(import_kolmafia.Thrall, import_kolmafia.toThrall), $thralls = createPluralConstant(import_kolmafia.Thrall);

// src/main.ts
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject0, _templateObject1, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48, _templateObject49, _templateObject50, _templateObject51, _templateObject52, _templateObject53, _templateObject54, _templateObject55, _templateObject56, _templateObject57, _templateObject58, _templateObject59, _templateObject60, _templateObject61, _templateObject62, _templateObject63, _templateObject64, _templateObject65, _templateObject66, _templateObject67, _templateObject68, _templateObject69, _templateObject70, _templateObject71, _templateObject72;
function _taggedTemplateLiteral(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var crymbocurrencyTotal = 0, meatTotal = 0;
function printPrice(iItem) {
  if ((0, import_kolmafia2.sellsItem)($coinmaster(_templateObject || (_templateObject = _taggedTemplateLiteral(["The HMS Bounty Hunter"]))), iItem)) {
    var price = (0, import_kolmafia2.sellPrice)($coinmaster(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["The HMS Bounty Hunter"]))), iItem);
    (0, import_kolmafia2.print)("Buy for ".concat(price, " Crymbocurrency")), crymbocurrencyTotal += price;
  } else {
    var _price = (0, import_kolmafia2.mallPrice)(iItem);
    (0, import_kolmafia2.print)("Buy for ".concat(_price, " meat"), "#FF00FF"), meatTotal += _price;
  }
}
function main() {
  for (var desirables = [[$item(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["treasure chestnut"]))), 1], [$item(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["mulled butter rum"]))), 1], [$item(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["cinnamon doubloon"]))), 1], [$item(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Crymbocurrency"]))), 1], [$item(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["extra-thick Crimbo sweater"]))), 2], [$item(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["The Encyclopedia of Holiday Funerary Rites"]))), 1], [$item(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Steve Abrams' Holiday Sampler Beer"]))), 2], [$item(_templateObject0 || (_templateObject0 = _taggedTemplateLiteral(["crate of prize-winning rum"]))), 1], [$item(_templateObject1 || (_templateObject1 = _taggedTemplateLiteral(["bottle of prize-winning rum"]))), 2], [$item(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Santa-Slayer medal"]))), 1], [$item(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["Skull of Claus"]))), 1], [$item(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["boiling bone marrow"]))), 1], [$item(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["boiling cerebrospinal fluid"]))), 1], [$item(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["boiling synovial fluid"]))), 1], [$item(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["smoldering vertebra"]))), 2], [$item(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["smoldering bone dust"]))), 1], [$item(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["volatile bone bomb"]))), 1], [$item(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["hot boning knife"]))), 3], [$item(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["flaming fistbone"]))), 3], [$item(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["burnt bone belt"]))), 2], [$item(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["scorched skull trophy"]))), 1], [$item(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["wing bone"]))), 2], [$item(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["weak skeleton venom"]))), 2], [$item(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["baked bone meal"]))), 1], [$item(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["tiny plastic skeleton rib cage"]))), 1], [$item(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["tiny plastic skeleton skull"]))), 1], [$item(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["tiny plastic skeleton Crimbo hat"]))), 1], [$item(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["tiny plastic left skeleton arm"]))), 1], [$item(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["tiny plastic left skeleton leg"]))), 1], [$item(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["tiny plastic right skeleton arm"]))), 1], [$item(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["tiny plastic right skeleton leg"]))), 1], [$item(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["tiny plastic skeleton pelvis"]))), 1], [$item(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["assembled tiny plastic Santa skeleton"]))), 1], [$item(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["miniature sleigh"]))), 1], [$item(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["undertakers' forceps"]))), 4], [$item(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["bone-polishing rag"]))), 3], [$item(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral(["scorched skeleton mask"]))), 3], [$item(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral(["scorched skeleton shirt"]))), 2], [$item(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral(["scorched skeleton pants"]))), 3], [$item(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral(["messenger parrot egg"]))), 1], [$item(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral(["buryable chest"]))), 1], [$item(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral(["Shanty: Let's Beat Up This Drunken Sailor"]))), 1], [$item(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral(["Shanty: Let's Beat Up This Drunken Sailor (used)"]))), 1], [$item(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral(["Shanty: I'm Smarter Than a Drunken Sailor"]))), 1], [$item(_templateObject45 || (_templateObject45 = _taggedTemplateLiteral(["Shanty: I'm Smarter Than a Drunken Sailor (used)"]))), 1], [$item(_templateObject46 || (_templateObject46 = _taggedTemplateLiteral(["Shanty: Look At That Drunken Sailor Dance"]))), 1], [$item(_templateObject47 || (_templateObject47 = _taggedTemplateLiteral(["Shanty: Look At That Drunken Sailor Dance (used)"]))), 1], [$item(_templateObject48 || (_templateObject48 = _taggedTemplateLiteral(["Shanty: Who's Going to Pay This Drunken Sailor?"]))), 1], [$item(_templateObject49 || (_templateObject49 = _taggedTemplateLiteral(["Shanty: Who's Going to Pay This Drunken Sailor? (used)"]))), 1], [$item(_templateObject50 || (_templateObject50 = _taggedTemplateLiteral(["Shanty: Only Dogs Love a Drunken Sailor"]))), 1], [$item(_templateObject51 || (_templateObject51 = _taggedTemplateLiteral(["Shanty: Only Dogs Love Drunken Sailors (used)"]))), 1], [$item(_templateObject52 || (_templateObject52 = _taggedTemplateLiteral(["Crymbocurrency tattoo"]))), 2], [$item(_templateObject53 || (_templateObject53 = _taggedTemplateLiteral(["fireproof bonesaw"]))), 4], [$item(_templateObject54 || (_templateObject54 = _taggedTemplateLiteral(["vermiculite shield"]))), 3], [$item(_templateObject55 || (_templateObject55 = _taggedTemplateLiteral(["cursed ship's lantern"]))), 3], [$item(_templateObject56 || (_templateObject56 = _taggedTemplateLiteral(["heat-resistant harpoon pistol"]))), 4], [$item(_templateObject57 || (_templateObject57 = _taggedTemplateLiteral(["traditional gingerloaf"]))), 1], [$item(_templateObject58 || (_templateObject58 = _taggedTemplateLiteral(["Scotch and eggnog"]))), 1], [$item(_templateObject59 || (_templateObject59 = _taggedTemplateLiteral(["counterskeleton elixir"]))), 1], [$item(_templateObject60 || (_templateObject60 = _taggedTemplateLiteral(['"salvaged" wine']))), 1], [$item(_templateObject61 || (_templateObject61 = _taggedTemplateLiteral(["The Encyclopedia of Holiday Funerary Rites (used)"]))), 1], [$item(_templateObject62 || (_templateObject62 = _taggedTemplateLiteral(["crate of prize-winning cheese"]))), 1], [$item(_templateObject63 || (_templateObject63 = _taggedTemplateLiteral(["wedge of prize-winning cheese"]))), 1], [$item(_templateObject64 || (_templateObject64 = _taggedTemplateLiteral(["gummi fingerbone"]))), 1], [$item(_templateObject65 || (_templateObject65 = _taggedTemplateLiteral(["glimmering golden crystal"]))), 1]], successes = "\u2611\uFE0F", i = 0; i < desirables.length; i++) {
    var iItem = desirables[i][0], have = (0, import_kolmafia2.displayAmount)(iItem) + (0, import_kolmafia2.availableAmount)(iItem), desired = desirables[i][1];
    if (iItem.fullness || iItem.inebriety) {
      var eaten = (0, import_kolmafia2.visitUrl)("showconsumption.php").includes(iItem.name);
      (0, import_kolmafia2.displayAmount)(iItem) >= 1 && eaten ? successes = successes.concat(" ".concat(iItem.name)) : ((0, import_kolmafia2.print)("~ ".concat(iItem.name)), eaten || ((0, import_kolmafia2.print)("	 Need to eat ".concat(iItem.name)), (0, import_kolmafia2.availableAmount)(iItem) === 0 && printPrice(iItem)), (0, import_kolmafia2.displayAmount)(iItem) === 0 && (0, import_kolmafia2.print)("	 Need to display ".concat(iItem.name)));
    } else if (iItem === $item(_templateObject66 || (_templateObject66 = _taggedTemplateLiteral(["Crymbocurrency tattoo"])))) {
      var displayed = (0, import_kolmafia2.displayAmount)(iItem) > 0, learned = (0, import_kolmafia2.visitUrl)("account_tattoos.php").includes("cryptotat.gif");
      displayed && learned ? successes = successes.concat(" ".concat(iItem.name)) : displayed ? ((0, import_kolmafia2.print)("~ ".concat(iItem.name)), (0, import_kolmafia2.print)("	 Need to learn ".concat(iItem.name))) : learned ? ((0, import_kolmafia2.print)("~ ".concat(iItem.name)), (0, import_kolmafia2.print)("	 Need to display ".concat(iItem.name))) : (0, import_kolmafia2.print)("\u274C ".concat(iItem.name, " - ").concat(have, " / ").concat(desired));
    } else if (have >= desired)
      (0, import_kolmafia2.displayAmount)(iItem) >= 1 ? successes = successes.concat(" ".concat(iItem.name)) : (0, import_kolmafia2.print)("~ ".concat(iItem.name));
    else {
      (0, import_kolmafia2.print)("\u274C ".concat(iItem.name, " - ").concat(have, " / ").concat(desired));
      for (var j = 0; j < desired - have; j++)
        printPrice(iItem);
    }
  }
  (0, import_kolmafia2.print)(successes, "#00FF00"), (0, import_kolmafia2.print)("Total ".concat(crymbocurrencyTotal, " Crymbocurrency, ").concat(meatTotal, " meat")), (0, import_kolmafia2.print)("Possible Crymbocurrency \n    ".concat((0, import_kolmafia2.availableAmount)($item(_templateObject67 || (_templateObject67 = _taggedTemplateLiteral(["Crymbocurrency"])))) + (0, import_kolmafia2.availableAmount)($item(_templateObject68 || (_templateObject68 = _taggedTemplateLiteral(["burnt skull"])))) * 50 + (0, import_kolmafia2.availableAmount)($item(_templateObject69 || (_templateObject69 = _taggedTemplateLiteral(["burnt rib"])))) * 20 + (0, import_kolmafia2.availableAmount)($item(_templateObject70 || (_templateObject70 = _taggedTemplateLiteral(["burnt radius"])))) * 10 + (0, import_kolmafia2.availableAmount)($item(_templateObject71 || (_templateObject71 = _taggedTemplateLiteral(["burnt phalange"])))) * 5 + (0, import_kolmafia2.availableAmount)($item(_templateObject72 || (_templateObject72 = _taggedTemplateLiteral(["burnt incisor"]))))));
}
