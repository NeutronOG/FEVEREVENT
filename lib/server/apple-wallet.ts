import { readFile } from "node:fs/promises";
import path from "node:path";
import forge from "node-forge";
import { PKPass } from "passkit-generator";

type HonoredGuest = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  qr_token: string;
  memberNumber: string;
};

function publicSiteUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return (siteUrl || "https://www.feverevent.store").replace(/\/$/, "");
}

function required(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is not configured.`);
  return value;
}

function pemFromDerCertificate(base64: string) {
  const asn1 = forge.asn1.fromDer(forge.util.decode64(base64));
  return forge.pki.certificateToPem(forge.pki.certificateFromAsn1(asn1));
}

function passSigningCertificates() {
  const p12Asn1 = forge.asn1.fromDer(
    forge.util.decode64(required("APPLE_PASS_CERTIFICATE_P12_BASE64")),
  );
  const p12 = forge.pkcs12.pkcs12FromAsn1(
    p12Asn1,
    false,
    required("APPLE_PASS_CERTIFICATE_P12_PASSWORD"),
  );
  const certificateBags =
    p12.getBags({ bagType: forge.pki.oids.certBag })[forge.pki.oids.certBag] ?? [];
  const keyBags = [
    ...(p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[
      forge.pki.oids.pkcs8ShroudedKeyBag
    ] ?? []),
    ...(p12.getBags({ bagType: forge.pki.oids.keyBag })[forge.pki.oids.keyBag] ?? []),
  ];
  const signerCertificate = certificateBags.find(
    (bag) =>
      bag.cert?.subject.getField("CN")?.value ===
      `Pass Type ID: ${required("APPLE_PASS_TYPE_IDENTIFIER")}`,
  )?.cert;
  const signerKey = keyBags.find((bag) => bag.key)?.key;

  if (!signerCertificate || !signerKey) {
    throw new Error("The Apple Wallet .p12 does not match the configured Pass Type ID.");
  }

  return {
    signerCert: forge.pki.certificateToPem(signerCertificate),
    signerKey: forge.pki.privateKeyToPem(signerKey),
    wwdr: pemFromDerCertificate(required("APPLE_WWDR_CERTIFICATE_BASE64")),
  };
}

export async function createAppleWalletPass(guest: HonoredGuest) {
  const teamIdentifier = required("APPLE_TEAM_ID");
  const passTypeIdentifier = required("APPLE_PASS_TYPE_IDENTIFIER");
  const serialNumber = `FEVER-${guest.id}`;
  const icon = await readFile(path.join(process.cwd(), "public", "favicon.png"));
  const background = await readFile(
    path.join(process.cwd(), "public", "wallet", "fever-pass-background.png"),
  );
  const logo = await readFile(
    path.join(process.cwd(), "public", "brand", "fever-logo-mark.png"),
  );
  const pass = new PKPass(
    {
      "background.png": background,
      "background@2x.png": await readFile(
        path.join(process.cwd(), "public", "wallet", "fever-pass-background@2x.png"),
      ),
      "background@3x.png": await readFile(
        path.join(process.cwd(), "public", "wallet", "fever-pass-background@3x.png"),
      ),
      "icon.png": icon,
      "icon@2x.png": icon,
      "logo.png": logo,
      "logo@2x.png": logo,
    },
    passSigningCertificates(),
    {
      authenticationToken: guest.qr_token,
      backgroundColor: "rgb(0, 132, 151)",
      description: "FEVER Honored Guest Card",
      foregroundColor: "rgb(247, 241, 229)",
      formatVersion: 1,
      labelColor: "rgb(255, 157, 32)",
      organizationName: "FEVER",
      passTypeIdentifier,
      serialNumber,
      sharingProhibited: true,
      teamIdentifier,
    },
  );

  pass.type = "generic";
  pass.headerFields.push({
    key: "member",
    label: "MEMBER",
    value: `#${guest.memberNumber}`,
  });
  pass.primaryFields.push({
    key: "honoredGuest",
    label: "HONORED GUEST",
    value: `${guest.first_name} ${guest.last_name}`.toUpperCase(),
  });
  pass.secondaryFields.push(
    { key: "access", label: "YOUR ACCESS", value: "LIFETIME VIP" },
    { key: "privilege", label: "YOUR PRIVILEGE", value: "2 SHOTS / VISIT" },
  );
  pass.backFields.push(
    {
      key: "note",
      label: "A NOTE FROM FEVER",
      value: "Some invitations are earned. This one is yours.",
    },
    {
      key: "privileges",
      label: "YOUR PRIVILEGES",
      value:
        "Lifetime VIP Access to FEVER\n2 complimentary shots every time you visit",
    },
    { key: "member", label: "MEMBER NUMBER", value: guest.memberNumber },
    { key: "email", label: "CARD HOLDER", value: guest.email },
  );

  pass.setBarcodes({
    altText: `FEVER · MEMBER ${guest.memberNumber}`,
    format: "PKBarcodeFormatQR",
    message: `${publicSiteUrl()}/verify/${guest.qr_token}`,
    messageEncoding: "iso-8859-1",
  });

  return { buffer: pass.getAsBuffer(), serialNumber };
}
