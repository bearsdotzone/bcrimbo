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
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject0, _templateObject1, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48, _templateObject49, _templateObject50, _templateObject51, _templateObject52, _templateObject53, _templateObject54, _templateObject55, _templateObject56, _templateObject57, _templateObject58, _templateObject59, _templateObject60, _templateObject61, _templateObject62, _templateObject63, _templateObject64, _templateObject65, _templateObject66, _templateObject67, _templateObject68, _templateObject69;
function _taggedTemplateLiteral(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function sanitizeString(input) {
  return input.replace(/\n/g, "").replace(/ {2}/g, "");
}
function main() {
  var equippable = [$item(_templateObject || (_templateObject = _taggedTemplateLiteral(["bone-polishing rag"]))), $item(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["burnt bone belt"]))), $item(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["cursed ship's lantern"]))), $item(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["extra-thick Crimbo sweater"]))), $item(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["fireproof bonesaw"]))), $item(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["flaming fistbone"]))), $item(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["heat-resistant harpoon pistol"]))), $item(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["hot boning knife"]))), $item(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["scorched skeleton mask"]))), $item(_templateObject0 || (_templateObject0 = _taggedTemplateLiteral(["scorched skeleton pants"]))), $item(_templateObject1 || (_templateObject1 = _taggedTemplateLiteral(["scorched skeleton shirt"]))), $item(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["smoldering vertebra"]))), $item(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["undertakers' forceps"]))), $item(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["vermiculite shield"])))], oneOffs = [$item(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["assembled tiny plastic Santa skeleton"]))), $item(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["baked bone meal"]))), $item(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["boiling bone marrow"]))), $item(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["boiling cerebrospinal fluid"]))), $item(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["boiling synovial fluid"]))), $item(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["burnt incisor"]))), $item(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["burnt phalange"]))), $item(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["burnt radius"]))), $item(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["burnt rib"]))), $item(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["burnt skull"]))), $item(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["buryable chest"]))), $item(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["cinnamon doubloon"]))), $item(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["counterskeleton elixir"]))), $item(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["crate of prize-winning cheese"]))), $item(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["crate of prize-winning rum"]))), $item(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["Crymbocurrency"]))), $item(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["glimmering golden crystal"]))), $item(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["gummi fingerbone"]))), $item(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["messenger parrot egg"]))), $item(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["miniature sleigh"]))), $item(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["Santa-Slayer medal"]))), $item(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["scorched skull trophy"]))), $item(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["Skull of Claus"]))), $item(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["smoldering bone dust"]))), $item(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral(["tiny plastic left skeleton arm"]))), $item(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral(["tiny plastic left skeleton leg"]))), $item(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral(["tiny plastic right skeleton arm"]))), $item(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral(["tiny plastic right skeleton leg"]))), $item(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral(["tiny plastic skeleton Crimbo hat"]))), $item(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral(["tiny plastic skeleton pelvis"]))), $item(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral(["tiny plastic skeleton rib cage"]))), $item(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral(["tiny plastic skeleton skull"]))), $item(_templateObject45 || (_templateObject45 = _taggedTemplateLiteral(["volatile bone bomb"])))], skillBooks = [$item(_templateObject46 || (_templateObject46 = _taggedTemplateLiteral(["Shanty: I'm Smarter Than a Drunken Sailor"]))), $item(_templateObject47 || (_templateObject47 = _taggedTemplateLiteral(["Shanty: Let's Beat Up This Drunken Sailor"]))), $item(_templateObject48 || (_templateObject48 = _taggedTemplateLiteral(["Shanty: Look At That Drunken Sailor Dance"]))), $item(_templateObject49 || (_templateObject49 = _taggedTemplateLiteral(["Shanty: Only Dogs Love a Drunken Sailor"]))), $item(_templateObject50 || (_templateObject50 = _taggedTemplateLiteral(["Shanty: Who's Going to Pay This Drunken Sailor?"]))), $item(_templateObject51 || (_templateObject51 = _taggedTemplateLiteral(["The Encyclopedia of Holiday Funerary Rites"])))], consumables = [$item(_templateObject52 || (_templateObject52 = _taggedTemplateLiteral(["bottle of prize-winning rum"]))), $item(_templateObject53 || (_templateObject53 = _taggedTemplateLiteral(["mulled butter rum"]))), $item(_templateObject54 || (_templateObject54 = _taggedTemplateLiteral(['"salvaged" wine']))), $item(_templateObject55 || (_templateObject55 = _taggedTemplateLiteral(["Scotch and eggnog"]))), $item(_templateObject56 || (_templateObject56 = _taggedTemplateLiteral(["Steve Abrams' Holiday Sampler Beer"]))), $item(_templateObject57 || (_templateObject57 = _taggedTemplateLiteral(["traditional gingerloaf"]))), $item(_templateObject58 || (_templateObject58 = _taggedTemplateLiteral(["treasure chestnut"]))), $item(_templateObject59 || (_templateObject59 = _taggedTemplateLiteral(["weak skeleton venom"]))), $item(_templateObject60 || (_templateObject60 = _taggedTemplateLiteral(["wedge of prize-winning cheese"]))), $item(_templateObject61 || (_templateObject61 = _taggedTemplateLiteral(["wing bone"])))], tattoo = $item(_templateObject62 || (_templateObject62 = _taggedTemplateLiteral(["Crymbocurrency tattoo"])));
  (0, import_kolmafia2.print)("One-offs", "#FFFF00");
  var oneoffTable = "<table border=2>";
  oneoffTable += "\n  <tr>\n    <th></th>\n    <th>Display</th>\n    <th></th>\n    <th>Display</th>\n  </tr>";
  var entries = [];
  oneOffs.forEach(function(x) {
    entries.push("<td>".concat(x.name, "</td>\n      ").concat((0, import_kolmafia2.displayAmount)(x) >= 1 ? '<td color="green">\u2611\uFE0F' : '<td color="red">\u274C', "</td>"));
  });
  for (var rows = Math.ceil(entries.length / 2), i = 0; i < rows; i++)
    oneoffTable += "<tr>".concat(entries[i]).concat(i + rows < entries.length ? entries[i + rows] : "", "</tr>");
  oneoffTable += "</table>", (0, import_kolmafia2.printHtml)(sanitizeString(oneoffTable), !1);
  var consumeHistory = (0, import_kolmafia2.visitUrl)("showconsumption.php");
  (0, import_kolmafia2.print)("Consumables", "#FFFF00");
  var consumableTable = "<table border=2>";
  consumableTable += "<tr>\n  <th></th>\n  <th>Display</th>\n  <th>Consumed</th>\n  </tr>", consumables.forEach(function(x) {
    consumableTable += "<tr>\n    <td>".concat(x.name, "</td>\n    ").concat((0, import_kolmafia2.displayAmount)(x) >= 1 ? '<td color="green">\u2611\uFE0F' : '<td color="red">\u274C', "</td>\n    ").concat(consumeHistory.includes(x.name) ? '<td color="green">\u2611\uFE0F' : '<td color="red">\u274C', "</td>\n    </tr>");
  }), consumableTable += "</table>", (0, import_kolmafia2.printHtml)(sanitizeString(consumableTable), !1), (0, import_kolmafia2.print)("Skillbooks", "#FFFF00");
  var skillbookTable = "<table border=2>";
  skillbookTable += "\n  <tr>\n    <th></th>\n    <th>Display</th>\n    <th>Display (used)</th>\n    <th>Have (used)</th>\n  </tr>", skillBooks.forEach(function(x) {
    var used = x === $item(_templateObject63 || (_templateObject63 = _taggedTemplateLiteral(["Shanty: Only Dogs Love a Drunken Sailor"]))) ? $item(_templateObject64 || (_templateObject64 = _taggedTemplateLiteral(["Shanty: Only Dogs Love Drunken Sailors (used)"]))) : $item(_templateObject65 || (_templateObject65 = _taggedTemplateLiteral(["", " (used)"])), x.name);
    skillbookTable += "<tr>\n    <td>".concat(x.name, "</td>\n    ").concat((0, import_kolmafia2.displayAmount)(x) >= 1 ? '<td color="green">\u2611\uFE0F' : '<td color="red">\u274C', "</td>\n    ").concat((0, import_kolmafia2.displayAmount)(used) >= 1 ? '<td color="green">\u2611\uFE0F' : '<td color="red">\u274C', "</td>\n    ").concat((0, import_kolmafia2.availableAmount)(used) >= 1 ? '<td color="green">\u2611\uFE0F' : '<td color="red">\u274C', "</td>\n    </tr>");
  }), skillbookTable += "</table>", (0, import_kolmafia2.printHtml)(sanitizeString(skillbookTable), !1), (0, import_kolmafia2.print)("Tattoo", "#FFFF00");
  var tattooTable = "<table border=2>\n    <tr>\n      <th></th>\n      <th>Display</th>\n      <th>Learned</th>\n    </tr>\n    <tr>\n      <td>".concat(tattoo.name, "</td>\n      ").concat((0, import_kolmafia2.displayAmount)(tattoo) >= 1 ? '<td color="green">\u2611\uFE0F' : '<td color="red">\u274C', "</td>\n      ").concat((0, import_kolmafia2.visitUrl)("account_tattoos.php").includes("cryptotat.gif") ? '<td color="green">\u2611\uFE0F' : '<td color="red">\u274C', "</td>\n    </tr>\n  </table>");
  (0, import_kolmafia2.printHtml)(sanitizeString(tattooTable), !1), (0, import_kolmafia2.print)("Equipment", "#FFFF00");
  var equipmentTable = "<table border=2>";
  equipmentTable += "<tr>\n  <th></th>\n  <th>Display</th>\n  <th>Personal</th>\n  <th>Sicko</th>\n  <th>Slot</th>\n  <th>Single Equip</th>\n  </tr>", equippable.forEach(function(x) {
    var sickoAmount = 1;
    switch ((0, import_kolmafia2.toSlot)(x)) {
      case $slot(_templateObject66 || (_templateObject66 = _taggedTemplateLiteral(["hat"]))):
      case $slot(_templateObject67 || (_templateObject67 = _taggedTemplateLiteral(["off-hand"]))):
      case $slot(_templateObject68 || (_templateObject68 = _taggedTemplateLiteral(["pants"]))):
        sickoAmount = 2;
        break;
      case $slot(_templateObject69 || (_templateObject69 = _taggedTemplateLiteral(["weapon"]))):
        sickoAmount = (0, import_kolmafia2.weaponHands)(x) === 1 ? 3 : 1;
        break;
      default:
        sickoAmount = 1;
    }
    var singleEquip = (0, import_kolmafia2.visitUrl)("desc_item.php?whichitem=".concat(x.descid)).includes("You may not equip more than one of these at a time.");
    singleEquip && (sickoAmount = 1), equipmentTable += "<tr>\n    <td>".concat(x.name, "</td>\n    ").concat((0, import_kolmafia2.displayAmount)(x) >= 1 ? '<td color="green">\u2611\uFE0F' : '<td color="red">\u274C', "</td>\n    ").concat((0, import_kolmafia2.availableAmount)(x) >= 1 ? '<td color="green">\u2611\uFE0F' : '<td color="red">\u274C', "</td>\n    ").concat((0, import_kolmafia2.availableAmount)(x) >= sickoAmount ? '<td color="green">' : "<td>").concat((0, import_kolmafia2.availableAmount)(x), " / ").concat(sickoAmount, "</td>\n    <td>").concat((0, import_kolmafia2.toSlot)(x), "</td>\n    ").concat(singleEquip ? '<td color="green">\u2611\uFE0F' : '<td color="red">\u274C', "</td>\n    </tr>");
  }), equipmentTable += "</table>", (0, import_kolmafia2.printHtml)(sanitizeString(equipmentTable), !1), (0, import_kolmafia2.bufferToFile)('\n      <h1>Crimbo 2025 Report</h1>\n      <div style="display: flex; width: 100vw; flex-wrap: wrap;">\n        <div>\n          <h2>One-offs</h2>\n          '.concat(oneoffTable, "\n        </div>\n        <div>\n          <h2>Consumables</h2>\n          ").concat(consumableTable, "\n        </div>\n        <div>\n          <h2>Equipment</h2>\n          ").concat(equipmentTable, "\n        </div>\n        <div>\n          <h2>Skillbooks</h2>\n          ").concat(skillbookTable, "\n        </div>\n        <div>\n          <h2>Tattoo</h2>\n          ").concat(tattooTable, "\n        </div>\n      </div>\n    "), "data/bcrimbo.html");
}
