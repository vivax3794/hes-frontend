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
  allow_save: boolean;
  starts_with_tutorial: boolean;
  has_intro_startup: boolean;
  intro_screen: string | null;

  constructor(extension_info: HTMLElement, intro_screen: string | null) {
    this.languague = xmlUtils.get_text(extension_info, "Languague") ?? "en-us";
    this.name = xmlUtils.get_text(extension_info, "Name") ?? "NAME NOT FOUND";
    this.description =
      xmlUtils.get_text(extension_info, "Description") ?? "DESCRIPTION NOT FOUND";
    this.allow_save = xmlUtils.get_bool(extension_info, "all") ?? true;
    this.starts_with_tutorial =
      xmlUtils.get_bool(extension_info, "StartsWithTutorial") ?? false;
    this.has_intro_startup =
      xmlUtils.get_bool(extension_info, "HasIntroStartup") ?? false;

    this.intro_screen = intro_screen;

    console.log("extension", this);
  }

  public static async create_extension(zip_file: zip.ZipReader): Promise<Extension> {
    const root_files = await fileSystem.parse_from_zip_reader(zip_file);
    const files = root_files[0];
    assert(files instanceof fileSystem.Folder);

    const extension_info = files.get_file("ExtensionInfo.xml");
    assert(extension_info instanceof fileSystem.File);
    const extension_info_xml = await extension_info.read_xml();

    const intro_file = files.get_file("Intro.txt");
    let intro_text: string | null = null;
    if (intro_file instanceof fileSystem.File) {
      intro_text = await intro_file.read_text();
    }

    return new Extension(extension_info_xml, intro_text);
  }

  public static async create_blank_extension(): Promise<Extension> {
    const domain = location.origin;
    const file_url = domain + BLANK_EXTENSION_PATH;

    console.log(`loading blank extension from ${file_url}`);
    const zip_file = new zip.ZipReader(new zip.HttpReader(file_url));
    return await Extension.create_extension(zip_file);
  }
}
