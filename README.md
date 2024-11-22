## kcc.js

## What is it?
kcc stands for "Kitty Configuration Convert". This tool automates the process of creating a kitty.conf configuration file. Simply write your desired configuration in a TOML file, and this tool will convert the TOML format into a kitty.conf format.

## Features
- Easy conversion from TOML to `kitty.conf`.
- Simplifies the management of Kitty terminal configurations.

## How to Use
1. Write your configuration in a TOML file (ex: `config.toml`) in your kitty directory.
   Example `config.toml`:
   ```toml
   # Example TOML configuration for Kitty terminal
   [font]
   family = "JetBrains Mono"
   size = 12.0
   
   [window]
   background_opacity = 1.0
   hide_window_decorations = "yes"
   
   [colors]
   background = "#000000"
   foreground = "#f8f8f2"
   cursor_color = "#ffb86c"

2. Use the cli tool `kcc.js` to convert the TOML file into `kitty.conf`.
   ```bash
    cd path/to/kitty; kcc -f .   

                    or

    cd path/to/kitty; kcc -f <toml_filename>
   ```

3. Your converted `kitty.conf` file will be ready for use with the Kitty terminal.


## Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/suvanshenoy/kcc.js.git
   cd kcc.js/kcc
   ```
2. **Link the package**:

   #### Using npm
   Run the following command in the project directory:
   ```bash
   npm link && npm i
   ```

   #### Using bun
   Run the following command in the project directory:
   ```bash
   bun link && bun i
   ```

   #### Using pnpm
   Run the following command in the project directory:
   ```bash
   pnpm link && pnpm i
   ```


