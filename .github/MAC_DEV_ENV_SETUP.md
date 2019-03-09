# How to setup your Mac Dev Environment

## Step 1 install Homebrew

[Homebrew](https://brew.sh/) is a package manager for macOS or Linux system which makes installing packages trivial. It makes the job easy to install / uninstall packages.

- Install Homebrew:

```bash
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

- Check Homebrew installed by checking the version:

```bash
$ brew -v
```

## Step 2 install Node and NPM via Homebrew

- Installing Node with Homebrew will also install NPM:

```bash
$ brew install node
```

- Check that both Node and NPM installed:

```bash
$ node -v

$ npm -v
6.4.1
```

## Step 3 install Postgres via Homebrew

- Install Postgres:

```bash
$ brew install postgresql
```

- Connect to postgres shell:

```bash
$ psql postgres
```

- Useful commands:
  - Start Postgres process: `brew services start postgresql`
  - Stop Postgres process: `brew services stop postgresql`
  - Restart Postgres process: `brew services restart postgresql`

## Step 4 Install Docker (optional)

- Download the Docker .dmg file from [here](https://docs.docker.com/docker-for-mac/install/)
- Once installed open the Docker app check that Docker is installed in your terminal:

```bash
$ docker -v
Docker version 18.06.1-ce, build e68fc7a
```

- For more information visit the [Docker Docs](https://docs.docker.com/engine/docker-overview/)

# Useful Brew commands

- List Brew Services: `brew services list`
- Stop Brew Services: `brew services stop --all`

# Cheat Sheets

- [Postgres](.github/POSTGRES_COMMANDS.md)
- [Docker](.github/DOCKER_COMMANDS.md)
- [GraphQL](.github/GRAPHQL.md)
