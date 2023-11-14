const plugins = [
  [
    'babel-plugin-import',
    {
      libraryName: '@mui/material',
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'core', // Import the core components from the MUI library
  ],
  [
    'babel-plugin-import',
    {
      libraryName: '@mui/icons-material',
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'icons', // Import the icon components from the MUI library
  ],
];

module.exports = { plugins };