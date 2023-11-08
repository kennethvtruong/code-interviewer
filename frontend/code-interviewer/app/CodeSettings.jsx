const languages = [
  "javascript",
  "java",
  "python",
  "xml",
  "ruby",
  "sass",
  "markdown",
  "mysql",
  "json",
  "html",
  "handlebars",
  "golang",
  "csharp",
  "elixir",
  "typescript",
  "css",
];

const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal",
];

const fontSize = [12, 14, 16, 18, 20, 22, 26, 30, 34];

languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`));
import { useState } from "react";
import CustomDropDown from "./CustomDropDown";

const CodeSettings = ({ settings, setSettings }) => {
  return (
    <div className="flex flex-row justify-end w-full mt-2">
      <div className="w-1/6 mt pr-2">
        <CustomDropDown
          list={languages}
          label={"Languages"}
          state={settings}
          setState={setSettings}
          type={"mode"}
        />
      </div>
      <div className="w-1/6 pr-2">
        <CustomDropDown
          list={themes}
          label={"Themes"}
          state={settings}
          setState={setSettings}
          type="themes"
        />
      </div>
      <div className="w-1/6 pr-2">
        <CustomDropDown
          list={fontSize}
          label={"Font Size"}
          state={settings}
          setState={setSettings}
          type="fontSize"
        />
      </div>
    </div>
  );
};
export default CodeSettings;
