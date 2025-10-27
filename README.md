# Random Integer Generator

## What is this project?

The **Random Integer Generator** is a minimal utility that simulates a dice roll or a number tumbler. It continuously generates and displays a random integer within a user-defined range (`From` and `To`).

It is designed for quick, visual randomization tasks, such as dice rolling, random team selection, or quick decision-making.

---

## How It Works

The application reads the minimum and maximum boundary values, sanitizes them, and runs an internal timer to generate and display the result.

### Input Fields

| Field | Restriction | Description |
| :--- | :--- | :--- |
| **From** | Integer | The minimum boundary of the range (inclusive). Automatically swapped with **To** if `From` > `To`. |
| **To** | Integer | The maximum boundary of the range (inclusive). |

### Calculation Logic

The core logic focuses on robustly determining the `min` and `max` values and then applying the standard inclusive random integer formula.

| Formula | Description | Simple Notation |
| :--- | :--- | :--- |
| **Input Sanitization** | Non-numeric or invalid inputs are treated as 0. | `Input` -> `parseInt()` -> `(isNaN) ? 0` |
| **Range Ordering** | Guarantees that the minimum value is always less than or equal to the maximum value. | If `From` > `To`, then `From` and `To` are swapped and the UI updated. |
| **Random Number** | The final number is generated inclusively within the determined range. | $\lfloor (\text{max} - \text{min} + 1) \times \text{random} \rfloor + \text{min}$ |

### Features

| Feature | Description |
| :--- | :--- |
| **Start** | Begins the continuous generation of random numbers with a standard refresh interval (125ms). |
| **Stop** | Clears the internal timer, halting the generation and freezing the last generated number on the display. |
| **Range Swap** | If the user inputs a minimum value greater than the maximum, the values are automatically swapped on the UI. |

---

### Output Display

| Element | Format | Purpose |
| :--- | :--- | :--- |
| **Display** | Integer | Shows the current or final random integer. |
