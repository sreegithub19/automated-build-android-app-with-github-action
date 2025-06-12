const wd = require('wd');
const fs = require('fs');
const path = require('path');

async function runTest() {
const driver = wd.promiseChainRemote("http://localhost:4723/wd/hub");

const desiredCaps = {
platformName: "Android",
deviceName: "emulator-5554",
automationName: "UiAutomator2",
appPackage: "com.example.helloworld",
appActivity: "com.example.helloworld.MainActivity",
noReset: true
};

try {
await driver.init(desiredCaps);
console.log("Appium driver connected.");

await driver.sleep(5000);

const screenshot = await driver.takeScreenshot();
const screenshotDir = path.resolve('screenshots');
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
}
const screenshotPath = path.join(screenshotDir, 'appium_screenshot.png');
fs.writeFileSync(screenshotPath, screenshot, 'base64');
console.log(`Screenshot saved to: ${screenshotPath}`);

} catch (err) {
console.error("Appium test failed:", err);
process.exit(1);
} finally {
await driver.quit();
console.log("Appium driver quit.");
}
}

runTest();