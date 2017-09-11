import org.openqa.selenium.WebDriver; 
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import junit.framework.Assert;

import org.openqa.selenium.By; 
import org.openqa.selenium.WebElement; 

public class SampleTest {
	@SuppressWarnings("deprecation")
	
	public static void main(String[] args){
		System.setProperty("webdriver.gecko.driver","C:/Users/parit/Documents/UX/Healthcare/healthcare-ux/geckodriver.exe");
		WebDriver driver = new FirefoxDriver();
		driver.get("http://localhost:8000/login.html");
		System.out.println("Connection established");
		WebElement usernameElement = driver.findElement(By.id("inputEmail3")); 
		WebElement passwordElement = driver.findElement(By.id("inputPassword3"));
		WebElement formElement = driver.findElement(By.id("loginForm"));
		usernameElement.sendKeys("user");
		passwordElement.sendKeys("password");
		formElement.submit();        // submit by form element
		WebDriverWait wait = new WebDriverWait(driver, 10);
	    WebElement messageElement = wait.until(
	           ExpectedConditions.presenceOfElementLocated(By.id("myPlan"))
	            );
	 
	    // Run a test
	    String message                 = messageElement.getText();
	    String successMsg             = "Plan Name";
	    Assert.assertEquals (message, successMsg);
	 
	    // Conclude a test
	    driver.quit();
	}

}
