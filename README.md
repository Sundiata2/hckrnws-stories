This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

I also used redux for the state management and react-router for the routes.

## Get started

Clone repo and run `yarn install`

then run `yarn start` and open [http://localhost:3000]

## Table of Contents

- [Available Scripts](#available-scripts)
  - [npm start](#npm-start) (only one you'll need for the demo app)


## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    components/
      comments-section.js
      stories-wrapper.js
      story-item.js
    lib/
      actions.js
      reducers.js
    scss/
      components/
        _comments.scss
        _stories.scss
      _layout.scss
      _variables.scss
      style.scss
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

For the project to build, **these files must exist with exact filenames**:

- `public/index.html` is the page template;
- `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
