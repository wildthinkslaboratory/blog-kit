# build.sh targetName [optionalBaseUrl] [optionalRemote]
#
#

export here=${0%/*}
if [ "$1" == "" ]; then
    echo "# $0 usage: $0 targetName"
    exit 1
fi

remoteRepo=`git remote get-url --push origin`
export targetName="${1}"
export target="${here}/${targetName}"

if [[ $remoteRepo =~ ^([^/]+)/([[:alpha:]\.\-]+)\.git$ ]]; then
	baseUrl="/${BASH_REMATCH[2]}"
else
	echo "# Unable to compute baseUrl from remoteRepo: $remoteRepo"
	exit 1
fi

if [[ $# -gt 1 ]]; then
	baseUrl="${2}"

	if [ "$3" != "" ]; then
		remoteRepo="${3}"
	fi
fi

if [[ ! -d ${target} ]]; then
	echo "The target ${target} does not exist!"
	exit 1
fi

# Adjust target directory to look like a Jekyll site
${here}/sync.sh ${targetName}

cd ${target}

baseUrlOption=""
if [ "$baseUrl" != "" ]; then
	baseUrlOption="--baseurl=${baseUrl}"
fi

# Prepare build directory
rm -rf _site
mkdir _site

bundle exec jekyll build \
	--config=_config.yml \
	--destination=_site \
	${baseUrlOption}

# Amend the built _site
touch _site/.nojekyll
