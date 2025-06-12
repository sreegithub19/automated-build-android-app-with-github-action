
          const wdio = require('webdriverio');
          const assert = require('assert');
          const fs = require('fs');

          describe('Android App Test', () => {
            let client;

            before(async () => {
              const capabilities = {
                platformName: 'Android',
                platformVersion: '11.0', // Or your desired Android version
                deviceName: 'emulator-5554', // This should match the emulator name
                app: '${{ github.workspace }}/app/build/outputs/apk/debug/app-debug.apk',
                automationName: 'UiAutomator2'
              };

              const appiumOptions = {
                hostname: '127.0.0.1',
                port: 4723,
                protocol: 'http',
                path: '/'
              };

              client = await wdio.remote(appiumOptions, capabilities);
            });

            after(async () => {
              if (client) {
                await client.deleteSession();
              }
            });

            it('should display welcome message', async () => {
              const helloElement = await client.$('//*[@text="Hello World from Actions!"]');
              await helloElement.waitForDisplayed({ timeout: 5000 });
              assert.strictEqual(await helloElement.isDisplayed(), true, 'Welcome message is not displayed');

              // Take a screenshot
              const screenshot = await client.takeScreenshot();
              fs.writeFileSync('welcome_message.png', screenshot, 'base64');
            });

            // Add more test cases as needed
          });