# kcc.js

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

   [color_scheme]
   background_opacity = 0.6

   [window_layout]
   hide_window_decorations = "yes"

   [text_cursor]
   cursor = "#ff0000"

   ```

1. Use the cli tool `kcc.js` to convert the TOML file into `kitty.conf`.

   ```bash
    cd path/to/kitty; kcc --file .   

                    or

    cd path/to/kitty; kcc --file ./config.toml
   ```

1. Your converted `kitty.conf` file will be ready for use with the Kitty terminal.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/suvanshenoy/kcc.js.git
   cd kcc.js/kcc
   ```

1. **Generate kcc binary**:

   #### Using npm

   Run the following command in the project directory:

   ```bash
   bun prod:gen
   ```


