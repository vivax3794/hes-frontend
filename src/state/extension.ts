import * as zip from "@zip.js/zip.js";
import * as fileSystem from "./file";
import * as xmlUtils from "./xmlUtils";

const BLANK_EXTENSION_PATH = "/blank_extension.zip";

function assert(condition: unknown): asserts condition {
  if (!condition) throw new Error("condition failed");
}

export default class Extension {
  languague: string;
  name: string;
  description: string;
  allowSave: boolean;
  startsWithTutorial: boolean;
  hasIntroStartup: boolean;
  introText: string | null;

  constructor(extensionInfo: HTMLElement, introText: string | null) {
    this.languague = xmlUtils.getText(extensionInfo, "Languague") ?? "en-us";
    this.name = xmlUtils.getText(extensionInfo, "Name") ?? "NAME NOT FOUND";
    this.description =
      xmlUtils.getText(extensionInfo, "Description") ?? "DESCRIPTION NOT FOUND";
    this.allowSave = xmlUtils.getBool(extensionInfo, "allow_save") ?? true;
    this.startsWithTutorial =
      xmlUtils.getBool(extensionInfo, "StartsWithTutorial") ?? false;
    this.hasIntroStartup = xmlUtils.getBool(extensionInfo, "HasIntroStartup") ?? false;

    this.introText = introText;

    console.log("extension", this);
  }

  public static async createExtension(zipFile: zip.ZipReader): Promise<Extension> {
    const rootFiles = await fileSystem.parseFromZipReader(zipFile);
    const files = rootFiles[0];
    assert(files instanceof fileSystem.Folder);

    const extensionInfoFile = files.getFile("ExtensionInfo.xml");
    assert(extensionInfoFile instanceof fileSystem.File);
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
}
