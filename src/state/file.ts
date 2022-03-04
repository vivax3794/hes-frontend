import * as zip from "@zip.js/zip.js";

// eslint-disable-next-line
export type FilesystemItem = File | Folder;

export class File {
  private readonly sourceEntry: zip.Entry;

  constructor(entry: zip.Entry) {
    this.sourceEntry = entry;
  }

  public get filename(): string {
    return this.sourceEntry.filename.split("/").splice(-1)[0];
  }

  public async readText(): Promise<string> {
    if (this.sourceEntry.getData === undefined) {
      throw Error("getData undefined.");
    }

    return await this.sourceEntry.getData(new zip.TextWriter());
  }

  public async textXml(): Promise<HTMLElement> {
    const xmlString = await this.readText();
    const parser = new DOMParser();
    const document: XMLDocument = parser.parseFromString(xmlString, "application/xml");
    const xml = document.documentElement;

    console.log(`parsed xml document from ${this.filename}`, xml);
    return xml;
  }
}
export class Folder {
  private readonly sourceEntry: zip.Entry | null;
  filename_overwrite: string | null;
  readonly children: FilesystemItem[];

  constructor(selfEntry: zip.Entry | null, children: FilesystemItem[], filename_overwrite: string | null = null) {
    this.sourceEntry = selfEntry;
    this.filename_overwrite = filename_overwrite;
    this.children = children;
  }

  public get filename(): string {
    if (this.filename_overwrite) return this.filename_overwrite;

    return this.sourceEntry!.filename;
  }

  public getFile(filename: string): FilesystemItem | null {
    const file = this.children.find((file) => file.filename === filename);
    if (file === undefined) return null;
    return file;
  }
}

function getEntiresContainedIn(entries: zip.Entry[], path: string): zip.Entry[] {
  return entries.filter(
    (entry) => entry.filename.startsWith(path) && entry.filename !== path
  );
}

export function parseEntries(entries: zip.Entry[], basePath: string): FilesystemItem[] {
  console.log("parseEntries", entries, basePath);

  return entries
    .filter((entry) => {
      const parts = entry.filename.slice(basePath.length).split("/");
      return (parts.length === 2 && parts[1] === "") || parts.length === 1;
    })
    .map((entry) => {
      if (!entry.directory) return new File(entry);

      const newBasePath = entry.filename;
      const containingEntries = getEntiresContainedIn(entries, newBasePath);
      return new Folder(entry, parseEntries(containingEntries, newBasePath));
    });
}

export async function parseFromZipReader(
  zipFile: zip.ZipReader
): Promise<Folder> {
  const entries = await zipFile.getEntries();
  console.log("ZIP ENTRIES", entries);
  const folder_name = entries[0].filename.split("/")[0] + "/";
  return new Folder(null, parseEntries(getEntiresContainedIn(entries, folder_name), folder_name), folder_name);
}
