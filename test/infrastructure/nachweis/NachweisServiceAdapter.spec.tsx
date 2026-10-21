import { waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import {
  fetchBearbeiterConfig,
  fetchDataFromNachweis,
  findBeschreibungSperren,
  findKODSignaturen,
  saveBearbeiterConfig,
  speichern,
  validateTEI,
} from "src/infrastructure/nachweis/NachweisServiceAdapter";
import { SBBNormdatenServiceAdapter } from "src/infrastructure/normdaten/SBBNormdatenServiceAdapter";

describe("NachweisServiceAdapter", () => {
  const testXML =
    "<TEI><text><body><msDesc><p>Erfassungscontext</p></msDesc></body></text></TEI>";
  const signaturen = ["Ms1", "Ms2"];
  const nachweisResponseSuccess = {
    success: true,
    message: "Speichern wurde erfolgreich durchgeführt.",
    level: "info",
  };
  const validationSuccess = {
    valid: true,
    message: "TEI Validierung wurde erfolgreich durchgeführt.",
    column: "",
    line: "",
    details: [],
  };
  const nachweisResponseError = {
    success: false,
    message: "Fehler",
    level: "error",
  };
  const nachweisSperrenResponse =
    "[\n" +
    "  {\n" +
    '    "id": "e9284e81-7cc4-4795-80bd-91c0150e0254",\n' +
    '    "bearbeiter": {\n' +
    '      "id": "b-rg102",\n' +
    '      "bearbeitername": "b-rg102",\n' +
    '      "vorname": "Robert",\n' +
    '      "nachname": "Giel",\n' +
    '      "email": "Robert.Giel@sbb.spk-berlin.de",\n' +
    '      "rolle": "Redakteur",\n' +
    '      "name": "Robert Giel"\n' +
    "    },\n" +
    '    "start_datum": "2022-02-09T09:40:12.884802",\n' +
    '    "sperre_typ": "MANUAL",\n' +
    '    "sperre_grund": "BeschreibungBearbeiten",\n' +
    '    "sperre_eintraege": [\n' +
    "      {\n" +
    '        "target_id": "HSP-60437a87-ae3e-3b52-b346-59d3352325cc",\n' +
    '        "target_type": "BESCHREIBUNG"\n' +
    "      }\n" +
    "    ]\n" +
    "  }\n" +
    "]";

  const authorizationToken = "secure-token";
  const authorizationHeader = `Bearer ${authorizationToken}`;

  const server = setupServer(
    http.get("/test", ({ request }) => {
      const authHeader = request.headers.get("authorization");
      if (authHeader !== authorizationHeader) {
        return HttpResponse.json(nachweisResponseError);
      } else {
        return HttpResponse.xml(testXML);
      }
    }),

    http.get("/beschreibung/sperren", ({ request }) => {
      const authHeader = request.headers.get("authorization");
      if (authHeader !== authorizationHeader) {
        return HttpResponse.json(nachweisResponseError);
      } else {
        return HttpResponse.json(nachweisSperrenResponse);
      }
    }),
    http.get("/test/signaturen", ({ request }) => {
      const authHeader = request.headers.get("authorization");
      if (authHeader !== authorizationHeader) {
        return HttpResponse.json(nachweisResponseError);
      } else {
        return HttpResponse.json(signaturen);
      }
    }),
    http.post("/validate/tei", async ({ request }) => {
      const validate = await request.text();
      if (validate === testXML) {
        return HttpResponse.json(validationSuccess);
      } else {
        return HttpResponse.json(nachweisResponseError);
      }
    }),
    http.post("/test", async ({ request }) => {
      const validate = await request.text();
      if (validate === testXML) {
        return HttpResponse.json(nachweisResponseSuccess);
      } else {
        return HttpResponse.json(nachweisResponseError);
      }
    }),
    http.get("/rest/bearbeiter/config", () => {
      return HttpResponse.json({
        sonderzeichen: ["a", "b", "c"],
      });
    }),
    http.post("/rest/bearbeiter/config", () => HttpResponse.json())
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe("NachweisServicePort", () => {
    it("<NachweisServicePort /> Get Signaturen", async () => {
      const dispatch = jest.fn();

      findKODSignaturen("/test", authorizationToken, dispatch);

      await waitFor(() => {
        expect(dispatch.mock.calls.length).toBe(1);
      });
    });

    it("<NachweisServicePort /> Get Sperren", async () => {
      const sperren = await findBeschreibungSperren(
        "/beschreibung",
        authorizationToken
      );
      expect(sperren).toBe(nachweisSperrenResponse);
    });

    it("<NachweisServicePort /> Get XML", async () => {
      const dispatch = jest.fn();
      SBBNormdatenServiceAdapter.updateConfiguration({ normdatenUrl: "/test" });

      fetchDataFromNachweis("/test", authorizationToken, dispatch);

      await waitFor(() => {
        expect(dispatch.mock.calls.length).toBe(5);
      });
    });

    it("<NachweisServicePort /> Post XML Success", async () => {
      const nachweisCallback = jest.fn();

      speichern("/test", authorizationToken, "de", testXML).then(
        nachweisCallback
      );

      await waitFor(() => {
        expect(nachweisCallback.mock.calls.length).toBe(1);
        expect(nachweisCallback.mock.calls[0][0]).toStrictEqual(
          nachweisResponseSuccess
        );
      });
    });

    it("<NachweisServicePort /> Post XML Error", async () => {
      const nachweisCallback = jest.fn();

      speichern("/test", authorizationToken, "de", "<Error>").then(
        nachweisCallback
      );

      await waitFor(() => {
        expect(nachweisCallback.mock.calls.length).toBe(1);
        expect(nachweisCallback.mock.calls[0][0]).toStrictEqual(
          nachweisResponseError
        );
      });
    });

    it("validate TEI", async () => {
      const response = await validateTEI("/validate/", testXML, false);
      expect(response.valid).toBe(true);
    });

    it("validate TEI Error", async () => {
      const response = await validateTEI("/validate/", "<Error>", false);
      expect(response.valid).toBe(false);
    });

    it("fetch bearbeiter config", async () => {
      const response = await fetchBearbeiterConfig("token");
      expect(response).toMatchObject({
        sonderzeichen: ["a", "b", "c"],
      });
    });

    it("save bearbeiter config", async () => {
      const response = await saveBearbeiterConfig(
        { sonderzeichen: [] },
        "token"
      );
      expect(response.status).toBe(200);
    });
  });
});
