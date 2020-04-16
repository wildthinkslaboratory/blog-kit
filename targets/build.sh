# build.sh targetName [targetBaseUrl]
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

echo "repoUrl: $repoUrl"
echo "repoPrefix: $repoPrefix"
echo "repoOrg: $repoOrg"
echo "repoName: $repoName"


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

bundle exec jekyll build \
	--config=_config.yml \
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

# cd _site
# if [ "$targetBaseUrl" != "" ]; then
# 	ln -s . .${targetBaseUrl}
# 	ls -l
# fi
# echo "# Open url: https://127.0.0.1:8989${targetBaseUrl}"
# htp . 8989


