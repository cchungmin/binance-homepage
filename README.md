# mercari-skill-test

## Project Brief
This project is written for Mercari, using [Angular 1.x](https://angularjs.org) with [Material Icons](https://material.io/icons). Check [more](/NOTE.md) here.

This project used some gulp setting sparked from with [Web Starter Kit](https://github.com/google/web-starter-kit).

Below you will find some information on how to perform common tasks.<br>

## Contribution

This uses [gulp](https://gulpjs.com/) as a task manager. If you don't have one, please refer the link to install.
Once down, in your favorite terminal, type:

```
npm install
```

to install all the dependencies. Then, start development server by typing:

```
gulp serve
```

Also, please make sure build process will not be Test can be run by typing:

```
npm test
```

Finally, please make sure it passes production build. You can verify it by typing:

```
gulp build
```


You can also serve produciton files by typing:

```
gulp serve:dist
```

The API serve is considered as a server different from the server used here, so CORS setting is applied for API server.


## Trade-offs
Tests might not be verycomprehensive. JS can be divided into several files and SASS is not used.
