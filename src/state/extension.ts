import * as zip from "@zip.js/zip.js";
import * as fileSystem from "./file";
import * as xmlUtils from "./xmlUtils";

const BLANK_EXTENSION_PATH = "/blank_extension.zip";

function assert(condition: unknown, message: string, object_log_on_failrue: any): asserts condition {
  if (!condition) {
    console.log("[ASSERT]", object_log_on_failrue)
    throw new Error(message);
  }
}

export default class Extension {
  languague: string;
  name: string;
  description: string;
  allowSave: boolean;
  hasIntroStartup: boolean;
  introText: string | null;

  constructor(extensionInfo: HTMLElement, introText: string | null) {
    this.languague = xmlUtils.getText(extensionInfo, "Languague") ?? "en-us";
    this.name = xmlUtils.getText(extensionInfo, "Name") ?? "NAME NOT FOUND";
    this.description =
      xmlUtils.getText(extensionInfo, "Description") ?? "DESCRIPTION NOT FOUND";
    this.allowSave = xmlUtils.getBool(extensionInfo, "allow_save") ?? true;
    this.hasIntroStartup =
      xmlUtils.getBool(extensionInfo, "hasIntroStartup") ?? false;

    this.introText = introText;

    console.log("extension", this);
  }

  public static async createExtension(zipFile: zip.ZipReader): Promise<Extension> {
    const files = await fileSystem.parseFromZipReader(zipFile);
    console.log("FILES", files)

    const extensionInfoFile = files.getFile("ExtensionInfo.xml");
    assert(extensionInfoFile instanceof fileSystem.File, "expected ExtensionInfo.xml to be a file.", extensionInfoFile);
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
