# publish.sh targetName [optionalTargetRepo]
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

targetBranch="gh-pages"
if [ "$2" == "" ]; then
	targetRepoUrl=$repoUrl
	targetBaseUrl="/${repoName}"
elif [ "$2" == "--org" ]; then
	targetRepoUrl="${repoPrefix}${repoOrg}/${repoOrg}.github.io.git"
	targetBaseUrl="/"
	targetBranch="master"
else
	targetRepoUrl="$2"
	parseRepoUrl $targetRepoUrl;

	echo "xrepoUrl: $repoUrl"
	echo "xrepoPrefix: $repoPrefix"
	echo "xrepoOrg: $repoOrg"
	echo "xrepoName: $repoName"

	targetBaseUrl="/${repoName}"
fi

if [ "$3" ! "" ]; then
	targetBranch="$3"
fi

echo "targetRepoUrl: $targetRepoUrl"
echo "targetBaseUrl: $targetBaseUrl"
echo "targetBranch: $targetBranch"

# Adjust target directory to look like a Jekyll site
${here}/sync.sh ${targetName}

blogRoots="/tmp/blogRoots"
dist="${blogRoots}/${targetName}"

${here}/build.sh ${targetName} ${targetBaseUrl}

mkdir -p ${blogRoots}
rm -rf ${blogRoots}/.git

cd ${target}
rm -rf ${dist}
cp -r _site/ ${dist}
cd ${dist}


# if [ "$targetBaseUrl" != "/" ]; then
# 	ln -s . .${targetBaseUrl}
# fi
# echo "# Open url: https://127.0.0.1:8989${targetBaseUrl}"
# htp . 8989


git init
git add .
git commit -m "Initial commit"
git remote add origin ${targetRepoUrl}
git push --force origin master:${targetBranch}

