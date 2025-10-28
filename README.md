# Random Integer Generator

## What is this project?

The **Random Integer Generator** is a minimal utility that simulates a dice roll or a number tumbler. It continuously generates and displays a random integer within a user-defined range (`From` and `To`).

It's designed for quick, visual randomization tasks, such as dice rolling, random team selection, or quick decision-making.

---

## How It Works

The application reads the boundaries, applies strict sanitization (digits only), and runs an internal timer to generate the result. The core logic ensures a valid range is used for calculation, regardless of the input order.

### Input Fields

| Field | Restriction | Description |
| :--- | :--- | :--- |
| **From** | **Positive Integer (0 to 999999)** | The minimum boundary of the range (inclusive). Only positive digits are permitted, capped at 999999. |
| **To** | **Positive Integer (0 to 999999)** | The maximum boundary of the range (inclusive). Only positive digits are permitted, capped at 999999. |

### Calculation and Control Logic

The core logic handles three main states to determine the output, ensuring that the **UI inputs are never manipulated** (except for text sanitization).

| State | Condition | Action |
| :--- | :--- | :--- |
| **Empty/Invalid** | Both fields are empty. | Generator is blocked; **Display** shows `0`. |
| **Fixed Value** | `From` value equals `To` value. | Generator is blocked; **Display** shows the fixed value. |
| **Running Range** | `From` and `To` are valid and different. | The internal calculation uses the smaller value as `min` and the larger as `max`, regardless of the order entered in the UI. |

| Logic Detail | Description | Simple Notation |
| :--- | :--- | :--- |
| **Input Sanitization** | Non-digit characters are removed, and the value is **capped at 999999**. | `Input Text` -> `replace(/\D/g, '')` + `Max 999999` |
| **Range Ordering** | Guarantees that the minimum value is always less than or equal to the maximum value **internally**. | If `ValFrom` > `ValTo`, then `min` = `ValTo` and `max` = `ValFrom`. |
| **Random Number** | The final number is generated inclusively within the determined range. | `Floor((max - min + 1) * Math.random()) + min` |

### Features

| Feature | Description |
| :--- | :--- |
| **Start** | Begins the continuous generation of random numbers with a standard refresh interval (125ms). |
| **Stop** | Clears the internal timer, halting the generation and **freezing the last generated number** on the display. |
| **Non-Manipulative UX** | The input values are never altered (swapped or reset to 0) in the user interface; the ordering is handled internally by the application logic. |

---

### Output Display

| Element | Format | Purpose |
| :--- | :--- | :--- |
| **Display (While Stopped/Adjusting)** | Integer | Shows the **maximum value** of the defined range, or the value of a single filled input, or `0` if empty. |
| **Display (While Running)** | Integer | Shows the continuously generated random integer. |
