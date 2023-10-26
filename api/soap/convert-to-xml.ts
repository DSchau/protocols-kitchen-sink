import converter from "xml2js";

export const convertToXml = (json) => {
  const builder = new converter.Builder();

  try {
    // filthy hack!
    // +1 and -1 are not valid xml tag names
    if (json.issues) {
      json.issues = json.issues.map((issue) => {
        let reactions = Object.assign({}, issue.reactions || {});

        reactions["+1"] = reactions["thumbs_up"] = reactions["+1"];
        reactions["-1"] = reactions["thumbs_down"] = reactions["-1"];

        delete reactions["+1"];
        delete reactions["-1"];

        return Object.assign({}, issue, {
          reactions,
        });
      });
    }
    const xml = builder.buildObject(json);

    return xml;
  } catch (e) {
    console.error(new Error("Parsing: Invalid JSON Detected"));
    console.error(e);
    throw e;
  }
};
