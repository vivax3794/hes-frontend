import * as zip from "@zip.js/zip.js";
import * as fileSystem from "./file";
import * as xmlUtils from "./xmlUtils";

const BLANK_EXTENSION_PATH = "/blank_extension.zip";

function assert(
  condition: unknown,
  message: string,
  objectLogOnFailrue: object | null | undefined
): asserts condition {
  if (!condition) {
    console.log("[ASSERT]", objectLogOnFailrue);
    throw new Error(message);
  }
}

export default class Extension {
  languague: string;
  name: string;
  description: string;
  allowSave: boolean;
  hasIntroStartup: boolean;
  introText: string;
  introTextEnabled: boolean;

  constructor(extensionInfo: HTMLElement, introText: string | null) {
    this.languague = xmlUtils.getText(extensionInfo, "Languague") ?? "en-us";
    this.name = xmlUtils.getText(extensionInfo, "Name") ?? "NAME NOT FOUND";
    this.description =
      xmlUtils.getText(extensionInfo, "Description") ?? "DESCRIPTION NOT FOUND";
    this.allowSave = xmlUtils.getBool(extensionInfo, "allow_save") ?? true;
    this.hasIntroStartup = xmlUtils.getBool(extensionInfo, "hasIntroStartup") ?? false;

    if (introText === null) {
      this.introText = "";
      this.introTextEnabled = false;
    } else {
      this.introText = introText;
      this.introTextEnabled = true;
    }

    console.log("extension", this);
  }

  public static async createExtension(zipFile: zip.ZipReader): Promise<Extension> {
    const files = await fileSystem.parseFromZipReader(zipFile);
    console.log("FILES", files);

    const extensionInfoFile = files.getFile("ExtensionInfo.xml");
    assert(
      extensionInfoFile instanceof fileSystem.File,
      "expected ExtensionInfo.xml to be a file.",
      extensionInfoFile
    );
    const extensionInfo = await extensionInfoFile.textXml();

    const introFile = files.getFile("Intro.txt");
    let introText: string | null = null;
    if (introFile instanceof fileSystem.File) {
      introText = await introFile.readText();
    }

    return new Extension(extensionInfo, introText);
  }

  public static async createBlankExtension(): Promise<Extension> {
    const domain = location.origin;
    const fileUrl = domain + BLANK_EXTENSION_PATH;

    console.log(`loading blank extension from ${fileUrl}`);
    const zipFile = new zip.ZipReader(new zip.HttpReader(fileUrl));
    return await Extension.createExtension(zipFile);
  }

  private createExtInfoXml(): HTMLElement {
    const doc = document.implementation.createDocument("", "", null);
    const rootNode = doc.createElement("HacknetExtension");

    rootNode.appendChild(xmlUtils.createXmlWithText(doc, "Name", this.name));
    rootNode.appendChild(
      xmlUtils.createXmlWithText(doc, "AllowSave", this.allowSave.toString())
    );
    rootNode.appendChild(
      xmlUtils.createXmlWithText(doc, "Description", this.description)
    );
    rootNode.appendChild(xmlUtils.createXmlWithText(doc, "StartsWithTutorial", "false"));
    rootNode.appendChild(
      xmlUtils.createXmlWithText(doc, "HasIntroStartup", this.hasIntroStartup.toString())
    );

    return rootNode;
  }

  public async exportExtension(): Promise<[string, string]> {
    const folderName = this.name.replaceAll(" ", "");
    const writer = new zip.ZipWriter(new zip.Data64URIWriter("application/zip"));

    // root file
    await writer.add(folderName + "/", null);

    // Node folder is required
    await writer.add(`${folderName}/Nodes/`, null);

    if (this.introTextEnabled) {
      await writer.add(`${folderName}/Intro.txt`, createTextReader(this.introText));
    }

    // ExtensionInfo.xml
    const extInfo = this.createExtInfoXml();
    await writer.add(
      `${folderName}/ExtensionInfo.xml`,
      createTextReader(extInfo.outerHTML)
    );

    const dataUri = await writer.close();
    console.log(dataUri);
    return [dataUri, folderName + ".zip"];
  }
}

function createTextReader(text: string): zip.BlobReader {
  const blob = new Blob([text], { type: "text/plain" });
  return new zip.BlobReader(blob);
}
