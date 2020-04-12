---
title:  "Smartdown Blog Kit"
date:  "2020-03-13"
description:  "Examples, tools and templates to publish Smartdown-enabled blogs"
categories:
layout: default
type: home
---

# smartdown/blog-kit

## Examples, tools and templates to publish Smartdown-enabled blogs

This `README.md` document is intended for authors who wish to deploy their static website or blog using the templates in this repository. This document will not be visible to visitors of the deployed blog.

An important goal of this project is to separate an author's original *content* from the boilerplate mechanics of *presentation* and *deployment*. This is still an imperfect separation, but for the most part, an author's content will reside in the `_pages` and `_posts` directories at the root of this project. The mechanics of publishing this content to a particular *site* with a particular *theme* has been abstracted into the idea of a *target*. A target is a subdirectory of the content repo that has theme-specific and site-specific configuration information.

### QuickStart

This will enable you to quickly set up a copy of the `blog-kit` example on a forked version of the GitHub repo.

#### Fork or Copy the Repository

- Fork the `blog-kit` GitHub repository using [Fork](https://github.com/smartdown/blog-kit#fork-destination-box).
- If desired, rename your forked repository and edit its description from the default to a description of your choice. The name of the forked repository will be used as the default website name when deployed. For the purpose of this QuickStart, we'll assume you've left the name as `blog-kit`.

#### Choose a target

- The `blog-kit` supports the idea of deploying a set of shared content to a variety of possible *targets*. For this QuickStart, you will need to choose a target deployment from the current list:
	- cb: Based on [Start Bootstrap's Clean Blog - Jekyll](https://startbootstrap.com/themes/clean-blog-jekyll/) blog theme.
	- sp: Based on [Start Bootstrap's Stylish Portfolio](https://startbootstrap.com/previews/stylish-portfolio/)
	- mm: Based on [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) blog theme.
	- alembic: Based on [Alembic](https://github.com/daviddarnes/alembic) blog theme.
	- sparrow: Based on [Sparrow](https://github.com/lingxz/sparrow) blog theme.
- Let's assume you choose the 'mm' target for the remainder of this QuickStart.

#### Install dependencies

Many of the targets assume a Jekyll-based deployment and rely on various Ruby Gems to enable local development and static site building. So you will need to perform a one-time installation of the necessary dependencies.

- Verify you have Ruby installed. *there is probably documentation about this on the Jekyll site*.
- Go to the `mm` targets directory: `cd targets/mm/`
- Install dependencies: `bundle install`

#### Serve the site locally

Assuming your current directory is your local root (`blog-kit/`, for this QuickStart), then you can *serve* the `mm` site locally with the command `targets/serve.sh mm`.

#### Publish the site to your repo's GitHub Pages

Assuming your current directory is your local root (`blog-kit/`, for this QuickStart), then you can *publish* the `mm` site locally with the command `targets/publish.sh mm`.


### Adding Content: Pages vs Posts




### Customizing the Look and Style of your new site



#### Basics of Markdown




#### Basics of Smartdown



### Details, Details, Details

#### `targets/` scripts

The `targets/` subdirectory of this project contains several scripts to manage the different targets.

- `targets/serve.sh <target-name>`
- `targets/publish.sh <target-name>`
- `targets/clean.sh <target-name>`
- `targets/build.sh <target-name>`
- `targets/sync.sh <target-name>`

Typically, only `serve.sh` and `publish.sh` will be used.


### Default GitHub Pages Domain Name Setup

Talk about the default, where the user doesn't use `CNAME`


#### Custom GitHub Pages Domain Name Setup

Talk about using `CNAME` and how this will inhibit `https` unless you augment it with a service like `CloudFlare`

#### Setting up CloudFlare to enable `https`

blah blah blah


#### License and Credits

Mostly links to the software used


### Version History

0.0.1 - Initial version of a multi-target Jekyll-based blog. Includes clean-blog, minimal-mistakes, and stylish-portfolio themes.
0.0.2 - Adds sparrow and alembic target themes. Improve publishAll.sh to add .nojekyll to root. Improve sync.sh to handle missing _theme_assets or _theme_pages dirs, and to handle _theme_posts dir. Replace use of Plotly example with P5JS example. Add /autoplay to some playables. Adds _includes/smartdown_header.html override file. Adjusts where smartdown-outer-container div is inserted in various themes, and adjust its width to match the theme's responsive layout.
0.0.3 - Amends .gitignore to filter .hide and .deleteme suffixes, and targets/legacy/_sass/. Fixes build.sh to allow for - and . in repo names. Add syncThemeChanges() to serve.sh so that the _theme_XYZ directories are watched and synced. Adds targets/legacy/install.sh to targets/legacy and removes the corresponding assets (_sass/font-awesome/ and _sass/bootstrap-sass/) from the repo. targets/legacy/install.sh must be run once after this repo is downloaded to restore these assets.
0.0.4 - Adds targets/publishToOrgRoot.sh and targets/publishAllToOrgRoot.sh to support publishing to a top-level GitHub org's GitHub Pages site.
0.0.5 - Extends example blog to have an about-blog-kit subsection, and to demonstrate how to customize a theme for that subsection. Deletes unnecessary rawposts.html and rawpages.html. Generally cleans up example blog.



