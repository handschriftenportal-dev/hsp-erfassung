import { VolltextSemantik } from "src/domain/erfassung/VolltextSemantik";
import { FormatierungTransformationFactory } from "src/infrastructure/slate/transformation/volltext/inline/FormatierungTransformationFactory";

describe("FormatierungTransformationFactory", () => {
  const { formatierungen } = VolltextSemantik;
  const person = {
    data_origin: "persName",
    data_role: "author",
    data_ref: "http://some-normdatum",
    children: [{ text: "wrap to Person" }],
  };
  const einband = {
    data_origin: "ref",
    data_type: "subjectArea",
    children: [
      { text: "wrapped Themenbereich" },
      {
        data_origin: "index",
        data_indexName: "BNDG",
        children: [
          {
            data_origin: "term",
            data_key: "NORM-718b2806-f17f-3bf7-80b9-7de56ed3d970",
            data_ref:
              "https://normdaten.staatsbibliothek-berlin.de/hsp/vocabulary/BNDG-X411",
            children: [{ text: "" }],
          },
          {
            data_origin: "term",
            data_key: "NORM-21d862ca-c205-346c-87a7-d703b8b96af6",
            data_ref:
              "https://normdaten.staatsbibliothek-berlin.de/hsp/vocabulary/BNDG-F468",
            children: [{ text: "" }],
          },
        ],
      },
    ],
  };
  const literatur = {
    data_origin: "ref",
    data_type: "bibliography",
    data_target: "https://d-nb.info/gnd/7594989-1",
    children: [{ text: "AA SS" }],
  };
  const initium = {
    data_origin: "quote",
    data_type: "incipit",
    children: [
      { text: "Ach homo perpende fragilis" },
      {
        data_origin: "index",
        data_indexName: "initia",
        children: [
          {
            data_origin: "term",
            data_key: "NORM-1f967481-c6ca-3258-871b-1f69c1298974",
            data_ref:
              "https://normdaten.staatsbibliothek-berlin.de/hsp/initia/NORM-1f967481-c6ca-3258-871b-1f69c1298974",
            children: [{ text: "" }],
          },
        ],
      },
    ],
  };
  const unknown = {
    data_origin: "unknown",
    children: [{ text: "NaN" }],
  };
  const subFormatierung = {
    data_origin: "persName",
    data_role: "author",
    children: [{ text: "wrap to Box" }],
  };
  describe.each(formatierungen)("%s transformation", (formatierung) => {
    const { transform, invert } =
      FormatierungTransformationFactory(formatierung);

    describe.each([
      {
        subReferenz: person,
        output: {
          data_origin: "person",
          content: "wrap to Person",
        },
      },
      {
        subReferenz: einband,
        output: {
          data_origin: "einband",
          content: "wrapped Themenbereich",
        },
      },
      {
        subReferenz: literatur,
        output: {
          data_origin: "literatur",
          content: "AA SS",
        },
      },
      {
        subReferenz: initium,
        output: {
          data_origin: "initium",
          content: "Ach homo perpende fragilis",
        },
      },
      {
        subReferenz: unknown,
        output: {
          data_origin: "box",
          content: "NaN",
        },
      },
    ])("with subreferenz $output.data_origin", ({ subReferenz, output }) => {
      const input = {
        data: {
          data_origin: "123",
          other_attribute: 5,
          children: [
            { text: "Content" },
            subFormatierung,
            { text: "" },
            subReferenz,
            { text: "" },
          ],
        },
      };

      const transformedElement = transform(input);

      it(`transformed element has data_origin ${formatierung}`, () => {
        expect(transformedElement.data_origin).toEqual(formatierung);
      });
      it(`transformed element is not void element`, () => {
        expect(transformedElement.children).not.toEqual([{ text: "" }]);
      });
      it("satisfies invariance", () => {
        expect(invert(transformedElement)).toMatchObject(input);
      });
      it("subElement becomes box", () => {
        const boxElement = transformedElement.children[1];
        expect(boxElement).toMatchObject({
          data_origin: "box",
          content: "wrap to Box",
          children: [{ text: "" }],
        });
      });
      it("subReferenz becomes Referenz", () => {
        const boxElement = transformedElement.children[3];
        expect(boxElement).toMatchObject({
          ...output,
          children: [{ text: "" }],
        });
      });
    });
  });
});
