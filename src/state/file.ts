import * as zip from "@zip.js/zip.js";

export class File {
  private readonly source_entry: zip.Entry;

  constructor(entry: zip.Entry) {
    this.source_entry = entry;
  }

  public get filename(): string {
    return this.source_entry.filename.split("/").splice(-1)[0];
  }

  public async read_text(): Promise<string> {
    if (this.source_entry.getData === undefined) {
      throw Error("getData undefined.");
    }

    return await this.source_entry.getData(new zip.TextWriter());
  }

  public async read_xml(): Promise<HTMLElement> {
    const xml_string = await this.read_text();
    const parser = new DOMParser();
    const document: XMLDocument = parser.parseFromString(xml_string, "application/xml");
    const xml = document.documentElement;

    console.log(`parsed xml document from ${this.filename}`, xml);
    return xml;
  }
}

export class Folder {
  private readonly source_entry: zip.Entry;
  readonly children: FilesystemItem[];

  constructor(self_entry: zip.Entry, children: FilesystemItem[]) {
    this.source_entry = self_entry;
    this.children = children;
  }

  public get filename(): string {
    return this.source_entry.filename;
  }

  public get_file(filename: string): FilesystemItem | null {
    const file = this.children.find((file) => file.filename === filename);
    if (file === undefined) return null;
    return file;
  }
}

export type FilesystemItem = File | Folder;

function get_entires_contained_in(entries: zip.Entry[], path: string): zip.Entry[] {
  return entries.filter(
    (entry) => entry.filename.startsWith(path) && entry.filename !== path
  );
}

export function parse_entries(entries: zip.Entry[], base_path: string): FilesystemItem[] {
  return entries
    .filter((entry) => {
      const parts = entry.filename.slice(base_path.length).split("/");
      return (parts.length === 2 && parts[1] === "") || parts.length === 1;
    })
    .map((entry) => {
      if (!entry.directory) return new File(entry);

      const new_base_path = entry.filename;
      const containing_entries = get_entires_contained_in(entries, new_base_path);
      return new Folder(entry, parse_entries(containing_entries, new_base_path));
    });
}

export async function parse_from_zip_reader(
  zip_file: zip.ZipReader
): Promise<FilesystemItem[]> {
  const entries = await zip_file.getEntries();
  return parse_entries(entries, "");
}
