import * as zip from "@zip.js/zip.js";
import * as fileSystem from "./file";
import * as xmlUtils from "./xmlUtils";
import Node from "./node";

const BLANK_EXTENSION_PATH = window.location.origin + "/blank_extension.zip";

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

  nodes: { [key: string]: Node } = {};

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
    const extensionInfo = await extensionInfoFile.readXml();

    const introFile = files.getFile("Intro.txt");
    let introText: string | null = null;
    if (introFile instanceof fileSystem.File) {
      introText = await introFile.readText();
    }

    const ext = new Extension(extensionInfo, introText);

    // Load nodes
    async function loadNodes(file: fileSystem.FilesystemItem) {
      if (file instanceof fileSystem.Folder) {
        for (let item of file.children) {
          await loadNodes(item);
        }
      } else {
        const xml = await file.readXml();
        const node = Node.loadFromXml(xml);
        ext.nodes[node.id] = node;
      }
    }

    const nodesFolder = files.getFile("Nodes");
    if (nodesFolder === null) throw Error("Nodes folder not found");
    await loadNodes(nodesFolder);

    console.log(ext.nodes);

    return ext;
  }

  public static async createBlankExtension(): Promise<Extension> {
    console.log(`loading blank extension from ${BLANK_EXTENSION_PATH}`);
    const zipFile = new zip.ZipReader(new zip.HttpReader(BLANK_EXTENSION_PATH));
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
