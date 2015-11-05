# less-easings
less variables based on [easings.net](http://easings.net/)

## Simple cheat sheet to help developers pick the right easing function.

### Variables usage
* Download [lessEasingsVars.less](https://github.com/var-bin/less-easings/tree/master/less/lessEasingsVars.less)
* Include lessEasingsVars.less with `@import "lessEasingsVars";` to your main .less file. e.g.
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