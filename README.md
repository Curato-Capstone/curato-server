# Curato Web App

This is the backend for Curato.

### Installing dependencies
```bash
npm install
```

### Running
```bash
npm start
```

### Flow
```bash
npm run flow
```

Flow type checks your code, so you can find errors quickly.

If you want persist flow checking, make sure you have ```watch``` installed via brew, and run it using the command

```bash
npm run flow:watch
```

Don't commit if there are flow issues.

### Linting
```bash
npm run lint
```

Before committing any changes, be sure to do `npm run lint` and this will lint the client folder and server.js. 
Make sure to resolve any issues before committing.

If you want persist linting, make sure you have ```watch``` installed via brew, and run it using the command

```bash
npm run lint:watch
```

### Testing

```bash
npm run test
```

Write hella tests, ya feel

If you want persist testing, run it using the command

```bash
npm run test:watch
```

### Helpful Tools
[nodemon](nodemon.io)