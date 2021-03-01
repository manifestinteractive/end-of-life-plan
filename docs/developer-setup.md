![Logo](img/logo.png "Logo")

**[↤ Developer Overview](../README.md)**

Developer Setup
===

> The following are things you will need to do to get this project setup locally on your development machine.

Requirements:
---

* Node v8.12
* NPM v6.4

Node Version Manager (Optional):
---

Installing NVM will make working with the right version of Node automatic. If you already have the correct version of Node and NPM installed, you can skip this step.  Need help figuring out which version of Node and NPM you are using?

```bash
node -v
npm -v
```

If you do need to get the correct version of Node and NPM installed, here is how you can do that:

<details><summary>VIEW INSTRUCTIONS</summary>
<p>

1. **[Install NVM](https://github.com/creationix/nvm#installation)**
2. Add the following code to the very bottom of your profile (~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc).

    ```bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

    # This will load the version of node referenced in the .nvmrc file within a project
    autoload -U add-zsh-hook
    load-nvmrc() {
      local node_version="$(nvm version)"
      local nvmrc_path="$(nvm_find_nvmrc)"

      if [ -n "$nvmrc_path" ]; then
        local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

        if [ "$nvmrc_node_version" = "N/A" ]; then
          nvm install
        elif [ "$nvmrc_node_version" != "$node_version" ]; then
          nvm use
        fi
      elif [ "$node_version" != "$(nvm version default)" ]; then
        echo "Reverting to nvm default version"
        nvm use default
      fi
    }
    add-zsh-hook chpwd load-nvmrc
    load-nvmrc
    ```

3. Now, you need to reload your terminal, so you can either close it & reopen it, or run something like `source ~/.zshrc` for the file you edited
4. Lastly, you need to add the version of node this project is going to use:

    ```bash
    nvm install 8.12.0
    nvm use 8.12.0
    ```
</p>
</details>

Cloning Our Repo
---

Now that you have the correct version of Node & NPM installed, you can clone this repo using the code below ( this assumes you have [SSH integrated with Github](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/) ). Please note that this repository is setup as Read Only unless you are a part of our [GitHub Development Team](https://github.com/orgs/redvanworkshop/teams/developers).  If you intend to make code changes, please contact **Peter Schmalfeldt** via Slack and provide your GitHub Username.

```bash
cd /path/to/projects
git@github.com:manifestinteractive/end-of-life-plan.git
```

Starting Local Development
---

Starting a local server for the first time is pretty straight forward:

```bash
cd /path/to/projects/website
npm install
npm start
```

This will kick off a server and automatically open a browser for you at [http://localhost:8081](http://localhost:8081)

All code changes you make will trigger a rebuild of the project and refresh the website for you.


Code Changes
---

We have a dedicated document that goes over how Code Deployment works, which you can access at [deploying-updates.md](deploying-updates.md).
