// Temperature Converter JavaScript

class TemperatureConverter {
  constructor() {
    this.temperatureInput = document.getElementById("temperature-input");
    this.fromUnit = document.getElementById("from-unit");
    this.toUnit = document.getElementById("to-unit");
    this.convertBtn = document.getElementById("convert-btn");
    this.resultDisplay = document.getElementById("result-display");
    this.errorMessage = document.getElementById("error-message");

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Convert button click event
    this.convertBtn.addEventListener("click", () => this.convertTemperature());

    // Enter key press in input field
    this.temperatureInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.convertTemperature();
      }
    });

    // Clear error message when user starts typing
    this.temperatureInput.addEventListener("input", () => {
      this.clearError();
    });

    // Prevent selecting the same unit for both from and to
    this.fromUnit.addEventListener("change", () => this.handleUnitChange());
    this.toUnit.addEventListener("change", () => this.handleUnitChange());
  }

  handleUnitChange() {
    // If both units are the same, automatically switch the "to" unit
    if (this.fromUnit.value === this.toUnit.value) {
      const options = ["celsius", "fahrenheit", "kelvin"];
      const currentFrom = this.fromUnit.value;
      const availableOptions = options.filter(
        (option) => option !== currentFrom
      );
      this.toUnit.value = availableOptions[0];
    }
  }

  validateInput(value) {
    // Check if input is empty
    if (value.trim() === "") {
      throw new Error("Please enter a temperature value.");
    }

    // Check if input is a valid number
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      throw new Error("Please enter a valid number.");
    }

    // Check for absolute zero violations
    const fromUnit = this.fromUnit.value;
    if (fromUnit === "celsius" && numValue < -273.15) {
      throw new Error("Temperature cannot be below absolute zero (-273.15°C).");
    }
    if (fromUnit === "fahrenheit" && numValue < -459.67) {
      throw new Error("Temperature cannot be below absolute zero (-459.67°F).");
    }
    if (fromUnit === "kelvin" && numValue < 0) {
      throw new Error("Temperature cannot be below absolute zero (0K).");
    }

    return numValue;
  }

  // Conversion functions
  celsiusToFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
  }

  celsiusToKelvin(celsius) {
    return celsius + 273.15;
  }

  fahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
  }

  fahrenheitToKelvin(fahrenheit) {
    return this.celsiusToKelvin(this.fahrenheitToCelsius(fahrenheit));
  }

  kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
  }

  kelvinToFahrenheit(kelvin) {
    return this.celsiusToFahrenheit(this.kelvinToCelsius(kelvin));
  }

  convertTemperature() {
    try {
      // Clear previous error
      this.clearError();

      // Get and validate input
      const inputValue = this.temperatureInput.value;
      const temperature = this.validateInput(inputValue);

      // Get selected units
      const fromUnit = this.fromUnit.value;
      const toUnit = this.toUnit.value;

      // If units are the same, just display the same value
      if (fromUnit === toUnit) {
        this.displayResult(temperature, fromUnit, toUnit);
        return;
      }

      // Perform conversion
      let convertedTemp;

      switch (fromUnit) {
        case "celsius":
          if (toUnit === "fahrenheit") {
            convertedTemp = this.celsiusToFahrenheit(temperature);
          } else if (toUnit === "kelvin") {
            convertedTemp = this.celsiusToKelvin(temperature);
          }
          break;

        case "fahrenheit":
          if (toUnit === "celsius") {
            convertedTemp = this.fahrenheitToCelsius(temperature);
          } else if (toUnit === "kelvin") {
            convertedTemp = this.fahrenheitToKelvin(temperature);
          }
          break;

        case "kelvin":
          if (toUnit === "celsius") {
            convertedTemp = this.kelvinToCelsius(temperature);
          } else if (toUnit === "fahrenheit") {
            convertedTemp = this.kelvinToFahrenheit(temperature);
          }
          break;
      }

      // Display the result
      this.displayResult(convertedTemp, fromUnit, toUnit, temperature);
    } catch (error) {
      this.displayError(error.message);
    }
  }

  displayResult(convertedTemp, fromUnit, toUnit, originalTemp = null) {
    // Format the temperature to 2 decimal places, but remove trailing zeros
    const formatted = parseFloat(convertedTemp.toFixed(2));

    // Get unit symbols
    const getUnitSymbol = (unit) => {
      switch (unit) {
        case "celsius":
          return "°C";
        case "fahrenheit":
          return "°F";
        case "kelvin":
          return "K";
        default:
          return "";
      }
    };

    // Create result message
    let resultMessage;
    if (originalTemp !== null) {
      const originalFormatted = parseFloat(originalTemp.toFixed(2));
      resultMessage = `${originalFormatted}${getUnitSymbol(
        fromUnit
      )} = ${formatted}${getUnitSymbol(toUnit)}`;
    } else {
      resultMessage = `${formatted}${getUnitSymbol(toUnit)}`;
    }

    // Display with animation
    this.resultDisplay.textContent = resultMessage;
    this.resultDisplay.classList.add("show");

    // Add some fun facts for common temperatures
    this.addTemperatureFact(convertedTemp, toUnit);
  }

  addTemperatureFact(temp, unit) {
    let fact = "";

    // Convert to Celsius for comparison
    let celsiusTemp = temp;
    if (unit === "fahrenheit") {
      celsiusTemp = this.fahrenheitToCelsius(temp);
    } else if (unit === "kelvin") {
      celsiusTemp = this.kelvinToCelsius(temp);
    }

    if (Math.abs(celsiusTemp - 0) < 0.1) {
      fact = "❄️ That's the freezing point of water!";
    } else if (Math.abs(celsiusTemp - 100) < 0.1) {
      fact = "💨 That's the boiling point of water!";
    } else if (celsiusTemp < -200) {
      fact = "🥶 That's extremely cold - colder than liquid nitrogen!";
    } else if (celsiusTemp > 1000) {
      fact = "🔥 That's extremely hot - hot enough to melt copper!";
    } else if (celsiusTemp >= 36 && celsiusTemp <= 38) {
      fact = "🌡️ That's around normal human body temperature!";
    } else if (celsiusTemp >= 20 && celsiusTemp <= 25) {
      fact = "🌤️ That's comfortable room temperature!";
    }

    if (fact) {
      setTimeout(() => {
        this.resultDisplay.innerHTML += `<br><small style="font-size: 0.9rem; opacity: 0.9;">${fact}</small>`;
      }, 300);
    }
  }

  displayError(message) {
    this.errorMessage.textContent = message;
    this.resultDisplay.classList.remove("show");

    // Clear error after 5 seconds
    setTimeout(() => {
      this.clearError();
    }, 5000);
  }

  clearError() {
    this.errorMessage.textContent = "";
  }
}

// Initialize the converter when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new TemperatureConverter();
});

// Add some keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + Enter to convert
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    document.getElementById("convert-btn").click();
  }
});
