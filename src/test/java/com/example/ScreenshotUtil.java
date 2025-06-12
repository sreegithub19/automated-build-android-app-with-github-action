package com.example;

import io.appium.java_client.android.AndroidDriver;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;

import java.io.File;

public class ScreenshotUtil {

    public static void takeScreenshot(AndroidDriver driver, String fileName) {
        try {
            File screenshotDir = new File("screenshots");
                if (!screenshotDir.exists()) {
                    screenshotDir.mkdirs();
                }
            File srcFile = driver.getScreenshotAs(OutputType.FILE);
            FileUtils.copyFile(srcFile, new File("screenshots/" + fileName + ".png"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
