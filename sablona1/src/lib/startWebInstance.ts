import { spawn } from "child_process";
import path from "path";

export const startWebInstance = (folderName: string) => {
  const fullPath = path.join("C:\\Users\\Administrator\\Desktop\\server", folderName);
  console.log("Spouštím webovou instanci pro:", fullPath);

  const child = spawn("npm", ["run", "start"], {
    cwd: fullPath,
    shell: true,
    detached: false,
    stdio: "inherit",
    env: {
      ...process.env,
      DATABASE_URL: path.join("mysql://root:@localhost:3306/web1", folderName),
    }
  });

  child.on("error", (err) => {
    console.error("Chyba při spouštění:", err);
  });

  child.on("exit", (code) => {
    console.log(`Proces ${folderName} skončil s kódem ${code}`);
  });
};