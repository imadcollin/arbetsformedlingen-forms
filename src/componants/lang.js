import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  EN: {
    Language: "Language",
    head: "Employment Agency Form",
    section1: "Document Properties",
    finished:
      " We have received your application. We will get back to you ASAP. Thanks for your time.",

    steps: " of 4 steps",
    country: "Country",
    name: "Name",
    tel: "Telephone",
    email: "Email Address",
    handling: "Handling",
    next: "Next",
  },
  SE: {
    Language: "Språk",
    head: "Arbetsförmedling Form",
    section1: "Dokumentuppgifter",
    finished:
      "Vi har fått din ansökan. Vi återkommer till dig ASAP. Tack för din tid.",

    steps: " av 4 steg",
    country: "Land",
    name: "Namn",
    tel: "Telefon",
    email: "E-postadress",
    handling: "Hantering",
    next: "Nästa",
  },
});

export default strings;
