# VUE 3 Document

## Format the whole project with prettier format by using husky script 
```
 pnpm format 
 npm format
```
## Wizard eslint config asking
```
pnpm create @eslint/config@latest
```
## Prevent prettier conflict with eslint
```
pnpm add -D eslint-config-prettier
```

# NODE JS
### Install node ts
```
pnpm init
```
### Installation dependencies that most common to used
```
pnpm add dotenv
pnpm add express
pnpm add cors
pnpm add body-parser
```
## Element-plus classname

```txt
el-form
el-form--inline
el-form--label-top

el-form-item
el-form-item--default
el-form-item--feedback
el-form-item--label-left
el-form-item--label-right
el-form-item--label-top
el-form-item--large
el-form-item--small
el-form-item__content
el-form-item__error
el-form-item__error--inline
el-form-item__label
el-form-item__label-wrap

el-input
el-input--large
el-input--small
el-input-group
el-input-group--append
el-input-group--prepend
el-input-group__append
el-input-group__prepend
el-input__wrapper
el-input__inner
el-input__prefix
el-input__prefix-inner
el-input__suffix
el-input__suffix-inner
el-input__icon
el-input__clear
el-input__password
el-input__validate
el-input__count
el-input__count-inner
el-input-hidden

el-icon
el-icon--left
el-icon--right
```

* deep() : is a key that I can custom style in element-plus element (effective with CSS )
* v-deep() :  is a key that I can custom style in element-plus element (effective with Scss)