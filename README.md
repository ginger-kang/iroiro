# ✨ iroiro ✨

![image](https://user-images.githubusercontent.com/62840502/88459121-d8415800-cecd-11ea-9043-79ceabba2cb9.png)

🕶Show people your style and play the game

## Getting Started

### Prerequisites

| Required                             | Description                                                               |
| ------------------------------------ | ------------------------------------------------------------------------- |
| [Git](https://git-scm.com/)          | We follow the [GitHub Flow](https://guides.github.com/introduction/flow/) |
| [Node.js](nodejs.org)                | 14.3.0                                                                    |
| [Yarn](https://yarnpkg.com/lang/en/) | 1.22.4 or above                                                           |

### Install Node, Yarn

The project manages the version of node through `nvm`.

```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
$ command -v nvm
$ nvm install 14.3.0
$ which node
$ npm install -g yarn
```

In the project root as follows are performed through the `.nvmrc`

```
$ nvm use
...
```

## Yarn CLIs

### Install project

```bash
$ nvm use
$ yarn
$ cd client
$ yarn
```

```bash
$ cd ..
$ yarn run dev
```

## License
```
MIT
```