# Why Things Are The Way They Are
Here is where we document some of the more opinionated parts of React-Atlas. As questions, feedback and changes happen, this page will evolve so that the reason behind certain choices can be recorded and possibly refuted in future iterations of the project.
## CSS

This project uses CSS Modules and CSS Next for styling. To process this we use PostCSS. ([Read why here](https://github.com/DigitalRiver/react-atlas/blob/master/readme/Decisions.md#a-note-on-css)). At minimum your application will need to have the following packages to correctly interpret and use our library:
- [PostCSS](https://github.com/postcss/postcss), with the following plugins:
  - [PostCSS Import](https://github.com/postcss/postcss-import)
  - [CSS Next](https://github.com/cssnext/postcss-cssnext)
- A way to interpret CSS Modules, could be any of the following depending on your environment:
  - [Webpack CSS Loader](https://github.com/webpack/css-loader)
  - [PostCSS Modules](https://github.com/outpunk/postcss-modules)
  - [Babel Plugin CSS Modules Transform](https://github.com/michalkvasnicak/babel-plugin-css-modules-transform)
- ES6/JSX compiler. We recommend Babel and use the following Babel presets:
  - [es2015](https://babeljs.io/docs/plugins/preset-es2015/)
  - [react](http://babeljs.io/docs/plugins/preset-react/)
  - [stage-1](http://babeljs.io/docs/plugins/preset-stage-1/)

### A Note on CSS
While the original project that React Altas was forked from used SASS for it's css, we are trying our best to eventually remove that dependency. SASS is great, but there are a few reasons behind this move:
  - Being a superset of CSS, SASS effectively becomes it's own Domain Specific Language(DSL) with it's own quirks and syntax to learn. Effectively, SASS is to CSS what CoffeeScript is to Javascipt. Not a bad thing, it has it's benefits for sure. But since this is a library, we want to be as generic and close to spec as possible.
  - [The CSS Spec is ever evolving](http://cssnext.io/features/) and now includes native [CSS variables](http://www.w3.org/TR/css-variables/) among many other great improvements.
  - [PostCSS](https://github.com/postcss/postcss) and [CSSNext](http://cssnext.io/) allow us to have much of the same functionality that SASS provides, but also lets us write in the 'future' of the actual CSS spec. This means the styles we implement, while still using a preprocessor in the form of PostCSS, are no longer part of a DSL, but rather they are actual in-spec CSS. PostCSS is to CSS what Babel is to Javascript.

### CSS Modules
What the hell is this 'composes' stuff in CSS?

That is [CSS Modules](https://github.com/css-modules/css-modules).

Okay, so we just talked about why we want to get away from DSLs in our CSS, and then we say that we're using a kind of DSL anyways. We get it. But hear us out.

First, the API surface area of CSS Modules is extremely small. In regards to CSS syntax, it adds only 'composes'. Everything else it does is behind the scenes. The primary focus of CSS Modules is to allow locally scoped CSS. This is a big deal and helps solve a lot of problems inherit in regular Globally Scoped CSS. This is an important aspect of the library, and if you wish to contribute, it will be very beneficial for you to read the following articles on CSS Modules to help wrap your head around why it is so awesome:
 - [The End of Global CSS](https://medium.com/seek-ui-engineering/the-end-of-global-css-90d2a4a06284)
 - [CSS Modules - Welcome to the Future](http://glenmaddern.com/articles/css-modules)
 - [CSS Modules Demo](https://css-modules.github.io/webpack-demo/)
 - [Interoperable CSS](http://glenmaddern.com/articles/interoperable-css) <- the low-level 'guts' of CSS Modules for those interested

Because we are using CSS Modules we decided that a CSS framework with Atomic CSS Principals [[1](https://www.lucidchart.com/techblog/2014/01/31/atomic-css-tool-set/)] [[2](http://www.smashingmagazine.com/2013/10/challenging-css-best-practices-atomic-approach/)] would be the most benefical base for use to compose from. After some research we ended up picking [Basscss](http://www.basscss.com/) for it's small size, modularity and generic out-of-the-box look. In the future we will most liekly end up pulling all of Basscss into a higher level within the project to allow more flexibilty as we extend into complex components. But for now Basscss is a dependency of React Atlas.

### ClassNames Package
As per the [Facebook's recommendation](https://facebook.github.io/react/docs/class-name-manipulation.html), we use the [Classnames](https://github.com/JedWatson/classnames) by [Jed Watson](https://github.com/JedWatson) inside our components to concatenate class name strings. Please look into the Classname package and learn how to use it effectively to apply classes to components in our project.