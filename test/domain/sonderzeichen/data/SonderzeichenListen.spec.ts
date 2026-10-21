import { uniq } from "lodash";
import { SonderzeichenListen } from "src/domain/sonderzeichen/data/SonderzeichenListen";
import { regEx } from "test/regEx";

describe("SonderzeichenListen", () => {
  const entries = Object.entries(SonderzeichenListen.gruppenMap);
  it.each(entries)('group "%s" has no duplicate item', (_, gruppe) => {
    expect(uniq(gruppe)).toMatchObject(gruppe);
  });

  it("each key has the form U+{HEX}", () => {
    SonderzeichenListen.gesamt.forEach((key) => {
      expect(key).toMatch(regEx.isUnicodeKey);
    });
  });

  it("fix group sizes", () => {
    const entries = Object.entries(SonderzeichenListen.gruppenMap).map(
      ([key, list]) => [key, list.length]
    );
    const groupSizes = Object.fromEntries(entries);
    expect(entries).toHaveLength(SonderzeichenListen.gruppen.length);
    expect(groupSizes).toMatchObject({
      alchemie: 147,
      geomantie: 16,
      gesamt: 698,
      griechisch: 294,
      latein: 124,
      symbole: 45,
      zahlen: 74,
    });
  });
});
