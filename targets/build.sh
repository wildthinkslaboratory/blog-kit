# build.sh targetName [targetBaseUrl] [--remote]
#
#

export here=${0%/*}
source ${here}/functions.sh


if [ "$1" == "" ]; then
    echo "# $0 usage: $0 targetName"
    exit 1
fi
export targetName="${1}"
export target="${here}/${targetName}"
if [[ ! -d ${target} ]]; then
	echo "The target ${target} does not exist!"
	exit 1
fi


repoUrl=`git remote get-url --push origin`
parseRepoUrl $repoUrl;

# echo "#"
# echo "# $0 \"$1\" \"$2\""
# echo "#"
# echo "repoUrl: $repoUrl"
# echo "repoPrefix: $repoPrefix"
# echo "repoOrg: $repoOrg"
# echo "repoName: $repoName"


if [ "$2" == "" ]; then
	targetBaseUrl="/${repoName}"
else
	targetBaseUrl="${2}"
fi

targetBaseUrlOption=""
if [ "$targetBaseUrl" == "/" ]; then
	baseUrl=""
elif [ "$targetBaseUrl" != "" ]; then
	targetBaseUrlOption="--baseurl=${targetBaseUrl}"
fi

echo "targetBaseUrl: ${targetBaseUrl}"
echo "targetBaseUrlOption: ${targetBaseUrlOption}"

if [[ ! -d ${target} ]]; then
	echo "The target ${target} does not exist!"
	exit 1
fi

# Adjust target directory to look like a Jekyll site
${here}/sync.sh ${targetName}

cd ${target}

# Prepare build directory

rm -rf _site
mkdir _site

pattern_theme='^theme: ([^#]+) \# blog-kit-theme'
pattern_remote_theme='^remote_theme: ([^#]+) \# blog-kit-remote_theme'

if [ "$3" == "--remote" ]; then
	found=$( egrep "$pattern_remote_theme" _config.yml )
	if [ ! -n "$found" ]; then
		echo "# --remote option missing required remote_theme option in _config.yml"
		exit 1
	fi

	# Construct Jekyll source to be deployed
	cp Gemfile _site/

	egrep -v "$pattern_theme" _config.yml > _site/_config.yml

	cp index.html _site/

	cp -r _posts _site/_posts/
	cp -r _pages _site/_pages/
	cp -r _includes _site/_includes/
	cp -r _layouts _site/_layouts/
	cp -r assets _site/assets/

	if [[ -d classic ]]; then
		cp -r classic _site/classic/
	fi
	if [[ -d _data ]]; then
		cp -r _data _site/_data/
	fi
	if [[ -d _sass ]]; then
		cp -r _sass _site/_sass/
	fi

	ln -s _posts _site/_rawposts
	ln -s _pages _site/_rawpages
else
	# found=$( egrep "$pattern_theme" _config.yml )
	# if [ ! -n "$found" ]; then
	# 	echo "# Missing required theme option in _config.yml"
	# 	exit 1
	# fi

	egrep -v "$pattern_remote_theme" _config.yml > _site/_config.yml
	bundle exec jekyll build \
		--config=_site/_config.yml \
		--destination=_site \
		${targetBaseUrlOption} \
		2>&1 \
		| grep --line-buffered -v 'Passing a string to call() is deprecated and will be illegal' \
		| grep --line-buffered -v 'Use call(get-function("variable-exists")) instead.' \
		| grep --line-buffered -v 'Use call(get-function("mixin-exists")) instead.' \
		| grep --line-buffered -v 'Using the last argument as keyword parameters is deprecated' \
		| grep --line-buffered -v '^$' \

	# Amend the built _site
	touch _site/.nojekyll
fi

# cd _site
# if [ "$targetBaseUrl" != "/" ]; then
#   ln -s . .${targetBaseUrl}
# fi
# echo "# Open url: https://127.0.0.1:8989${targetBaseUrl}"
# htp . 8989
# exit 1
