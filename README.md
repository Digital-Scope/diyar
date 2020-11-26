# Diyar Al Muharraq

This project couples [Contentful](https://www.contentful.com/) and [Gatsby](https://www.gatsbyjs.org/) to achieve a better Content Editing experience.

## Project structure

This project is heavily integrated with Contentful so its structure derives from that dependency.

- `src/contentful`: contains all contentful related code
- `src/contentful/components`: react components that map directly to a content type in contentful. The folder `_removed` contains all components that had to be removed from contentful due to content types restrictions.
- `src/contentful/pages`: contentful content types that are considered pages in gatsby.
- `src/contentful/render.js`: exports `renderPage` and `renderComponent` functions that do exactly that: render a contentful page and contentful component, effectively mapping between contentful's data and gatsby implementations.
- `src/layouts`: gatsby layouts
- `src/pages`: static gatsby pages
- `src/shared`: shared code between components

### Requirements

*  [Node.js](http://nodejs.org): for all the magic
*  [Gatsby](https://www.gatsbyjs.org/docs/)

### Features

* Basic configuration and folder structure
* Uses postcss and sass (with autoprefixer and pixrem)
* Uses [Bootstrap 4](http://getbootstrap.com/) grid
* Leaves the styling to you
* Uses data from local json files
* Contains Node.js server code for easy, secure, and fast hosting
* [SVG sprites](https://css-tricks.com/svg-sprites-use-better-icon-fonts/): Add your icons in `components/icon` as .icon files and use them.

### How to proceed

1.  Prepare a coffee
2.  Run: `npm i` to install the dependencies
3.  Add a `.env.development` file with the following environment variables:
    ```bash
        # Get them from the contentful space settings
        CONTENTFUL_SPACE_ID=space_id
        CONTENTFUL_ACCESS_TOKEN=access_token
        # Use preview to get unpublished changes
        GATSBY_CONTENTFUL_HOST=preview.contentful.com
    ```
4.  Run: `npm run dev` to run Gatsby
5.  You should see shortly some text that says `The development server is listening at: http://localhost:8000`. Open that address in your browser and…
6.  Start coding!

### How to build

1.  Run: `npm run build` to build website into `/public` folder

### Considerations

* **RTL**: We are using `postcss-rtl` so all RTL css is translated from LTR. Enjoy!
* Landing pages were added to `static/new-landing` as per client request.
