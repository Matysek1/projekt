import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { exec } from "child_process";

export const powershellRouter = createTRPCRouter({
  runScript: publicProcedure
    .input(
      z.object({
        siteName: z.string(),
        physicalPath: z.string(),
        hostName: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      console.log("Running PowerShell script...");
      const { siteName, physicalPath, hostName } = input;
      const scriptPath = "C:\\web\\addwebsite.ps1";
      const command = `powershell -NoProfile -ExecutionPolicy Bypass -File "${scriptPath}" -SiteName "${siteName}" -PhysicalPath "${physicalPath}" -HostName "${hostName}"`;

      return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error("PowerShell Error:", error.message);
            reject(new Error(`Failed to run script: ${stderr || error.message}`));
          }

          if (stderr) {
            console.warn("PowerShell Warnings:", stderr);
          }

          resolve(stdout.trim());
        });
      });
    }),
});
