import * as xmlUtils from "./xmlUtils";

export default class Node {
  id: string;
  name = "No Name Given";
  ip: string | null = null;
  adminPass: string | null = null;
  accounts: { username: string; password: string; type: string }[] = [];
  ports: string[] = [];
  proxyTime: number | null = null;
  portsToCrack = 101;
  firewall: {
    level: number;
    solution: string | null;
    additionalTime: number;
  } | null = null;

  trace: number | null = null;
  // adminType: { type: string; resetPassword: boolean; isSuper: boolean } | null = null;
  // portOverwrites: { [key: number]: number } = {};
  tracker = false;

  constructor(id: string) {
    this.id = id;
  }

  public static loadFromXml(root: HTMLElement): Node {
    const node = new Node(root.getAttribute("id") ?? "NO ID FOUND");

    node.name = root.getAttribute("name") ?? "NO NAME FOUND";
    node.ip = root.getAttribute("ip");
    node.adminPass =
      root.getElementsByTagName("adminPass")[0]?.getAttribute("pass") ?? null;
    node.accounts = [...root.getElementsByTagName("account")].map((element) => {
      return {
        username: element.getAttribute("username") ?? "ERROR",
        password: element.getAttribute("password") ?? "ERROR",
        type: element.getAttribute("type") ?? "ALL",
      };
    });
    node.ports =
      root
        .getElementsByTagName("ports")[0]
        ?.innerHTML?.split(",")
        ?.map((port) => port.trim()) ?? [];
    const proxyElements = root.getElementsByTagName("proxy");
    if (proxyElements.length >= 1) {
      node.proxyTime = parseInt(proxyElements[0].getAttribute("time") ?? "-1");
    }
    node.portsToCrack = parseInt(
      root.getElementsByTagName("portsForCrack")[0]?.getAttribute("val") ?? "101"
    );
    const firewallElements = root.getElementsByTagName("firewall");
    if (firewallElements.length >= 1) {
      node.firewall = {
        level: parseInt(firewallElements[0].getAttribute("level") ?? "-1"),
        solution: firewallElements[0].getAttribute("solution") ?? null,
        additionalTime: parseFloat(
          firewallElements[0].getAttribute("additionalTime") ?? "0"
        ),
      };
    }
    node.trace = parseInt(
      root.getElementsByTagName("trace")[0]?.getAttribute("time") ?? "-1"
    );
    node.tracker = root.getElementsByTagName("tracker").length >= 1;

    return node;
  }
}
