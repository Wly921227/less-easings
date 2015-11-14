# less-easings
[Less](http://lesscss.org/) variables for [easing functions](http://www.w3.org/TR/css3-transitions/#transition-timing-function-property) based on [easings.net](http://easings.net/)

### Usage
* Download [lessEasingsVars.less](https://github.com/var-bin/less-easings/tree/master/less/lessEasingsVars.less)
* Include lessEasingsVars.less with `@import "lessEasingsVars";` to your main `.less` file.
```less
// styles/styles.less

@import "lessEasingsVars";
```
* Use variables for create awesome easing functions. e.g.
```less
// easings.less

div {
  -webkit-transition: all 600ms @easeInSine;
          transition: all 600ms @easeInSine;
}
```
* Enjoy :)