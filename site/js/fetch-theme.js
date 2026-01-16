/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
FILE: fetch-theme.js

DESCRIPTION: Sets up theme variables for Bulma based on user editable settings in
_data/theme.json. Reads the default Bulma variable settings from
variables-default.scss, replaces any variables that have been set in the
theme data file, and writes the result to variables.scss, which is used
when compiling the final CSS.
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/



const fs = require('fs');

// Read user editable theme colors from _data/theme.json
fs.readFile('./site/_data/theme.json', 'utf8', function(err, dataFile){
    
    if(err){
        console.log(err);
        return;
    }
    
    dataFile = JSON.parse(dataFile);
      
    /* There can be multiple themes set in the _data/theme.json file. This file always selects the first
    theme item in this file and ignores the rest. The choice of selected theme can be set by reordering
    the items in this file (_data/theme.json) via the CloudCannon admin interface. */
    var theme = dataFile.theme[0];

    /* The variables-default.scss file holds all the default Bulma variable settings.
    This file is parsed, replacing any variables that have been set in the theme data file,
    and the result is saved to variables.scss */
    fs.readFile('./site/css/variables-default.scss', 'utf-8', function (err, scssFile) {
    
        if(err){
            console.log(err);
            return;
        }
    
        var replaced = scssFile;

        /* Only replace variable values if 'use_default_theme' is set to 'false'.
        Otherwise keep all the default values so 'variables.scss' will be identical to 'variables-default.scss'. */
        if (dataFile.use_default_theme === false) {
            
            // FONTS
            
            if (theme.primary_font_family) {
                const replacementString = theme.primary_font_family;
                replaced = replaced.replace(/--bulma-family-primary: .*/g, ('--bulma-family-primary: ' + replacementString + ';'));
            }
            if (theme.secondary_font_family) {
                const replacementString = theme.secondary_font_family;
                replaced = replaced.replace(/--bulma-family-secondary: .*/g, ('--bulma-family-secondary: ' + replacementString + ';'));
            }
            if (theme.navigation_font_family) {
                const replacementString = theme.navigation_font_family;
                replaced = replaced.replace(/\$family-navigation: .*/g, ('$family-navigation: ' + replacementString + ';'));
            }
            if (theme.body_line_height) {
                const replacementString = theme.body_line_height;
                replaced = replaced.replace(/--bulma-body-line-height: .*/g, ('--bulma-body-line-height: ' + replacementString + ';'));
            }
            
            // NAVBAR
            
            if (theme.navbar.background_color) {
                const replacementString = theme.navbar.background_color;
                replaced = replaced.replace(/\$navbar-background-color: .*/g, ('$navbar-background-color: ' + replacementString + ';'));
            }
            if (theme.navbar.link_color) {
                const replacementString = theme.navbar.link_color;
                replaced = replaced.replace(/\$navbar-link-color: .*/g, ('$navbar-link-color: ' + replacementString + ';'));
            }
            if (theme.navbar.active_link_color) {
                const replacementString = theme.navbar.active_link_color;
                replaced = replaced.replace(/\$navbar-active-link-color: .*/g, ('$navbar-active-link-color: ' + replacementString + ';'));
            }
            if (theme.navbar.active_link_background_color) {
                const replacementString = theme.navbar.active_link_background_color;
                replaced = replaced.replace(/\$navbar-active-link-background-color: .*/g, ('$navbar-active-link-background-color: ' + replacementString + ';'));
            }
            if (theme.navbar.dropdown_background_color) {
                const replacementString = theme.navbar.dropdown_background_color;
                replaced = replaced.replace(/\$navbar-dropdown-background-color: .*/g, ('$navbar-dropdown-background-color: ' + replacementString + ';'));
            }
            
            // DEFAULT COLOURS (NON-COMPONENT COPY)
            
            if (theme.main_background_color) {
                const replacementString = theme.main_background_color;
                replaced = replaced.replace(/\$main-background-color: .*/g, ('$main-background-color: ' + replacementString + ';'));
            } 
            if (theme.content.text_color) {
                const replacementString = theme.content.text_color;
                replaced = replaced.replace(/--bulma-body-color: .*/g, ('--bulma-body-color: ' + replacementString + ';'));
            }
            if (theme.content.heading_color) {
                const replacementString = theme.content.heading_color;
                replaced = replaced.replace(/\$heading-color: .*/g, ('$heading-color: ' + replacementString + ';'));
            }
            if (theme.content.button_background_color) {
                const replacementString = theme.content.button_background_color;
                replaced = replaced.replace(/\$button-background-color: .*/g, ('$button-background-color: ' + replacementString + ';'));
            }
            if (theme.content.button_color) {
                const replacementString = theme.content.button_color;
                replaced = replaced.replace(/\$button-color: .*/g, ('$button-color: ' + replacementString + ';'));
            }
            if (theme.content.link_color) {
                const replacementString = theme.content.link_color;
                replaced = replaced.replace(/--bulma-link: .*/g, ('--bulma-link: ' + replacementString + ';'));
            }
            
            // LIGHTEST THEME
            
            if (theme.components.lightest.background_color) {
                const replacementString = theme.components.lightest.background_color;
                replaced = replaced.replace(/\$lightest-theme-background-color: .*/g, ('$lightest-theme-background-color: ' + replacementString + ';'));
            }
            if (theme.components.lightest.text_color) {
                const replacementString = theme.components.lightest.text_color;
                replaced = replaced.replace(/\$lightest-theme-text-color: .*/g, ('$lightest-theme-text-color: ' + replacementString + ';'));
            }
            if (theme.components.lightest.heading_color) {
                const replacementString = theme.components.lightest.heading_color;
                replaced = replaced.replace(/\$lightest-theme-heading-color: .*/g, ('$lightest-theme-heading-color: ' + replacementString + ';'));
            }
            if (theme.components.lightest.button_background_color) {
                const replacementString = theme.components.lightest.button_background_color;
                replaced = replaced.replace(/\$lightest-theme-button-background-color: .*/g, ('$lightest-theme-button-background-color: ' + replacementString + ';'));
            }
            if (theme.components.lightest.button_color) {
                const replacementString = theme.components.lightest.button_color;
                replaced = replaced.replace(/\$lightest-theme-button-color: .*/g, ('$lightest-theme-button-color: ' + replacementString + ';'));
            }
            if (theme.components.lightest.link_color) {
                const replacementString = theme.components.lightest.link_color;
                replaced = replaced.replace(/\$lightest-theme-link-color: .*/g, ('$lightest-theme-link-color: ' + replacementString + ';'));
            }
            if (theme.components.lightest.table_header_background_color) {
                const replacementString = theme.components.lightest.table_header_background_color;
                replaced = replaced.replace(/\$lightest-theme-table-header-background-color: .*/g, ('$lightest-theme-table-header-background-color: ' + replacementString + ';'));
            }
            if (theme.components.lightest.table_row_odd_background_color) {
                const replacementString = theme.components.lightest.table_row_odd_background_color;
                replaced = replaced.replace(/\$lightest-theme-table-row-odd-background-color: .*/g, ('$lightest-theme-table-row-odd-background-color: ' + replacementString + ';'));
            }
            if (theme.components.lightest.table_row_even_background_color) {
                const replacementString = theme.components.lightest.table_row_even_background_color;
                replaced = replaced.replace(/\$lightest-theme-table-row-even-background-color: .*/g, ('$lightest-theme-table-row-even-background-color: ' + replacementString + ';'));
            }
            
            // LIGHTER THEME
            
            if (theme.components.lighter.background_color) {
                const replacementString = theme.components.lighter.background_color;
                replaced = replaced.replace(/\$lighter-theme-background-color: .*/g, ('$lighter-theme-background-color: ' + replacementString + ';'));
            }
            if (theme.components.lighter.text_color) {
                const replacementString = theme.components.lighter.text_color;
                replaced = replaced.replace(/\$lighter-theme-text-color: .*/g, ('$lighter-theme-text-color: ' + replacementString + ';'));
            }
            if (theme.components.lighter.heading_color) {
                const replacementString = theme.components.lighter.heading_color;
                replaced = replaced.replace(/\$lighter-theme-heading-color: .*/g, ('$lighter-theme-heading-color: ' + replacementString + ';'));
            }
            if (theme.components.lighter.button_background_color) {
                const replacementString = theme.components.lighter.button_background_color;
                replaced = replaced.replace(/\$lighter-theme-button-background-color: .*/g, ('$lighter-theme-button-background-color: ' + replacementString + ';'));
            }
            if (theme.components.lighter.button_color) {
                const replacementString = theme.components.lighter.button_color;
                replaced = replaced.replace(/\$lighter-theme-button-color: .*/g, ('$lighter-theme-button-color: ' + replacementString + ';'));
            }
            if (theme.components.lighter.link_color) {
                const replacementString = theme.components.lighter.link_color;
                replaced = replaced.replace(/\$lighter-theme-link-color: .*/g, ('$lighter-theme-link-color: ' + replacementString + ';'));
            }
            if (theme.components.lighter.table_header_background_color) {
                const replacementString = theme.components.lighter.table_header_background_color;
                replaced = replaced.replace(/\$lighter-theme-table-header-background-color: .*/g, ('$lighter-theme-table-header-background-color: ' + replacementString + ';'));
            }
            if (theme.components.lighter.table_row_odd_background_color) {
                const replacementString = theme.components.lighter.table_row_odd_background_color;
                replaced = replaced.replace(/\$lighter-theme-table-row-odd-background-color: .*/g, ('$lighter-theme-table-row-odd-background-color: ' + replacementString + ';'));
            }
            if (theme.components.lighter.table_row_even_background_color) {
                const replacementString = theme.components.lighter.table_row_even_background_color;
                replaced = replaced.replace(/\$lighter-theme-table-row-even-background-color: .*/g, ('$lighter-theme-table-row-even-background-color: ' + replacementString + ';'));
            }
            
            // LIGHT THEME
            
            if (theme.components.light.background_color) {
                const replacementString = theme.components.light.background_color;
                replaced = replaced.replace(/\$light-theme-background-color: .*/g, ('$light-theme-background-color: ' + replacementString + ';'));
            }
            if (theme.components.light.text_color) {
                const replacementString = theme.components.light.text_color;
                replaced = replaced.replace(/\$light-theme-text-color: .*/g, ('$light-theme-text-color: ' + replacementString + ';'));
            }
            if (theme.components.light.heading_color) {
                const replacementString = theme.components.light.heading_color;
                replaced = replaced.replace(/\$light-theme-heading-color: .*/g, ('$light-theme-heading-color: ' + replacementString + ';'));
            }
            if (theme.components.light.button_background_color) {
                const replacementString = theme.components.light.button_background_color;
                replaced = replaced.replace(/\$light-theme-button-background-color: .*/g, ('$light-theme-button-background-color: ' + replacementString + ';'));
            }
            if (theme.components.light.button_color) {
                const replacementString = theme.components.light.button_color;
                replaced = replaced.replace(/\$light-theme-button-color: .*/g, ('$light-theme-button-color: ' + replacementString + ';'));
            }
            if (theme.components.light.link_color) {
                const replacementString = theme.components.light.link_color;
                replaced = replaced.replace(/\$light-theme-link-color: .*/g, ('$light-theme-link-color: ' + replacementString + ';'));
            }
            if (theme.components.light.table_header_background_color) {
                const replacementString = theme.components.light.table_header_background_color;
                replaced = replaced.replace(/\$light-theme-table-header-background-color: .*/g, ('$light-theme-table-header-background-color: ' + replacementString + ';'));
            }
            if (theme.components.light.table_row_odd_background_color) {
                const replacementString = theme.components.light.table_row_odd_background_color;
                replaced = replaced.replace(/\$light-theme-table-row-odd-background-color: .*/g, ('$light-theme-table-row-odd-background-color: ' + replacementString + ';'));
            }
            if (theme.components.light.table_row_even_background_color) {
                const replacementString = theme.components.light.table_row_even_background_color;
                replaced = replaced.replace(/\$light-theme-table-row-even-background-color: .*/g, ('$light-theme-table-row-even-background-color: ' + replacementString + ';'));
            }
            
            // DARK THEME
            
            if (theme.components.dark.background_color) {
                const replacementString = theme.components.dark.background_color;
                replaced = replaced.replace(/\$dark-theme-background-color: .*/g, ('$dark-theme-background-color: ' + replacementString + ';'));
            }
            if (theme.components.dark.text_color) {
                const replacementString = theme.components.dark.text_color;
                replaced = replaced.replace(/\$dark-theme-text-color: .*/g, ('$dark-theme-text-color: ' + replacementString + ';'));
            }
            if (theme.components.dark.heading_color) {
                const replacementString = theme.components.dark.heading_color;
                replaced = replaced.replace(/\$dark-theme-heading-color: .*/g, ('$dark-theme-heading-color:' + replacementString + ';'));
            }
            if (theme.components.dark.button_background_color) {
                const replacementString = theme.components.dark.button_background_color;
                replaced = replaced.replace(/\$dark-theme-button-background-color: .*/g, ('$dark-theme-button-background-color: ' + replacementString + ';'));
            }
            if (theme.components.dark.button_color) {
                const replacementString = theme.components.dark.button_color;
                replaced = replaced.replace(/\$dark-theme-button-color: .*/g, ('$dark-theme-button-color: ' + replacementString + ';'));
            }
            if (theme.components.dark.link_color) {
                const replacementString = theme.components.dark.link_color;
                replaced = replaced.replace(/\$dark-theme-link-color: .*/g, ('$dark-theme-link-color: ' + replacementString + ';'));
            }
            if (theme.components.dark.table_header_background_color) {
                const replacementString = theme.components.dark.table_header_background_color;
                replaced = replaced.replace(/\$dark-theme-table-header-background-color: .*/g, ('$dark-theme-table-header-background-color: ' + replacementString + ';'));
            }
            if (theme.components.dark.table_row_odd_background_color) {
                const replacementString = theme.components.dark.table_row_odd_background_color;
                replaced = replaced.replace(/\$dark-theme-table-row-odd-background-color: .*/g, ('$dark-theme-table-row-odd-background-color: ' + replacementString + ';'));
            }
            if (theme.components.dark.table_row_even_background_color) {
                const replacementString = theme.components.dark.table_row_even_background_color;
                replaced = replaced.replace(/\$dark-theme-table-row-even-background-color: .*/g, ('$dark-theme-table-row-even-background-color: ' + replacementString + ';'));
            }
            
            // DARKER THEME
            
            if (theme.components.darker.background_color) {
                const replacementString = theme.components.darker.background_color;
                replaced = replaced.replace(/\$darker-theme-background-color: .*/g, ('$darker-theme-background-color: ' + replacementString + ';'));
            }
            if (theme.components.darker.text_color) {
                const replacementString = theme.components.darker.text_color;
                replaced = replaced.replace(/\$darker-theme-text-color: .*/g, ('$darker-theme-text-color: ' + replacementString + ';'));
            }
            if (theme.components.darker.heading_color) {
                const replacementString = theme.components.darker.heading_color;
                replaced = replaced.replace(/\$darker-theme-heading-color: .*/g, ('$darker-theme-heading-color: ' + replacementString + ';'));
            }
            if (theme.components.darker.button_background_color) {
                const replacementString = theme.components.darker.button_background_color;
                replaced = replaced.replace(/\$darker-theme-button-background-color: .*/g, ('$darker-theme-button-background-color: ' + replacementString + ';'));
            }
            if (theme.components.darker.button_color) {
                const replacementString = theme.components.darker.button_color;
                replaced = replaced.replace(/\$darker-theme-button-color: .*/g, ('$darker-theme-button-color: ' + replacementString + ';'));
            }
            if (theme.components.darker.link_color) {
                const replacementString = theme.components.darker.link_color;
                replaced = replaced.replace(/\$darker-theme-link-color: .*/g, ('$darker-theme-link-color: ' + replacementString + ';'));
            }
            if (theme.components.darker.table_header_background_color) {
                const replacementString = theme.components.darker.table_header_background_color;
                replaced = replaced.replace(/\$darker-theme-table-header-background-color: .*/g, ('$darker-theme-table-header-background-color: ' + replacementString + ';'));
            }
            if (theme.components.darker.table_row_odd_background_color) {
                const replacementString = theme.components.darker.table_row_odd_background_color;
                replaced = replaced.replace(/\$darker-theme-table-row-odd-background-color: .*/g, ('$darker-theme-table-row-odd-background-color: ' + replacementString + ';'));
            }
            if (theme.components.darker.table_row_even_background_color) {
                const replacementString = theme.components.darker.table_row_even_background_color;
                replaced = replaced.replace(/\$darker-theme-table-row-even-background-color: .*/g, ('$darker-theme-table-row-even-background-color: ' + replacementString + ';'));
            }
            
            // DARKEST THEME
            
            if (theme.components.darkest.background_color) {
                const replacementString = theme.components.darkest.background_color;
                replaced = replaced.replace(/\$darkest-theme-background-color: .*/g, ('$darkest-theme-background-color: ' + replacementString + ';'));
            }
            if (theme.components.darkest.text_color) {
                const replacementString = theme.components.darkest.text_color;
                replaced = replaced.replace(/\$darkest-theme-text-color: .*/g, ('$darkest-theme-text-color: ' + replacementString + ';'));
            }
            if (theme.components.darkest.heading_color) {
                const replacementString = theme.components.darkest.heading_color;
                replaced = replaced.replace(/\$darkest-theme-heading-color: .*/g, ('$darkest-theme-heading-color: ' + replacementString + ';'));
            }
            if (theme.components.darkest.button_background_color) {
                const replacementString = theme.components.darkest.button_background_color;
                replaced = replaced.replace(/\$darkest-theme-button-background-color: .*/g, ('$darkest-theme-button-background-color: ' + replacementString + ';'));
            }
            if (theme.components.darkest.button_color) {
                const replacementString = theme.components.darkest.button_color;
                replaced = replaced.replace(/\$darkest-theme-button-color: .*/g, ('$darkest-theme-button-color: ' + replacementString + ';'));
            }
            if (theme.components.darkest.link_color) {
                const replacementString = theme.components.darkest.link_color;
                replaced = replaced.replace(/\$darkest-theme-link-color: .*/g, ('$darkest-theme-link-color: ' + replacementString + ';'));
            }
            if (theme.components.darkest.table_header_background_color) {
                const replacementString = theme.components.darkest.table_header_background_color;
                replaced = replaced.replace(/\$darkest-theme-table-header-background-color: .*/g, ('$darkest-theme-table-header-background-color: ' + replacementString + ';'));
            }
            if (theme.components.darkest.table_row_odd_background_color) {
                const replacementString = theme.components.darkest.table_row_odd_background_color;
                replaced = replaced.replace(/\$darkest-theme-table-row-odd-background-color: .*/g, ('$darkest-theme-table-row-odd-background-color: ' + replacementString + ';'));
            }
            if (theme.components.darkest.table_row_even_background_color) {
                const replacementString = theme.components.darkest.table_row_even_background_color;
                replaced = replaced.replace(/\$darkest-theme-table-row-even-background-color: .*/g, ('$darkest-theme-table-row-even-background-color: ' + replacementString + ';'));
            }
            
            // ALTERNATE 1 THEME
            
            if (theme.components.alternate_1.background_color) {
                const replacementString = theme.components.alternate_1.background_color;
                replaced = replaced.replace(/\$alternate-1-theme-background-color: .*/g, ('$alternate-1-theme-background-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_1.text_color) {
                const replacementString = theme.components.alternate_1.text_color;
                replaced = replaced.replace(/\$alternate-1-theme-text-color: .*/g, ('$alternate-1-theme-text-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_1.heading_color) {
                const replacementString = theme.components.alternate_1.heading_color;
                replaced = replaced.replace(/\$alternate-1-theme-heading-color: .*/g, ('$alternate-1-theme-heading-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_1.button_background_color) {
                const replacementString = theme.components.alternate_1.button_background_color;
                replaced = replaced.replace(/\$alternate-1-theme-button-background-color: .*/g, ('$alternate-1-theme-button-background-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_1.button_color) {
                const replacementString = theme.components.alternate_1.button_color;
                replaced = replaced.replace(/\$alternate-1-theme-button-color: .*/g, ('$alternate-1-theme-button-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_1.link_color) {
                const replacementString = theme.components.alternate_1.link_color;
                replaced = replaced.replace(/\$alternate-1-theme-link-color: .*/g, ('$alternate-1-theme-link-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_1.table_header_background_color) {
                const replacementString = theme.components.alternate_1.table_header_background_color;
                replaced = replaced.replace(/\$alternate-1-theme-table-header-background-color: .*/g, ('$alternate-1-theme-table-header-background-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_1.table_row_odd_background_color) {
                const replacementString = theme.components.alternate_1.table_row_odd_background_color;
                replaced = replaced.replace(/\$alternate-1-theme-table-row-odd-background-color: .*/g, ('$alternate-1-theme-table-row-odd-background-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_1.table_row_even_background_color) {
                const replacementString = theme.components.alternate_1.table_row_even_background_color;
                replaced = replaced.replace(/\$alternate-1-theme-table-row-even-background-color: .*/g, ('$alternate-1-theme-table-row-even-background-color: ' + replacementString + ';'));
            }
            
            // ALTERNATE 2 THEME
            
            if (theme.components.alternate_2.background_color) {
                const replacementString = theme.components.alternate_2.background_color;
                replaced = replaced.replace(/\$alternate-2-theme-background-color: .*/g, ('$alternate-2-theme-background-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_2.text_color) {
                const replacementString = theme.components.alternate_2.text_color;
                replaced = replaced.replace(/\$alternate-2-theme-text-color: .*/g, ('$alternate-2-theme-text-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_2.heading_color) {
                const replacementString = theme.components.alternate_2.heading_color;
                replaced = replaced.replace(/\$alternate-2-theme-heading-color: .*/g, ('$alternate-2-theme-heading-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_2.button_background_color) {
                const replacementString = theme.components.alternate_2.button_background_color;
                replaced = replaced.replace(/\$alternate-2-theme-button-background-color: .*/g, ('$alternate-2-theme-button-background-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_2.button_color) {
                const replacementString = theme.components.alternate_2.button_color;
                replaced = replaced.replace(/\$alternate-2-theme-button-color: .*/g, ('$alternate-2-theme-button-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_2.link_color) {
                const replacementString = theme.components.alternate_2.link_color;
                replaced = replaced.replace(/\$alternate-2-theme-link-color: .*/g, ('$alternate-2-theme-link-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_2.table_header_background_color) {
                const replacementString = theme.components.alternate_2.table_header_background_color;
                replaced = replaced.replace(/\$alternate-2-theme-table-header-background-color: .*/g, ('$alternate-2-theme-table-header-background-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_2.table_row_odd_background_color) {
                const replacementString = theme.components.alternate_2.table_row_odd_background_color;
                replaced = replaced.replace(/\$alternate-2-theme-table-row-odd-background-color: .*/g, ('$alternate-2-theme-table-row-odd-background-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_2.table_row_even_background_color) {
                const replacementString = theme.components.alternate_2.table_row_even_background_color;
                replaced = replaced.replace(/\$alternate-2-theme-table-row-even-background-color: .*/g, ('$alternate-2-theme-table-row-even-background-color: ' + replacementString + ';'));
            }
            
            // ALTERNATE 3 THEME
            
            if (theme.components.alternate_3.background_color) {
                const replacementString = theme.components.alternate_3.background_color;
                replaced = replaced.replace(/\$alternate-3-theme-background-color: .*/g, ('$alternate-3-theme-background-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_3.text_color) {
                const replacementString = theme.components.alternate_3.text_color;
                replaced = replaced.replace(/\$alternate-3-theme-text-color: .*/g, ('$alternate-3-theme-text-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_3.heading_color) {
                const replacementString = theme.components.alternate_3.heading_color;
                replaced = replaced.replace(/\$alternate-3-theme-heading-color: .*/g, ('$alternate-3-theme-heading-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_3.button_background_color) {
                const replacementString = theme.components.alternate_3.button_background_color;
                replaced = replaced.replace(/\$alternate-3-theme-button-background-color: .*/g, ('$alternate-3-theme-button-background-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_3.button_color) {
                const replacementString = theme.components.alternate_3.button_color;
                replaced = replaced.replace(/\$alternate-3-theme-button-color: .*/g, ('$alternate-3-theme-button-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_3.link_color) {
                const replacementString = theme.components.alternate_3.link_color;
                replaced = replaced.replace(/\$alternate-3-theme-link-color: .*/g, ('$alternate-3-theme-link-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_3.table_header_background_color) {
                const replacementString = theme.components.alternate_3.table_header_background_color;
                replaced = replaced.replace(/\$alternate-3-theme-table-header-background-color: .*/g, ('$alternate-3-theme-table-header-background-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_3.table_row_odd_background_color) {
                const replacementString = theme.components.alternate_3.table_row_odd_background_color;
                replaced = replaced.replace(/\$alternate-3-theme-table-row-odd-background-color: .*/g, ('$alternate-3-theme-table-row-odd-background-color: ' + replacementString + ';'));
            }
            if (theme.components.alternate_3.table_row_even_background_color) {
                const replacementString = theme.components.alternate_3.table_row_even_background_color;
                replaced = replaced.replace(/\$alternate-3-theme-table-row-even-background-color: .*/g, ('$alternate-3-theme-table-row-even-background-color: ' + replacementString + ';'));
            }
            
            // FOOTER
            
            if (theme.footer.background_color) {
                const replacementString = theme.footer.background_color;
                replaced = replaced.replace(/\$footer-background-color: .*/g, ('$footer-background-color: ' + replacementString + ';'));
            }
            if (theme.footer.text_color) {
                const replacementString = theme.footer.text_color;
                replaced = replaced.replace(/\$footer-text-color: .*/g, ('$footer-text-color: ' + replacementString + ';'));
            }
            if (theme.footer.heading_color) {
                const replacementString = theme.footer.heading_color;
                replaced = replaced.replace(/\$footer-heading-color: .*/g, ('$footer-heading-color: ' + replacementString + ';'));
            }
            if (theme.footer.button_background_color) {
                const replacementString = theme.footer.button_background_color;
                replaced = replaced.replace(/\$footer-button-background-color: .*/g, ('$footer-button-background-color: ' + replacementString + ';'));
            }
            if (theme.footer.button_color) {
                const replacementString = theme.footer.button_color;
                replaced = replaced.replace(/\$footer-button-color: .*/g, ('$footer-button-color: ' + replacementString + ';'));
            }
            if (theme.footer.link_color) {
                const replacementString = theme.footer.link_color;
                replaced = replaced.replace(/\$footer-link-color: .*/g, ('$footer-link-color: ' + replacementString + ';'));
            }
            
            // PAGE PRELOADER

            if (theme.page_preloader.page_preloader_color) {
                const replacementString = theme.page_preloader.page_preloader_color;
                replaced = replaced.replace(/\$page-preloader-color: .*/g, ('$page-preloader-color: ' + replacementString + ';'));
            }

        }
            
        // Write result back to variables.scss (keeping the original variables-default.scss intact).
        fs.writeFile('./site/css/variables.scss', replaced, 'utf-8', function (err) {
            if(err){
                console.log(err);
            } else {
                console.log("WROTE TO VARIABLES OK!");
            }
        });

    });

});