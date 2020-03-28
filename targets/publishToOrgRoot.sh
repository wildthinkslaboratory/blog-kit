# publishToOrgRoot.sh targetName

export here=${0%/*}

remoteRepo=`git remote get-url --push origin`
if [[ $remoteRepo =~ ^([^:]+):([^/]+)/([[:alpha:]\.\-]+)\.git$ ]]; then
	echo "BASH_REMATCH: ${BASH_REMATCH[2]} ...  ${BASH_REMATCH[3]}"
	ghPrefix=${BASH_REMATCH[1]}
	orgName=${BASH_REMATCH[2]}
	orgRemoteRepo="${ghPrefix}:${orgName}/${orgName}.github.io.git"
else
	echo "# Unable to compute baseUrl from remoteRepo: $remoteRepo"
	exit 1
fi

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

# Adjust target directory to look like a Jekyll site
${here}/sync.sh ${targetName}

blogRoots="/tmp/blogRoots"
dist="${blogRoots}/${targetName}"

${here}/build.sh ${targetName} "" ${orgRemote}

mkdir -p ${blogRoots}
rm -rf ${blogRoots}/.git

cd ${target}
rm -rf ${dist}
cp -r _site/ ${dist}
cd ${dist}

git init
git add .
git commit -m "Initial commit"
git remote add origin ${orgRemoteRepo}
git push --force origin master:master
