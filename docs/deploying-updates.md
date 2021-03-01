![Logo](img/logo.png "Logo")

**[↤ Developer Overview](../README.md)**

Deploying Updates
===

> Great, you have some changes you want to make, here is how that process works.


Requirements:
---

Before you submit a PR, you'll need to make sure the following commands work without error.  These processes are also automated as part of the deployment process, but it'll save everyone time if you go ahead and run them locally before submitting code that will possibly get automatically rejected.

```bash
cd /path/to/projects/website
npm test
```

If this build process fails, then your PR will fail.  This process will check your JS and HTML for coding issues that might break the site. If any are detected, you will receive an exact error message telling you the line number and file name with the error for you to fix the issue.  If you need more assistance, checkout our [troubleshooting.md](troubleshooting.md) for possible issues.


Pull Requests
---

Any Pull Requests into the `staging` branch will automatically be tested with `npm test` for standards and code quality.  The `staging` branch is also protected, and can only have code merged into it after it passed a peer review process and at least one other person besides yourself reviews & accepts your proposed changes.  Please make sure to use our prepopulated Pull Request Template.

Make sure to follow the [CONTRIBUTING](../.github/CONTRIBUTING.md) guidelines setup for this project.


Continuous Integration
---

We are using CircleCI to automate deployment of website updates.  In order to trigger a website update, you will need to submit, review & approve a merge of the latest `staging` branch into the `master` branch, and then create a new tagged branch off of master.

We are using the standard version method of `major.minor.patch` and the release versions should reflect the appropriate changes.

* `major`: Usually a brand new redesign or something major like that
* `minor`: This is usually adding a new feature or two
* `patch`: This is a collection of a few bug fixes

Most of the time we are likely going to be doing `patch` releases, so here is how you can use NPM to do this:

**PLEASE NOTE:** This option will only work for selected project administrators who have write access to the `master` branch. These commands will checkout the `master` branch and stash all your local changes. Then it will pull down any changes you might not have locally, create a new version and create a tag release. Then it will push the newly created tagged branch up to our central repository, which will trigger CircleCI to test the release branch, and perform an automated website update ... so, you know, **do this carefully** ;)

```bash
git checkout --force master
git stash
git pull
npm version patch -m "End of Life Plan Release v%s"
```

CDN Deployment
---

If you are setting this up on a new production server, make sure to copy `aws.dist.json` to a new file named `aws.json`.  Then edit the `accessKeyId` and `secretAccessKey` properties to match our AWS S3 account.

Our CircleCI process automatically deploys new / modified static assets from the production server, so you will not need to worry about this for local development.  In fact, local development will use local assets, so anything static assets you add or modify in the  `./src` will be pushed to our CDN from production before the build process is completed.
